import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";

const ProgressBar = ({ 
  currentTime = 0, 
  duration = 200, 
  formattedCurrentTime = "0:00",
  formattedTotalTime = "0:00",
  progress = 0,
  onChange,
  disabled = false
}) => {
  const [sliderValue, setSliderValue] = useState(progress);
  const [isDragging, setIsDragging] = useState(false);
  
  // Sincronizar con prop
  useEffect(() => {
    if (!isDragging) {
      setSliderValue(progress);
    }
  }, [progress, isDragging]);

  return (
    <div className="flex items-center gap-3 w-full text-white">
      <span className='text-xs min-w-[3ch] text-right opacity-75'>
        {formattedCurrentTime}
      </span>
      
      <div className="flex-1">
        <Slider 
          value={[sliderValue]} 
          max={100} 
          step={0.1}
          disabled={disabled}
          onValueChange={onChange}
          // Simular inicio/fin del arrastre con onPointerDown/Up
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => {
            if (onChange && sliderValue !== undefined) {
              onChange([sliderValue]);
            }
            setIsDragging(false);
          }}
          className="cursor-pointer"
        />
      </div>
      
      <span className='text-xs min-w-[3ch] text-left opacity-75'>
        {formattedTotalTime}
      </span>
    </div>
  );
};

export default ProgressBar;