'use client';

import React, { useState } from 'react';
import PopUp from '../ui/PopUp';

interface NotificationSettings {
  training: boolean;
  goals: boolean;
  streak: boolean;
  email: boolean;
  push: boolean;
}

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    training: true,
    goals: true,
    streak: true,
    email: false,
    push: true
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingsTrigger = () => (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" title="Configurar notificaciones">
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  );

  const SettingsContent = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Tipos de notificaciones</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Recordatorios de entrenamiento</span>
            </div>
            <button
              onClick={() => handleToggle('training')}
              className={`
                relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.training ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                  ${settings.training ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Progreso de metas</span>
            </div>
            <button
              onClick={() => handleToggle('goals')}
              className={`
                relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.goals ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                  ${settings.goals ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Alertas de racha</span>
            </div>
            <button
              onClick={() => handleToggle('streak')}
              className={`
                relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.streak ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                  ${settings.streak ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Métodos de entrega</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">Notificaciones por email</span>
            </div>
            <button
              onClick={() => handleToggle('email')}
              className={`
                relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.email ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                  ${settings.email ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a7 7 0 111.5-4.5V15H15m0 2a2 2 0 11-4 0m0 0V9a2 2 0 012-2h0a2 2 0 012 2v8z" />
              </svg>
              <span className="text-sm text-gray-700">Notificaciones push</span>
            </div>
            <button
              onClick={() => handleToggle('push')}
              className={`
                relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.push ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                  ${settings.push ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-md transition-colors duration-200">
          Guardar configuración
        </button>
      </div>
    </div>
  );

  return (
    <PopUp
      trigger={<SettingsTrigger />}
      title="Configuración de notificaciones"
      width={320}
      height="auto"
      className="shadow-xl"
    >
      <SettingsContent />
    </PopUp>
  );
};

export default NotificationSettings;