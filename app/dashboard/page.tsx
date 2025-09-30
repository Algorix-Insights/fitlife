'use client'
import { useState } from 'react';
import { Zap, Flame } from 'lucide-react';
import Clock from '@/components/dashboard/clock';
import Streak from '@/components/dashboard/streak';
import CardInfo from '@/components/dashboard/CardInfo';
import CardWorkout from '@/components/dashboard/CardWorkout';
import WorkoutSet from '@/components/dashboard/WorkoutSet';
import Goals from '@/components/dashboard/Goals';
import CardWorkoutDetails from '@/components/ui/CardWorkoutDetails';

export default function DashboardPage() {
    const [userName, setUserName] = useState('Carlos');
    const [description, setDescription] = useState('Visualiza tus rutinas y tu progreso físico');

    const [plans, setPlans] = useState(['bryan', 'chuc', 'zuri'])

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-[repeat(5,180px)] gap-6 p-6">
                <div className="lg:col-span-4 h-full">
                    <Clock userName={userName} description={description} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <Streak />
                </div>
                <div className="lg:col-span-2 row-span-2 h-full">
                    <CardWorkout />
                </div>
                <div className="lg:col-span-1 h-full">
                    <CardInfo
                        value="10"
                        unit="días"
                        icon={

                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="0%" stopColor="#fb923c" />
                                        <stop offset="50%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M13 2L3 14H12L11 22L21 10H13L13 2Z"
                                    stroke="url(#grad)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }

                    >
                        <p> Racha Actual </p>
                    </CardInfo>
                </div>

                <div className="lg:col-span-1 h-full">
                    <CardInfo
                        value="10"
                        unit="días"
                        icon={
                            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#fb923c" />
                                        <stop offset="50%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                                <path 
                                    d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" 
                                    stroke="url(#flameGradient)" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                    >
                        <p> Racha Actual </p>
                    </CardInfo>
                </div>

                <div className="lg:col-span-2 lg:row-span-2 h-full">
                    <WorkoutSet />
                </div>

                <div className="lg:col-span-2 lg:row-span-2 h-full">
                    <Goals />
                </div>

            </div>

            <div className="flex justify-between items-center px-6">
                <h3 className="text-2xl font-bold mb-1"> Descubre otros planes de entrenamiento </h3>
                <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Ver más planes
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[repeat(2,250px)] gap-6 p-6">
                {
                    plans.map((plan, index) => (
                        <div key={index} className="lg:col-span-1 lg:row-span-2 h-full">
                            <CardWorkoutDetails
                                title="Fuerza Total"
                                description="Plan completo de entrenamiento de fuerza para desarrollar masa muscular y potencia"
                                imageUrl="/api/placeholder/300/200"
                                imageAlt="Persona entrenando"
                                duration="45 min"
                                category="Fuerza"
                                difficulty="Intermedio"
                                weeks={8}
                                daysPerWeek={4}
                                progress={75}
                            />

                        </div>
                    ))
                }
            </div>
        </>
    );
}
