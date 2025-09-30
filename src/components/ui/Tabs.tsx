import React, { useState, ReactNode } from 'react';

// Tipos para las props del componente
interface TabProps {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  defaultActiveTab?: number;
  onChange?: (activeTab: number) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Componente Tab individual
export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

// Componente principal Tabs
export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultActiveTab = 0,
  onChange,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index: number) => {
    if (children[index].props.disabled) return;
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  // Estilos según la variante
  const getTabStyles = () => {
    const baseStyles = "flex transition-all duration-200 ease-in-out";
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} bg-gray-100 rounded-lg p-1`;
      case 'underline':
        return `${baseStyles} border-b border-gray-200`;
      default:
        return `${baseStyles} border-b border-gray-200`;
    }
  };

  const getTabButtonStyles = (index: number, isActive: boolean, isDisabled: boolean) => {
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    };

    const baseButtonStyles = `${sizeStyles[size]} font-semibold transition-all duration-200 ease-in-out cursor-pointer flex items-center gap-2`;

    if (isDisabled) {
      return `${baseButtonStyles} text-gray-400 cursor-not-allowed`;
    }

    switch (variant) {
      case 'pills':
        return `${baseButtonStyles} rounded-md ${
          isActive 
            ? 'bg-white text-purple-1007 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        }`;
      case 'underline':
        return `${baseButtonStyles} ${
          isActive 
            ? 'text-purple-1007 border-b-2 border-purple-1007' 
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
        }`;
      default:
        return `${baseButtonStyles} ${
          isActive 
            ? 'text-purple-1007 border-b-2 border-purple-1007' 
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
        }`;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Navegación de tabs */}
      <div className={getTabStyles()}>
        {children.map((child, index) => {
          const isActive = index === activeTab;
          const isDisabled = child.props.disabled || false;
          
          return (
            <button
              key={index}
              className={getTabButtonStyles(index, isActive, isDisabled)}
              onClick={() => handleTabClick(index)}
              disabled={isDisabled}
            >
              {child.props.icon && (
                <span className="flex-shrink-0">
                  {child.props.icon}
                </span>
              )}
              <span className="whitespace-nowrap">
                {child.props.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contenido del tab activo */}
      <div className="mt-6">
        {children[activeTab]?.props.children}
      </div>
    </div>
  );
};

export default Tabs;