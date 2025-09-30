import { API_CONFIG, makeRequest, makeAuthenticatedRequest } from './config';
import { 
  Plan, 
  CreatePlanRequest, 
  UpdatePlanRequest,
  ApiResponse 
} from './types';

class PlanService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/plans`;

  /**
   * Listar todos los planes (público)
   */
  async getAllPlans(): Promise<ApiResponse<Plan[]>> {
    return makeRequest<Plan[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener detalle de un plan específico (público)
   */
  async getPlanById(id: string): Promise<ApiResponse<Plan[]>> {
    return makeRequest<Plan[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Crear un nuevo plan (requiere autenticación)
   */
  async createPlan(planData: CreatePlanRequest): Promise<ApiResponse<Plan>> {
    return makeAuthenticatedRequest<Plan>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  /**
   * Actualizar plan existente (requiere autenticación)
   */
  async updatePlan(id: string, planData: UpdatePlanRequest): Promise<ApiResponse<Plan>> {
    return makeAuthenticatedRequest<Plan>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(planData),
    });
  }

  /**
   * Eliminar plan (requiere autenticación)
   */
  async deletePlan(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Buscar planes por criterios específicos
   */
  async searchPlans(criteria: {
    type?: string;
    level?: string;
    equipment_level?: 'none' | 'basic' | 'gym';
    duration_weeks?: number;
  }): Promise<ApiResponse<Plan[]>> {
    const params = new URLSearchParams();
    
    if (criteria.type) params.append('type', `eq.${criteria.type}`);
    if (criteria.level) params.append('level', `eq.${criteria.level}`);
    if (criteria.equipment_level) params.append('equipment_level', `eq.${criteria.equipment_level}`);
    if (criteria.duration_weeks) params.append('duration_weeks', `eq.${criteria.duration_weeks}`);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    return makeRequest<Plan[]>(`${this.baseURL}${queryString}`, {
      method: 'GET',
    });
  }
}

// Exportar instancia única del servicio
export const planService = new PlanService();
export default planService;