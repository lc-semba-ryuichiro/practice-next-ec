import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button.variants";

import type { VariantProps } from "class-variance-authority";

/**
 * Button component with variants.
 * @param root0 - Button props
 * @param root0.className - Additional CSS classes
 * @param root0.variant - Button variant style
 * @param root0.size - Button size
 * @param root0.asChild - Render as child component
 * @returns Button JSX element
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>): React.JSX.Element {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
