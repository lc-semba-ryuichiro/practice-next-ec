import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    // packages/ui - 共有コンポーネント (コロケーション)
    "../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // apps/admin - 管理画面コンポーネント (コロケーション)
    "../apps/admin/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // apps/web - EC フロントエンドコンポーネント
    "../apps/web/app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
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
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    return {
      ...viteConfig,
      plugins: [...(viteConfig.plugins ?? []), tailwindcss()],
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve?.alias,
          "@practice-next-ec/ui": path.resolve(__dirname, "../packages/ui/src"),
          "@practice-next-ec/lib": path.resolve(__dirname, "../packages/lib/src"),
          "@practice-next-ec/types": path.resolve(__dirname, "../packages/types/src"),
          // admin app alias
          "~": path.resolve(__dirname, "../apps/admin/src"),
        },
      },
    };
  },
};
export default config;
