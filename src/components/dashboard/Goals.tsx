import React from 'react';
import { Star } from 'lucide-react';

interface GoalProps {
    title: string;
    type: string;
    progress: number;
}

const GoalCard: React.FC<GoalProps> = ({ title, type, progress }) => {
    return (
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-1">
                        {type}
                    </span>
                </div>
            </div>
            {/* progress bar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progreso</span>
                    <span className="text-sm font-medium text-gray-900">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

const Goals: React.FC = () => {
    const goals = [
        {
            title: "Entrenar 4 veces por semana",
            type: "Hábito",
            progress: 50
        },
        {
            title: "Entrenar 4 veces por semana",
            type: "Hábito",
            progress: 50
        }
    ];

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 h-full">
            <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-900 ">Metas personales</h2>
                <p className="text-gray-600 text-sm">Recordar tus metas te ayuda a ser constante</p>
            </div>

            <div className="space-y-4">
                {goals.map((goal, index) => (
                    <GoalCard
                        key={index}
                        title={goal.title}
                        type={goal.type}
                        progress={goal.progress}
                    />
                ))}
            </div>
        </div>
    );
};

export default Goals;