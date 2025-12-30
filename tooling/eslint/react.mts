import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import type { Linter } from "eslint";

/**
 * React-specific ESLint configuration.
 */
export function createReactConfig(): Linter.Config[] {
  return [
    // =====================
    // React (recommended + jsx-runtime)
    // =====================
    {
      ...reactPlugin.configs.flat?.recommended,
      ...reactPlugin.configs.flat?.["jsx-runtime"],
      settings: {
        react: {
          version: "detect",
        },
      },
    },

    // =====================
    // JSX A11y (Accessibility)
    // =====================
    {
      ...jsxA11y.flatConfigs.recommended,
      settings: {
        react: {
          version: "detect",
        },
      },
    },

    // =====================
    // React Hooks
    // =====================
    {
      plugins: {
        "react-hooks": reactHooks,
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
      },
    },

    // =====================
    // React Refresh
    // =====================
    {
      plugins: {
        "react-refresh": reactRefresh,
      },
      rules: {
        "react-refresh/only-export-components": [
          "warn",
          {
            allowConstantExport: true,
            allowExportNames: [
              "metadata",
              "viewport",
              "generateMetadata",
              "generateStaticParams",
              "dynamic",
              "dynamicParams",
              "revalidate",
              "fetchCache",
              "runtime",
              "preferredRegion",
              "maxDuration",
            ],
          },
        ],
      },
    },

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
