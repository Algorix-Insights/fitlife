import React from 'react';

interface DayWorkoutCardProps {
    day: number;
    title: string;
    duration: string;
    completed?: boolean;
}

const DayWorkoutCard: React.FC<DayWorkoutCardProps> = ({
    day,
    title,
    duration,
    completed = false
}) => {
    return (
        <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
            {/* Status Indicator */}
            <div className="flex-shrink-0 mr-4">
                {completed ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-gray-900 font-medium text-base">
                    Día {day}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                    {title}
                </p>
            </div>

            {/* Duration */}
            <div className="flex-shrink-0 ml-4">
                <span className="text-gray-500 text-sm">
                    {duration}
                </span>
            </div>
        </div>
    );
};

export default DayWorkoutCard;