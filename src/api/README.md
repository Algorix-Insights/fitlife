# FitLife API Services

Esta carpeta contiene todos los servicios de la API para la aplicación FitLife, construida con Supabase como backend.

## 📁 Estructura de Archivos

```
src/lib/api/
├── config.ts                 # Configuración base y utilidades HTTP
├── types.ts                  # Tipos TypeScript para todas las entidades
├── authService.ts            # Servicios de autenticación
├── profileService.ts         # Servicios de perfiles de usuario
├── planService.ts            # Servicios de planes de entrenamiento
├── userPlanService.ts        # Servicios de planes asignados a usuarios
├── exerciseService.ts        # Servicios de ejercicios
├── planExerciseService.ts    # Servicios de ejercicios en planes
├── planSessionService.ts     # Servicios de sesiones de entrenamiento
├── goalService.ts            # Servicios de metas de usuario
├── notificationService.ts    # Servicios de notificaciones
├── surveyService.ts          # Servicios de encuestas
├── examples.ts               # Ejemplos de uso de todos los servicios
└── index.ts                  # Exportaciones principales
```

## 🚀 Configuración Inicial

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

### 2. Actualizar Configuración

Edita el archivo `config.ts` y reemplaza los valores placeholder con tus credenciales de Supabase:

```typescript
export const API_CONFIG = {
  baseURL: 'https://tu-proyecto.supabase.co',
  apiKey: 'tu-supabase-anon-key',
  authURL: '/auth/v1',
  restURL: '/rest/v1',
};
```

## 📚 Uso de los Servicios

### Importación

```typescript
// Importar servicios específicos
import { authService, profileService, planService } from '@/lib/api';

// O importar todo
import { apiServices } from '@/lib/api';
```

### Autenticación

```typescript
import { authService } from '@/lib/api';

// Registrar usuario
const result = await authService.signup({
  email: 'usuario@ejemplo.com',
  password: 'contraseña123'
});

// Iniciar sesión
const loginResult = await authService.login({
  email: 'usuario@ejemplo.com',
  password: 'contraseña123'
});

// El token se guarda automáticamente en localStorage
```

### Manejo de Respuestas

Todas las funciones retornan un objeto `ApiResponse`:

```typescript
interface ApiResponse<T> {
  data?: T;           // Datos si la operación fue exitosa
  error?: SupabaseError; // Error si algo salió mal
  status: number;     // Código de estado HTTP
}
```

### Ejemplo de Manejo de Errores

```typescript
const result = await profileService.createProfile({
  name: 'Juan Pérez',
  goal: 'lose_weight'
});

if (result.error) {
  console.error('Error:', result.error.message);
  // Manejar error
} else {
  console.log('Perfil creado:', result.data);
  // Usar los datos
}
```

## 🔐 Autenticación y Tokens

- **Login automático**: Después del login exitoso, el token se guarda automáticamente en `localStorage`
- **Requests autenticadas**: Los servicios que requieren autenticación usan automáticamente el token guardado
- **Manejo de localStorage**: Se verifica si estamos en el cliente antes de acceder a `localStorage`

## 📋 Servicios Disponibles

### 🔑 Auth Service
- `signup()` - Registrar usuario
- `login()` - Iniciar sesión  
- `getUserInfo()` - Obtener info del usuario logueado
- `updateUser()` - Actualizar usuario
- `logout()` - Cerrar sesión
- `isAuthenticated()` - Verificar si está autenticado

### 👤 Profile Service
- `getProfile()` - Obtener perfil del usuario
- `createProfile()` - Crear perfil
- `updateProfile()` - Actualizar perfil
- `deleteProfile()` - Eliminar perfil

### 🏃 Plan Service
- `getAllPlans()` - Listar todos los planes
- `getPlanById()` - Obtener plan por ID
- `createPlan()` - Crear plan
- `updatePlan()` - Actualizar plan
- `deletePlan()` - Eliminar plan
- `searchPlans()` - Buscar planes por criterios

### 📅 User Plan Service
- `getUserPlans()` - Obtener planes del usuario
- `getActiveUserPlans()` - Obtener planes activos
- `assignPlanToUser()` - Asignar plan a usuario
- `updateUserPlan()` - Actualizar plan asignado
- `unassignUserPlan()` - Desasignar plan

