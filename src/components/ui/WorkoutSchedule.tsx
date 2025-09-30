import React from 'react';
import { CheckCircle2, Circle, Calendar, Clock } from 'lucide-react';

interface Exercise {
    focus: string;
    exercises: string[];
}

interface WorkoutDay {
    dayNumber: number;
    date: Date;
    focus: string;
    exercises: string[];
    duration: string;
    isCompleted: boolean;
    isPast: boolean;
    isToday: boolean;
}

interface WorkoutWeek {
    weekNumber: number;
    startDate: Date;
    endDate: Date;
    days: WorkoutDay[];
}

interface WorkoutScheduleProps {
    days: Exercise[];
    startDate?: Date;
    daysPerWeek?: number;
}

const WorkoutSchedule: React.FC<WorkoutScheduleProps> = ({
    days,
    startDate = new Date(),
    daysPerWeek = 4
}) => {
    // Función para obtener las fechas de entrenamiento (lunes, miércoles, viernes, sábado por ejemplo)
    const getWorkoutDates = (start: Date, totalDays: number, daysPerWeek: number) => {
        const dates: Date[] = [];
        const workoutDays = [1, 3, 5, 6]; // Lunes, Miércoles, Viernes, Sábado
        let currentDate = new Date(start);
        let dayCount = 0;

        // Ajustar al próximo lunes si no es lunes
        const dayOfWeek = currentDate.getDay();
        const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
        if (daysUntilMonday > 0) {
            currentDate.setDate(currentDate.getDate() + daysUntilMonday);
        }

        while (dayCount < totalDays) {
            const weekStart = new Date(currentDate);

            for (let i = 0; i < workoutDays.length && dayCount < totalDays; i++) {
                const workoutDate = new Date(weekStart);
                workoutDate.setDate(weekStart.getDate() + workoutDays[i] - 1);
                dates.push(new Date(workoutDate));
                dayCount++;
            }

            // Mover a la siguiente semana
            currentDate.setDate(currentDate.getDate() + 7);
        }

        return dates;
    };

    // Función para determinar la duración basada en el tipo de entrenamiento
    const getDuration = (focus: string) => {
        if (focus.toLowerCase().includes('cardio')) return '30 min';
        if (focus.toLowerCase().includes('yoga')) return '25 min';
        if (focus.toLowerCase().includes('core')) return '20 min';
        return '30 min';
    };

    // Generar las fechas de entrenamiento
    const workoutDates = getWorkoutDates(startDate, days.length, daysPerWeek);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Crear los días de entrenamiento con sus estados
    const workoutDays: WorkoutDay[] = days.map((day, index) => {
        const date = workoutDates[index];
        const dayDate = new Date(date);
        dayDate.setHours(0, 0, 0, 0);

        return {
            dayNumber: index + 1,
            date: dayDate,
            focus: day.focus,
            exercises: day.exercises,
            duration: getDuration(day.focus),
            isCompleted: dayDate < today, // Los días pasados se marcan como completados
            isPast: dayDate < today,
            isToday: dayDate.getTime() === today.getTime()
        };
    });

    // Agrupar por semanas
    const groupByWeeks = (days: WorkoutDay[]): WorkoutWeek[] => {
        const weeks: WorkoutWeek[] = [];
        let currentWeek: WorkoutDay[] = [];
        let weekNumber = 1;

        days.forEach((day, index) => {
            if (currentWeek.length === 0) {
                currentWeek = [day];
            } else {
                const lastDay = currentWeek[currentWeek.length - 1];
                const daysDiff = Math.floor((day.date.getTime() - lastDay.date.getTime()) / (1000 * 60 * 60 * 24));

                if (daysDiff > 7 || currentWeek.length >= daysPerWeek) {
                    // Nueva semana
                    const startDate = currentWeek[0].date;
                    const endDate = currentWeek[currentWeek.length - 1].date;
                    weeks.push({
                        weekNumber,
                        startDate,
                        endDate,
                        days: [...currentWeek]
                    });
                    currentWeek = [day];
                    weekNumber++;
                } else {
                    currentWeek.push(day);
                }
            }
        });

        // Agregar la última semana
        if (currentWeek.length > 0) {
            const startDate = currentWeek[0].date;
            const endDate = currentWeek[currentWeek.length - 1].date;
            weeks.push({
                weekNumber,
                startDate,
                endDate,
                days: currentWeek
            });
        }

        return weeks;
    };

    const weeks = groupByWeeks(workoutDays);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        });
    };

    const getDayName = (date: Date) => {
        return date.toLocaleDateString('es-ES', { weekday: 'short' });
    };

    const getCardStyles = (day: WorkoutDay) => {
        if (day.isCompleted) {
            return 'bg-green-50 border-green-200 hover:bg-green-100';
        } else if (day.isToday) {
            return 'bg-purple-50 border-purple-1007 hover:bg-purple-100 ring-2 ring-purple-1007 ring-opacity-20';
        } else if (day.isPast) {
            return 'bg-gray-50 border-gray-200';
        } else {
            return 'bg-white border-gray-200 hover:bg-gray-50';
        }
    };

    const getStatusIcon = (day: WorkoutDay) => {
        if (day.isCompleted) {
            return <CheckCircle2 className="w-5 h-5 text-green-600" />;
        } else {
            return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-8">
            {weeks.map((week) => (
                <div key={week.weekNumber} className="space-y-4">
                    {/* Header de la semana */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-1007 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {week.weekNumber}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Semana {week.weekNumber}
                                </h3>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(week.startDate)} - {formatDate(week.endDate)}
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {week.days.filter(d => d.isCompleted).length} de {week.days.length} completados
                        </div>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {week.days.map((day) => (
                            <div
                                key={day.dayNumber}
                                className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${getCardStyles(day)}`}
                            >
                                {/* Header del día */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(day)}
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Día {day.dayNumber}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {getDayName(day.date)} {formatDate(day.date)}
                                            </p>
                                        </div>
                                    </div>
                                    {day.isToday && (
                                        <span className="bg-purple-1007 text-white text-xs px-2 py-1 rounded-full">
                                            Hoy
                                        </span>
                                    )}
                                </div>

                                {/* Contenido del entrenamiento */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-800 text-sm">
                                            {day.focus}
                                        </h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            {day.duration}
                                        </div>
                                    </div>

                                    {/* Lista de ejercicios */}
                                    <div className="space-y-1">
                                        {day.exercises.slice(0, 3).map((exercise, index) => (
                                            <p key={index} className="text-xs text-gray-600 truncate">
                                                • {exercise}
                                            </p>
                                        ))}
                                        {day.exercises.length > 3 && (
                                            <p className="text-xs text-gray-500 italic">
                                                +{day.exercises.length - 3} ejercicios más
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Estado del día */}
                                <div className="mt-3 pt-2 border-t border-gray-100">
                                    {day.isCompleted ? (
                                        <span className="text-xs text-green-600 font-medium">✓ Completado</span>
                                    ) : day.isToday ? (
                                        <span className="text-xs text-purple-1007 font-medium">📅 Entrenar hoy</span>
                                    ) : day.isPast ? (
                                        <span className="text-xs text-gray-500">Perdido</span>
                                    ) : (
                                        <span className="text-xs text-gray-500">Pendiente</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkoutSchedule;