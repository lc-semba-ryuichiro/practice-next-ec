import { defineConfig, mergeConfig } from "vitest/config";
import { createReactConfig } from "@practice-next-ec/vitest-config/react";

export default mergeConfig(
  createReactConfig(),
  defineConfig({
    test: {
      passWithNoTests: true,
    },
  })
);
