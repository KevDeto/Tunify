import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  volume: 0.5,
  audioRef: null,

  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setAudioRef: (audioRef) => set({ audioRef }),

  // Acciones simples para cambiar de canción
  // El componente se encarga de la lógica de repeat/shuffle
  setCurrentSong: (song) => set(state => ({
    currentMusic: {
      ...state.currentMusic,
      song
    }
  })),

  // O también puedes hacer una función que reciba el índice
  playSongAtIndex: (index) => set(state => {
    if (index >= 0 && index < state.currentMusic.songs.length) {
      return {
        currentMusic: {
          ...state.currentMusic,
          song: state.currentMusic.songs[index]
        }
      };
    }
    return state;
  })
}));