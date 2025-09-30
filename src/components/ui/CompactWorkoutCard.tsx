import React from 'react';
import { CheckCircle2, Circle, Play } from 'lucide-react';

interface Exercise {
  focus: string;
  exercises: string[];
}

interface CompactWorkoutCardProps {
  day: Exercise;
  dayNumber: number;
  date: Date;
  duration: string;
  isCompleted?: boolean;
  isToday?: boolean;
  onStartWorkout?: () => void;
}

const CompactWorkoutCard: React.FC<CompactWorkoutCardProps> = ({
  day,
  dayNumber,
  date,
  duration,
  isCompleted = false,
  isToday = false,
  onStartWorkout
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cardDate = new Date(date);
  cardDate.setHours(0, 0, 0, 0);
  
  const isPast = cardDate < today;
  const isTodayCard = cardDate.getTime() === today.getTime();

  const getCardStyles = () => {
    if (isCompleted) {
      return 'bg-green-50 border-green-200 shadow-sm';
    } else if (isTodayCard || isToday) {
      return 'bg-purple-50 border-purple-1007 shadow-md ring-2 ring-purple-1007 ring-opacity-20';
    } else if (isPast) {
      return 'bg-gray-50 border-gray-200';
    } else {
      return 'bg-white border-gray-200 shadow-sm hover:shadow-md';
    }
  };

  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    } else {
      return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'short' });
  };

  return (
    <div className={`border rounded-xl p-4 transition-all duration-200 ${getCardStyles()}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Día {dayNumber}
            </p>
            <p className="text-xs text-gray-500">
              {getDayName(date)} {formatDate(date)}
            </p>
          </div>
        </div>
        
        {(isTodayCard || isToday) && (
          <span className="bg-purple-1007 text-white text-xs px-2 py-1 rounded-full font-medium">
            Hoy
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-base mb-1">
            {day.focus}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            📅 {duration}
          </p>
        </div>

        {/* Exercises Preview */}
        <div className="space-y-1">
          {day.exercises.slice(0, 2).map((exercise, index) => (
            <p key={index} className="text-xs text-gray-600">
              • {exercise}
            </p>
          ))}
          {day.exercises.length > 2 && (
            <p className="text-xs text-purple-1007 font-medium">
              +{day.exercises.length - 2} ejercicios más
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-gray-100">
          {isCompleted ? (
            <div className="flex items-center justify-center py-2">
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Completado
              </span>
            </div>
          ) : (isTodayCard || isToday) ? (
            <button
              onClick={onStartWorkout}
              className="w-full bg-gradient-to-r from-purple-1007 to-purple-1006 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Play size={14} fill="currentColor" />
              Entrenar Ahora
            </button>
          ) : isPast ? (
            <div className="flex items-center justify-center py-2">
              <span className="text-sm text-gray-500">Perdido</span>
            </div>
          ) : (
            <div className="flex items-center justify-center py-2">
              <span className="text-sm text-gray-600">Pendiente</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactWorkoutCard;