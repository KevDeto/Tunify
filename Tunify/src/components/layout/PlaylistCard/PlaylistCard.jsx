import React from "react";
import { playlists, songs } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button/button";
import { Pause, Play } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { getPlaylistInfo } from "@/services/api";

const PlaylistCard = () => {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    const handleClick = (playlist) => {
        if (currentMusic?.playlist?.id === playlist.id) {
            setIsPlaying(!isPlaying);
            return
        }
        /*
        //problema: no puedo consumir api local en react vite (solo astro), buscar opciones (agregue services/api).
        fetch(`/api/get-info-playlist.json?id=${playlist.id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data
                setIsPlaying(true)
                setCurrentMusic({ songs, playlist, song: songs[0] })
            })
        */
        // Usa la función directamente sin fetch
        const { songs, playlist: playlistData } = getPlaylistInfo(playlist.id);
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist: playlistData, song: songs[1] });
    }

    const isPlaylistPlaying = (playlistId) => {
        return isPlaying && currentMusic?.playlist?.id === playlistId;
    }

    return (
        <div className="flex flex-col w-full mt-5">
            {playlists.map((item) => {
                const { id, cover, title, artists, color } = item;
                const isPlayingPlaylist = isPlaylistPlaying(id);

                return (
                    <Link
                        key={id}
                        to={`/playlist/${id}`}
                        className="flex justify-start items-center hover:bg-fill-hover h-16 rounded-sm gap-3 p-2 group relative"
                    >
                        <picture className="relative w-12 h-12">
                            <img
                                src={cover}
                                alt={title}
                                className="w-12 h-12 rounded-sm group-hover:opacity-50 transition-opacity duration-200"
                            />
                            <Button
                                variant="default"
                                size="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClick(item);
                                }}
                                className="
                                    absolute top-1/2 left-1/2 
                                    transform -translate-x-1/2 -translate-y-1/2
                                    opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-200
                                    z-2 cursor-pointer
                                    w-10 h-10 text-white
                                    flex items-center justify-center
                                "
                            >
                                {isPlayingPlaylist ? <Pause color="white" fill="white" size={20} /> : <Play color="white" fill="white" size={20} />}
                            </Button>
                        </picture>
                        <div className="text-white flex flex-col truncate">
                            <span>{title}</span>
                            <span className="text-sm text-gray-400">{artists}</span>
                        </div>
                    </Link>
                );
            })}
        </div>

    );
}

export default PlaylistCard;