// hooks/useMusicPlayer.js
import { useState, useEffect, useCallback, useRef } from 'react';

// 📦 DATOS MOCK
const MOCK_TRACKS = [
    {
        id: 'track_001',
        title: 'Midnight City',
        artist: 'M83',
        album: 'Hurry Up, We\'re Dreaming',
        duration: 244,
        cover: 'https://picsum.photos/300/300?random=1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        likes: 12543,
        isLiked: false,
        plays: 254890,
        isExplicit: false
    },
    {
        id: 'track_002',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 200,
        cover: 'https://picsum.photos/300/300?random=2',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        likes: 89234,
        isLiked: false,
        plays: 4501234,
        isExplicit: false
    },
    {
        id: 'track_003',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 354,
        cover: 'https://picsum.photos/300/300?random=3',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        likes: 987654,
        isLiked: false,
        plays: 12000000,
        isExplicit: false
    }
];

export const useMusicPlayer = () => {
    // ========== ESTADOS ==========
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(40);
    const [isMuted, setIsMuted] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [repeatMode, setRepeatMode] = useState("off");

    // ========== REFERENCIAS ==========
    const audioRef = useRef(null);
    const progressIntervalRef = useRef(null);
    const isSeekingRef = useRef(false);
    const playNextRef = useRef();

    // ========== FUNCIONES AUXILIARES ==========
    const clearProgressInterval = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    const formatTime = useCallback((seconds) => {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // ========== INICIALIZACIÓN ==========
    const loadDefaultPlaylist = useCallback(() => {
        setPlaylist(MOCK_TRACKS);
        setCurrentTrack(MOCK_TRACKS[0]);
        setCurrentIndex(0);
        setDuration(MOCK_TRACKS[0].duration);
    }, []);

    // ========== EFECTOS ==========
    useEffect(() => {
        // Inicializar audio
        audioRef.current = new Audio();
        audioRef.current.volume = volume / 100;
        audioRef.current.preload = 'metadata';

        // Handlers de eventos
        const handleLoadedMetadata = () => {
            const audioDuration = audioRef.current.duration;
            setDuration(audioDuration > 0 ? audioDuration : MOCK_TRACKS[0]?.duration || 200);
        };

        const handleTimeUpdate = () => {
            if (!isSeekingRef.current && audioRef.current) {
                const time = audioRef.current.currentTime;
                const roundedTime = Math.floor(time * 10) / 10;
                setCurrentTime(roundedTime);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            clearProgressInterval();
            
            if (repeatMode === "one") {
                setTimeout(() => {
                    if (currentTrack && audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                        setIsPlaying(true);
                    }
                }, 300);
            } else if (playNextRef.current) {
                playNextRef.current();
            }
        };

        // Agregar event listeners
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('ended', handleEnded);

        // Cargar playlist inicial
        loadDefaultPlaylist();

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
            }
            clearProgressInterval();
        };
    }, [loadDefaultPlaylist, repeatMode]);

    // Control de volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // ========== FUNCIONES PRINCIPALES ==========
    const pause = useCallback(() => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const play = useCallback(async (track = null) => {
        try {
            setError(null);
            const trackToPlay = track || currentTrack || (playlist.length > 0 ? playlist[0] : null);
            
            if (!trackToPlay) return;

            // Si ya está reproduciendo este track, pausar
            if (audioRef.current && 
                audioRef.current.src === trackToPlay.audioUrl && 
                !audioRef.current.paused) {
                pause();
                return;
            }

            // Reanudar si el track ya está cargado pero pausado
            if (trackToPlay === currentTrack && 
                audioRef.current && 
                audioRef.current.src === trackToPlay.audioUrl && 
                audioRef.current.paused) {
                await audioRef.current.play();
                setIsPlaying(true);
                return;
            }

            // Cambiar a track nuevo
            if (trackToPlay !== currentTrack) {
                if (audioRef.current) {
                    if (!audioRef.current.paused) {
                        audioRef.current.pause();
                    }
                    
                    audioRef.current.src = trackToPlay.audioUrl;
                    audioRef.current.load();
                    setCurrentTime(0);
                }
                
                setCurrentTrack(trackToPlay);
                const index = playlist.findIndex(t => t.id === trackToPlay.id);
                if (index !== -1) setCurrentIndex(index);
            }

            // Reproducir
            await new Promise(resolve => setTimeout(resolve, 100));
            if (audioRef.current) {
                await audioRef.current.play();
                setIsPlaying(true);
            }
            
        } catch (err) {
            setIsPlaying(false);
            setError("Error al reproducir la canción");
        }
    }, [currentTrack, playlist, pause]);

    const playNext = useCallback(() => {
        if (repeatMode === "one") {
            if (currentTrack && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                setIsPlaying(true);
            }
            return;
        }

        if (playlist.length > 0) {
            const nextIndex = (currentIndex + 1) % playlist.length;
            setCurrentIndex(nextIndex);
            play(playlist[nextIndex]);
        }
    }, [playlist, currentIndex, play, currentTrack, repeatMode]);

    useEffect(() => {
        playNextRef.current = playNext;
    }, [playNext]);

    const playPrevious = useCallback(() => {
        if (playlist.length > 0) {
            const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            setCurrentIndex(prevIndex);
            play(playlist[prevIndex]);
        }
    }, [playlist, currentIndex, play]);

    const togglePlay = useCallback(() => {
        if (!currentTrack && playlist.length > 0) {
            play(playlist[0]);
        } else if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, currentTrack, playlist, play, pause]);

    const seek = useCallback((time) => {
        if (!audioRef.current || !currentTrack) return;
        
        isSeekingRef.current = true;
        setCurrentTime(time);
        audioRef.current.currentTime = time;
        
        setTimeout(() => {
            isSeekingRef.current = false;
        }, 100);
    }, [currentTrack]);

    const setVolumeLevel = useCallback((newVolume) => {
        const clampedVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(clampedVolume);
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const searchTracks = useCallback(async (query) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = MOCK_TRACKS.filter(track => 
                    track.title.toLowerCase().includes(query.toLowerCase()) ||
                    track.artist.toLowerCase().includes(query.toLowerCase())
                );
                setLoading(false);
                resolve(results);
            }, 300);
        });
    }, []);

    const toggleLike = useCallback((trackId) => {
        return Promise.resolve({ success: true });
    }, []);

    const addToPlaylist = useCallback((track) => {
        setPlaylist(prev => [...prev, track]);
        return Promise.resolve({ success: true });
    }, []);

    // ========== RETORNO ==========
    return {
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
        repeatMode,
        setRepeatMode,
        
        // Métodos
        play,
        pause,
        togglePlay,
        playNext,
        playPrevious,
        seek,
        setVolume: setVolumeLevel,
        toggleMute,
        setMute: setIsMuted,
        searchTracks,
        toggleLike,
        addToPlaylist,
        formatTime,
        refreshPlaylist: loadDefaultPlaylist,
    };
};