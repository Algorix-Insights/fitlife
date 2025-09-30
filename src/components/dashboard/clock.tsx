"use client"
import React, { FC, useEffect, useState } from 'react';

interface IClockProps {
    userName: string;
    description: string;
}

const Clock: FC<IClockProps> = ({ userName, description }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            const date = now.toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            setCurrentTime(time);
            setCurrentDate(date);
        };

        updateClock(); 
        const intervalId = setInterval(updateClock, 1000); 

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="h-full bg-gradient-to-r from-[#383BCA] via-purple-500 to-indigo-600 grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 lg:p-6 text-white rounded-lg items-center">
            <div className="lg:col-span-2 flex flex-col justify-center">
                <h2 className="text-xl lg:text-2xl font-bold mb-2">Bienvenido {userName}</h2>
                <p className="text-sm lg:text-base">{description}</p>
            </div>
            <div className="bg-black/40 text-white p-3 lg:p-4 rounded text-center flex flex-col justify-center min-h-[80px] lg:min-h-[100px]">
                <span className="block text-lg lg:text-xl font-bold">{currentTime}</span>
                <span className="block text-xs lg:text-sm mt-1">{currentDate}</span>
            </div>
        </div>
    );
};

export default Clock;
