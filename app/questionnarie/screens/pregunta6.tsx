// components/encuesta/pantallas/Pregunta6.tsx
import { useRouter } from 'next/navigation';
import EncuestaLayout from "../layout";

interface Pregunta6Props {
  respuesta: string;
  onSeleccionar: (respuesta: string) => void;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onVolver: () => void;
  isSubmitting?: boolean;
}

export default function Pregunta6({
  respuesta,
  onSeleccionar,
  pasoActual,
  totalPasos,
  onSiguiente,
  onVolver,
  isSubmitting = false
}: Pregunta6Props) {
  const router = useRouter();
  
  const opciones = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ];

  // Convertir respuesta a array para múltiple selección
  const respuestasSeleccionadas = respuesta ? respuesta.split(',') : [];

  const handleSeleccion = (dia: string) => {
    let nuevasRespuestas;
    
    if (respuestasSeleccionadas.includes(dia)) {
      // Si ya está seleccionado, lo quitamos
      nuevasRespuestas = respuestasSeleccionadas.filter(d => d !== dia);
    } else {
      // Si no está seleccionado, lo agregamos
      nuevasRespuestas = [...respuestasSeleccionadas, dia];
    }
    
    // Convertir array a string separado por comas
    onSeleccionar(nuevasRespuestas.join(','));
  };

  const handleFinalizar = () => {
    // Let the hook handle the submission and navigation
    onSiguiente();
  };

  return (
    <EncuestaLayout
      pasoActual={pasoActual}
      totalPasos={totalPasos}
    >
      <div className="py-6">
        {/* Botón Volver */}
        <button
          onClick={onVolver}
          className="text-gray-500 hover:text-gray-700 mb-4 text-sm font-medium transition-colors cursor-pointer"
        >
          ← Volver
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Pregunta 6
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Selecciona todos los días que te gustaría entrenar
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {opciones.map((opcion, index) => {
            const estaSeleccionado = respuestasSeleccionadas.includes(opcion);
            
            return (
              <button
                key={index}
                onClick={() => handleSeleccion(opcion)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  estaSeleccionado
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 ${
                    estaSeleccionado
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {estaSeleccionado && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{opcion}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Botón Finalizar - Redirige al dashboard */}
        <div className="mt-8">
          <button
            onClick={handleFinalizar}
            disabled={respuestasSeleccionadas.length === 0 || isSubmitting}
            className="w-full bg-purple-1006 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-1008 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Guardando respuestas...
              </div>
            ) : (
              respuestasSeleccionadas.length > 0 
                ? `Finalizar (${respuestasSeleccionadas.length})`
                : 'Finalizar'
            )}
          </button>
        </div>
      </div>
    </EncuestaLayout>
  );
}