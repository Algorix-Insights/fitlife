import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  PlanSession, 
  CreatePlanSessionRequest, 
  UpdatePlanSessionRequest,
  ApiResponse 
} from './types';

class PlanSessionService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/plan_sessions`;

  /**
   * Listar sesiones de planes del usuario autenticado
   */
  async getPlanSessions(): Promise<ApiResponse<PlanSession[]>> {
    return makeAuthenticatedRequest<PlanSession[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener sesiones por ID del plan de usuario
   */
  async getSessionsByUserPlanId(userPlanId: string): Promise<ApiResponse<PlanSession[]>> {
    return makeAuthenticatedRequest<PlanSession[]>(`${this.baseURL}?user_plan_id=eq.${userPlanId}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener sesiones por estado específico
   */
  async getSessionsByStatus(status: 'pending' | 'completed' | 'skipped'): Promise<ApiResponse<PlanSession[]>> {
    return makeAuthenticatedRequest<PlanSession[]>(`${this.baseURL}?status=eq.${status}`, {
      method: 'GET',
    });
  }

  /**
   * Crear sesión para un plan
   */
  async createPlanSession(sessionData: CreatePlanSessionRequest): Promise<ApiResponse<PlanSession>> {
    return makeAuthenticatedRequest<PlanSession>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  /**
   * Actualizar estado o notas de sesión
   */
  async updatePlanSession(id: string, sessionData: UpdatePlanSessionRequest): Promise<ApiResponse<PlanSession>> {
    return makeAuthenticatedRequest<PlanSession>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(sessionData),
    });
  }

  /**
   * Eliminar sesión
   */
  async deletePlanSession(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener sesión específica por ID
   */
  async getPlanSessionById(id: string): Promise<ApiResponse<PlanSession[]>> {
    return makeAuthenticatedRequest<PlanSession[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Marcar sesión como completada
   */
  async completePlanSession(id: string, notes?: string): Promise<ApiResponse<PlanSession>> {
    const updateData: UpdatePlanSessionRequest = { 
      status: 'completed' as const,
      ...(notes && { notes })
    };
    
    return this.updatePlanSession(id, updateData);
  }

  /**
   * Marcar sesión como saltada
   */
  async skipPlanSession(id: string, notes?: string): Promise<ApiResponse<PlanSession>> {
    const updateData: UpdatePlanSessionRequest = { 
      status: 'skipped' as const,
      ...(notes && { notes })
    };
    
    return this.updatePlanSession(id, updateData);
  }

  /**
   * Obtener sesiones pendientes del usuario
   */
  async getPendingSessions(): Promise<ApiResponse<PlanSession[]>> {
    return this.getSessionsByStatus('pending');
  }

  /**
   * Obtener sesiones completadas del usuario
   */
  async getCompletedSessions(): Promise<ApiResponse<PlanSession[]>> {
    return this.getSessionsByStatus('completed');
  }

  /**
   * Obtener sesiones por rango de fechas
   */
  async getSessionsByDateRange(startDate: string, endDate: string): Promise<ApiResponse<PlanSession[]>> {
    return makeAuthenticatedRequest<PlanSession[]>(
      `${this.baseURL}?session_date=gte.${startDate}&session_date=lte.${endDate}`, 
      {
        method: 'GET',
      }
    );
  }
}

// Exportar instancia única del servicio
export const planSessionService = new PlanSessionService();
export default planSessionService;