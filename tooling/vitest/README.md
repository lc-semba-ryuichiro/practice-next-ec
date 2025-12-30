# @practice-next-ec/vitest-config

モノレポ内で共有するVitest設定を提供するパッケージです。

## 目次

- [概要](#概要)
- [インストール](#インストール)
- [使い方](#使い方)
  - [基本設定 (base)](#基本設定-base)
  - [React 設定 (react)](#react-設定-react)
- [設定オプション](#設定オプション)
  - [基本設定 (`createBaseConfig`)](#基本設定-createbaseconfig)
  - [カバレッジ設定](#カバレッジ設定)
  - [React 設定 (`createReactConfig`)](#react-設定-createreactconfig)
- [カスタマイズ](#カスタマイズ)
- [依存パッケージ](#依存パッケージ)

## 概要

このパッケージは、モノレポ内のアプリケーションやパッケージで一貫したVitest設定を使用するためのファクトリ関数を提供します。

| エクスポート    | 用途                  |
| --------- | ------------------- |
| `./base`  | 汎用的な基本設定            |
| `./react` | React コンポーネントテスト用設定 |

## インストール

ワークスペース内のパッケージから利用する場合、`package.json` に以下を追加します。

```json
{
  "devDependencies": {
    "@practice-next-ec/vitest-config": "workspace:*"
  }
}
```

## 使い方

### 基本設定 (base)

`createBaseConfig()` は汎用的なVitest設定を返します。

```typescript
// vitest.config.ts
import { createBaseConfig } from "@practice-next-ec/vitest-config/base";

export default createBaseConfig();
```

### React 設定 (react)

`createReactConfig()` はReact Testing Libraryとjest-domマッチャーを含む設定を返します。

```typescript
// vitest.config.ts
import { createReactConfig } from "@practice-next-ec/vitest-config/react";

export default createReactConfig();
```

## 設定オプション

### 基本設定 (`createBaseConfig`)

| オプション         | 値                                                     | 説明                                       |
| ------------- | ----------------------------------------------------- | ---------------------------------------- |
| `globals`     | `true`                                                | `describe`, `it`, `expect` などをグローバルに利用可能 |
| `environment` | `"jsdom"`                                             | DOM テスト用の JSDOM 環境                       |
| `include`     | `["**/*.{test,spec}.{ts,tsx}"]`                       | テストファイルのパターン                             |
| `exclude`     | `["**/node_modules/**", "**/dist/**", "**/.next/**"]` | 除外パターン                                   |

### カバレッジ設定

| オプション      | 値                                     | 説明             |
| ---------- | ------------------------------------- | -------------- |
| `provider` | `"v8"`                                | V8 カバレッジプロバイダー |
| `reporter` | `["text", "json", "html"]`            | レポート形式         |
| `exclude`  | `["node_modules/", "**/*.d.ts", ...]` | カバレッジ計測から除外    |

### React 設定 (`createReactConfig`)

基本設定に加えて、以下が追加されます。

| オプション        | 値                                      | 説明                      |
| ------------ | -------------------------------------- | ----------------------- |
| `setupFiles` | `["@testing-library/jest-dom/vitest"]` | jest-dom マッチャーの自動セットアップ |

## カスタマイズ

`mergeConfig` を使用してプロジェクト固有の設定を追加できます。

```typescript
// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import { createReactConfig } from "@practice-next-ec/vitest-config/react";

export default mergeConfig(
  createReactConfig(),
  defineConfig({
    test: {
      // プロジェクト固有の設定
      passWithNoTests: true,
      testTimeout: 10000,
    },
  })
);
```

## 依存パッケージ

このパッケージには以下の依存関係が含まれており、利用先で個別にインストールする必要はありません。

| パッケージ                         | 用途               |
| ----------------------------- | ---------------- |
| `vitest`                      | テストランナー          |
| `jsdom`                       | DOM 環境エミュレーション   |
| `@vitest/ui`                  | Vitest UI モード    |
| `@vitest/coverage-v8`         | V8 カバレッジプロバイダー   |
| `@testing-library/react`      | React コンポーネントテスト |
| `@testing-library/dom`        | DOM テストユーティリティ   |
| `@testing-library/jest-dom`   | カスタムマッチャー        |
| `@testing-library/user-event` | ユーザーイベントシミュレーション |
