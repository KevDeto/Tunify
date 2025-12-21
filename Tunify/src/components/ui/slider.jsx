import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full p-0.5 touch-none select-none items-center group cursor-pointer", className)}
      {...props}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onLostPointerCapture={() => setIsDragging(false)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      <SliderPrimitive.Track
        className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20 ">
        <SliderPrimitive.Range 
          className={cn(
            "absolute h-full bg-primary transition-colors hover:bg-hover-icon",
            (isHovering || isDragging) && "bg-hover-icon"
          )} 
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn("block h-4 w-4 rounded-full bg-white  focus-visible:outline-none ",
        "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "group-hover:opacity-100 group-hover:scale-80", "opacity-0 scale-50")}
        onBlur={() => setIsDragging(false)}
      />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }