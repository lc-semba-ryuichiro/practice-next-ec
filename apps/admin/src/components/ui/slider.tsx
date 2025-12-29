"use client";

import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

/**
 * Calculate values for slider thumbs.
 * @param value - Current value
 * @param defaultValue - Default value
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Array of values for thumbs
 */
function calculateValues(
  value: Array<number> | undefined,
  defaultValue: Array<number> | undefined,
  min: number,
  max: number
): Array<number> {
  if (Array.isArray(value)) {
    return value;
  }
  if (Array.isArray(defaultValue)) {
    return defaultValue;
  }
  return [min, max];
}

/**
 * Slider component.
 * @param root0 - Slider props
 * @param root0.className - Additional CSS classes
 * @param root0.defaultValue - Default value
 * @param root0.value - Current value
 * @param root0.min - Minimum value
 * @param root0.max - Maximum value
 * @returns Slider JSX element
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Readonly<React.ComponentProps<typeof SliderPrimitive.Root>>): React.JSX.Element {
  const sliderValues = React.useMemo(
    () => calculateValues(value, defaultValue, min, max),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue ?? [min]}
      value={value ?? defaultValue ?? [min]}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: sliderValues.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
