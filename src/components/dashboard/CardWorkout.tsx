
import React from 'react';
import { Play, Dumbbell } from 'lucide-react';
import PlansModal from '@/components/plans/plans-modal'; 

const CardWorkout = () => {
    const progress = 35; 

    return (
        <div className="h-full bg-slate-50 text-slate-800 rounded-lg flex flex-col relative shadow-lg border border-slate-200">
            <div className="absolute top-4 text-white right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                Semana 2/8
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-full h-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 flex items-center justify-center mb-4">
                    <Dumbbell size={48} className="text-white" />
                </div>
            </div>

            <div className="flex-1 flex flex-col space-y-4 p-6 pt-0">
                <div className="w-full flex flex-col ">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-lg lg:text-xl font-bold">Ganar músculo</h2>
                        <div className="bg-[#383BCA] px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-green-100">Principiante</span>
                        </div>
                    </div> 
                    
                    <div className="flex mt-2 w-fit gap-4 bg-orange-100/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-200/60 ">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-slate-700">30 min</span>
                        </div>
                        <div className="w-px h-4 bg-orange-300/50"></div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-slate-700">Espalda y bíceps</span>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-center opacity-75">Progreso de rutina global</p>
                        <p className="text-xs text-center opacity-75">{progress}% completado</p>
                    </div>
                    <div className="w-full bg-gray-400 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <PlansModal/>

                {/* <button className="bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 w-full text-white px-6 py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-center hover:bg-gray-100 transition-colors duration-200">
                    <Play size={16} fill="currentColor" />
                    Comenzar
                </button> */}
            </div>
        </div>
    );
}

export default CardWorkout;