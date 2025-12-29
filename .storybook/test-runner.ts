import type { TestRunnerConfig } from "@storybook/test-runner";

const screenshotsDir = `${process.cwd()}/.vrt/storycap/__screenshots__`;

const config: TestRunnerConfig = {
  async preVisit(page) {
    // ビューポートを統一
    await page.setViewportSize({ width: 1280, height: 720 });
  },

  async postVisit(page, context) {
    // ページの安定化を待つ
    await page.waitForLoadState("networkidle");

    // スクリーンショット撮影
    const fileName = context.id.replace(/[^a-zA-Z0-9-_]/g, "-");
    await page.screenshot({
      path: `${screenshotsDir}/${fileName}.png`,
      fullPage: false,
    });
  },

  tags: {
    include: [],
    exclude: ["skip-vrt"],
  },
};

export default config;
