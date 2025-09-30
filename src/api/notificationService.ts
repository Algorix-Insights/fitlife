import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  Notification, 
  CreateNotificationRequest, 
  UpdateNotificationRequest,
  ApiResponse 
} from './types';

class NotificationService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/notifications`;

  /**
   * Listar notificaciones del usuario autenticado
   */
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Obtener notificaciones no leídas
   */
  async getUnreadNotifications(): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?read=eq.false`, {
      method: 'GET',
    });
  }

  /**
   * Crear nueva notificación
   */
  async createNotification(notificationData: CreateNotificationRequest): Promise<ApiResponse<Notification>> {
    return makeAuthenticatedRequest<Notification>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  }

  /**
   * Marcar como leída o actualizar notificación
   */
  async updateNotification(id: string, notificationData: UpdateNotificationRequest): Promise<ApiResponse<Notification>> {
    return makeAuthenticatedRequest<Notification>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(notificationData),
    });
  }

  /**
   * Eliminar notificación
   */
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener notificación específica por ID
   */
  async getNotificationById(id: string): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }

  /**
   * Marcar notificación como leída
   */
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return this.updateNotification(id, { read: true });
  }

  /**
   * Marcar notificación como no leída
   */
  async markAsUnread(id: string): Promise<ApiResponse<Notification>> {
    return this.updateNotification(id, { read: false });
  }

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?read=eq.false`, {
      method: 'PATCH',
      body: JSON.stringify({ read: true }),
    });
  }

  /**
   * Obtener notificaciones por tipo
   */
  async getNotificationsByType(type: string): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?type=eq.${type}`, {
      method: 'GET',
    });
  }

  /**
   * Obtener notificaciones programadas
   */
  async getScheduledNotifications(): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?scheduled_at=not.is.null&sent_at=is.null`, {
      method: 'GET',
    });
  }

  /**
   * Obtener notificaciones enviadas
   */
  async getSentNotifications(): Promise<ApiResponse<Notification[]>> {
    return makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?sent_at=not.is.null`, {
      method: 'GET',
    });
  }

  /**
   * Obtener contador de notificaciones no leídas
   */
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    const response = await makeAuthenticatedRequest<Notification[]>(`${this.baseURL}?read=eq.false&select=id`, {
      method: 'GET',
    });

    if (response.error) {
      return {
        error: response.error,
        status: response.status,
      };
    }

    return {
      data: { count: response.data?.length || 0 },
      status: response.status,
    };
  }

  /**
   * Eliminar notificaciones antiguas (más de X días)
   */
  async deleteOldNotifications(daysOld: number = 30): Promise<ApiResponse<void>> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    return makeAuthenticatedRequest<void>(`${this.baseURL}?created_at=lt.${cutoffString}`, {
      method: 'DELETE',
    });
  }
}

// Exportar instancia única del servicio
export const notificationService = new NotificationService();
export default notificationService;