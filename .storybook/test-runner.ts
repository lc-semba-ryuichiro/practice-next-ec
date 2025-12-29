import type { TestRunnerConfig } from "@storybook/test-runner";
import AxeBuilder from "@axe-core/playwright";

const screenshotsDir = `${process.cwd()}/.vrt/storycap/__screenshots__`;
const isA11yMode = process.env["A11Y_TEST"] === "true";

const config: TestRunnerConfig = {
  async preVisit(page) {
    // ビューポートを統一
    await page.setViewportSize({ width: 1280, height: 720 });
  },

  async postVisit(page, context) {
    // ページの安定化を待つ
    await page.waitForLoadState("networkidle");

    if (isA11yMode) {
      // a11y テスト: violations と incomplete を両方チェック
      const results = await new AxeBuilder({ page }).include("#storybook-root").analyze();

      const { violations, incomplete } = results;

      // violations があればエラーとして報告
      if (violations.length > 0) {
        const violationMessages = violations.map((v) => {
          const nodes = v.nodes.map((n) => `  - ${n.html}\n    ${n.failureSummary}`).join("\n");
          return `[${v.impact}] ${v.id}: ${v.description}\n${nodes}`;
        });
        throw new Error(`A11y violations in ${context.id}:\n${violationMessages.join("\n\n")}`);
      }

      // incomplete（警告）があれば出力
      if (incomplete.length > 0) {
        const incompleteMessages = incomplete.map((i) => {
          const nodes = i.nodes.map((n) => `  - ${n.html}`).join("\n");
          return `[warning] ${i.id}: ${i.description}\n${nodes}`;
        });
        console.warn(`\nA11y warnings in ${context.id}:\n${incompleteMessages.join("\n\n")}`);
      }
    } else {
      // VRT モード: スクリーンショット撮影
      const fileName = context.id.replace(/[^a-zA-Z0-9-_]/g, "-");
      await page.screenshot({
        path: `${screenshotsDir}/${fileName}.png`,
        fullPage: false,
      });
    }
  },

  tags: {
    include: [],
    exclude: ["skip-vrt"],
  },
};

export default config;
