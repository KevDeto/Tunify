import React from "react";
import { PlayerControl } from "@/components/Layout/PlayerBar/PlayerControl/PlayerControl"
import SongInfo from "./SongInfo/SongInfo";
import VolumeControl from "./VolumeControl/VolumeControl";

const PlayerBar = () => {
    return (
        <footer className="h-25">
            <div className="bottom-0 left-0 right-0 h-full px-4 py-2 bg-black grid grid-cols-3 items-center">
                <SongInfo />
                <PlayerControl />
                <VolumeControl />
            </div>
        </footer>
    );
}

export default PlayerBar;