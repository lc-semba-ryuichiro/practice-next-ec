import neutralColors from "./neutral/colors.json";
import primitiveColors from "./primitive/colors.json";
import semanticDarkColors from "./semantic/colors.dark.json";
import semanticLightColors from "./semantic/colors.light.json";

export const tokens = {
  primitive: primitiveColors.primitive,
  semantic: primitiveColors.semantic,
  neutral: neutralColors.neutral,
  light: semanticLightColors,
  dark: semanticDarkColors,
} as const;

export type ColorTokens = typeof tokens;
