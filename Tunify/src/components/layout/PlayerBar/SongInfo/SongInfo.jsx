import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { usePlayerStore } from "@/stores/usePlayerStore";

const SongInfo = () => {
    const { currentMusic } = usePlayerStore();

    return (
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12">
                    <div className="w-full h-full bg-linear-to-br from-purple-600 to-blue-600 rounded">
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-white truncate">
                        {currentMusic?.song?.title}
                    </h4>
                    <p className="text-xs text-white truncate">
                        {currentMusic?.song?.artists}
                    </p>
                </div>
            </div>
            <div className="flex items-cente ">
                {currentMusic?.playlist !== null ?
                    <Button>
                        <CirclePlus
                            className=
                            {`h-5 w-5 text-white ${null ? 'fill-hover-icon text-hover-icon' : ''}`}
                        />
                    </Button> : ''
                }
            </div>
        </div>
    );
};

export default SongInfo;