// components/encuesta/pantallas/Pregunta2.tsx
import PreguntaBase from "./preguntabase";

interface Pregunta5Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function Pregunta5({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: Pregunta5Props) {
  const opciones = [
    "Cardio",
    "Fuerza"
  ];

  return (
    <PreguntaBase
      titulo="Pregunta 5"
      pregunta="¿Qué tipo de ejercicio prefieres?"
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