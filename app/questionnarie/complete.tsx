// components/encuesta/EncuestaCompleta.tsx
'use client';

import { useEncuesta } from './hook/useQuestionnarie';
import Bienvenida from './screens/bienvenida';
import Pregunta1 from './screens/pregunta1';
import Pregunta2 from './screens/pregunta2';
import Pregunta3 from './screens/pregunta3';
import Pregunta4 from './screens/pregunta4';
import Pregunta5 from './screens/pregunta5';
import Pregunta6 from './screens/pregunta6';

export default function EncuestaCompleta() {
  const { 
    paso, 
    totalPasos, 
    respuestas, 
    isSubmitting,
    siguientePaso, 
    pasoAtras,
    actualizarRespuesta 
  } = useEncuesta();

  // Pantalla de bienvenida
  if (paso === 0) {
    return <Bienvenida onComenzar={siguientePaso} />;
  }

  // Pantallas de preguntas
  switch (paso) {
    case 1:
      return (
        <Pregunta1
          respuesta={respuestas.objetivo}
          onSeleccionar={(resp) => actualizarRespuesta('objetivo', resp)}
          pasoActual={1}
          totalPasos={6} // Solo contamos las preguntas en el stepper
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
        />
      );
    case 2:
      return (
        <Pregunta2
          respuesta={respuestas.tiempo}
          onSeleccionar={(resp) => actualizarRespuesta('tiempo', resp)}
          pasoActual={2}
          totalPasos={6}
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
        />
      );
      case 3:
      return (
        <Pregunta3
          respuesta={respuestas.experiencia}
          onSeleccionar={(resp) => actualizarRespuesta('experiencia', resp)}
          pasoActual={3}
          totalPasos={6}
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
        />
      );
      case 4:
      return (
        <Pregunta4
          respuesta={respuestas.equipo}
          onSeleccionar={(resp) => actualizarRespuesta('equipo', resp)}
          pasoActual={4}
          totalPasos={6}
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
        />
      );
      case 5:
      return (
        <Pregunta5
          respuesta={respuestas.preferencia}
          onSeleccionar={(resp) => actualizarRespuesta('preferencia', resp)}
          pasoActual={5}
          totalPasos={6}
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
        />
      );
      case 6:
      return (
        <Pregunta6
          respuesta={respuestas.dias}
          onSeleccionar={(resp) => actualizarRespuesta('dias', resp)}
          pasoActual={6}
          totalPasos={6}
          onSiguiente={siguientePaso}
          onVolver={pasoAtras}
          isSubmitting={isSubmitting}
        />
      );
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Guardando tu encuesta...</h2>
                <p className="text-gray-600 mt-2">Por favor espera mientras procesamos tus respuestas</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-green-600">¡Encuesta Completada!</h2>
                <p className="text-gray-600 mt-2">Redirigiendo al dashboard...</p>
              </>
            )}
          </div>
        </div>
      );
  }
}