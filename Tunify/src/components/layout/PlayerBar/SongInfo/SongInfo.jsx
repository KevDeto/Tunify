import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/Button/button";

const SongInfo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="shrink-0 w-12 h-12">
                <div className="w-full h-full bg-linear-to-br from-purple-600 to-blue-600 rounded">
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white truncate">
                    {track?.title || "Título desconocido"}
                </h4>
                <p className="text-xs text-text truncate">
                    {track?.artist || "Título desconocido"}
                </p>
            </div>

            <div className="flex items-center shrink-0">
                <Button>
                    <CirclePlus
                        className=
                        {`h-5 w-5 ${track?.isLiked ? 'fill-hover-icon text-hover-icon' : ''}`}
                    />
                </Button>
            </div>
        </div>
    );
};

export default SongInfo;