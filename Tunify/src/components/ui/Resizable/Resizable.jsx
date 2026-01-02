import * as React from "react"
import { Group, Panel, Separator } from "react-resizable-panels"
import LeftPanel from "@/components/layout/MusicPanel/LeftPanel/LeftPanel";
import CenterPanel from "@/components/layout/MusicPanel/CenterPanel/CenterPanel";

const Resizable = () => {
  return (
    <Group direction="horizontal" className="gap-1.5 h-full w-full bg-black">
      <Panel
        defaultSize={320}
        minSize={320}
        maxSize={450}>
        <LeftPanel />
      </Panel>
      <Panel>
        <CenterPanel />
      </Panel>
    </Group>
  );
};

export default Resizable;