### 💪 Exercise Service
- `getAllExercises()` - Listar ejercicios
- `getExerciseById()` - Obtener ejercicio por ID
- `createExercise()` - Crear ejercicio
- `updateExercise()` - Actualizar ejercicio
- `deleteExercise()` - Eliminar ejercicio
- `getExercisesByMuscleGroup()` - Buscar por grupo muscular
- `searchExercises()` - Búsqueda avanzada

### 🔗 Plan Exercise Service
- `getPlanExercises()` - Obtener ejercicios de planes
- `addExerciseToPlan()` - Agregar ejercicio a plan
- `updatePlanExercise()` - Actualizar ejercicio en plan
- `removePlanExercise()` - Remover ejercicio de plan
- `reorderPlanExercises()` - Reordenar ejercicios

### 📊 Plan Session Service
- `getPlanSessions()` - Obtener sesiones
- `createPlanSession()` - Crear sesión
- `updatePlanSession()` - Actualizar sesión
- `completePlanSession()` - Marcar como completada
- `skipPlanSession()` - Marcar como saltada
- `getSessionsByDateRange()` - Obtener por fechas

### 🎯 Goal Service
- `getGoals()` - Obtener metas del usuario
- `createGoal()` - Crear meta
- `updateGoal()` - Actualizar meta
- `updateGoalProgress()` - Actualizar progreso
- `getActiveGoals()` - Obtener metas activas
- `getOverdueGoals()` - Obtener metas vencidas

### 🔔 Notification Service
- `getNotifications()` - Obtener notificaciones
- `getUnreadNotifications()` - Obtener no leídas
- `createNotification()` - Crear notificación
- `markAsRead()` - Marcar como leída
- `markAllAsRead()` - Marcar todas como leídas
- `getUnreadCount()` - Contador de no leídas

### 📝 Survey Service
- `getSurveys()` - Obtener encuestas
- `createSurvey()` - Crear encuesta
- `createOnboardingSurvey()` - Crear encuesta de onboarding
- `createProgressSurvey()` - Crear encuesta de progreso
- `getLatestSurvey()` - Obtener encuesta más reciente

## 🔍 Filtros y Consultas

Los servicios soportan filtros usando la sintaxis de PostgREST de Supabase:

```typescript
// Filtros de ejemplo
- `eq.value` - Igual a valor
- `neq.value` - No igual a valor
- `gt.value` - Mayor que valor
- `gte.value` - Mayor o igual que valor
- `lt.value` - Menor que valor
- `lte.value` - Menor o igual que valor
- `like.*pattern*` - Contiene patrón
- `ilike.*pattern*` - Contiene patrón (insensible a mayúsculas)
```

## ⚠️ Consideraciones Importantes

### Seguridad
- Nunca expongas tu `service_role` key en el frontend
- Usa solo la `anon` key en el cliente
- Las políticas RLS (Row Level Security) deben estar configuradas en Supabase

### Tipos TypeScript
- Todos los servicios están completamente tipados
- Las interfaces están definidas en `types.ts`
- Se incluye manejo de errores tipado

### Performance
- Los servicios usan `fetch` nativo para máximo rendimiento
- Se incluye manejo automático de headers
- Soporte para requests en paralelo cuando sea apropiado

## 🛠️ Desarrollo y Testing

### Ejemplos Completos
Ver `examples.ts` para ejemplos detallados de uso de cada servicio.

### Debugging
Todos los servicios retornan información detallada de errores:

```typescript
if (result.error) {
  console.log('Status:', result.status);
  console.log('Error:', result.error.error);
  console.log('Message:', result.error.message);
}
```

### Extensibilidad
Para agregar nuevos endpoints:

1. Actualizar `types.ts` con los nuevos tipos
2. Crear o actualizar el servicio correspondiente
3. Exportar en `index.ts`
4. Agregar ejemplos en `examples.ts`

## 📞 Soporte

Para problemas con los servicios:
1. Verifica que las credenciales de Supabase sean correctas
2. Confirma que las políticas RLS estén configuradas
3. Revisa los ejemplos en `examples.ts`
4. Verifica la consola del navegador para errores detallados