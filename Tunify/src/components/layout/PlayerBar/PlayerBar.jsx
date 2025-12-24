import React from "react";
import { PlayerControl } from "@/components/Layout/PlayerBar/PlayerControl/PlayerControl"

const PlayerBar = () => {
    return(
        <div className="bottom-0 left-0 right-0 h-25 bg-black">
            <PlayerControl />
        </div>
    );
}

export default PlayerBar;