import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import type { Linter } from "eslint";

/**
 * Next.js specific ESLint configuration.
 * Requires the 'next' package to be installed.
 */
export function createNextConfig(): Linter.Config[] {
  return [
    // =====================
    // Next.js configurations
    // =====================
    ...nextVitals,
    ...nextTs,

    // =====================
    // Next.js App Router files (default export required)
    // =====================
    {
      files: [
        "app/**/page.tsx",
        "app/**/layout.tsx",
        "app/**/loading.tsx",
        "app/**/error.tsx",
        "app/**/not-found.tsx",
        "app/**/template.tsx",
        "app/**/default.tsx",
        "app/**/route.ts",
      ],
      rules: {
        "import-x/no-default-export": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ];
}
