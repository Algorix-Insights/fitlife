// Ejemplo de uso de los servicios de la API FitLife
// Este archivo muestra cómo usar cada servicio en tu aplicación

import { 
  authService, 
  profileService, 
  planService, 
  userPlanService, 
  exerciseService,
  planExerciseService,
  planSessionService,
  goalService,
  notificationService,
  surveyService,
  apiServices 
} from '@/api';

// =============================================
// EJEMPLOS DE USO DE AUTENTICACIÓN
// =============================================

async function ejemploAuth() {
  // Registrar nuevo usuario
  const signupResult = await authService.signup({
    email: 'usuario@ejemplo.com',
    password: 'contraseñaSegura123'
  });

  if (signupResult.error) {
    console.error('Error en registro:', signupResult.error);
    return;
  }

  console.log('Usuario registrado:', signupResult.data);

  // Iniciar sesión
  const loginResult = await authService.login({
    email: 'usuario@ejemplo.com',
    password: 'contraseñaSegura123'
  });

  if (loginResult.error) {
    console.error('Error en login:', loginResult.error);
    return;
  }

  console.log('Login exitoso:', loginResult.data);
  // El token se guarda automáticamente en localStorage

  // Obtener información del usuario
  const userInfo = await authService.getUserInfo();
  if (userInfo.data) {
    console.log('Info del usuario:', userInfo.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE PERFILES
// =============================================

async function ejemploProfiles() {
  // Crear perfil del usuario
  const newProfile = await profileService.createProfile({
    name: 'Juan Pérez',
    birthdate: '1990-05-15',
    gender: 'male',
    goal: 'lose_weight',
    daily_time: '30-45_minutes',
    experience_level: 'beginner',
    equipment: 'basic',
    exercise_type: 'mixed',
    training_days: ['Monday', 'Wednesday', 'Friday']
  });

  if (newProfile.data) {
    console.log('Perfil creado:', newProfile.data);
  }

  // Obtener perfil
  const profile = await profileService.getProfile();
  if (profile.data && profile.data.length > 0) {
    console.log('Perfil actual:', profile.data[0]);

    // Actualizar perfil
    const updatedProfile = await profileService.updateProfile(profile.data[0].id, {
      goal: 'gain_muscle',
      experience_level: 'intermediate'
    });

    console.log('Perfil actualizado:', updatedProfile.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE PLANES
// =============================================

async function ejemploPlans() {
  // Obtener todos los planes disponibles
  const allPlans = await planService.getAllPlans();
  if (allPlans.data) {
    console.log('Planes disponibles:', allPlans.data);
  }

  // Buscar planes por criterios específicos
  const beginnerPlans = await planService.searchPlans({
    level: 'beginner',
    equipment_level: 'basic',
    duration_weeks: 12
  });

  if (beginnerPlans.data) {
    console.log('Planes para principiantes:', beginnerPlans.data);
  }

  // Crear un nuevo plan (requiere autenticación)
  const newPlan = await planService.createPlan({
    name: 'Plan de Cardio Básico',
    description: 'Plan de 8 semanas enfocado en cardio para principiantes',
    type: 'cardio',
    level: 'beginner',
    duration_weeks: 8,
    sessions_per_week: 3,
    objective: 'Mejorar resistencia cardiovascular',
    equipment_level: 'basic'
  });

  if (newPlan.data) {
    console.log('Plan creado:', newPlan.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE PLANES DE USUARIO
// =============================================

async function ejemploUserPlans() {
  // Asignar plan a usuario
  const assignedPlan = await userPlanService.assignPlanToUser({
    plan_id: 'plan-id-aqui',
    start_date: '2024-01-01',
    end_date: '2024-03-01'
  });

  if (assignedPlan.data) {
    console.log('Plan asignado:', assignedPlan.data);
  }

  // Obtener planes activos del usuario
  const activePlans = await userPlanService.getActiveUserPlans();
  if (activePlans.data) {
    console.log('Planes activos:', activePlans.data);
  }

  // Actualizar estado del plan
  if (assignedPlan.data) {
    const updatedPlan = await userPlanService.updateUserPlan(assignedPlan.data.id, {
      active: false
    });
    console.log('Plan actualizado:', updatedPlan.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE EJERCICIOS
// =============================================

async function ejemploExercises() {
  // Obtener todos los ejercicios
  const allExercises = await exerciseService.getAllExercises();
  if (allExercises.data) {
    console.log('Todos los ejercicios:', allExercises.data);
  }

  // Buscar ejercicios por grupo muscular
  const chestExercises = await exerciseService.getExercisesByMuscleGroup('chest');
  if (chestExercises.data) {
    console.log('Ejercicios de pecho:', chestExercises.data);
  }

  // Buscar ejercicios por criterios múltiples
  const searchResults = await exerciseService.searchExercises({
    name: 'push',
    muscle_group: 'chest',
    equipment: 'bodyweight'
  });

  if (searchResults.data) {
    console.log('Ejercicios encontrados:', searchResults.data);
  }

  // Crear nuevo ejercicio
  const newExercise = await exerciseService.createExercise({
    name: 'Flexiones Diamante',
    description: 'Flexiones con las manos formando un diamante',
    muscle_group: 'chest',
    equipment: 'bodyweight'
  });

  if (newExercise.data) {
    console.log('Ejercicio creado:', newExercise.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE METAS
// =============================================

async function ejemploGoals() {
  // Crear nueva meta
  const newGoal = await goalService.createGoal({
    description: 'Perder 5 kg en 3 meses',
    type: 'weight_loss',
    target_value: 5,
    start_date: '2024-01-01',
    due_date: '2024-04-01'
  });

  if (newGoal.data) {
    console.log('Meta creada:', newGoal.data);
  }

  // Obtener metas activas
  const activeGoals = await goalService.getActiveGoals();
  if (activeGoals.data) {
    console.log('Metas activas:', activeGoals.data);
  }

  // Actualizar progreso de meta
  if (newGoal.data) {
    const updatedGoal = await goalService.updateGoalProgress(newGoal.data.id, {
      current_value: 2,
      percentage: 40,
      notes: 'Buen progreso en las primeras semanas'
    });
    console.log('Meta actualizada:', updatedGoal.data);
  }
}

// =============================================
// EJEMPLOS DE USO DE NOTIFICACIONES
// =============================================

async function ejemploNotifications() {
  // Crear notificación
  const newNotification = await notificationService.createNotification({
    type: 'workout_reminder',
    payload: {
      message: 'Es hora de tu entrenamiento de hoy',
      workout_id: 'workout-123'
    },
    scheduled_at: '2024-01-01T18:00:00Z'
  });

  if (newNotification.data) {
    console.log('Notificación creada:', newNotification.data);
  }

  // Obtener notificaciones no leídas
  const unreadNotifications = await notificationService.getUnreadNotifications();
  if (unreadNotifications.data) {
    console.log('Notificaciones no leídas:', unreadNotifications.data);
  }

  // Marcar todas como leídas
  await notificationService.markAllAsRead();

  // Obtener contador de no leídas
  const unreadCount = await notificationService.getUnreadCount();
  if (unreadCount.data) {
    console.log('Notificaciones no leídas:', unreadCount.data.count);
  }
}

// =============================================
// EJEMPLOS DE USO DE ENCUESTAS
// =============================================

async function ejemploSurveys() {
  // Crear encuesta de onboarding
  const onboardingSurvey = await surveyService.createOnboardingSurvey({
    fitnessGoal: 'lose_weight',
    currentFitnessLevel: 'beginner',
    preferredWorkoutTypes: ['cardio', 'strength'],
    availableEquipment: ['dumbbells', 'resistance_bands'],
    workoutFrequency: '3_times_week',
    timePerWorkout: '30_45_minutes',
    injuriesOrLimitations: 'ninguna',
    motivationFactors: ['health', 'appearance']
  });

  if (onboardingSurvey.data) {
    console.log('Encuesta de onboarding creada:', onboardingSurvey.data);
  }

  // Crear encuesta de progreso
  const progressSurvey = await surveyService.createProgressSurvey({
    currentWeight: 75,
    energyLevel: 'high',
    workoutSatisfaction: 'very_satisfied',
    difficultyLevel: 'appropriate',
    goalProgress: 'on_track',
    challenges: ['time_management'],
    additionalComments: 'Me siento más fuerte cada semana'
  });

  if (progressSurvey.data) {
    console.log('Encuesta de progreso creada:', progressSurvey.data);
  }

  // Obtener encuesta más reciente
  const latestSurvey = await surveyService.getLatestSurvey();
  if (latestSurvey.data && latestSurvey.data.length > 0) {
    console.log('Última encuesta:', latestSurvey.data[0]);
  }
}

// =============================================
// USO CON EL OBJETO APISERVICES
// =============================================

async function ejemploConApiServices() {
  // También puedes usar el objeto apiServices para acceso organizado
  const { auth, profile, plan } = apiServices;

  // Es equivalente a usar authService, profileService, planService
  const userInfo = await auth.getUserInfo();
  const userProfile = await profile.getProfile();
  const availablePlans = await plan.getAllPlans();

  console.log({
    user: userInfo.data,
    profile: userProfile.data,
    plans: availablePlans.data
  });
}

// =============================================
// MANEJO DE ERRORES
// =============================================

async function ejemploManejoErrores() {
  const result = await authService.login({
    email: 'email@incorrecto.com',
    password: 'contraseñaIncorrecta'
  });

  if (result.error) {
    console.error('Error de autenticación:', {
      status: result.status,
      error: result.error.error,
      description: result.error.error_description,
      message: result.error.message
    });

    // Manejo específico por tipo de error
    switch (result.status) {
      case 400:
        console.log('Datos de entrada inválidos');
        break;
      case 401:
        console.log('Credenciales incorrectas');
        break;
      case 500:
        console.log('Error del servidor');
        break;
      default:
        console.log('Error desconocido');
    }
  } else {
    console.log('Login exitoso:', result.data);
  }
}

// Exportar ejemplos para uso en componentes
export {
  ejemploAuth,
  ejemploProfiles,
  ejemploPlans,
  ejemploUserPlans,
  ejemploExercises,
  ejemploGoals,
  ejemploNotifications,
  ejemploSurveys,
  ejemploConApiServices,
  ejemploManejoErrores
};