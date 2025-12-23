import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchInput = ({
    placeholder = "¿Qué quieres reproducir?",
    ...props
}) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        // Si el padre pasa onChange, lo llamamos también
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <form
            role="search"
            className=" grid grid-cols-[auto_1fr_auto] items-center gap-3
                        bg-fill rounded-full
                        border border-transparent
                        hover:bg-fill-hover
                        hover:transition-colors duration-200
                        hover:border-purple-950/30
                        px-4 py-2 h-12
                        w-full max-w-md

                        focus-within:border-white/70
                        focus-within:bg-section-bg
    
                        focus-within:hover:border-white/70
                        focus-within:bg-fill-hover"
        >
            <Search
                size={28}
                strokeWidth={2}
                color="white"
                className="col-start-1 cursor-pointer"
            />
            <input
                type="search"
                name="search"
                spellCheck="false"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`
                col-start-2
                w-full bg-transparent 
                text-white placeholder:text-text/60
                outline-none text-md
                [&::-webkit-search-cancel-button]:hidden
                [&::-webkit-search-decoration]:hidden
                [&::-ms-clear]:hidden
                [&]:-moz-appearance-none peer
                `}
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
    )
}

export default SearchInput;