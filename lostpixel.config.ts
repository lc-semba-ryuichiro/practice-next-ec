import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: "./storybook-static",
  },

  // ローカル実行用設定
  generateOnly: true,
  failOnDifference: true,

  // スクリーンショット設定
  imagePathBaseline: ".vrt/lostpixel/baseline",
  imagePathCurrent: ".vrt/lostpixel/current",
  imagePathDifference: ".vrt/lostpixel/difference",

  // 安定化設定
  waitBeforeScreenshot: 500,
  threshold: 0.01,

  // 動的コンテンツのマスキング
  mask: [
    { selector: '[data-testid="timestamp"]' },
    { selector: '[data-testid="loading-spinner"]' },
  ],

  // CI 用設定 (Lost Pixel Platform 使用時)
  // lostPixelProjectId: process.env.LOST_PIXEL_PROJECT_ID,
  // apiKey: process.env.LOST_PIXEL_API_KEY,
};
