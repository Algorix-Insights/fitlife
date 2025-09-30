import { Check, Play, Calendar } from 'lucide-react';

const WorkoutSet = () => {
    const workouts = [
        {
            id: 1,
            title: "Entrenamiento de piernas",
            day: "Ayer",
            time: "08:00 AM",
            status: "completed"
        },
        {
            id: 2,
            title: "Entrenamiento de piernas",
            day: "Hoy",
            time: "08:00 AM",
            status: "ready"
        },
        {
            id: 3,
            title: "Entrenamiento de piernas",
            day: "Mañana",
            time: "08:00 AM",
            status: "scheduled"
        }
    ];

    const getStatusButton = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="w-[130px] flex justify-center bg-purple-200 text-purple-800 px-4 py-2 rounded-lg items-center gap-2 text-sm font-medium">
                        <Check size={16} />
                    </div>
                );
            case 'ready':
                return (
                        <button className="w-[130px] bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                        <Play size={16} />
                        Comenzar
                    </button>
                );
            case 'scheduled':
                return (
                    <div className="w-[130px] bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                        <Calendar size={16} />
                        Programado
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm h-full">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900">Sesiones de entrenamiento</h2>
                    <p className="text-sm text-gray-600">Entrenamientos para esta semana</p>
                </div>
                <div className="bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Semana 2/8
                </div>
            </div>
            
            <div className="space-y-1.5">
                {workouts.map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-12 bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 rounded-full"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{workout.title}</h3>
                                <p className="text-sm text-gray-600">{workout.day} - {workout.time}</p>
                            </div>
                        </div>
                        {getStatusButton(workout.status)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutSet;