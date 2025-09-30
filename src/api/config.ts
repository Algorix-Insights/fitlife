import { supabase } from '@/lib/supabase';
import { ApiResponse, SupabaseError } from './types';

// Configuración base para la API
// Las variables de entorno deben estar definidas en .env.local
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  authURL: '/auth/v1',
  restURL: '/rest/v1',
};

// Exportar el cliente de Supabase para uso en servicios
export { supabase };

// Headers base para todas las requests (mantenido para compatibilidad con requests manuales)
export const getBaseHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': API_CONFIG.apiKey,
});

// Headers con autorización (mantenido para requests manuales)
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

// Función helper para obtener la sesión actual de Supabase
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Función helper para obtener el usuario actual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Función helper para hacer requests con Supabase (recomendado)
export const makeSupabaseRequest = async <T = unknown>(
  operation: () => Promise<{ data: T | null; error: unknown }>
): Promise<ApiResponse<T>> => {
  try {
    const { data, error } = await operation();
    
    return {
      data: data || undefined,
      error: error
        ? {
            error: (typeof error === 'object' && 'code' in error ? (error as any).code : 'supabase_error'),
            message: (typeof error === 'object' && 'message' in error ? (error as any).message : 'Unknown error'),
          }
        : undefined,
      status: error ? 400 : 200,
    };
  } catch (error) {
    return {
      error: { 
        error: 'supabase_exception', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      status: 500,
    };
  }
};

// Funciones legacy para requests manuales (mantenidas para compatibilidad)
export const makeRequest = async <T = unknown>(
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

export const makeAuthenticatedRequest = async <T = unknown>(
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