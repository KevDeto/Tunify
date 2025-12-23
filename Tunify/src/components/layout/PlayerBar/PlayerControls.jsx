import React from "react";
import Button from "../../ui/Button/Button.jsx";

import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1 } from "lucide-react";

const PlayerControls = ({ 
    isPlaying,
    isShuffled,
    repeatMode,
    onPlayPause,
    onNext,
    onPrevious,
    onShuffle,
    onRepeat
}) => {
    return (
        <div className="flex items-center justify-center gap-6 p-2 pt-0 mb-1">
            <Button
                onClick={onShuffle}
                isActive={isShuffled}
                ariaLabel={isShuffled ? "Desactivar shuffle" : "Activar shuffle"}
                variant="iconWithoutBg"
                size="icon">
                <Shuffle className="h-4 w-4" />
            </Button>

            <Button
                onClick={onPrevious}
                ariaLabel="Canción anterior"
                size="icon"
                variant="iconWithoutBg"
                className="hover:scale-105 transition-transform duration-200">
                <SkipBack className="h-4 w-4" fill="white" color="white" strokeWidth={3}/>
            </Button>

            <Button
                onClick={onPlayPause}
                className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-200"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}                
                size="icon"
                variant="iconWithoutBg">
                {isPlaying ? (
                    <Pause className="h-4 w-4" fill="black" color="black" />
                ) : (
                    <Play className="h-4 w-4" fill="black" color="black"/>
                )}
            </Button>

            <Button
                onClick={onNext}
                size="icon"
                variant="iconWithoutBg"
                className="hover:scale-105 transition-transform duration-200">
                <SkipForward className="h-4 w-4" fill="white" color="white" strokeWidth={3}/>
            </Button>

            <Button
                onClick={onRepeat}
                isActive={repeatMode !== "off"}
                ariaLabel={`Modo repeat: ${repeatMode}`}
                size="icon"
                variant="iconWithoutBg">
                {repeatMode === "one" ? (
                    <Repeat1 className="h-4 w-4 text-hover-icon" />
                ) : (
                    <Repeat className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};

export default PlayerControls;