import type React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup as UIRadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: Array<RadioOption>;
  value: string;
  onChange: (value: string) => void;
}

/**
 * RadioGroup demo component with label and options.
 * @param props - RadioGroup props
 * @param props.label - Group label text
 * @param props.name - Form field name
 * @param props.options - Array of radio options
 * @param props.value - Currently selected value
 * @param props.onChange - Change handler receiving the new value
 * @returns RadioGroup JSX element with label and options
 */
export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: Readonly<RadioGroupProps>): React.JSX.Element {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <UIRadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className="flex gap-4"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </UIRadioGroup>
    </div>
  );
}
