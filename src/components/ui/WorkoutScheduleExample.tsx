import React from 'react';
import WorkoutSchedule from '@/components/ui/WorkoutSchedule';
import CompactWorkoutCard from '@/components/ui/CompactWorkoutCard';

const WorkoutScheduleExample = () => {
  // Datos de ejemplo simulando la respuesta de tu API
  const workoutData = {
    days: [
      {
        focus: "Cardio Boost",
        exercises: [
          "Jumping Jacks - 3x30 sec",
          "Mountain Climbers - 3x20",
          "Sun Salutation Flow - 3 rounds",
          "Child's Pose - 1 min"
        ]
      },
      {
        focus: "Yoga for Flexibility",
        exercises: [
          "Cat-Cow Stretch - 3x10",
          "Downward Dog - 3x30 sec",
          "Warrior II - 3x30 sec each side",
          "Seated Forward Fold - 1 min"
        ]
      },
      {
        focus: "Core & Balance",
        exercises: [
          "Plank - 3x30 sec",
          "Boat Pose - 3x20 sec",
          "Tree Pose - 2x30 sec each side",
          "Bridge Pose - 3x10"
        ]
      },
      {
        focus: "Cardio + Flow",
        exercises: [
          "High Knees - 3x30 sec",
          "Burpees (low impact) - 3x10",
          "Sun Salutation Flow - 3 rounds",
          "Savasana - 2 min"
        ]
      },
      {
        focus: "Strength Training",
        exercises: [
          "Push-ups - 3x10",
          "Squats - 3x15",
          "Lunges - 3x10 each leg",
          "Plank Hold - 3x45 sec"
        ]
      },
      {
        focus: "Active Recovery",
        exercises: [
          "Gentle Yoga Flow - 15 min",
          "Breathing Exercises - 5 min",
          "Light Stretching - 10 min"
        ]
      },
      {
        focus: "HIIT Cardio",
        exercises: [
          "Burpees - 4x30 sec",
          "Jump Squats - 4x20",
          "High Knees - 4x30 sec",
          "Rest - 30 sec between sets"
        ]
      },
      {
        focus: "Full Body Flow",
        exercises: [
          "Sun Salutation A - 5 rounds",
          "Warrior Flow - 3 rounds each side",
          "Core Activation - 5 min",
          "Final Relaxation - 5 min"
        ]
      }
    ]
  };

  const handleStartWorkout = (dayNumber: number) => {
    console.log(`Iniciando entrenamiento del día ${dayNumber}`);
    // Aquí puedes agregar la lógica para iniciar el entrenamiento
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Plan de Entrenamiento</h1>
          <p className="text-gray-600">Sigue tu progreso y mantén la constancia</p>
        </div>

        {/* Cronograma Completo */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Cronograma Completo</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                <span>Completado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-100 border border-purple-1007 rounded"></div>
                <span>Hoy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-gray-200 rounded"></div>
                <span>Pendiente</span>
              </div>
            </div>
          </div>
          
          <WorkoutSchedule 
            days={workoutData.days}
            startDate={new Date()}
            daysPerWeek={4}
          />
        </div>

        {/* Vista de Cards Compactas */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Esta Semana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workoutData.days.slice(0, 4).map((day, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index - 1); // Simulando fechas
              
              return (
                <CompactWorkoutCard
                  key={index}
                  day={day}
                  dayNumber={index + 1}
                  date={date}
                  duration="30 min"
                  isCompleted={index === 0} // Primer día completado
                  isToday={index === 1} // Segundo día es hoy
                  onStartWorkout={() => handleStartWorkout(index + 1)}
                />
              );
            })}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Días Completados</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Racha Actual</p>
                <p className="text-2xl font-bold text-purple-1007">7 días</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-1007 text-xl">🔥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo Total</p>
                <p className="text-2xl font-bold text-blue-600">4.5h</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutScheduleExample;