import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import boundaries from "eslint-plugin-boundaries";
import functional from "eslint-plugin-functional";
import importX from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import * as regexpPlugin from "eslint-plugin-regexp";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import strictDependencies from "eslint-plugin-strict-dependencies";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

import type { Linter } from "eslint";

/**
 * Base ESLint configuration shared across all packages.
 * Does not include Next.js specific rules.
 */
export function createBaseConfig(tsconfigRootDir: string): Linter.Config[] {
  return [
    // =====================
    // Global ignores
    // =====================
    globalIgnores([
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "storybook-static/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.mts",
      "*.config.ts",
    ]),

    // =====================
    // TypeScript strict rules
    // =====================
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        // 厳格な型安全ルール
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowString: true,
            allowNumber: false,
            allowNullableObject: true,
            allowNullableBoolean: false,
            allowNullableString: true,
            allowNullableNumber: false,
            allowAny: false,
          },
        ],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/naming-convention": [
          "error",
          // Boolean 変数は is/has/should 等で始める
          {
            selector: "variable",
            types: ["boolean"],
            format: ["PascalCase"],
            prefix: ["is", "has", "should", "can", "will", "did"],
          },
          // 型は PascalCase
          {
            selector: "typeLike",
            format: ["PascalCase"],
          },
          // インターフェースに I プレフィックスは付けない
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: {
              regex: "^I[A-Z]",
              match: false,
            },
          },
        ],
      },
    },

    // =====================
    // Import rules
    // =====================
    {
      plugins: {
        "import-x": importX,
      },
      rules: {
        "import-x/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              ["parent", "sibling"],
              "index",
              "object",
              "type",
            ],
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            pathGroups: [
              {
                pattern: "react",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "next/**",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "@/**",
                group: "internal",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: ["react", "next"],
          },
        ],
        "import-x/no-duplicates": "error",
        "import-x/no-cycle": ["error", { maxDepth: 3 }],
        "import-x/no-self-import": "error",
        "import-x/no-useless-path-segments": "error",
        "import-x/first": "error",
        "import-x/newline-after-import": "error",
        "import-x/no-mutable-exports": "error",
        "import-x/no-default-export": "error",
      },
    },

    // =====================
    // Security rules
    // =====================
    {
      plugins: {
        security,
      },
      rules: {
        "security/detect-object-injection": "warn",
        "security/detect-non-literal-regexp": "warn",
        "security/detect-unsafe-regex": "error",
        "security/detect-buffer-noassert": "error",
        "security/detect-eval-with-expression": "error",
        "security/detect-no-csrf-before-method-override": "error",
        "security/detect-possible-timing-attacks": "warn",
      },
    },

    // =====================
    // Unicorn (modern JS best practices)
    // =====================
    {
      plugins: {
        unicorn,
      },
      rules: {
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-module": "error",
        "unicorn/no-null": "off", // React では null を使う
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              kebabCase: true,
              pascalCase: true, // React コンポーネント用
            },
          },
        ],
        "unicorn/prevent-abbreviations": [
          "error",
          {
            allowList: {
              props: true,
              Props: true,
              ref: true,
              Ref: true,
              args: true,
              params: true,
              Params: true,
              env: true,
              Env: true,
              utils: true,
            },
          },
        ],
        "unicorn/no-array-reduce": "off",
        "unicorn/no-useless-undefined": "off", // TypeScript と相性悪い
      },
    },

    // =====================
    // ESLint Comments
    // =====================
    comments.recommended,

    // =====================
    // Promise
    // =====================
    pluginPromise.configs["flat/recommended"],

    // =====================
    // Regexp
    // =====================
    regexpPlugin.configs["flat/recommended"],

    // =====================
    // SonarJS
    // =====================
    sonarjs.configs.recommended,

    // =====================
    // JSDoc (TypeScript)
    // =====================
    jsdoc.configs["flat/recommended-typescript"],

    // =====================
    // Node.js
    // =====================
    {
      ...nodePlugin.configs["flat/recommended"],
      rules: {
        ...nodePlugin.configs["flat/recommended"].rules,
        "n/no-missing-import": "off", // TypeScript の解決に任せる
        "n/no-unsupported-features/node-builtins": "off",
      },
    },

    // =====================
    // Functional (選択的ルール)
    // =====================
    {
      plugins: { functional },
      rules: {
        "functional/no-let": "warn",
        "functional/prefer-readonly-type": "off", // TypeScript の readonly を使用
      },
    },

    // =====================
    // Boundaries (アーキテクチャ境界)
    // =====================
    {
      plugins: { boundaries },
      settings: {
        "boundaries/elements": [
          { type: "app", pattern: "app/*" },
          { type: "components", pattern: "components/*" },
          { type: "lib", pattern: "lib/*" },
          { type: "types", pattern: "types/*" },
        ],
      },
      rules: {
        "boundaries/element-types": [
          "error",
          {
            default: "allow",
            rules: [],
          },
        ],
      },
    },

    // =====================
    // Strict Dependencies (依存関係制御)
    // =====================
    {
      plugins: { "strict-dependencies": strictDependencies },
      rules: {
        "strict-dependencies/strict-dependencies": ["error", []],
      },
    },

    // =====================
    // Unused Imports
    // =====================
    {
      plugins: { "unused-imports": unusedImports },
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
      },
    },
  ];
}
