import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(() =>
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max], [value, defaultValue, min, max])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative py-1 flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative h-1 w-full grow overflow-hidden rounded-full bg-gray-800"
        )}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute h-full bg-white group-hover:bg-pink-600"
          )} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn("block h-4 w-4 rounded-full bg-white  focus-visible:outline-none ",
            "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "group-hover:opacity-100 group-hover:scale-80", "opacity-0 scale-50")} />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider }
