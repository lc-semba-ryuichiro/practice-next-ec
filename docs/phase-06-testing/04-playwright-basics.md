# Playwright 基礎

## 目次

- [概要](#概要)
- [Playwright とは](#playwright-とは)
  - [特徴](#特徴)
  - [Cypress との比較](#cypress-との比較)
- [セットアップ](#セットアップ)
  - [インストール](#インストール)
  - [設定ファイル](#設定ファイル)
- [基本構文](#基本構文)
  - [テストの構造](#テストの構造)
  - [ページナビゲーション](#ページナビゲーション)
- [ロケーター](#ロケーター)
  - [推奨されるロケーター](#推奨されるロケーター)
  - [ロケーターのチェーン](#ロケーターのチェーン)
  - [複数要素](#複数要素)
- [アクション](#アクション)
  - [クリック](#クリック)
  - [テキスト入力](#テキスト入力)
  - [キーボード操作](#キーボード操作)
  - [セレクトボックス](#セレクトボックス)
  - [チェックボックス](#チェックボックス)
- [アサーション](#アサーション)
  - [ページのアサーション](#ページのアサーション)
  - [要素のアサーション](#要素のアサーション)
- [EC サイトでの活用例](#ec-サイトでの活用例)
  - [商品閲覧フロー](#商品閲覧フロー)
  - [購入フロー](#購入フロー)
  - [検索機能](#検索機能)
- [デバッグ](#デバッグ)
  - [UI モード](#ui-モード)
  - [デバッグモード](#デバッグモード)
  - [page.pause()](#pagepause)
  - [スクリーンショット](#スクリーンショット)
  - [トレース](#トレース)
- [テストの実行](#テストの実行)
- [NG / OK パターン](#ng--ok-パターン)
  - [NG: ハードコードされた待機時間](#ng-ハードコードされた待機時間)
  - [OK: 要素の出現を待機](#ok-要素の出現を待機)
  - [NG: 不安定なセレクター](#ng-不安定なセレクター)
  - [OK: ロールベースのセレクター](#ok-ロールベースのセレクター)
- [確認質問](#確認質問)
- [次のステップ](#次のステップ)

## 概要

Playwright は Microsoft が開発した E2E（End-to-End）テストフレームワークです。
実際のブラウザを操作してアプリケーション全体をテストし、ユーザー体験のフローを確認します。

このセクションでは、Playwright を使って EC サイトの購入フローなどをテストする方法を学びます。

---

## Playwright とは

### 特徴

- Chromium、Firefox、WebKit のクロスブラウザをサポート
- 要素の表示を自動的に待機する
- テスト実行の詳細なログと動画を記録できる
- 複数のテストを同時に並列実行可能
- デバイスエミュレーションでモバイル対応

### Cypress との比較

| 特徴               | Playwright       | Cypress          |
| ------------------ | ---------------- | ---------------- |
| ブラウザ           | Chromium, FF, WK | Chromium, FF, WK |
| 並列実行           | ネイティブ       | 有料機能         |
| マルチタブ         | サポート         | 制限あり         |
| iframe             | 完全サポート     | 制限あり         |
| ネットワークモック | 強力             | 強力             |
| 実行速度           | 高速             | 中程度           |

---

## セットアップ

### インストール

```bash
pnpm add -D @playwright/test
npx playwright install
```

### 設定ファイル

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 14"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 基本構文

### テストの構造

```typescript
import { test, expect } from "@playwright/test";

test.describe("商品一覧", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("商品が表示される", async ({ page }) => {
    await expect(page.getByRole("article")).toHaveCount(10);
  });
});
```

### ページナビゲーション

```typescript
test("ページ遷移", async ({ page }) => {
  // URL に移動
  await page.goto("/products");

  // リンクをクリックして遷移
  await page.getByRole("link", { name: "カート" }).click();

  // URL を確認
  await expect(page).toHaveURL("/cart");

  // タイトルを確認
  await expect(page).toHaveTitle(/カート/);
});
```

---

## ロケーター

### 推奨されるロケーター

```typescript
// 1. getByRole - 最も推奨
page.getByRole("button", { name: "カートに追加" });
page.getByRole("heading", { level: 1 });
page.getByRole("link", { name: "トップページ" });

// 2. getByLabel - フォーム要素
page.getByLabel("メールアドレス");

// 3. getByPlaceholder
page.getByPlaceholder("検索...");

// 4. getByText - テキストコンテンツ
page.getByText("¥1,000");

// 5. getByAltText - 画像
page.getByAltText("商品画像");

// 6. getByTestId - 最終手段
page.getByTestId("cart-badge");
```

### ロケーターのチェーン

```typescript
// 親要素から絞り込む
const productCard = page.getByRole("article").first();
await productCard.getByRole("button", { name: "カートに追加" }).click();

// フィルター
page.getByRole("listitem").filter({ hasText: "Tシャツ" });
```

### 複数要素

```typescript
// 最初の要素
page.getByRole("article").first();

// 最後の要素
page.getByRole("article").last();

// n番目の要素（0始まり）
page.getByRole("article").nth(2);

// 要素数を確認
await expect(page.getByRole("article")).toHaveCount(10);
```

---

## アクション

### クリック

```typescript
// 通常のクリック
await page.getByRole("button", { name: "送信" }).click();

// ダブルクリック
await page.getByRole("button").dblclick();

// 右クリック
await page.getByRole("button").click({ button: "right" });

// 強制クリック（要素が隠れていても）
await page.getByRole("button").click({ force: true });
```

### テキスト入力

```typescript
// 入力
await page.getByLabel("メールアドレス").fill("test@example.com");

// クリア
await page.getByLabel("メールアドレス").clear();

// 1文字ずつ入力（タイピングをシミュレート）
await page.getByLabel("検索").pressSequentially("Tシャツ");
```

### キーボード操作

```typescript
// キーを押す
await page.keyboard.press("Enter");
await page.keyboard.press("Tab");
await page.keyboard.press("Escape");

// 修飾キー
await page.keyboard.press("Control+a");
await page.keyboard.press("Meta+c");
```

### セレクトボックス

```typescript
// 値で選択
await page.getByLabel("サイズ").selectOption("M");

// 複数選択
await page.getByLabel("カテゴリ").selectOption(["tops", "bottoms"]);
```

### チェックボックス

```typescript
// チェック
await page.getByLabel("利用規約に同意する").check();

// チェック解除
await page.getByLabel("利用規約に同意する").uncheck();

// 状態を確認
await expect(page.getByLabel("利用規約に同意する")).toBeChecked();
```

---

## アサーション

### ページのアサーション

```typescript
// URL
await expect(page).toHaveURL("/products");
await expect(page).toHaveURL(/\/products\/\d+/);

// タイトル
await expect(page).toHaveTitle("商品一覧 | EC サイト");
```

### 要素のアサーション

```typescript
// 可視性
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// 有効/無効
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();

// テキスト
await expect(locator).toHaveText("テキスト");
await expect(locator).toContainText("部分一致");

// 属性
await expect(locator).toHaveAttribute("href", "/cart");

// CSS クラス
await expect(locator).toHaveClass(/active/);

// 要素数
await expect(locator).toHaveCount(5);
```

---

## EC サイトでの活用例

### 商品閲覧フロー

```typescript
// e2e/product-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("商品閲覧フロー", () => {
  test("商品一覧から詳細ページへ遷移できる", async ({ page }) => {
    // 商品一覧ページへ
    await page.goto("/products");

    // 最初の商品カードをクリック
    await page.getByRole("article").first().click();

    // 詳細ページへ遷移
    await expect(page).toHaveURL(/\/products\/\d+/);

    // 商品情報が表示されている
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "カートに追加" })).toBeVisible();
  });

  test("商品をカートに追加できる", async ({ page }) => {
    await page.goto("/products/1");

    // カートに追加
    await page.getByRole("button", { name: "カートに追加" }).click();

    // 成功通知
    await expect(page.getByText("カートに追加しました")).toBeVisible();

    // カートバッジが更新
    await expect(page.getByTestId("cart-badge")).toHaveText("1");
  });
});
```

### 購入フロー

```typescript
// e2e/purchase-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("購入フロー", () => {
  test.beforeEach(async ({ page }) => {
    // 商品をカートに追加
    await page.goto("/products/1");
    await page.getByRole("button", { name: "カートに追加" }).click();
  });

  test("購入を完了できる", async ({ page }) => {
    // カートページへ
    await page.goto("/cart");

    // 購入手続きへ
    await page.getByRole("button", { name: "購入手続きへ" }).click();
    await expect(page).toHaveURL("/checkout/shipping");

    // 配送先入力
    await page.getByLabel("お名前").fill("テスト 太郎");
    await page.getByLabel("郵便番号").fill("100-0001");
    await page.getByLabel("住所").fill("東京都千代田区...");
    await page.getByRole("button", { name: "次へ" }).click();

    // 支払い方法
    await expect(page).toHaveURL("/checkout/payment");
    await page.getByLabel("クレジットカード").check();
    await page.getByRole("button", { name: "次へ" }).click();

    // 確認画面
    await expect(page).toHaveURL("/checkout/confirm");
    await page.getByRole("button", { name: "注文を確定する" }).click();

    // 完了画面
    await expect(page).toHaveURL(/\/orders\/\d+\/complete/);
    await expect(page.getByText("ご注文ありがとうございます")).toBeVisible();
  });
});
```

### 検索機能

```typescript
// e2e/search.spec.ts
import { test, expect } from "@playwright/test";

test.describe("商品検索", () => {
  test("キーワードで検索できる", async ({ page }) => {
    await page.goto("/");

    // 検索
    await page.getByRole("searchbox").fill("Tシャツ");
    await page.getByRole("button", { name: "検索" }).click();

    // 結果ページ
    await expect(page).toHaveURL(/\/search\?q=T.*シャツ/);

    // 検索結果が表示
    await expect(page.getByRole("article")).toHaveCount.greaterThan(0);
  });

  test("検索結果が0件の場合", async ({ page }) => {
    await page.goto("/search?q=存在しない商品");

    await expect(page.getByText("検索結果がありません")).toBeVisible();
  });
});
```

---

## デバッグ

### UI モード

```bash
npx playwright test --ui
```

インタラクティブな UI でテストを実行・デバッグできます。

### デバッグモード

```bash
npx playwright test --debug
```

ブラウザを開いてステップ実行できます。

### page.pause()

```typescript
test("デバッグ", async ({ page }) => {
  await page.goto("/products");

  // ここで一時停止
  await page.pause();

  await page.getByRole("article").first().click();
});
```

### スクリーンショット

```typescript
// 手動でスクリーンショット
await page.screenshot({ path: "screenshot.png" });

// フルページ
await page.screenshot({ path: "full.png", fullPage: true });
```

### トレース

```typescript
// playwright.config.ts
use: {
  trace: 'on-first-retry', // 最初のリトライ時にトレースを記録
}
```

```bash
# トレースを表示
npx playwright show-trace trace.zip
```

---

## テストの実行

```bash
# すべてのテストを実行
npx playwright test

# 特定のファイル
npx playwright test e2e/product-flow.spec.ts

# 特定のプロジェクト（ブラウザ）
npx playwright test --project=chromium

# headed モード（ブラウザを表示）
npx playwright test --headed

# レポートを表示
npx playwright show-report
```

---

## NG / OK パターン

### NG: ハードコードされた待機時間

```typescript
// NG: 固定時間待機
await page.goto("/products");
await page.waitForTimeout(3000); // 3秒待機
await page.getByRole("article").first().click();
```

### OK: 要素の出現を待機

```typescript
// OK: 要素が表示されるまで待機
await page.goto("/products");
await page.getByRole("article").first().waitFor();
await page.getByRole("article").first().click();
```

### NG: 不安定なセレクター

```typescript
// NG: クラス名やタグに依存
await page.locator(".product-card:nth-child(1) button").click();
```

### OK: ロールベースのセレクター

```typescript
// OK: アクセシビリティロールを使用
await page.getByRole("article").first().getByRole("button", { name: "カートに追加" }).click();
```

---

## 確認質問

1. E2E テストとユニットテストの使い分けはどうしますか？

   **回答例**: ユニットテストは個別の関数やコンポーネントの動作を高速にテストする。E2E テストはユーザーが実際に行う操作フロー全体をテストし、システム全体の統合が正しく動作することを確認する。E2E は実行コストが高いため、クリティカルなパスに限定して使用する。

2. `test.describe()` の役割は何ですか？

   **回答例**: 関連するテストケースをグループ化する。グループ内で `beforeEach` や `afterEach` を共有でき、テストの構造を整理できる。

3. ロケーターの優先順位は何ですか？

   **回答例**: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByText` → `getByAltText` → `getByTestId` の順で優先する。ユーザーが認識する方法に近いクエリを優先することで、アクセシビリティの問題も早期に発見できる。

4. `page.waitForTimeout()` を使わない理由は何ですか？

   固定時間の待機は不安定なテストの原因になる。ネットワーク状況やマシン性能によって必要な時間が変わるためである。代わりに `waitFor()` や要素の自動待機を使うことで、必要な時間だけ待機し、テストが安定する。

---

## 次のステップ

Playwright の基礎を学んだら、次は [playwright-bdd で Gherkin シナリオ](./05-playwright-bdd.md) で BDD スタイルのテストを学びましょう。
