import { ReactNode } from 'react';
import PopUp from '@/components/ui/PopUp';
import { Bell } from "lucide-react";
import Notifications from '@/components/dashboard/Notifications';
import NotificationSettings from '@/components/dashboard/NotificationSettings';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
                                FITLIFE
                            </h1>
                        </div>

                        {/* Profile Button */}

                        <div className="flex gap-3 items-center justify-center" >
                            <div className="flex items-center gap-1">
                                <Notifications />
                                {/* <NotificationSettings /> */}
                            </div>


                            <div className="space-y-2">
                                <PopUp
                                    trigger={
                                        <div className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 cursor-pointer transition-colors">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                Z
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Zurita</span>
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    }
                                    width="250px"
                                    title="Perfil"
                                >
                                    <div className="space-y-1">

                                        <div className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer transition-colors">
                                            {/* Foto de perfil */}
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                Z
                                            </div>

                                            {/* Información */}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-800">Zurita boki</span>
                                                <span className="text-xs text-gray-500">zurisaraiboki@example.com</span>
                                            </div>
                                        </div>


                                        <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm">Configuración</span>
                                        </div>

                                        {/* <hr className="my-1" /> */}
                                        <div className="px-3 py-2 hover:bg-red-50 rounded cursor-pointer flex items-center space-x-2 text-red-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span className="text-sm">Cerrar Sesión</span>
                                        </div>
                                    </div>
                                </PopUp>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className=" max-w-7xl mx-auto px-2 py-2">
                {children}
            </main>
        </div>
    );
}