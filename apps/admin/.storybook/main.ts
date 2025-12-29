import type { StorybookConfig } from "@storybook/react-vite";
import type { InlineConfig } from "vite";

/** Storybook configuration for the admin app. */
export const storybookConfig: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config): Promise<InlineConfig> {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    config.plugins = config.plugins ?? [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default storybookConfig;
