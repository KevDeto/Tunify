import React, { useState } from "react";
import Button from "../../../ui/Button/Button.jsx";
import { PanelLeftClose, Plus } from 'lucide-react';

const LeftPanel = ({ children }) => {
    const [isHoveringPanel, setIsHoveringPanel] = useState(false);

    return (
        <div 
            className="h-full flex flex-col pt-4 bg-section-bg/70 p-4"
            onMouseEnter={() => setIsHoveringPanel(true)}
            onMouseLeave={() => setIsHoveringPanel(false)}
        >
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Button 
                        variant="secondary" 
                        iconPosition="left"
                        className={`
                            font-semibold
                            transition-all duration-100 ease-in-out
                            ${isHoveringPanel ? 'pl-9' : ''}
                        `}>
                        {isHoveringPanel && (
                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
                                <PanelLeftClose 
                                    className="
                                     text-white/70 h-5 w-5
                                     hover:text-white transition-all 
                                     duration-200"
                                />
                            </div>
                        )}
                        Tu Biblioteca
                    </Button>
                </div>

                <Button
                    icon={
                        <Plus 
                            className="
                             text-white/70
                             group-hover/plus:text-white 
                            transition-colors duration-200"/>
                    }
                    variant="secondary"
                    iconPosition="left"
                    className="font-semibold group/plus">
                        Crear
                </Button>
            </div>
        </div>
    );
};

export default LeftPanel;