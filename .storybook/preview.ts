import "../packages/ui/src/index.css";
import "./styles/mdx.css";

import type { Preview } from "@storybook/nextjs-vite";

import { lightTheme } from "./themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "enable",
    },
    docs: {
      theme: lightTheme,
    },
    options: {
      storySort: {
        order: [
          "Documents",
          ["はじめに", "はじめかた", "*"],
          "基礎",
          ["カラー", "タイポグラフィ", "エレベーション", "*"],
          "コンポーネント",
          ["ボタン", "*"],
          "管理画面",
          ["UI", "*"],
          "*",
        ],
      },
    },
  },
};

export default preview;
