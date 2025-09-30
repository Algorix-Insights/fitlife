import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  Goal, 
  CreateGoalRequest, 
  UpdateGoalRequest,
  ApiResponse 
} from './types';

class GoalService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/goals`;

  /**
   * Listar metas del usuario autenticado
   */
  async getGoals(): Promise<ApiResponse<Goal[]>> {
    return makeAuthenticatedRequest<Goal[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Crear nueva meta
   */
  async createGoal(goalData: CreateGoalRequest): Promise<ApiResponse<Goal>> {
    return makeAuthenticatedRequest<Goal>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  /**
   * Actualizar meta existente
   */
  async updateGoal(id: string, goalData: UpdateGoalRequest): Promise<ApiResponse<Goal>> {
    return makeAuthenticatedRequest<Goal>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(goalData),
    });
  }

  /**
   * Eliminar meta
   */
  async deleteGoal(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener meta específica por ID
   */
  async getGoalById(id: string): Promise<ApiResponse<Goal[]>> {
    return makeAuthenticatedRequest<Goal[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener metas por tipo
   */
  async getGoalsByType(type: string): Promise<ApiResponse<Goal[]>> {
    return makeAuthenticatedRequest<Goal[]>(`${this.baseURL}?type=eq.${type}`, {
      method: 'GET',
    });
  }

  /**
   * Actualizar progreso de una meta
   */
  async updateGoalProgress(id: string, progress: any): Promise<ApiResponse<Goal>> {
    return this.updateGoal(id, { progress });
  }

  /**
   * Obtener metas activas (con fecha de vencimiento futura o sin fecha)
   */
  async getActiveGoals(): Promise<ApiResponse<Goal[]>> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return makeAuthenticatedRequest<Goal[]>(
      `${this.baseURL}?or=(due_date.is.null,due_date.gte.${today})`, 
      {
        method: 'GET',
      }
    );
  }

  /**
   * Obtener metas vencidas
   */
  async getOverdueGoals(): Promise<ApiResponse<Goal[]>> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return makeAuthenticatedRequest<Goal[]>(`${this.baseURL}?due_date=lt.${today}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener metas por rango de fechas
   */
  async getGoalsByDateRange(startDate: string, endDate: string): Promise<ApiResponse<Goal[]>> {
    return makeAuthenticatedRequest<Goal[]>(
      `${this.baseURL}?start_date=gte.${startDate}&due_date=lte.${endDate}`, 
      {
        method: 'GET',
      }
    );
  }

  /**
   * Buscar metas por descripción
   */
  async searchGoalsByDescription(searchTerm: string): Promise<ApiResponse<Goal[]>> {
    return makeAuthenticatedRequest<Goal[]>(`${this.baseURL}?description=ilike.*${searchTerm}*`, {
      method: 'GET',
    });
  }
}

// Exportar instancia única del servicio
export const goalService = new GoalService();
export default goalService;