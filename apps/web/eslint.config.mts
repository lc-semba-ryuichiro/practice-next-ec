import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createNextConfig } from "@practice-next-ec/eslint-config/next";
import { createReactConfig } from "@practice-next-ec/eslint-config/react";
import { createStorybookConfig } from "@practice-next-ec/eslint-config/storybook";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...createBaseConfig(import.meta.dirname),
  ...createNextConfig(),
  ...createReactConfig(),
  ...createStorybookConfig(),
  ...createTestConfig(),
]);
