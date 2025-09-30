"use client"
import React, { FC, useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface StreakProps {
    diasObjetivo?: string[];
    diasCompletados?: string[];
}

const Streak: FC<StreakProps> = ({ 
    diasObjetivo = ["lunes", "martes", "miércoles", "jueves", "viernes"], 
    diasCompletados = ["lunes", "miércoles", "viernes"] 
}) => {
    const [currentStreak, setCurrentStreak] = useState(0);
    
    const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sabado", "domingo"];
    
    const hoy = new Date();
    const diaActualIndex = (hoy.getDay() + 6) % 7; 
    


    return (
        <div className="h-full bg-white p-4 lg:p-6 text-gray-800 rounded-lg flex flex-col shadow-sm">
            <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center">Racha Semanal</h3>
            
            {/* Contenedor de días */}
            <div className="grid grid-cols-7 gap-1 lg:gap-2 flex-1 items-center">
                {diasSemana.map((dia, index) => {
                    const esHoy = index === diaActualIndex;
                    
                    const obtenerColorLlama = () => {
                        const esDiaObjetivo = diasObjetivo.includes(dia);
                        const esDiaCompletado = diasCompletados.includes(dia);
                        const yaHaPasado = index <= diaActualIndex;
                        
                        if (!esDiaObjetivo) {
                            return "text-gray-400"; // Gris - no es día objetivo
                        }
                        
                        if (!yaHaPasado) {
                            return "text-orange-400"; // Naranja - día objetivo futuro
                        }
                        
                        if (esDiaCompletado) {
                            return "text-green-500"; // Verde - día objetivo completado
                        }
                        
                        return "text-red-500"; // Rojo - día objetivo no completado
                    };
                    
                    return (
                        <div key={dia} className="flex flex-col items-center">
                            <div className={`
                                w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center
                                ${esHoy ? 'ring-2 ring-yellow-400 rounded-full' : ''}
                                transition-all duration-200 hover:scale-110
                            `}>
                                <Flame 
                                    size={24} 
                                    className={`lg:w-7 lg:h-7 ${obtenerColorLlama()} transition-colors duration-200`}
                                    fill="currentColor"
                                />
                            </div>
                            <span className="text-xs mt-1 capitalize">
                                {dia.slice(0, 3)}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            {/* Leyenda */}
            {/* <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                    <Flame size={12} className="text-green-500" fill="currentColor" />
                    <span>Completado</span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame size={12} className="text-red-500" fill="currentColor" />
                    <span>Perdido</span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame size={12} className="text-orange-400" fill="currentColor" />
                    <span>Próximo</span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame size={12} className="text-gray-400" fill="currentColor" />
                    <span>No objetivo</span>
                </div>
            </div> */}
            
            {/* Estadísticas
            <div className="mt-4 pt-4 border-t border-purple-600">
                <div className="flex justify-between text-sm">
                    <span>Días objetivo: {diasObjetivo.length}</span>
                    <span>Completados: {diasCompletados.length}</span>
                </div>
                <div className="mt-2">
                    <div className="bg-purple-600 rounded-full h-2">
                        <div 
                            className="bg-green-400 h-2 rounded-full transition-all duration-300"
                            style={{ 
                                width: `${diasObjetivo.length > 0 ? (diasCompletados.length / diasObjetivo.length) * 100 : 0}%` 
                            }}
                        ></div>
                    </div>
                    <p className="text-xs text-center mt-1">
                        {diasObjetivo.length > 0 ? Math.round((diasCompletados.length / diasObjetivo.length) * 100) : 0}% completado
                    </p>
                </div>
            </div> */}
        </div>
    );
};

export default Streak;
