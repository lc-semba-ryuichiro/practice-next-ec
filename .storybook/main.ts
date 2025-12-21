import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../stories/**/*.mdx"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../apps/web/public"],
  viteFinal: async (viteConfig) => {
    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve?.alias,
          "@practice-next-ec/ui": path.resolve(__dirname, "../packages/ui/src"),
          "@practice-next-ec/lib": path.resolve(__dirname, "../packages/lib/src"),
          "@practice-next-ec/types": path.resolve(__dirname, "../packages/types/src"),
        },
      },
    };
  },
};
export default config;
