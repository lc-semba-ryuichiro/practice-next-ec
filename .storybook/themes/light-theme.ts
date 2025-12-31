import { create } from "storybook/theming/create";

/**
 * Light theme for Storybook UI
 */
export const lightTheme = create({
  base: "light",

  // Brand
  brandTitle: "Practice Next EC - Design System",
  brandUrl: "https://github.com/lc-semba-ryuichiro/practice-next-ec",
  brandImage: "/logo.svg",
  brandTarget: "_self",

  // Fonts
  fontBase: "var(--font-family-sans), sans-serif",
  fontCode: "var(--font-family-mono), monospace",

  // Colors
  colorPrimary: "#0017c1",
  colorSecondary: "#3460fb",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderRadius: 8,

  // Text colors
  textColor: "#333333",
  textInverseColor: "#aaaaaa",
  textMutedColor: "#767676",

  // Toolbar
  barTextColor: "#333333",
  barHoverColor: "#1a1a1a",
  barSelectedColor: "#0017c1",
  barBg: "#ffffff",

  // Button
  buttonBg: "#ffffff",
  buttonBorder: "#949494",
  booleanBg: "#767676",
  booleanSelectedBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#767676",
  inputTextColor: "#333333",
});
