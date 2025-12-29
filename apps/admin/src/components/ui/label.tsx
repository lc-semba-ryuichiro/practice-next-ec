"use client";

import type * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

/**
 * Label component.
 * @param root0 - Label props
 * @param root0.className - Additional CSS classes
 * @returns Label JSX element
 */
function Label({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof LabelPrimitive.Root>>): React.JSX.Element {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
