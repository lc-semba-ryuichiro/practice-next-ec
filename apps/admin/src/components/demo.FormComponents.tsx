import type React from "react";

import { useStore } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as ShadcnSelect from "@/components/ui/select";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { useFieldContext, useFormContext } from "@/hooks/demo.form-context";

/**
 * A button component that subscribes to form submission state.
 * @param props - The component props.
 * @param props.label - The button label text.
 * @returns The subscribe button element.
 */
export function SubscribeButton({ label }: Readonly<{ label: string }>): React.JSX.Element {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

/**
 * Displays a list of error messages.
 * @param props - The component props.
 * @param props.errors - The array of error messages to display.
 * @returns The error messages element.
 */
function ErrorMessages({
  errors,
}: Readonly<{
  errors: Array<string | { message: string }>;
}>): React.JSX.Element {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className="mt-1 font-bold text-red-500"
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </>
  );
}

/**
 * A text input field component with label and error handling.
 * @param props - The component props.
 * @param props.label - The label text for the input.
 * @param props.placeholder - The placeholder text for the input.
 * @returns The text field element.
 */
export function TextField({
  label,
  placeholder,
}: Readonly<{
  label: string;
  placeholder?: string;
}>): React.JSX.Element {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) =>
    state.meta.errors.filter((error): error is string | { message: string } => error !== undefined)
  );

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-xl font-bold"
      >
        {label}
      </Label>
      <Input
        value={field.state.value}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

/**
 * A textarea field component with label and error handling.
 * @param props - The component props.
 * @param props.label - The label text for the textarea.
 * @param props.rows - The number of visible text rows.
 * @returns The textarea element.
 */
export function TextArea({
  label,
  rows = 3,
}: Readonly<{
  label: string;
  rows?: number;
}>): React.JSX.Element {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) =>
    state.meta.errors.filter((error): error is string | { message: string } => error !== undefined)
  );

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-xl font-bold"
      >
        {label}
      </Label>
      <ShadcnTextarea
        id={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        rows={rows}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

/**
 * A select dropdown component with label and error handling.
 * @param props - The component props.
 * @param props.label - The label text for the select.
 * @param props.values - The array of options to display.
 * @param props.placeholder - The placeholder text when no option is selected.
 * @returns The select element.
 */
export function Select({
  label,
  values,
  placeholder,
}: Readonly<{
  label: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
}>): React.JSX.Element {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) =>
    state.meta.errors.filter((error): error is string | { message: string } => error !== undefined)
  );

  return (
    <div>
      <ShadcnSelect.Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value: string) => {
          field.handleChange(value);
        }}
      >
        <ShadcnSelect.SelectTrigger className="w-full">
          <ShadcnSelect.SelectValue placeholder={placeholder} />
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent>
          <ShadcnSelect.SelectGroup>
            <ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
            {values.map((value) => (
              <ShadcnSelect.SelectItem
                key={value.value}
                value={value.value}
              >
                {value.label}
              </ShadcnSelect.SelectItem>
            ))}
          </ShadcnSelect.SelectGroup>
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

/**
 * A slider component with label and error handling.
 * @param props - The component props.
 * @param props.label - The label text for the slider.
 * @returns The slider element.
 */
export function Slider({ label }: Readonly<{ label: string }>): React.JSX.Element {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) =>
    state.meta.errors.filter((error): error is string | { message: string } => error !== undefined)
  );

  return (
    <div>
      <Label
        htmlFor={label}
        className="mb-2 text-xl font-bold"
      >
        {label}
      </Label>
      <ShadcnSlider
        id={label}
        onBlur={field.handleBlur}
        value={[field.state.value]}
        onValueChange={(value: Array<number>) => {
          const firstValue = value[0];
          if (firstValue !== undefined) {
            field.handleChange(firstValue);
          }
        }}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

/**
 * A switch toggle component with label and error handling.
 * @param props - The component props.
 * @param props.label - The label text for the switch.
 * @returns The switch element.
 */
export function Switch({ label }: Readonly<{ label: string }>): React.JSX.Element {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) =>
    state.meta.errors.filter((error): error is string | { message: string } => error !== undefined)
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <ShadcnSwitch
          id={label}
          onBlur={field.handleBlur}
          checked={field.state.value}
          onCheckedChange={(checked: boolean) => {
            field.handleChange(checked);
          }}
        />
        <Label htmlFor={label}>{label}</Label>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
