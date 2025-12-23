import React, { useState } from "react";
import SongInfo from "./SongInfo";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeSection from "./VolumeSection";
import { useMusicPlayer } from "../../../hooks/useMusicPlayer";

const PlayerBar = () => {
    const {
        // Estado
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playlist,
        currentIndex,
        loading,
        error,
        repeatMode, setRepeatMode,
        // Métodos de control básicos
        play,
        pause,
        togglePlay,
        playNext,
        playPrevious,
        seek,
        setVolume: setVolumeLevel,
        toggleMute,
        setMute,
        formatTime
    } = useMusicPlayer();

    const [isShuffled, setIsShuffled] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handlePlayPause = () => {
        console.log("Play/Pause");
        togglePlay();
    };

    const handlePlayNext = () => {
        console.log("next song");
        playNext();
    }

    const handlePrevious = () => {
        console.log("Previous song");
        playPrevious();
    };

    const handleProgressChange = (values) => {
        if (values && values[0] !== undefined) {
            const percent = values[0];
            const seekTime = (percent / 100) * duration;
            console.log("Seek to:", seekTime, "seconds");
            seek(seekTime);
        }
    };

    const handleShuffle = () => {
        console.log("Shuffle toggle");
        setIsShuffled(!isShuffled);
    };

    const handleRepeat = () => {
        console.log("Repeat toggle");
        const modes = ["off","one"];
        const currentIndex = modes.indexOf(repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setRepeatMode(modes[nextIndex]);
    };

    const handleLikeToggle = () => {
        console.log("Like toggle");
        setIsLiked(!isLiked);
    };

    const handleVolumeChange = (values) => {
        console.log("Volume change:", values);
        if (values && values[0] !== undefined && setVolumeLevel) {
            setVolumeLevel(values[0]);
        }
    };

    const formattedCurrentTime = formatTime(currentTime);
    const formattedTotalTime = formatTime(duration);
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-22 bg-black/95 backdrop-blur-lg border-t border-white/10 z-10">
            <div className="h-full px-4 py-2">
                <div className="grid grid-cols-3 items-center h-full">
                    
                    {/* columna 1*/}
                    <div className="justify-self-start min-w-0 max-w-lg">
                        <SongInfo 
                            track={currentTrack}
                            onLikeToggle={handleLikeToggle}
                        />
                    </div>

                    {/* columna 2*/}
                    <div className="justify-self-center flex flex-col items-center space-y-2 w-full max-w-2xl">
                        {/* Botones de control */}
                        <PlayerControls
                            isPlaying={isPlaying}
                            isShuffled={isShuffled}
                            repeatMode={repeatMode}
                            onPlayPause={handlePlayPause}
                            onNext={handlePlayNext}
                            onPrevious={handlePrevious}
                            onShuffle={handleShuffle}
                            onRepeat={handleRepeat}
                        />
                        
                        {/* barra de progreso */}
                        <div className="w-full">
                            <ProgressBar
                                currentTime={currentTime}
                                totalTime={duration}
                                formattedCurrentTime={formattedCurrentTime}
                                formattedTotalTime={formattedTotalTime}
                                progress={progress}
                                onChange={handleProgressChange}
                            />
                        </div>
                    </div>

                    {/* columna 3*/}
                    <div className="justify-self-end min-w-0 max-w-md">
                        <VolumeSection
                            volume={volume}
                            isMuted={isMuted}
                            onVolumeChange={handleVolumeChange}
                            onToggleMute={toggleMute}
                        />
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default PlayerBar;