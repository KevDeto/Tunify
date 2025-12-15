import React, { useState } from "react";
import { Search, X } from "lucide-react";

const Input = ({
  placeholder = "¿Qué quieres reproducir?",
  onSubmit,  // Para manejar el submit si lo necesitas luego
  className = "",
  formClassName = "",
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la página
    
    if (onSubmit) {
      const formData = new FormData(e.target);
      const searchValue = formData.get("search") || "";
      onSubmit(searchValue);
    }
    
    // También puedes acceder directamente al valor:
    // const input = e.target.querySelector('input[name="search"]');
    // if (onSubmit && input) onSubmit(input.value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    // Si el padre pasa onChange, lo llamamos también
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`
        grid grid-cols-[auto_1fr_auto] items-center gap-3
        bg-section-bg/90 rounded-full
        border border-transparent
        hover:bg-section-bg
        hover:transition-colors duration-200
        hover:border-purple-950/30
        px-4 py-2 h-12
        w-full max-w-md

        focus-within:border-white/70
        focus-within:bg-section-bg
    
        focus-within:hover:border-white/70
        focus-within:hover:bg-section-bg
        ${formClassName}
      `}
      role="search"  // Accesibilidad importante
      aria-label="Buscar en la aplicación"
    >
      <Search 
        size={28}
        strokeWidth={1.2}
        color="white"
        className="col-start-1 cursor-pointer"
        data-tooltip-id="tooltip_search"
        data-tooltip-content="Buscar"
      />
      <input
        type="search"
        name="search"  // Importante para FormData
        value={value}
        onChange={handleChange}
        spellCheck="false"
        placeholder={placeholder}
        className={`
          col-start-2
          w-full bg-transparent 
          text-text placeholder:text-text/60
          outline-none text-md
          [&::-webkit-search-cancel-button]:hidden
          [&::-webkit-search-decoration]:hidden
          [&::-ms-clear]:hidden
          [&]:-moz-appearance-none peer
          ${className}
        `}
        aria-label={placeholder}  // Accesibilidad
        enterKeyHint="search"  // Mejora UX en móviles
        {...props}
      />
      {value.length > 0 && (
        <button type="button" aria-label="Limpiar búsqueda" className="col-start-3">
          <X 
            size={28}
            strokeWidth={1.3}
            color="white"
            onClick={() => setValue("")}
            className="cursor-pointer"
          />
        </button>
      )}
    </form>
  );
};

export default Input;