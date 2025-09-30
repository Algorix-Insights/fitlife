
import React from 'react';
import { Play, Clock, Trophy, Dumbbell } from 'lucide-react';

interface CardWorkoutDetailsProps {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    duration: string;
    category: string;
    difficulty: string;
    weeks: number;
    daysPerWeek: number;
    progress?: number;
}

const CardWorkoutDetails = ({
    title,
    description,
    imageUrl,
    imageAlt,
    duration,
    category,
    difficulty,
    weeks,
    daysPerWeek,
    progress = 0
}: CardWorkoutDetailsProps) => {

    return (
        <div 
            key={title}
            className="w-full bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-sm text-gray-800 ">
            <div className="relative h-48 bg-gradient-to-b from-transparent to-black/20">
                {/* <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                /> */}
                <div className="w-full h-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 flex items-center justify-center mb-4">
                                    <Dumbbell size={48} className="text-white" />
                                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>

                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center gap-1 text-white text-xs font-medium">
                        <Clock size={12} />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>

            {/* main content */}
            <div className="p-6 text-gray-800">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold mb-1">{title}</h3>
                        <p className=" text-sm">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Badges  */}
                <div className="flex gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs font-medium">{category}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Trophy size={12} />
                        <span className="text-xs font-medium">{difficulty}</span>
                    </div>

                </div>

                <div className="flex flex-col gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Trophy size={12} />
                        <span className="text-xs font-medium">{weeks} semanas</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Trophy size={12} />
                        <span className="text-xs font-medium">{daysPerWeek} dias por semana</span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CardWorkoutDetails;