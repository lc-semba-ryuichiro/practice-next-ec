import type React from "react";

import { Button as UIButton } from "@/components/ui/button";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const variantMap: Record<ButtonVariant, "default" | "secondary"> = {
  primary: "default",
  secondary: "secondary",
};

const sizeMap: Record<ButtonSize, "sm" | "default" | "lg"> = {
  small: "sm",
  medium: "default",
  large: "lg",
};

/**
 * Button demo component with simplified API.
 * @param props - Button props
 * @param props.variant - Button variant style
 * @param props.size - Button size
 * @param props.type - Button type attribute
 * @param props.onClick - Click handler
 * @param props.children - Button content
 * @returns Button JSX element
 */
export function Button({
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  children,
}: Readonly<ButtonProps>): React.JSX.Element {
  // variant と size は TypeScript の型で制約されており、
  // 外部入力を直接キーとして使用していないため安全
  /* eslint-disable security/detect-object-injection */
  return (
    <UIButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      /* eslint-enable security/detect-object-injection */
      type={type}
      onClick={onClick}
    >
      {children}
    </UIButton>
  );
}
