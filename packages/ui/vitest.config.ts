import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import { createReactConfig } from "@practice-next-ec/vitest-config/react";

export default mergeConfig(
  createReactConfig(),
  defineConfig({
    resolve: {
      alias: {
        "@ui": resolve(__dirname, "./src"),
      },
    },
    test: {
      passWithNoTests: true,
    },
  })
);
