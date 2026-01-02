import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { PanelLeftClose, Plus } from 'lucide-react';
import PlaylistCard from "@/components/layout/PlaylistCard/PlaylistCard.jsx"
import { playlists } from "@/lib/data";

const LeftPanel = ({ children }) => {
    const [isHoveringPanel, setIsHoveringPanel] = useState(false);
    const [isHoveringIcon, setIsHoveringIcon] = useState(false);

    return (
        <div
            className=" flex flex-col pt-4 bg-fill p-4 pr-2 rounded-lg h-full"
            onMouseEnter={() => setIsHoveringPanel(true)}
            onMouseLeave={() => setIsHoveringPanel(false)}
        >
            <div className="flex justify-between items-center pr-2">
                <div className="relative">
                    <Button
                        className={`
                            text-white cursor-pointer
                            font-semibold text-md
                            transition-all duration-100 ease-in-out
                            ${isHoveringPanel ? 'pl-9' : ''}
                        `}>
                        {isHoveringPanel && (
                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2"
                                onMouseEnter={() => setIsHoveringIcon(true)}
                                onMouseLeave={() => setIsHoveringIcon(false)}
                            >
                                <PanelLeftClose
                                    className={`
                                        h-4 w-4
                                        transition-all duration-200
                                        ${isHoveringIcon
                                            ? 'text-white'
                                            : 'text-white/70'
                                        }
                                    `}
                                />
                            </div>
                        )}
                        Tu Biblioteca
                    </Button>
                </div>
                <Button
                    className="font-semibold group/plus text-white cursor-pointer hover:bg-fill-hover rounded-full px-1.5">
                    <Plus
                        className="
                        h-4 w-4
                        text-white/70
                        group-hover/plus:text-white
                        transition-colors duration-200"/>
                    Crear
                </Button>
            </div>
            <div>
                <PlaylistCard />
            </div>
        </div>
    );
};

export default LeftPanel;