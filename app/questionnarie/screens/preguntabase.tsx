// components/encuesta/pantallas/PreguntaBase.tsx
import EncuestaLayout from "../layout";

interface PreguntaBaseProps {
  titulo: string;
  pregunta: string;
  opciones: string[];
  respuestaSeleccionada: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
}

export default function PreguntaBase({
  titulo,
  pregunta,
  opciones,
  respuestaSeleccionada,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver
}: PreguntaBaseProps) {
  return (
    <EncuestaLayout
      pasoActual={pasoActual}
      totalPasos={totalPasos}
    >
      <div className="py-6">
        {/* Botón Volver */}
        <button
          onClick={onVolver}
          className="text-purple-1007 hover:text-gray-700 mb-4 text-sm font-medium transition-colors"
        >
          ← Volver
        </button>
        
        <h1 className="text-3xl font-bold text-purple-1008 mb-4 text-center">
          {titulo}
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          {pregunta}
        </p>
        
        <div className="space-y-3">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => onSeleccionar(opcion)}
              className={`w-full text-left p-4 rounded-lg border-1 transition-all duration-200 ${
                respuestaSeleccionada === opcion
                  ? 'border-purple-1007 bg-blue-50 text-purple-1008'
                  : 'border-gray-200 bg-white text-gray-1009 hover:border-purple-1007 hover:bg-blue-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  respuestaSeleccionada === opcion
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {respuestaSeleccionada === opcion && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{opcion}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Botón Siguiente */}
        <div className="mt-8">
          <button
            onClick={onSiguiente}
            disabled={!respuestaSeleccionada}
            className="w-full bg-purple-1006 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-1008 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Siguiente
          </button>
        </div>
      </div>
    </EncuestaLayout>
  );
}