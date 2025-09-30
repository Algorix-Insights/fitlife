"use client";
import React, { FC, ReactNode } from "react";

interface CardInfoProps {
    children?: ReactNode;
    value: string;
    unit: string;
    icon?: ReactNode;
}

const CardInfo: FC<CardInfoProps> = ({ children, value, unit, icon }) => {
    return (
        <div className="h-full bg-white p-4 lg:p-6 text-gray-800 rounded-lg flex gap-4 items-center justify-center shadow-sm">
            <div className="flex flex-col space-y-1">

                <div className="text-gray-800 flex gap-5 items-center">
                    <span className="text-3xl font-bold text-gray-800">{value}</span>
                    <span className="text-sm text-gray-800">{unit}</span>
                </div>
                {children}
            </div>
            {icon && <div className="text-gray-800">{icon}</div>}
        </div>
    );
};

export default CardInfo;
