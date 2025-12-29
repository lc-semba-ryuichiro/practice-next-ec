import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createReactConfig } from "@practice-next-ec/eslint-config/react";
import { createStorybookConfig } from "@practice-next-ec/eslint-config/storybook";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";
import { tanstackConfig } from "@tanstack/eslint-config";
import { defineConfig } from "eslint/config";

// Remove conflicting options from TanStack config:
// - project option (we use projectService instead)
// - import/order and sort-imports rules (we use import-x/order instead)
const tanstackConfigFiltered = tanstackConfig.map((config) => {
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
});

export default defineConfig([
  // Ignore auto-generated files
  {
    ignores: ["src/routeTree.gen.ts", ".netlify/**"],
  },
  // TanStack base config (will be overridden by monorepo config where needed)
  ...tanstackConfigFiltered,
  // Monorepo shared configs
  ...createBaseConfig(import.meta.dirname),
  ...createReactConfig(),
  ...createStorybookConfig(),
  ...createTestConfig(),
  // Storybook config files require default exports
  {
    files: [".storybook/**/*.ts"],
    rules: {
      "import-x/no-default-export": "off",
    },
  },
]);
