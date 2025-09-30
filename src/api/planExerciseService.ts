import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  PlanExercise, 
  CreatePlanExerciseRequest, 
  UpdatePlanExerciseRequest,
  ApiResponse 
} from './types';

class PlanExerciseService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/plan_exercises`;

  /**
   * Listar ejercicios de planes asignados (requiere autenticación)
   */
  async getPlanExercises(): Promise<ApiResponse<PlanExercise[]>> {
    return makeAuthenticatedRequest<PlanExercise[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener ejercicios por ID de día del plan
   */
  async getPlanExercisesByDayId(planDayId: string): Promise<ApiResponse<PlanExercise[]>> {
    return makeAuthenticatedRequest<PlanExercise[]>(`${this.baseURL}?plan_day_id=eq.${planDayId}`, {
      method: 'GET',
    });
  }

  /**
   * Agregar ejercicio a un plan
   */
  async addExerciseToPlan(exerciseData: CreatePlanExerciseRequest): Promise<ApiResponse<PlanExercise>> {
    return makeAuthenticatedRequest<PlanExercise>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  /**
   * Actualizar detalles del ejercicio en plan
   */
  async updatePlanExercise(id: string, exerciseData: UpdatePlanExerciseRequest): Promise<ApiResponse<PlanExercise>> {
    return makeAuthenticatedRequest<PlanExercise>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exerciseData),
    });
  }

  /**
   * Eliminar ejercicio de un plan
   */
  async removePlanExercise(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener ejercicio específico del plan por ID
   */
  async getPlanExerciseById(id: string): Promise<ApiResponse<PlanExercise[]>> {
    return makeAuthenticatedRequest<PlanExercise[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener ejercicios por ID de ejercicio específico
   */
  async getPlanExercisesByExerciseId(exerciseId: string): Promise<ApiResponse<PlanExercise[]>> {
    return makeAuthenticatedRequest<PlanExercise[]>(`${this.baseURL}?exercise_id=eq.${exerciseId}`, {
      method: 'GET',
    });
  }

  /**
   * Reordenar ejercicios en un plan (actualizar posiciones)
   */
  async reorderPlanExercises(exercises: Array<{ id: string; position: number }>): Promise<ApiResponse<PlanExercise[]>> {
    // Realizar múltiples actualizaciones para reordenar
    const updatePromises = exercises.map(exercise => 
      this.updatePlanExercise(exercise.id, { position: exercise.position })
    );

    try {
      const results = await Promise.all(updatePromises);
      const hasErrors = results.some(result => result.error);
      
      if (hasErrors) {
        return {
          error: { error: 'Some exercises could not be reordered' },
          status: 400,
        };
      }

      // Retornar los ejercicios actualizados
      return {
        data: results.map(result => result.data).filter(Boolean) as PlanExercise[],
        status: 200,
      };
    } catch (error) {
      return {
        error: { error: 'Failed to reorder exercises', message: error instanceof Error ? error.message : 'Unknown error' },
        status: 500,
      };
    }
  }
}

// Exportar instancia única del servicio
export const planExerciseService = new PlanExerciseService();
export default planExerciseService;