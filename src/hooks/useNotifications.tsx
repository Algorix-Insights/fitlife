import { useState, useEffect } from 'react';

export interface Notification {
    id: string;
    type: 'training' | 'goal' | 'streak';
    title: string;
    message: string;
    time: string;
    read: boolean;
    createdAt: Date;
}

const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'training',
            title: '¡Hora de entrenar!',
            message: 'No has entrenado hoy. ¡Es hora de ponerse en movimiento!',
            time: 'Hace 2 horas',
            read: false,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 horas atrás
        },
        {
            id: '2',
            type: 'goal',
            title: 'Meta semanal',
            message: 'Te faltan 2 entrenamientos para cumplir tu meta semanal.',
            time: 'Hace 5 horas',
            read: false,
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 horas atrás
        },
        {
            id: '3',
            type: 'streak',
            title: '¡Racha en peligro!',
            message: 'Mantén tu racha de 7 días entrenando hoy.',
            time: 'Hace 1 día',
            read: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 día atrás
        },
        {
            id: '4',
            type: 'training',
            title: 'Recordatorio de entrenamiento',
            message: 'Tu rutina de piernas te está esperando.',
            time: 'Hace 1 día',
            read: true,
            createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000) // 1 día atrás
        },
        {
            id: '5',
            type: 'goal',
            title: '¡Meta cumplida!',
            message: 'Has completado tu objetivo de entrenamientos de esta semana.',
            time: 'Hace 2 días',
            read: true,
            createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 días atrás
        }
    ]);

    // Función para formatear tiempo relativo
    const formatRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 60) {
            return diffInMinutes <= 1 ? 'Hace un momento' : `Hace ${diffInMinutes} minutos`;
        } else if (diffInHours < 24) {
            return diffInHours === 1 ? 'Hace 1 hora' : `Hace ${diffInHours} horas`;
        } else {
            return diffInDays === 1 ? 'Hace 1 día' : `Hace ${diffInDays} días`;
        }
    };

    // Actualizar tiempos cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications(prev =>
                prev.map(notification => ({
                    ...notification,
                    time: formatRelativeTime(notification.createdAt)
                }))
            );
        }, 60000); // Actualizar cada minuto

        return () => clearInterval(interval);
    }, []);

    // Función para agregar nueva notificación
    const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'createdAt'>) => {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            time: 'Ahora',
            createdAt: new Date()
        };

        setNotifications(prev => [newNotification, ...prev]);
    };

    // Función para marcar como leída
    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    // Función para marcar todas como leídas
    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    // Función para eliminar notificación
    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    // Obtener conteo de no leídas
    const unreadCount = notifications.filter(n => !n.read).length;

    // Simular notificaciones aleatorias (para demo)
    const simulateNotifications = () => {
        const trainingMessages = [
            '¡Es hora de tu entrenamiento matutino!',
            'No olvides hacer tu rutina de cardio.',
            'Tu entrenamiento de fuerza te espera.',
            'Tiempo de activar esos músculos.'
        ];

        const goalMessages = [
            'Vas por buen camino con tu meta semanal.',
            'Solo te falta un entrenamiento más.',
            'Has completado el 75% de tu meta.',
            '¡Estás cerca de cumplir tu objetivo!'
        ];

        const streakMessages = [
            '¡Mantén tu racha activa!',
            'No rompas tu racha de entrenamientos.',
            'Tu constancia es admirable.',
            '¡Sigue así con tu racha!'
        ];

        const types: Array<'training' | 'goal' | 'streak'> = ['training', 'goal', 'streak'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        let title = '';
        let message = '';

        switch (randomType) {
            case 'training':
                title = 'Recordatorio de entrenamiento';
                message = trainingMessages[Math.floor(Math.random() * trainingMessages.length)];
                break;
            case 'goal':
                title = 'Progreso de meta';
                message = goalMessages[Math.floor(Math.random() * goalMessages.length)];
                break;
            case 'streak':
                title = 'Racha activa';
                message = streakMessages[Math.floor(Math.random() * streakMessages.length)];
                break;
        }

        addNotification({
            type: randomType,
            title,
            message,
            read: false
        });
    };

    return {
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        simulateNotifications
    };
};

export default useNotifications;