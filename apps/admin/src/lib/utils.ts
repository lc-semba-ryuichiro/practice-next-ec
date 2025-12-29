import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

/**
 * Combine class names with tailwind-merge.
 * @param inputs - Class values to merge
 * @returns Merged class names string
 */
export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs));
}
