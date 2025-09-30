// components/encuesta/pantallas/Bienvenida.tsx
import EncuestaLayout from "../layout";

interface BienvenidaProps {
  onComenzar: () => void;
}

export default function Bienvenida({ onComenzar }: BienvenidaProps) {
  return (
    <EncuestaLayout
      pasoActual={0}
      totalPasos={7}
    >
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-purple-1008 mb-6">
          Bienvenido FitLover
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Para asignarte un plan personalizado, responde las siguientes preguntas:
        </p>
        
        {/* Iconos de los pasos */}
        <div className="flex justify-center space-x-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-400 font-bold text-sm">{num}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón Comenzar */}
        <div className="mt-8">
          <button
            onClick={onComenzar}
            className="w-full bg-purple-1006 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-1008 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Comenzar
          </button>
        </div>
      </div>
    </EncuestaLayout>
  );
}