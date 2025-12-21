import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Volume1, Volume } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Button from "../../ui/Button/Button.jsx";

const VolumeSection = ({ 
    volume: externalVolume = 70,
    onVolumeChange = null,
    onMuteToggle = null,
    isMuted: externalIsMuted = null,
    disabled = false,
    className = "",
    showTooltip = true,
    step = 1,
    max = 100,
    storageKey = "tunify_volume",
    persistVolume = true
}) => {
    const [internalVolume, setInternalVolume] = useState(externalVolume);
    const [internalIsMuted, setInternalIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(externalVolume);
    const [isDragging, setIsDragging] = useState(false);
    const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
    
    const sliderRef = useRef(null);
    const timeoutRef = useRef(null);

    // Sincronizar con props externos
    useEffect(() => {
        setInternalVolume(externalVolume);
    }, [externalVolume]);

    // Determinar estados
    const isMuted = externalIsMuted !== null ? externalIsMuted : internalIsMuted;
    const volume = internalVolume;

    // Cargar volumen guardado
    useEffect(() => {
        if (persistVolume && storageKey) {
            try {
                const savedVolume = localStorage.getItem(storageKey);
                if (savedVolume !== null) {
                    const parsedVolume = parseInt(savedVolume, 10);
                    if (!isNaN(parsedVolume)) {
                        setInternalVolume(parsedVolume);
                        setPreviousVolume(parsedVolume);
                        onVolumeChange?.(parsedVolume);
                    }
                }
            } catch (error) {
                console.warn("No se pudo cargar el volumen guardado:", error);
            }
        }
    }, [persistVolume, storageKey, onVolumeChange]);

    // Guardar volumen
    useEffect(() => {
        if (persistVolume && storageKey && !isMuted) {
            try {
                localStorage.setItem(storageKey, volume.toString());
            } catch (error) {
                console.warn("No se pudo guardar el volumen:", error);
            }
        }
    }, [volume, isMuted, persistVolume, storageKey]);

    // Callbacks memoizados
    const handleMuteToggle = useCallback(() => {
        if (disabled) return;
        
        if (isMuted) {
            // Desmutear
            const newVolume = previousVolume;
            if (externalIsMuted === null) setInternalIsMuted(false);
            setInternalVolume(newVolume);
            
            onVolumeChange?.(newVolume);
            onMuteToggle?.(false, newVolume);
        } else {
            // Mutear
            setPreviousVolume(volume);
            if (externalIsMuted === null) setInternalIsMuted(true);
            setInternalVolume(0);
            
            onVolumeChange?.(0);
            onMuteToggle?.(true, volume);
        }
    }, [disabled, isMuted, previousVolume, volume, externalIsMuted, onVolumeChange, onMuteToggle]);

    const handleVolumeChange = useCallback((values) => {
        if (disabled) return;
        
        const newVolume = values[0];
        setInternalVolume(newVolume);
        
        if (newVolume > 0 && isMuted) {
            if (externalIsMuted === null) setInternalIsMuted(false);
        }
        
        onVolumeChange?.(newVolume);
        
        if (showTooltip) {
            setShowVolumeTooltip(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setShowVolumeTooltip(false), 1500);
        }
    }, [disabled, isMuted, externalIsMuted, onVolumeChange, showTooltip]);

    // Helper functions
    const getVolumeIcon = useCallback(() => {
        const currentVolume = isMuted ? 0 : volume;
        
        if (currentVolume === 0) return <VolumeX className="h-5 w-5" />;
        if (currentVolume < 30) return <Volume className="h-5 w-5" />;
        if (currentVolume < 70) return <Volume1 className="h-5 w-5" />;
        return <Volume2 className="h-5 w-5" />;
    }, [isMuted, volume]);

    const formatVolumeText = useCallback(() => {
        return `${isMuted ? 0 : volume}%`;
    }, [isMuted, volume]);

    // Event handlers
    const handleMouseEnter = useCallback(() => {
        if (showTooltip) setShowVolumeTooltip(true);
    }, [showTooltip]);

    const handleMouseLeave = useCallback(() => {
        if (showTooltip && !isDragging) setShowVolumeTooltip(false);
    }, [showTooltip, isDragging]);

    const handleSliderMouseDown = useCallback(() => setIsDragging(true), []);
    const handleSliderMouseUp = useCallback(() => setIsDragging(false), []);

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
                onClick={handleMuteToggle}
                disabled={disabled}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="p-1.5 rounded-full transition-all hover:bg-white/5">
                {getVolumeIcon()}
            </Button>

            <div 
                className="relative w-30 group"
                ref={sliderRef}
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