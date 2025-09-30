// hooks/useEncuesta.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/api/supabaseClient';

export interface RespuestasEncuesta {
  objetivo: string;
  tiempo: string;
  experiencia: string;
  equipo: string;
  preferencia: string;
  dias: string;
}

export function useEncuesta() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [respuestas, setRespuestas] = useState<RespuestasEncuesta>({
    objetivo: '',
    tiempo: '',
    experiencia: '',
    equipo: '',
    preferencia: '',
    dias: '',
  });

  const totalPasos = 7; // 1 bienvenida + 6 preguntas

  // Function to format answers in the requested JSON format
  const formatAnswersForSubmission = (answers: RespuestasEncuesta) => {
    return {
      "1": answers.objetivo,
      "2": answers.tiempo,
      "3": answers.experiencia,
      "4": answers.equipo,
      "5": answers.preferencia,
      "6": answers.dias
    };
  };

  // Function to submit survey to Supabase
  const submitSurvey = async () => {
    setIsSubmitting(true);
    
    try {
      // Try to get current user with both methods
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (userError && sessionError) {
        console.error('Both user and session errors:', { userError, sessionError });
        alert('Error de autenticación. Por favor, inicia sesión nuevamente.');
        router.push('/auth/login');
        return;
      }
      
      // Use user from session if getUser failed but we have a session
      const currentUser = user || session?.user;
      
      if (!currentUser) {
        console.log('No user found in either method');
        alert('Tu sesión ha expirado. Por favor, inicia sesión para continuar y completar el cuestionario.');
        // Store current answers in localStorage before redirecting
        localStorage.setItem('pendingSurveyAnswers', JSON.stringify(respuestas));
        router.push('/auth/login');
        return;
      }
      
      // Format answers in the requested JSON structure
      const formattedAnswers = formatAnswersForSubmission(respuestas);
      
      // Insert survey into the surveys table
      const { data: surveyData, error: surveyError } = await supabase
        .from('surveys')
        .insert({
          user_id: currentUser.id,
          answers: formattedAnswers
        })
        .select()
        .single();

      if (surveyError) {
        console.error('Error guardando encuesta:', surveyError);
        alert(`Error guardando la encuesta: ${surveyError.message}`);
        return;
      }
      
      // Redirect to dashboard after successful submission
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Error inesperado al guardar la encuesta. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const siguientePaso = async () => {
    if (paso < totalPasos - 1) {
      setPaso(paso + 1);
    } else {
      // Encuesta completada - submit to database
      await submitSurvey();
    }
  };

  const pasoAtras = () => {
    if (paso > 0) {
      setPaso(paso - 1);
    }
  };

  const actualizarRespuesta = (campo: keyof RespuestasEncuesta, valor: string) => {
    setRespuestas(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return {
    paso,
    totalPasos,
    respuestas,
    isSubmitting,
    siguientePaso,
    pasoAtras,
    actualizarRespuesta
  };
}