/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  ignoreFiles: ["stories/**/*.css", "**/dist/**/*.css", "**/*.generated.css"],
  plugins: [
    "stylelint-order",
    "stylelint-declaration-strict-value",
    "stylelint-high-performance-animation",
  ],
  rules: {
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "theme",
          "source",
          "utility",
          "plugin",
          "custom-variant",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen", "oklch"],
      },
    ],
    "lightness-notation": null,
    "hue-degree-notation": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
    "color-function-alias-notation": null,
    "length-zero-no-unit": null,
    "rule-empty-line-before": null,
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "fill", "stroke"],
      {
        ignoreKeywords: ["currentColor", "inherit", "transparent", "initial", "none", "unset"],
      },
    ],
    "plugin/no-low-performance-animation-properties": true,
  },
};
