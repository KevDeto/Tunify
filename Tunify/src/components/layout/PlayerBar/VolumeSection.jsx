import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Volume1, Volume } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Button from "../../ui/Button/Button.jsx";

const VolumeSection = ({ 
    volume = 70,            // Del hook
    isMuted = false,        // Del hook  
    onVolumeChange = null,  // setVolumeLevel del hook
    onToggleMute = null,    // toggleMute del hook
    disabled = false,
    className = "",
    showTooltip = true,
    step = 1,
    max = 100
}) => {
    const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const timeoutRef = useRef(null);

// Manejar cambio de volumen
    const handleVolumeChange = (values) => {
        if (disabled) return;
        
        if (onVolumeChange && values && values[0] !== undefined) {
            const newVolume = values[0];
            
            // Si está muteado, desmutear automáticamente
            if (isMuted && onToggleMute) {
                onToggleMute(); // Desmutear
            }
            
            // Aplicar el nuevo volumen
            onVolumeChange([newVolume]);
        }
        
        // Mostrar tooltip temporal
        if (showTooltip) {
            setShowVolumeTooltip(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setShowVolumeTooltip(false), 1500);
        }
    };

    // Manejar toggle de mute
    const handleMuteToggle = () => {
        if (disabled) return;
        
        if (onToggleMute) {
            onToggleMute();
        }
        
        // Mostrar tooltip temporal
        if (showTooltip) {
            setShowVolumeTooltip(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setShowVolumeTooltip(false), 1000);
        }
    };

    // Obtener icono según volumen
    const getVolumeIcon = () => {
        const currentVolume = isMuted ? 0 : volume;
        
        if (currentVolume === 0) return <VolumeX className="h-5 w-5 text-gray-400" />;
        if (currentVolume < 30) return <Volume className="h-5 w-5 text-gray-300" />;
        if (currentVolume < 70) return <Volume1 className="h-5 w-5 text-gray-300" />;
        return <Volume2 className="h-5 w-5 text-gray-300" />;
    };

    // Formatear texto de volumen
    const formatVolumeText = () => {
        return `${isMuted ? 0 : volume}%`;
    };

    // Tooltip handlers
    const handleMouseEnter = () => {
        if (showTooltip) setShowVolumeTooltip(true);
    };

    const handleMouseLeave = () => {
        if (showTooltip && !isDragging) setShowVolumeTooltip(false);
    };

    const handleSliderMouseDown = () => setIsDragging(true);
    const handleSliderMouseUp = () => setIsDragging(false);

    // Cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Button
                variant="iconWithoutBg"
                onClick={() => {
                    if (onToggleMute) onToggleMute();
                }}
                disabled={disabled}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="p-1.5 rounded-full transition-all hover:bg-white/5">
                {getVolumeIcon()}
            </Button>

            <div 
                className="relative w-30 group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Slider
                    value={[isMuted ? 0 : volume]}
                    max={max}
                    step={step}
                    onValueChange={handleVolumeChange}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    disabled={disabled}
                    className="cursor-pointer"
                    aria-label="Control de volumen"
                />
            </div>
        </div>
    );
};

export default VolumeSection;