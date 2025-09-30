import React from 'react';
import { Tabs, Tab } from '@/components/ui/Tabs';
import { User, Settings, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';

// Ejemplo de uso del componente Tabs con diferentes variantes
const TabsExample = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Ejemplos de Navegación con Tabs</h1>
      
      {/* Ejemplo 1: Tabs básicas con variante underline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tabs con línea inferior (underline)</h2>
        <Tabs variant="underline" size="md">
          <Tab label="Perfil" icon={<User size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Información del Perfil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1007"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1007"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab label="Configuración" icon={<Settings size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Configuración General</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Modo oscuro</span>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Notificaciones por email</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab label="Notificaciones" icon={<Bell size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Centro de Notificaciones</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-blue-700">Tu entrenamiento de hoy está listo</p>
                  <p className="text-xs text-blue-600 mt-1">Hace 2 horas</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-green-700">¡Completaste tu meta semanal!</p>
                  <p className="text-xs text-green-600 mt-1">Ayer</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Ejemplo 2: Tabs con variante pills */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tabs con estilo píldora (pills)</h2>
        <Tabs variant="pills" size="md">
          <Tab label="Seguridad" icon={<Shield size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Configuración de Seguridad</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1007"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1007"
                  />
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab label="Facturación" icon={<CreditCard size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Información de Pago</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Plan Premium</p>
                    <p className="text-sm text-gray-600">$19.99/mes</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Activo</span>
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab label="Ayuda" icon={<HelpCircle size={16} />}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Centro de Ayuda</h3>
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium text-gray-800">¿Cómo cambio mi plan?</p>
                  <p className="text-sm text-gray-600">Aprende a actualizar o cambiar tu suscripción</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium text-gray-800">Problemas de pago</p>
                  <p className="text-sm text-gray-600">Soluciona problemas con tu método de pago</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Ejemplo 3: Tabs con diferentes tamaños */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tabs con tamaño pequeño</h2>
        <Tabs variant="underline" size="sm">
          <Tab label="General">
            <div className="py-4">
              <p className="text-gray-600">Contenido del tab General con tamaño pequeño</p>
            </div>
          </Tab>
          
          <Tab label="Avanzado">
            <div className="py-4">
              <p className="text-gray-600">Contenido del tab Avanzado con tamaño pequeño</p>
            </div>
          </Tab>
          
          <Tab label="Deshabilitado" disabled>
            <div className="py-4">
              <p className="text-gray-600">Este contenido no debería verse</p>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Ejemplo 4: Callback para cambios de tab */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tabs con callback</h2>
        <Tabs 
          variant="underline" 
          size="md"
          onChange={(activeTab) => console.log(`Tab activo: ${activeTab}`)}
        >
          <Tab label="Tab 1">
            <div className="py-4">
              <p className="text-gray-600">Contenido del primer tab. Revisa la consola cuando cambies de tab.</p>
            </div>
          </Tab>
          
          <Tab label="Tab 2">
            <div className="py-4">
              <p className="text-gray-600">Contenido del segundo tab. El callback se ejecuta cada vez que cambias.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsExample;