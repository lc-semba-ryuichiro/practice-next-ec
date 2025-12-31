import neutralColors from "./neutral/colors.json";
import primitiveColors from "./primitive/colors.json";
import primitiveSpacing from "./primitive/spacing.json";
import primitiveTypography from "./primitive/typography.json";
import semanticDarkColors from "./semantic/colors.dark.json";
import semanticLightColors from "./semantic/colors.light.json";
import semanticTypography from "./semantic/typography.json";

export const tokens = {
  primitive: primitiveColors.primitive,
  semantic: primitiveColors.semantic,
  neutral: neutralColors.neutral,
  light: semanticLightColors,
  dark: semanticDarkColors,
  typography: {
    primitive: primitiveTypography.typography,
    semantic: semanticTypography.text,
  },
  spacing: primitiveSpacing.spacing,
} as const;

export type ColorTokens = typeof tokens;
export type TypographyTokens = typeof tokens.typography;
export type SpacingTokens = typeof tokens.spacing;
