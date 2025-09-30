import { API_CONFIG, makeAuthenticatedRequest } from './config';
import { 
  Profile, 
  CreateProfileRequest, 
  UpdateProfileRequest,
  ApiResponse 
} from './types';

class ProfileService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.restURL}/profiles`;

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<ApiResponse<Profile[]>> {
    return makeAuthenticatedRequest<Profile[]>(this.baseURL, {
      method: 'GET',
    });
  }

  /**
   * Crear nuevo perfil para el usuario autenticado
   */
  async createProfile(profileData: CreateProfileRequest): Promise<ApiResponse<Profile>> {
    return makeAuthenticatedRequest<Profile>(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Actualizar perfil existente
   */
  async updateProfile(id: string, profileData: UpdateProfileRequest): Promise<ApiResponse<Profile>> {
    return makeAuthenticatedRequest<Profile>(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Eliminar perfil
   */
  async deleteProfile(id: string): Promise<ApiResponse<void>> {
    return makeAuthenticatedRequest<void>(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Obtener perfil por ID específico
   */
  async getProfileById(id: string): Promise<ApiResponse<Profile[]>> {
    return makeAuthenticatedRequest<Profile[]>(`${this.baseURL}?id=eq.${id}`, {
      method: 'GET',
    });
  }
}

// Exportar instancia única del servicio
export const profileService = new ProfileService();
export default profileService;