import reactCompiler from "eslint-plugin-react-compiler";

import type { Linter } from "eslint";

/**
 * React-specific ESLint configuration.
 */
export function createReactConfig(): Linter.Config[] {
  return [
    // =====================
    // React Compiler
    // =====================
    {
      plugins: {
        "react-compiler": reactCompiler,
      },
      rules: {
        "react-compiler/react-compiler": "error",
      },
    },
  ];
}
