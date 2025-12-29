import { defineConfig, mergeConfig } from "vitest/config";
import { createBaseConfig } from "./base";

export function createReactConfig(): ReturnType<typeof defineConfig> {
  return mergeConfig(
    createBaseConfig(),
    defineConfig({
      test: {
        setupFiles: ["@testing-library/jest-dom/vitest"],
      },
    })
  );
}
