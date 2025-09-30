import Modal from '@/components/ui/Modal';
import { Tabs, Tab } from '@/components/ui/Tabs';
import WorkoutSchedule from '@/components/ui/WorkoutSchedule';
import { useState } from 'react';
import { Play, Clock, Calendar, TrendingUp, CheckCircle2, FileText, CalendarDays } from 'lucide-react';
import DayWorkoutCard from '@/components/plans/DayWorkoutCard'

const PlansModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Datos de ejemplo que vendrían de tu API
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

    return (
        <div>
            {/* <button onClick={() => setIsModalOpen(true)}>
                Abrir Modal
            </button> */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 w-full text-white px-6 py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-center hover:bg-gray-100 transition-colors duration-200">
                <Play size={16} fill="currentColor" />
                Comenzar
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="900px"
                height="auto"
                showCloseButton={true}
                className="max-w-6xl"
            >
                <div className="space-y-6">
                    {/* Hero Section */}
                    <div className="relative">
                        <div
                            className="h-48 bg-cover bg-center rounded-lg"
                            style={{
                                backgroundImage: "url('/peso-muerto.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50 bg-opacity-50 rounded-lg flex items-end">
                                <div className="p-6 text-white">
                                    <h1 className="text-3xl font-bold mb-2">Quema Grasa Total</h1>
                                    <p className="text-white/90">
                                         Quema hasta 450 calorías por sesión
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <Tabs variant="underline" size="md">
                        <Tab 
                            label="Resumen" 
                            icon={<FileText size={16} />}
                        >
                            <div className="space-y-6">
                                {/* Descripción */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">Descripción</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Este plan está diseñado para maximizar la quema de grasa a través de una
                                        combinación estratégica de ejercicios cardiovasculares y de fuerza. Cada
                                        sesión está cuidadosamente estructurada para mantener tu ritmo cardíaco en
                                        la zona óptima de quema de grasa.
                                    </p>
                                </div>

                                {/* Beneficios */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Beneficios</h2>
                                    <div className="space-y-3">
                                        {[
                                            "Quema hasta 450 calorías por sesión",
                                            "Acelera tu metabolismo hasta 24 horas post-entrenamiento",
                                            "Mejora tu resistencia cardiovascular",
                                            "Tonifica músculos mientras quemas grasa"
                                        ].map((beneficio, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-gray-700">{beneficio}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Detalles */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Detalles</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">30-45 min por sesión</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">4 semanas de duración</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">Nivel: Principiante a Intermedio</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>

                        <Tab 
                            label="Cronograma" 
                            icon={<CalendarDays size={16} />}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">Plan de Entrenamiento</h2>
                                    <span className="text-sm text-gray-600">
                                        {workoutData.days.length} días de entrenamiento
                                    </span>
                                </div>
                                
                                <WorkoutSchedule 
                                    days={workoutData.days}
                                    startDate={new Date()}
                                    daysPerWeek={4}
                                />
                            </div>
                        </Tab>

                                                {/* <Tab 
                            label="Cronograma" 
                            icon={<CalendarDays size={16} />}
                        >
                            <p> Prueba </p>
                                <DayWorkoutCard 
  day={1}
  title="Cardio Base"
  duration="30 min"
  completed={true}
/>
                        </Tab> */}
                    </Tabs>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-200 mt-6">
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                // Aquí puedes agregar la lógica para comenzar el plan
                            }}
                            className="w-full bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200"
                        >
                            <Play size={18} fill="currentColor" />
                            Comenzar Plan
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PlansModal;