import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  Survey, 
  CreateSurveyRequest, 
  UpdateSurveyRequest,
  ApiResponse 
} from './types';

class SurveyService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/surveys`;

  /**
   * Listar encuestas del usuario autenticado
   */
  async getSurveys(): Promise<ApiResponse<Survey[]>> {
    return makeAuthenticatedRequest<Survey[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Crear nueva encuesta
   */
  async createSurvey(surveyData: CreateSurveyRequest): Promise<ApiResponse<Survey>> {
    return makeAuthenticatedRequest<Survey>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(surveyData),
    });
  }

  /**
   * Actualizar encuesta existente
   */
  async updateSurvey(id: string, surveyData: UpdateSurveyRequest): Promise<ApiResponse<Survey>> {
    return makeAuthenticatedRequest<Survey>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(surveyData),
    });
  }

  /**
   * Eliminar encuesta
   */
  async deleteSurvey(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener encuesta específica por ID
   */
  async getSurveyById(id: string): Promise<ApiResponse<Survey[]>> {
    return makeAuthenticatedRequest<Survey[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener la encuesta más reciente del usuario
   */
  async getLatestSurvey(): Promise<ApiResponse<Survey[]>> {
    return makeAuthenticatedRequest<Survey[]>(`${this.baseURL}?order=completed_at.desc&limit=1`, {
      method: 'GET',
    });
  }

  /**
   * Obtener encuestas por rango de fechas
   */
  async getSurveysByDateRange(startDate: string, endDate: string): Promise<ApiResponse<Survey[]>> {
    return makeAuthenticatedRequest<Survey[]>(
      `${this.baseURL}?completed_at=gte.${startDate}&completed_at=lte.${endDate}`, 
      {
        method: 'GET',
      }
    );
  }

  /**
   * Verificar si el usuario tiene encuestas
   */
  async hasSurveys(): Promise<ApiResponse<{ hasData: boolean; count: number }>> {
    const response = await makeAuthenticatedRequest<Survey[]>(`${this.baseURL}?select=id`, {
      method: 'GET',
    });

    if (response.error) {
      return {
        error: response.error,
        status: response.status,
      };
    }

    const count = response.data?.length || 0;
    
    return {
      data: { 
        hasData: count > 0,
        count 
      },
      status: response.status,
    };
  }

  /**
   * Crear encuesta de onboarding (primera encuesta del usuario)
   */
  async createOnboardingSurvey(answers: {
    fitnessGoal: string;
    currentFitnessLevel: string;
    preferredWorkoutTypes: string[];
    availableEquipment: string[];
    workoutFrequency: string;
    timePerWorkout: string;
    injuriesOrLimitations: string;
    motivationFactors: string[];
  }): Promise<ApiResponse<Survey>> {
    return this.createSurvey({
      answers: {
        type: 'onboarding',
        ...answers,
        timestamp: new Date().toISOString(),
      }
    });
  }

  /**
   * Crear encuesta de seguimiento/progreso
   */
  async createProgressSurvey(answers: {
    currentWeight?: number;
    energyLevel: string;
    workoutSatisfaction: string;
    difficultyLevel: string;
    goalProgress: string;
    challenges: string[];
    additionalComments?: string;
  }): Promise<ApiResponse<Survey>> {
    return this.createSurvey({
      answers: {
        type: 'progress',
        ...answers,
        timestamp: new Date().toISOString(),
      }
    });
  }

  /**
   * Actualizar respuestas de una encuesta existente
   */
  async updateSurveyAnswers(id: string, newAnswers: any): Promise<ApiResponse<Survey>> {
    return this.updateSurvey(id, { 
      answers: newAnswers 
    });
  }
}

// Exportar instancia única del servicio
export const surveyService = new SurveyService();
export default surveyService;