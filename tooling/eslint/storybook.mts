import storybook from "eslint-plugin-storybook";

import type { Linter } from "eslint";

/**
 * Storybook-specific ESLint configuration.
 */
export function createStorybookConfig(): Linter.Config[] {
  return [
    // =====================
    // Storybook files
    // =====================
    ...storybook.configs["flat/recommended"],
    {
      files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)", "stories/**/*.tsx"],
      rules: {
        "import-x/no-default-export": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "react/no-unescaped-entities": "off",
        // Storybook packages are installed at root level
        "n/no-extraneous-import": "off",
      },
    },
  ];
}
