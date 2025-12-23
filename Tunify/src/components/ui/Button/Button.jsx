import React from "react";

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  onClick, 
  className = '',
  isLoading = false,
  disabled = false,  
  ariaLabel, // Recibimos como prop
  isActive,  // Recibimos pero NO lo pasamos al <button>
  ...props 
}) => {
  const baseClasses = "rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none";
  
  const variants = {
    primary: "border border-transparent bg-section-bg/90 text-white/70 hover:text-white hover:bg-section-bg hover:transition-colors duration-200 hover:scale-102 hover:transition-colors duration-200 hover:border-purple-950/30 cursor-pointer",
    secondary: "text-white cursor-pointer",
    text: "bg-text font-semibold hover:bg-text/90 hover:scale-103 cursor-pointer",
    iconWithoutBg: "text-white/70 cursor-pointer hover:text-text",
    accesAcount: "border border-transparent text-white cursor-pointer hover:scale-103",
    success: "",
    danger: "",
    player: "",
  };

  const sizes = {
    xs: "p-1.5 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-2 py-2",
    lg: "p-2",
    xl: "px-8 py-4 text-xl",
    text: "px-4 py-1",
    icon: "p-0 m-0",
  };

  // Renderiza el ícono (si se pasa como elemento JSX)
  const renderIcon = (position) => {
    if (!icon || isLoading || position !== iconPosition) return null;
    
    // Clona el elemento ícono y añade clases (ya que los elementos jsx son inmutables debo hacerlo con cloneElement)
    return React.cloneElement(icon, {
      className: `${icon.props?.className || ''} ${iconOnly ? '' : position === 'left' ? 'mr-2' : 'ml-2'}`
    });
  };

  return (
    <button 
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        ${iconOnly ? 'rounded-full aspect-square' : ''}
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={iconOnly && typeof children === 'string' ? children : undefined}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          {renderIcon('left')}
          {!iconOnly && children}
          {renderIcon('right')}
        </>
      )}
    </button>
  );
};

export default Button;