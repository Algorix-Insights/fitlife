'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface PopUpProps {
  // Elemento que activa el popup (botón, icono, etc.)
  trigger: ReactNode;
  // Contenido del popup
  children: ReactNode;
  // Dimensiones personalizables
  width?: string | number;
  height?: string | number;
  // Título opcional del popup
  title?: string;
  // Controlar si se puede cerrar haciendo clic fuera
  closeOnOverlayClick?: boolean;
  // Controlar si se muestra el botón de cerrar
  showCloseButton?: boolean;
  // Offset desde el trigger
  offset?: number;
  // Clases CSS adicionales
  className?: string;
  // Callback cuando se abre el popup
  onOpen?: () => void;
  // Callback cuando se cierra el popup
  onClose?: () => void;
}

const PopUp: React.FC<PopUpProps> = ({
  trigger,
  children,
  width = '300px',
  height = 'auto',
  title,
  closeOnOverlayClick = true,
  showCloseButton = true,
  offset = 8,
  className = '',
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, arrowLeft: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Calcular posición del popup dropdown
  const calculateDropdownPosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Obtener dimensiones del popup
    const popupWidth = typeof width === 'number' ? width : parseInt(width.toString()) || 300;
    const popupHeight = typeof height === 'number' ? height : 200;
    
    // Posición inicial: debajo del trigger
    let top = triggerRect.bottom + scrollY + offset;
    let left = triggerRect.left + scrollX;
    
    // Centrar horizontalmente respecto al trigger
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    left = triggerCenter - popupWidth / 2 + scrollX;
    
    // Calcular posición de la flecha (siempre apunta al centro del trigger)
    let arrowLeft = popupWidth / 2;
    
    // Ajustar si se sale por la derecha
    if (left + popupWidth > window.innerWidth - 16) {
      const overflow = (left + popupWidth) - (window.innerWidth - 16);
      left -= overflow;
      arrowLeft += overflow;
    }
    
    // Ajustar si se sale por la izquierda
    if (left < 16) {
      arrowLeft += left - 16;
      left = 16;
    }
    
    // Limitar la posición de la flecha
    arrowLeft = Math.max(20, Math.min(arrowLeft, popupWidth - 20));
    
    // Ajustar si se sale por abajo (colocar encima)
    if (top + popupHeight > window.innerHeight + scrollY - 16) {
      top = triggerRect.top + scrollY - popupHeight - offset;
    }

    setPopupPosition({ top, left, arrowLeft });
  };

  // Manejar apertura del popup
  const openPopup = () => {
    setIsOpen(true);
    // Usar setTimeout para asegurar que el DOM esté actualizado
    setTimeout(() => {
      calculateDropdownPosition();
    }, 0);
    onOpen?.();
  };

  // Manejar cierre del popup
  const closePopup = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Cerrar popup al hacer clic fuera
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Cerrar popup con tecla Escape y manejar clicks fuera
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        closeOnOverlayClick &&
        popupRef.current &&
        triggerRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closePopup();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true); // true para capturar en fase de captura
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, closeOnOverlayClick]);

  // Convertir width y height a valores CSS válidos
  const getSize = (size: string | number) => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return size;
  };

  return (
    <>
      {/* Trigger Element */}
      <div ref={triggerRef} onClick={openPopup} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {/* Popup Dropdown */}
      {isOpen && (
        <div
          ref={popupRef}
          className={`
            fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200
            transform transition-all duration-200 ease-out
            ${className}
          `}
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            width: getSize(width),
            height: getSize(height),
            transformOrigin: 'top center',
          }}
        >
          {/* Flecha apuntando hacia arriba */}
          <div 
            className="absolute -top-2"
            style={{ left: `${popupPosition.arrowLeft}px` }}
          >
            <div className="w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 -translate-x-1/2"></div>
          </div>

          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              {title && (
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={closePopup}
                  className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Cerrar popup"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div 
            className={`
              ${title || showCloseButton ? 'p-3' : 'p-4'}
              ${height === 'auto' ? '' : 'overflow-y-auto'}
              max-h-[80vh]
            `}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
