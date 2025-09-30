import { ApiResponse, SupabaseError } from './types';

// Configuración base para la API
// Las variables de entorno deben estar definidas en .env.local
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  authURL: '/auth/v1',
  restURL: '/rest/v1',
};



// Headers base para todas las requests
export const getBaseHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': API_CONFIG.apiKey,
});

// Headers con autorización
export const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    ...getBaseHeaders(),
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Funciones para manejo del localStorage (solo en cliente)
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
};

export const removeAccessToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
};

// Función helper para hacer requests
export const makeRequest = async <T = any>(
  url: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getBaseHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    return {
      data: response.ok ? data : undefined,
      error: !response.ok ? data : undefined,
      status: response.status,
    };
  } catch (error) {
    return {
      error: { error: 'Network error', message: error instanceof Error ? error.message : 'Unknown error' },
      status: 0,
    };
  }
};

// Función helper para requests autenticadas
export const makeAuthenticatedRequest = async <T = any>(
  url: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  return makeRequest<T>(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
};