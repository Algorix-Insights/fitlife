'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    width?: string;
    height?: string;
    showCloseButton?: boolean;
    className?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    width = '500px',
    height = 'auto',
    showCloseButton = true,
    className = ''
}: ModalProps) {
    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup al desmontar
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Prevenir cierre al hacer clic en el contenido del modal
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay - NO permite cerrar al hacer clic */}
            <div className="absolute inset-0 bg-slate-900/80 bg-opacity-50 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <div
                className={`relative bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden ${className}`}
                style={{ width, height }}
                onClick={handleContentClick}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        {title && (
                            <h2 className="text-lg font-semibold text-gray-800">
                                {title}
                            </h2>
                        )}
                        
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}