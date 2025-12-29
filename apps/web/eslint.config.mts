import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createNextConfig } from "@practice-next-ec/eslint-config/next";
import { createReactConfig } from "@practice-next-ec/eslint-config/react";
import { createStorybookConfig } from "@practice-next-ec/eslint-config/storybook";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";
import { tanstackConfig } from "@tanstack/eslint-config";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";

import type { Linter } from "eslint";

// Remove conflicting options from TanStack config:
// - project option (we use projectService instead)
// - plugins that conflict with Next.js config (import, import-x)
// - import/order and sort-imports rules (we use import-x/order instead)
const tanstackConfigFiltered = tanstackConfig
  .map((config) => {
    let result = config;

    // Remove conflicting project parser option
    if (result.languageOptions?.parserOptions?.project) {
      const { project: _, ...restParserOptions } = result.languageOptions.parserOptions;
      result = {
        ...result,
        languageOptions: {
          ...result.languageOptions,
          parserOptions: restParserOptions,
        },
      };
    }

    // Remove conflicting import plugins (Next.js config uses its own import plugin)
    if (result.plugins) {
      const {
        import: _import,
        "import-x": _importX,
        ...restPlugins
      } = result.plugins as Record<string, unknown>;
      if (_import !== undefined || _importX !== undefined) {
        result = {
          ...result,
          plugins: restPlugins,
        };
      }
    }

    // Remove conflicting import ordering rules (we use import-x/order from monorepo config)
    if (result.rules) {
      const {
        "import/order": _importOrder,
        "sort-imports": _sortImports,
        ...restRules
      } = result.rules;
      if (_importOrder !== undefined || _sortImports !== undefined) {
        result = {
          ...result,
          rules: restRules,
        };
      }
    }

    return result;
  })
  .filter((config) => Object.keys(config).length > 0);

// Remove react-hooks plugin from react config (Next.js config already includes it)
const reactConfigFiltered = createReactConfig().map((config) => {
  if (config.plugins && "react-hooks" in config.plugins) {
    const { "react-hooks": _reactHooks, ...restPlugins } = config.plugins as Record<
      string,
      unknown
    >;
    return {
      ...config,
      plugins: restPlugins,
    };
  }
  return config;
});

/**
 * FSD (Feature-Sliced Design) Boundaries 設定
 * 依存関係ルール: app → widgets → features → entities → shared
 */
const fsdBoundariesConfig: Linter.Config = {
  plugins: { boundaries },
  settings: {
    "boundaries/elements": [
      // FSD レイヤー定義
      { type: "app", pattern: "app/**", mode: "folder" },
      { type: "widgets", pattern: "widgets/**", mode: "folder" },
      { type: "features", pattern: "features/**", mode: "folder" },
      { type: "entities", pattern: "entities/**", mode: "folder" },
      { type: "shared", pattern: "shared/**", mode: "folder" },
      // モノレポ packages
      { type: "packages-ui", pattern: "@practice-next-ec/ui" },
      { type: "packages-lib", pattern: "@practice-next-ec/lib" },
      { type: "packages-types", pattern: "@practice-next-ec/types" },
    ],
    "boundaries/ignore": [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.stories.ts",
      "**/*.stories.tsx",
      "**/*.d.ts",
    ],
  },
  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          // app は全レイヤーからインポート可能
          {
            from: "app",
            allow: [
              "widgets",
              "features",
              "entities",
              "shared",
              "packages-ui",
              "packages-lib",
              "packages-types",
            ],
          },
          // widgets は features, entities, shared からインポート可能
          {
            from: "widgets",
            allow: [
              "features",
              "entities",
              "shared",
              "packages-ui",
              "packages-lib",
              "packages-types",
            ],
          },
          // features は entities, shared からインポート可能（features 間は禁止）
          {
            from: "features",
            allow: ["entities", "shared", "packages-ui", "packages-lib", "packages-types"],
          },
          // entities は shared からのみインポート可能
          {
            from: "entities",
            allow: ["shared", "packages-ui", "packages-lib", "packages-types"],
          },
          // shared は packages からのみインポート可能
          {
            from: "shared",
            allow: ["packages-ui", "packages-lib", "packages-types"],
          },
        ],
      },
    ],
  },
};

export default defineConfig([
  // 除外設定
  {
    ignores: [".dependency-cruiser.cjs"],
  },
  // TanStack base config (will be overridden by monorepo config where needed)
  ...tanstackConfigFiltered,
  // Monorepo shared configs
  ...createBaseConfig(import.meta.dirname),
  ...createNextConfig(),
  // React config (filtered to remove react-hooks plugin which is already in Next.js config)
  ...reactConfigFiltered,
  ...createStorybookConfig(),
  ...createTestConfig(),
  // FSD Boundaries 設定（apps/web 専用）
  fsdBoundariesConfig,
]);
