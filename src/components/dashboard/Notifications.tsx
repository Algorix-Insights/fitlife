'use client';

import React from 'react';
import PopUp from '../ui/PopUp';
import useNotifications from '@/hooks/useNotifications';

const Notifications: React.FC = () => {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        simulateNotifications
    } = useNotifications();

    // Icono según el tipo de notificación
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'training':
                return (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                );
            case 'goal':
                return (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case 'streak':
                return (
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    // Trigger del popup - icono de campana con badge
    const NotificationTrigger = () => (
        <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a7 7 0 111.5-4.5V15H15m0 2a2 2 0 11-4 0m0 0V9a2 2 0 012-2h0a2 2 0 012 2v8z" />
                </svg>
            </button>
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </div>
    );

    // Contenido del popup
    const NotificationContent = () => (
        <div className="max-h-96 overflow-y-auto overflow-x-hidden">
            {notifications.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a7 7 0 111.5-4.5V15H15m0 2a2 2 0 11-4 0m0 0V9a2 2 0 012-2h0a2 2 0 012 2v8z" />
                    </svg>
                    <p className="text-gray-500 text-sm">No tienes notificaciones</p>
                    <button
                        onClick={simulateNotifications}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                        Generar notificación de prueba
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification, index) => (
                        <div
                            key={notification.id}
                            className={`
                                p-3 rounded-lg border transition-all duration-300 hover:bg-gray-50 cursor-pointer transform hover:scale-[1.02]
                                ${notification.read
                                    ? 'bg-white border-gray-200'
                                    : 'bg-blue-50 border-blue-200 shadow-sm'
                                }
                                ${index === 0 && !notification.read ? 'animate-pulse' : ''}
                            `}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                        >
                            <div className="flex items-start space-x-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-800' : 'text-gray-900'}`}>
                                            {notification.title}
                                        </p>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                        )}
                                    </div>
                                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {notifications.length > 0 && (
                <div className="border-t border-gray-200 mt-4 pt-3 space-y-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                            Marcar todas como leídas
                        </button>
                    )}

                    {/* Botón para simular notificaciones (demo) */}
                    {/* <button
                        onClick={simulateNotifications}
                        className="w-full text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200 border border-gray-300 rounded-md py-2"
                    >
                        + Simular notificación
                    </button> */}
                </div>
            )}
        </div>
    );

    return (
        <PopUp
            trigger={<NotificationTrigger />}
            title="Notificaciones"
            width={350}
            height="auto"
            className="shadow-xl"
            closeOnOverlayClick={true}
            showCloseButton={true}
        >
            <NotificationContent />
        </PopUp>
    );
};

export default Notifications;