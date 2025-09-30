// Archivo principal de exportación de todos los servicios de la API

// Configuración y utilidades
export * from './config';
export * from './types';

// Importar servicios
import authService from './authService';
import profileService from './profileService';
import planService from './planService';
import userPlanService from './userPlanService';
import exerciseService from './exerciseService';
import planExerciseService from './planExerciseService';
import planSessionService from './planSessionService';
import goalService from './goalService';
import notificationService from './notificationService';
import surveyService from './surveyService';

// Exportar servicios
export {
  authService,
  profileService,
  planService,
  userPlanService,
  exerciseService,
  planExerciseService,
  planSessionService,
  goalService,
  notificationService,
  surveyService
};

// Objeto con todos los servicios para facilidad de uso
export const apiServices = {
  auth: authService,
  profile: profileService,
  plan: planService,
  userPlan: userPlanService,
  exercise: exerciseService,
  planExercise: planExerciseService,
  planSession: planSessionService,
  goal: goalService,
  notification: notificationService,
  survey: surveyService,
};

// Tipo para el objeto de servicios
export type ApiServices = typeof apiServices;