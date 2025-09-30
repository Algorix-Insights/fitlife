// components/encuesta/pantallas/Pregunta1.tsx
import PreguntaBase from "./preguntabase";

interface Pregunta1Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function Pregunta1({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: Pregunta1Props) {
  const opciones = [
    "Perder peso",
    "Ganar músculo", 
    "Sentirse bien",
  ];

  return (
    <PreguntaBase
      titulo="Pregunta 1"
      pregunta="¿Cuál es tu principal objetivo al entrenar?"
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