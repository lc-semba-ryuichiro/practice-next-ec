import type React from "react";

import { Input as UIInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

/**
 * Input demo component with label and controlled value.
 * @param props - Input props
 * @param props.label - Input label text
 * @param props.id - Input element ID
 * @param props.value - Current input value
 * @param props.onChange - Change handler receiving the new value
 * @param props.placeholder - Placeholder text
 * @param props.required - Whether input is required
 * @param props.type - Input type attribute
 * @returns Input JSX element with label
 */
export function Input({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: Readonly<InputProps>): React.JSX.Element {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <UIInput
        id={id}
        type={type}
        value={value}
        onChange={(event_) => {
          onChange(event_.target.value);
        }}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
