import vitest from "@vitest/eslint-plugin";
import jestDom from "eslint-plugin-jest-dom";
import playwright from "eslint-plugin-playwright";
import testingLibrary from "eslint-plugin-testing-library";

import type { Linter } from "eslint";

/**
 * Test files ESLint configuration.
 * Includes Vitest and Testing Library rules.
 */
export function createTestConfig(): Linter.Config[] {
  return [
    // =====================
    // Test files (Vitest + Testing Library + jest-dom)
    // =====================
    {
      files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/__tests__/**"],
      plugins: {
        vitest,
        "testing-library": testingLibrary,
        "jest-dom": jestDom,
      },
      rules: {
        // Vitest rules
        ...vitest.configs.recommended.rules,
        "vitest/consistent-test-it": ["error", { fn: "it" }],
        "vitest/no-disabled-tests": "warn",
        "vitest/no-focused-tests": "error",
        "vitest/prefer-to-be": "error",
        "vitest/prefer-to-have-length": "error",
        "vitest/valid-expect": "error",
        "vitest/expect-expect": "error",
        "vitest/no-identical-title": "error",

        // Testing Library rules
        ...testingLibrary.configs["flat/react"].rules,
        "testing-library/await-async-queries": "error",
        "testing-library/no-await-sync-queries": "error",
        "testing-library/no-debugging-utils": "warn",
        "testing-library/no-dom-import": "error",
        "testing-library/prefer-screen-queries": "error",
        "testing-library/prefer-user-event": "error",

        // jest-dom rules
        ...jestDom.configs["flat/recommended"].rules,
      },
    },

    // =====================
    // E2E Test files (Playwright)
    // =====================
    {
      ...playwright.configs["flat/recommended"],
      files: ["**/e2e/**/*.{ts,tsx}", "**/*.e2e.{ts,tsx}"],
    },
  ];
}
