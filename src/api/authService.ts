import { API_CONFIG, makeRequest, setAccessToken, removeAccessToken, getAccessToken } from './config';
import { 
  SignupRequest, 
  LoginRequest, 
  AuthResponse, 
  User, 
  ApiResponse 
} from './types';

class AuthService {
  private baseURL = `${API_CONFIG.baseURL}${API_CONFIG.authURL}`;

  /**
   * Registrar nuevo usuario
   */
  async signup(userData: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await makeRequest<AuthResponse>(`${this.baseURL}/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Si el registro es exitoso, guardar el token
    if (response.data?.access_token) {
      setAccessToken(response.data.access_token);
    }

    return response;
  }

  /**
   * Iniciar sesión
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await makeRequest<AuthResponse>(
      `${this.baseURL}/token?grant_type=password`, 
      {
        method: 'POST',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    // Si el login es exitoso, guardar el token
    if (response.data?.access_token) {
      setAccessToken(response.data.access_token);
    }

    return response;
  }

  /**
   * Obtener información del usuario logueado
   */
  async getUserInfo(): Promise<ApiResponse<User>> {
    const token = getAccessToken();
    if (!token) {
      return {
        error: { error: 'No access token found' },
        status: 401,
      };
    }

    return makeRequest<User>(`${this.baseURL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  /**
   * Actualizar información del usuario
   */
  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    const token = getAccessToken();
    if (!token) {
      return {
        error: { error: 'No access token found' },
        status: 401,
      };
    }

    return makeRequest<User>(`${this.baseURL}/user`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    removeAccessToken();
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return getAccessToken() !== null;
  }

  /**
   * Obtener el token de acceso actual
   */
  getCurrentToken(): string | null {
    return getAccessToken();
  }
}

// Exportar instancia única del servicio
export const authService = new AuthService();
export default authService;