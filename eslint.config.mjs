// @ts-check
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import vitest from "@vitest/eslint-plugin";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import functional from "eslint-plugin-functional";
import importX from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import reactCompiler from "eslint-plugin-react-compiler";
import * as regexpPlugin from "eslint-plugin-regexp";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import storybook from "eslint-plugin-storybook";
import strictDependencies from "eslint-plugin-strict-dependencies";
import testingLibrary from "eslint-plugin-testing-library";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  // =====================
  // Global ignores
  // =====================
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
    "*.config.ts",
    ".storybook/**",
  ]),

  // =====================
  // Base configurations
  // =====================
  ...nextVitals,
  ...nextTs,

  // =====================
  // TypeScript strict rules (型チェック付き)
  // =====================
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
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
  // Node.js (Next.js 用に調整)
  // =====================
  {
    ...nodePlugin.configs["flat/recommended"],
    rules: {
      ...nodePlugin.configs["flat/recommended"].rules,
      "n/no-missing-import": "off", // TypeScript の解決に任せる
      "n/no-unsupported-features/node-builtins": "off", // Next.js 環境
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
          rules: [
            // 必要に応じてルール追加
          ],
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
      "strict-dependencies/strict-dependencies": [
        "error",
        [
          // 必要に応じてルール追加
        ],
      ],
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
    },
  },

  // =====================
  // Test files (Vitest + Testing Library)
  // =====================
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/__tests__/**"],
    plugins: {
      vitest,
      "testing-library": testingLibrary,
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

      // テストファイル用の緩和
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/naming-convention": "off",
      "import-x/no-default-export": "off",
    },
  },
]);

export default eslintConfig;
