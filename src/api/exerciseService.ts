import { API_CONFIG, makeRequest, makeAuthenticatedRequest } from './config';
import { 
  Exercise, 
  CreateExerciseRequest, 
  UpdateExerciseRequest,
  ApiResponse 
} from './types';

class ExerciseService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/exercises`;

  /**
   * Listar todos los ejercicios (público)
   */
  async getAllExercises(): Promise<ApiResponse<Exercise[]>> {
    return makeRequest<Exercise[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener detalle de un ejercicio específico (público)
   */
  async getExerciseById(id: string): Promise<ApiResponse<Exercise[]>> {
    return makeRequest<Exercise[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Crear nuevo ejercicio (requiere autenticación)
   */
  async createExercise(exerciseData: CreateExerciseRequest): Promise<ApiResponse<Exercise>> {
    return makeAuthenticatedRequest<Exercise>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  /**
   * Actualizar ejercicio existente (requiere autenticación)
   */
  async updateExercise(id: string, exerciseData: UpdateExerciseRequest): Promise<ApiResponse<Exercise>> {
    return makeAuthenticatedRequest<Exercise>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exerciseData),
    });
  }

  /**
   * Eliminar ejercicio (requiere autenticación)
   */
  async deleteExercise(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Buscar ejercicios por grupo muscular
   */
  async getExercisesByMuscleGroup(muscleGroup: string): Promise<ApiResponse<Exercise[]>> {
    return makeRequest<Exercise[]>(`${this.baseURL}?muscle_group=eq.${muscleGroup}`, {
      method: 'GET',
    });
  }

  /**
   * Buscar ejercicios por equipamiento
   */
  async getExercisesByEquipment(equipment: string): Promise<ApiResponse<Exercise[]>> {
    return makeRequest<Exercise[]>(`${this.baseURL}?equipment=eq.${equipment}`, {
      method: 'GET',
    });
  }

  /**
   * Buscar ejercicios por criterios múltiples
   */
  async searchExercises(criteria: {
    name?: string;
    muscle_group?: string;
    equipment?: string;
  }): Promise<ApiResponse<Exercise[]>> {
    const params = new URLSearchParams();
    
    if (criteria.name) params.append('name', `ilike.*${criteria.name}*`);
    if (criteria.muscle_group) params.append('muscle_group', `eq.${criteria.muscle_group}`);
    if (criteria.equipment) params.append('equipment', `eq.${criteria.equipment}`);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    return makeRequest<Exercise[]>(`${this.baseURL}${queryString}`, {
      method: 'GET',
    });
  }
}

// Exportar instancia única del servicio
export const exerciseService = new ExerciseService();
export default exerciseService;