// components/encuesta/pantallas/Pregunta2.tsx
import PreguntaBase from "./preguntabase";

interface Pregunta2Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function Pregunta2({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: Pregunta2Props) {
  const opciones = [
    "10 - 20 min",
    "20 - 40 min", 
    "Más de 40 min"
  ];

  return (
    <PreguntaBase
      titulo="Pregunta 2"
      pregunta="¿Cuánto tiempo puedes dedicarle a tus entrenamientos diarios?"
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