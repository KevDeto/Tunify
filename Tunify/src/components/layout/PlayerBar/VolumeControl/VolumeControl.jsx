import React from "react";
import { Slider } from "@/components/ui/Slider/slider"
import { icons } from "@/icons/Icons";
import { usePlayerStore } from "@/stores/usePlayerStore";

const VolumeControl = () => {
    const { volume, setVolume, audioRef } = usePlayerStore(state => state);

    const getVolumeIcon = (volume) => {
        if (volume === 0) return icons.Mute;
        if (volume < 0.3) return icons.Volume1;
        if (volume < 0.7) return icons.Volume2;
        return icons.Volume3;
    };

    return (
        <div className="text-white flex items-center gap-4 justify-self-end min-w-0 max-w-md">
            <div className="">
                {getVolumeIcon(volume)}
            </div>
            <div className="w-25 cursor-pointer relative group">
                <Slider
                    defaultValue={[volume * 100]}
                    max={100}
                    min={0}
                    onValueChange={(value) => {
                        const [newVolume] = value;
                        const volumeValue = newVolume / 100;
                        setVolume(volumeValue);
                        if (audioRef?.current) {
                            audioRef.current.volume = volumeValue;
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default VolumeControl;