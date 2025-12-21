import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider"

const ProgressBar = ({ 
  currentTime = 0, 
  duration = 200, 
  onChange 
}) => {
  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 w-full text-white">
      <p className='text-xs'>00:00</p>
      <Slider defaultValue={[33]} max={100} step={1} />
      <p className='text-xs'>02:00</p>
    </div>
  );
};

export default ProgressBar;