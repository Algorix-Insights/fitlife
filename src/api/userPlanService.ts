import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  UserPlan, 
  CreateUserPlanRequest, 
  UpdateUserPlanRequest,
  ApiResponse 
} from './types';

class UserPlanService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/user_plans`;

  /**
   * Listar planes asignados al usuario autenticado
   */
  async getUserPlans(): Promise<ApiResponse<UserPlan[]>> {
    return makeAuthenticatedRequest<UserPlan[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener planes activos del usuario
   */
  async getActiveUserPlans(): Promise<ApiResponse<UserPlan[]>> {
    return makeAuthenticatedRequest<UserPlan[]>(`${this.baseURL}?active=eq.true`, {
      method: 'GET',
    });
  }

  /**
   * Asignar plan a usuario
   */
  async assignPlanToUser(planData: CreateUserPlanRequest): Promise<ApiResponse<UserPlan>> {
    return makeAuthenticatedRequest<UserPlan>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  /**
   * Actualizar estado de plan asignado
   */
  async updateUserPlan(id: string, planData: UpdateUserPlanRequest): Promise<ApiResponse<UserPlan>> {
    return makeAuthenticatedRequest<UserPlan>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(planData),
    });
  }

  /**
   * Desasignar plan de usuario
   */
  async unassignUserPlan(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener plan específico del usuario por ID
   */
  async getUserPlanById(id: string): Promise<ApiResponse<UserPlan[]>> {
    return makeAuthenticatedRequest<UserPlan[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Activar/Desactivar un plan del usuario
   */
  async toggleUserPlanStatus(id: string, active: boolean): Promise<ApiResponse<UserPlan>> {
    return this.updateUserPlan(id, { active });
  }

  /**
   * Obtener planes del usuario por ID de plan específico
   */
  async getUserPlansByPlanId(planId: string): Promise<ApiResponse<UserPlan[]>> {
    return makeAuthenticatedRequest<UserPlan[]>(`${this.baseURL}?plan_id=eq.${planId}`, {
      method: 'GET',
    });
  }
}

// Exportar instancia única del servicio
export const userPlanService = new UserPlanService();
export default userPlanService;