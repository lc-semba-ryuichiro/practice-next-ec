import type React from "react";

import { Label } from "@/components/ui/label";
import { Slider as UISlider } from "@/components/ui/slider";

interface SliderProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Slider demo component with label and controlled value.
 * @param props - Slider props
 * @param props.label - Slider label text
 * @param props.id - Slider element ID
 * @param props.value - Current slider value
 * @param props.onChange - Change handler receiving the new value
 * @param props.min - Minimum value
 * @param props.max - Maximum value
 * @param props.step - Step increment
 * @returns Slider JSX element with label
 */
export function Slider({
  label,
  id,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: Readonly<SliderProps>): React.JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-muted-foreground text-sm">{value}</span>
      </div>
      <UISlider
        id={id}
        value={[value]}
        onValueChange={(values) => {
          onChange(values[0] ?? min);
        }}
        min={min}
        max={max}
        step={step}
        aria-label={label}
      />
    </div>
  );
}
