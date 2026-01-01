import { allPlaylists, songs as allSongs } from "@/lib/data";

export const getPlaylistInfo = (id) => {
  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId);
  return { playlist, songs };
};