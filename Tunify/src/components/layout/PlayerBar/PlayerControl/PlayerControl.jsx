import { Button } from "@/components/ui/Button/button";
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Repeat1 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Slider } from "@/components/ui/Slider/slider";
import SongControl from "./SongControl";

export function PlayerControl() {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic, setCurrentSong, volume, setAudioRef } = usePlayerStore(state => state);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

  useEffect(() => {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying]);

  useEffect(() => {
    const { song } = currentMusic
    if (song) {
      const src = currentMusic?.song?.src
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }, [currentMusic]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const onPlayPause = () => {
    if (currentMusic.song === null) return;
    setIsPlaying(!isPlaying);
  }

  const onRepeat = () => {
    setIsRepeat(!isRepeat)
  }

  const onShuffle = () => {
    setIsShuffle(!isShuffle)
  }

  const getCurrentSongIndex = () => {
    if (currentMusic.songs.length === 0 || currentMusic.song === null) return -1;
    return currentMusic.songs.findIndex(e => e.id === currentMusic.song.id);
  };

  const getNextSong = () => {
    const { songs } = currentMusic;
    const totalOfSongsInPlaylist = songs.length;
    if (totalOfSongsInPlaylist === 0) return null;

    const index = getCurrentSongIndex();
    if (index + 1 >= totalOfSongsInPlaylist) {
      return null;
    }
    return songs[index + 1];
  };

  const getPreviousSong = () => {
    const index = getCurrentSongIndex();
    if (index <= 0) {
      return null;
    }
    return currentMusic.songs[index - 1];
  };

  const onNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      setCurrentMusic({ ...currentMusic, song: nextSong });
    }
  };

  const onPrevSong = () => {
    const prevSong = getPreviousSong();
    if (prevSong) {
      setCurrentMusic({ ...currentMusic, song: prevSong });
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center gap-6">
        <Button
          variant="ghost"
          size="default"
          className={isShuffle === false ?
            "text-white/60 hover:text-white hover:scale-105 transition-transform duration-105 ease-out" :
            "text-active hover:scale-105 transition-transform duration-105 ease-out"}
          onClick={onShuffle}
        >
          <Shuffle size={18} />
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="hover:scale-105 transition-transform duration-105 ease-out"
          onClick={onPrevSong}
        >
          <SkipBack size={18} strokeWidth={3} fill="white" color="white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white rounded-full cursor-pointer hover:scale-105 p-4.5"
          onClick={onPlayPause}
          disabled={!currentMusic?.song?.src}
        >
          {isPlaying ? (
            <Pause size={18} fill="black" color="black" />
          ) : (
            <Play size={18} strokeWidth={3} fill="black" color="black" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="hover:scale-105 transition-transform duration-105 ease-out"
          onClick={onNextSong}
        >
          <SkipForward size={18} strokeWidth={3} fill="white" color="white" />
        </Button>
        <Button
          variant="ghost"
          size="default"
          className={isRepeat === false ?
            "text-white/60 hover:text-white hover:scale-105 transition-transform duration-105 ease-out" :
            "text-active hover:scale-105 transition-transform duration-105 ease-out"}
          onClick={onRepeat}
        >
          {isRepeat ? (
            <Repeat1 size={18} />
          ) : (
            <Repeat size={18} />
          )}
        </Button>
        <audio ref={audioRef} onEnded={onNextSong}/>
      </div>
      <SongControl audio={audioRef} />
    </div>
  );
}