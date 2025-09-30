// hooks/useEncuesta.ts
'use client';

import { useState } from 'react';

export interface RespuestasEncuesta {
  objetivo: string;
  tiempo: string;
  experiencia: string;
  equipo: string;
  preferencia: string;
  dias: string;
}

export function useEncuesta() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestasEncuesta>({
    objetivo: '',
    tiempo: '',
    experiencia: '',
    equipo: '',
    preferencia: '',
    dias: '',
  });

  const totalPasos = 7; // 1 bienvenida + 6 preguntas

  const siguientePaso = () => {
    if (paso < totalPasos - 1) {
      setPaso(paso + 1);
    } else {
      // Encuesta completada
      console.log('Encuesta completada:', respuestas);
      // Aquí puedes redirigir o mostrar resultados
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
    siguientePaso,
    pasoAtras,
    actualizarRespuesta
  };
}