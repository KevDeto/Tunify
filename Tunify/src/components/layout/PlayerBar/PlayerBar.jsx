import React from "react";
import SongInfo from "./SongInfo";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeSection from "./VolumeSection";

const PlayerBar = () => {
    const playerState = {
        isPlaying: false,
        isShuffled: false,
        repeatMode: "off",
        volume: 70,
        progress: 35,
        currentTime: "1:23",
        totalTime: "3:45",
        currentTrack: {
            id: 1,
            title: "Last Rites/Loved To Deth - Live At The Phantasy Theatre, 1987",
            artist: "Megadeth",
            album: "Álbum del Artista",
            coverUrl: "https://via.placeholder.com/48x48",
            isLiked: false
        }
    };

    const handlePlayPause = () => console.log("Play/Pause");
    const handleNext = () => console.log("Next");
    const handlePrevious = () => console.log("Previous");
    const handleShuffle = () => console.log("Toggle Shuffle");
    const handleRepeat = () => console.log("Toggle Repeat");
    const handleVolumeChange = (value) => console.log("Volume:", value);
    const handleProgressChange = (value) => console.log("Progress:", value);
    const handleLikeToggle = () => console.log("Toggle Like");

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-22 bg-black/95 backdrop-blur-lg border-t border-white/10 z-10">
            <div className="h-full px-4 py-2">
                <div className="grid grid-cols-3 items-center h-full">
                    
                    {/* columna 1*/}
                    <div className="justify-self-start min-w-0 max-w-lg">
                        <SongInfo 
                            track={playerState.currentTrack}
                            onLikeToggle={handleLikeToggle}
                        />
                    </div>

                    {/* columna 2*/}
                    <div className="justify-self-center flex flex-col items-center space-y-2 w-full max-w-2xl">
                        {/* Botones de control */}
                        <PlayerControls
                            isPlaying={playerState.isPlaying}
                            isShuffled={playerState.isShuffled}
                            repeatMode={playerState.repeatMode}
                            onPlayPause={handlePlayPause}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onShuffle={handleShuffle}
                            onRepeat={handleRepeat}
                        />
                        
                        {/* barra de progreso */}
                        <div className="w-full">
                            <ProgressBar
                                currentTime={playerState.currentTime}
                                totalTime={playerState.totalTime}
                                progress={playerState.progress}
                                onChange={handleProgressChange}
                            />
                        </div>
                    </div>

                    {/* columna 3*/}
                    <div className="justify-self-end min-w-0 max-w-md">
                        <VolumeSection
                            volume={playerState.volume}
                            onVolumeChange={handleVolumeChange}
                        />
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default PlayerBar;