import { Slider } from "@/components/ui/Slider/slider";
import React, { useEffect, useState } from "react";

const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!audio?.current) return;

        audio.current.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            if (audio?.current) {
                audio.current.removeEventListener("timeupdate", handleTimeUpdate);
            }
        };
    }, [audio]);

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime);
    };

    const duration = audio?.current?.duration ?? 0;

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <div className="text-white flex w-full items-center gap-2 text-[12px] pt-1">
            <span>{formatTime(currentTime)}</span>
            <div className="cursor-pointer w-full">
                <Slider
                    value={[currentTime]}
                    max={audio?.current?.duration ?? 0}
                    min={0}
                    className="group p-0"
                    onValueChange={(value) => {
                        if (audio?.current) {
                            audio.current.currentTime = value[0];
                        }
                    }}
                />
            </div>
            <span>{formatTime(duration)}</span>
        </div>
    );
}

export default SongControl;