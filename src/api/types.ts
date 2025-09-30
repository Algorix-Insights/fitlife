// Tipos para todas las entidades del sistema

// Tipo para la respuesta de error de Supabase
export interface SupabaseError {
  error: string;
  error_description?: string;
  message?: string;
}

// Tipo para respuesta exitosa
export interface ApiResponse<T = any> {
  data?: T;
  error?: SupabaseError;
  status: number;
}

export interface User {
  id: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
}

export interface Profile {
  id: string;
  name?: string;
  birthdate?: string;
  gender?: string;
  created_at?: string;
  goal?: string;
  daily_time?: string;
  experience_level?: string;
  equipment?: string;
  exercise_type?: string;
  training_days?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscle_group?: string;
  equipment?: string;
  created_at?: string;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  type?: string;
  level?: string;
  duration_weeks?: number;
  sessions_per_week?: number;
  objective?: string;
  equipment_level?: 'none' | 'basic' | 'gym';
  created_at?: string;
}

export interface PlanDay {
  id: string;
  plan_id: string;
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  focus?: string;
}

export interface PlanExercise {
  id: string;
  exercise_id?: string;
  plan_day_id?: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  rest_seconds?: number;
  position?: number;
  notes?: string;
}

export interface UserPlan {
  id: string;
  user_id?: string;
  plan_id?: string;
  assigned_at?: string;
  active?: boolean;
  start_date?: string;
  end_date?: string;
}

export interface PlanSession {
  id: string;
  user_plan_id?: string;
  session_date?: string;
  status?: 'pending' | 'completed' | 'skipped';
  notes?: string;
}

export interface Goal {
  id: string;
  user_id?: string;
  description: string;
  type?: string;
  target_value?: number;
  start_date?: string;
  due_date?: string;
  progress?: any;
  created_at?: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  type?: string;
  payload?: any;
  scheduled_at?: string;
  sent_at?: string;
  read?: boolean;
}

export interface Survey {
  id: string;
  user_id?: string;
  answers: any;
  completed_at?: string;
}

// Tipos para requests
export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateProfileRequest {
  name?: string;
  birthdate?: string;
  gender?: string;
  goal?: string;
  daily_time?: string;
  experience_level?: string;
  equipment?: string;
  exercise_type?: string;
  training_days?: string[];
}

export interface UpdateProfileRequest extends Partial<CreateProfileRequest> {}

export interface CreatePlanRequest {
  name: string;
  description?: string;
  type?: string;
  level?: string;
  duration_weeks?: number;
  sessions_per_week?: number;
  objective?: string;
  equipment_level?: 'none' | 'basic' | 'gym';
}

export interface UpdatePlanRequest extends Partial<CreatePlanRequest> {}

export interface CreateExerciseRequest {
  name: string;
  description?: string;
  muscle_group?: string;
  equipment?: string;
}

export interface UpdateExerciseRequest extends Partial<CreateExerciseRequest> {}

export interface CreateUserPlanRequest {
  user_id?: string;
  plan_id: string;
  start_date?: string;
  end_date?: string;
}

export interface UpdateUserPlanRequest extends Partial<CreateUserPlanRequest> {
  active?: boolean;
}

export interface CreatePlanExerciseRequest {
  exercise_id: string;
  plan_day_id: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  rest_seconds?: number;
  position?: number;
  notes?: string;
}

export interface UpdatePlanExerciseRequest extends Partial<CreatePlanExerciseRequest> {}

export interface CreatePlanSessionRequest {
  user_plan_id: string;
  session_date?: string;
  notes?: string;
}

export interface UpdatePlanSessionRequest extends Partial<CreatePlanSessionRequest> {
  status?: 'pending' | 'completed' | 'skipped';
}

export interface CreateGoalRequest {
  description: string;
  type?: string;
  target_value?: number;
  start_date?: string;
  due_date?: string;
}

export interface UpdateGoalRequest extends Partial<CreateGoalRequest> {
  progress?: any;
}

export interface CreateNotificationRequest {
  type?: string;
  payload?: any;
  scheduled_at?: string;
}

export interface UpdateNotificationRequest extends Partial<CreateNotificationRequest> {
  read?: boolean;
}

export interface CreateSurveyRequest {
  answers: any;
}

export interface UpdateSurveyRequest extends Partial<CreateSurveyRequest> {}