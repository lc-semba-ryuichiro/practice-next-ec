import type React from "react";

import { cn } from "@/lib/utils";

interface DialogProps {
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Dialog demo component (card-style container, not modal).
 * @param props - Dialog props
 * @param props.title - Dialog title text
 * @param props.footer - Footer content
 * @param props.children - Dialog body content
 * @param props.className - Additional CSS classes
 * @returns Dialog JSX element
 */
export function Dialog({
  title,
  footer,
  children,
  className,
}: Readonly<DialogProps>): React.JSX.Element {
  return (
    <div className={cn("bg-card text-card-foreground rounded-lg border shadow-lg", className)}>
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="px-6 py-4">{children}</div>
      {footer !== undefined ? <div className="bg-muted/50 border-t px-6 py-4">{footer}</div> : null}
    </div>
  );
}
