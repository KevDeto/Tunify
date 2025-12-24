import { icons } from "@/icons/Icons";
import { useState } from "react";

export function PlayerControl() {
    const {isPlaying} = useState(true);
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
      <button 
        className="hover:scale-110 text-white hover:text-gray-300 transition-all" 
        title="Previous song"
      >
        <div className="w-8 h-8">
          {icons.Prev}
        </div>
      </button>
      <button 
        className="bg-white text-black rounded-full p-3 hover:scale-110 transition-all"
      >
        <div className="w-8 h-8">
          {isPlaying ? icons.Pause : icons.Play}
        </div>
      </button>
      <button 
        className="hover:scale-110 text-white hover:text-gray-300 transition-all" 
        title="Next song"
      >
        <div className="w-8 h-8">
          {icons.Next}
        </div>
      </button>
    </div>
  );
}