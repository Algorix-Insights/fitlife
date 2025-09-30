// components/encuesta/pantallas/Pregunta2.tsx
import PreguntaBase from "./preguntabase";

interface Pregunta4Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function Pregunta4({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: Pregunta4Props) {
  const opciones = [
    "Entreno en un gimnasio",
    "Solo tengo mancuernas u otro equipo básico", 
    "No tengo equipo, entreno en casa con mi cuerpo"
  ];

  return (
    <PreguntaBase
      titulo="Pregunta 4"
      pregunta="¿Con qué equipo cuentas para entrenar?"
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