import { Button } from "@/components/ui/Button/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { icons } from "@/icons/Icons";
import React, { useState } from "react";

export function PlayerControl() {
  const [ isPlaying, setIsPlaying ] = useState(false);

  const onPlayPause = () => {
    setIsPlaying(!isPlaying);
  }
  /*const {currentMusic, isPlaying, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic);


  const onPlayPause = () => {
    if (currentMusic.song === null) return;
    setIsPlaying(!isPlaying);
  }


  const onNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      setCurrentMusic({ ...currentMusic, song: nextSong });
    }
  }

  const onPrevSong = () => {
    const prevSong = getPreviousSong();
    if (prevSong) {
      setCurrentMusic({ ...currentMusic, song: prevSong });
    }
  }*/
  return (
    <div className="flex justify-center items-center gap-6">
      <Button
        variant="ghost"
        size="default"
        className="hover:scale-105 transition-transform duration-105 ease-out"
      >
        <SkipBack size={18} strokeWidth={3} fill="white" color="white" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="bg-white rounded-full cursor-pointer hover:scale-105"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause size={16} fill="black" color="black"/>
        ) : (
          <Play size={16} strokeWidth={3} fill="black" color="black" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="default"
        className="hover:scale-105 transition-transform duration-105 ease-out"
      >
        <SkipForward size={18} strokeWidth={3} fill="white" color="white" />
      </Button>
    </div>
  );
}