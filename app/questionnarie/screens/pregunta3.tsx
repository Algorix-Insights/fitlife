// components/encuesta/pantallas/Pregunta2.tsx
import PreguntaBase from "./preguntabase";

interface Pregunta3Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function Pregunta3({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: Pregunta3Props) {
  const opciones = [
    "Principiante",
    "Intermedio", 
    "Avanzado"
  ];

  return (
    <PreguntaBase
      titulo="Pregunta 3"
      pregunta="¿Cuál es tu nivel de experiencia de entrenamiento físico?"
      opciones={opciones}
      respuestaSeleccionada={respuesta}
      onSeleccionar={onSeleccionar}
      pasoActual={pasoActual}
      totalPasos={totalPasos}
      onSiguiente={onSiguiente}
      onVolver={onVolver}
    />
  );
}