import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createNextConfig } from "@practice-next-ec/eslint-config/next";
import { createReactConfig } from "@practice-next-ec/eslint-config/react";
import { createStorybookConfig } from "@practice-next-ec/eslint-config/storybook";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";
import { tanstackConfig } from "@tanstack/eslint-config";
import { defineConfig } from "eslint/config";

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

export default defineConfig([
  // TanStack base config (will be overridden by monorepo config where needed)
  ...tanstackConfigFiltered,
  // Monorepo shared configs
  ...createBaseConfig(import.meta.dirname),
  ...createNextConfig(),
  ...createReactConfig(),
  ...createStorybookConfig(),
  ...createTestConfig(),
]);
