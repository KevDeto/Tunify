import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LeftPanel from "../LeftPanel/LeftPanel.jsx";
import CenterPanel from "../CenterPanel/CenterPanel.jsx";
import RightPanel from "../RightPanel/RightPanel.jsx";

const ResizablePanel = () => {
    return (
    <PanelGroup direction="horizontal" className="gap-1">
        <Panel
            defaultSize={16} 
            minSize={16} 
            maxSize={23} className="rounded-md">
            <LeftPanel/>
        </Panel>
        <PanelResizeHandle />
        <Panel           
            defaultSize={50} 
            minSize={40} className="rounded-md ">
            <CenterPanel/>
        </Panel>
        <PanelResizeHandle />
        <Panel        
            defaultSize={16} 
            minSize={16} 
            maxSize={23} className="rounded-md">
            <RightPanel/>
        </Panel>
    </PanelGroup>
    );
};

export default ResizablePanel;