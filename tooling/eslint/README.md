# @practice-next-ec/eslint-config

モノレポ全体で共有するESLint設定パッケージです。

## 目次

- [概要](#概要)
- [エクスポートされる設定](#エクスポートされる設定)
- [使用方法](#使用方法)
- [含まれるプラグイン](#含まれるプラグイン)
  - [base](#base)
  - [react](#react)
  - [next](#next)
  - [storybook](#storybook)
  - [test](#test)
- [主要なルール](#主要なルール)
  - [TypeScript 厳格ルール](#typescript-厳格ルール)
  - [Import ルール](#import-ルール)
  - [命名規則](#命名規則)
  - [関数型プログラミング](#関数型プログラミング)
  - [セキュリティ](#セキュリティ)
  - [React / アクセシビリティ](#react--アクセシビリティ)
  - [テスト](#テスト)
- [例外ルール](#例外ルール)
  - [Next.js App Router ファイル](#nextjs-app-router-ファイル)
  - [Storybook ファイル](#storybook-ファイル)

## 概要

このパッケージは、モノレポ内の各アプリケーション・パッケージで一貫したESLint設定を適用するための共有設定を提供します。
厳格なTypeScriptルール、セキュリティ、アクセシビリティなど、高品質なコードを維持するためのルールセットが含まれています。

## エクスポートされる設定

| 設定名         | ファイル            | 説明                                                 |
| ----------- | --------------- | -------------------------------------------------- |
| `base`      | `base.mts`      | TypeScript プロジェクト向け基本設定。全パッケージで使用                  |
| `react`     | `react.mts`     | React アプリケーション向け設定。Hooks、アクセシビリティ、Compiler を含む     |
| `next`      | `next.mts`      | Next.js アプリケーション向け設定。Core Web Vitals、App Router 対応 |
| `storybook` | `storybook.mts` | Storybook ファイル（`*.stories.tsx`）向け設定                |
| `test`      | `test.mts`      | テストファイル向け設定。Vitest、Testing Library、Playwright 対応   |

## 使用方法

各アプリケーション/パッケージの `eslint.config.mts` で設定をインポートして使用します。

```typescript
// eslint.config.mts
import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createNextConfig } from "@practice-next-ec/eslint-config/next";
import { createReactConfig } from "@practice-next-ec/eslint-config/react";
import { createStorybookConfig } from "@practice-next-ec/eslint-config/storybook";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";

export default [
  ...createBaseConfig(import.meta.dirname),
  ...createReactConfig(),
  ...createNextConfig(),
  ...createStorybookConfig(),
  ...createTestConfig(),
];
```

`createBaseConfig` には `tsconfigRootDir` を渡す必要があります。通常は `import.meta.dirname` を使用します。

## 含まれるプラグイン

### base

| プラグイン                               | 用途                         |
| ----------------------------------- | -------------------------- |
| `typescript-eslint`                 | TypeScript の型チェック統合        |
| `eslint-plugin-import-x`            | import 文の順序・重複チェック         |
| `eslint-plugin-security`            | セキュリティ脆弱性の検出               |
| `eslint-plugin-unicorn`             | モダン JavaScript ベストプラクティス   |
| `eslint-plugin-eslint-comments`     | ESLint コメントの適切な使用          |
| `eslint-plugin-promise`             | Promise の正しい使用             |
| `eslint-plugin-regexp`              | 正規表現の安全性・パフォーマンス           |
| `eslint-plugin-sonarjs`             | コード品質・認知的複雑度               |
| `eslint-plugin-jsdoc`               | JSDoc コメントの検証              |
| `eslint-plugin-n`                   | Node.js 固有のルール             |
| `eslint-plugin-functional`          | 関数型プログラミング（let 禁止、イミュータブル） |
| `eslint-plugin-boundaries`          | アーキテクチャ境界の強制               |
| `eslint-plugin-strict-dependencies` | 依存関係の制御                    |
| `eslint-plugin-unused-imports`      | 未使用 import の検出・削除          |
| `eslint-plugin-neverthrow`          | Result 型のエラーハンドリング         |

### react

| プラグイン                          | 用途                |
| ------------------------------ | ----------------- |
| `eslint-plugin-react`          | React のベストプラクティス  |
| `eslint-plugin-jsx-a11y`       | アクセシビリティ（WCAG 準拠） |
| `eslint-plugin-react-hooks`    | Hooks のルール検証      |
| `eslint-plugin-react-refresh`  | Fast Refresh 互換性  |
| `eslint-plugin-react-compiler` | React Compiler 対応 |

### next

| プラグイン                | 用途                                       |
| -------------------- | ---------------------------------------- |
| `eslint-config-next` | Next.js 公式設定（Core Web Vitals、TypeScript） |

### storybook

| プラグイン                     | 用途                   |
| ------------------------- | -------------------- |
| `eslint-plugin-storybook` | Storybook のベストプラクティス |

### test

| プラグイン                           | 用途                     |
| ------------------------------- | ---------------------- |
| `@vitest/eslint-plugin`         | Vitest テストのベストプラクティス   |
| `eslint-plugin-testing-library` | Testing Library の正しい使用 |
| `eslint-plugin-jest-dom`        | jest-dom マッチャーの適切な使用   |
| `eslint-plugin-playwright`      | Playwright E2E テストのルール |

## 主要なルール

### TypeScript 厳格ルール

| ルール                             | 説明                         |
| ------------------------------- | -------------------------- |
| `no-explicit-any`               | `any` 型の使用を禁止              |
| `no-unsafe-*`                   | 型安全でない操作を禁止                |
| `strict-boolean-expressions`    | boolean コンテキストでの暗黙的な型変換を禁止 |
| `no-floating-promises`          | Promise の戻り値を無視することを禁止     |
| `explicit-function-return-type` | 関数の戻り値型を明示的に指定             |
| `switch-exhaustiveness-check`   | switch 文の網羅性チェック           |

### Import ルール

| ルール                          | 説明                                  |
| ---------------------------- | ----------------------------------- |
| `import-x/order`             | import をグループ別にアルファベット順でソート          |
| `import-x/no-default-export` | default export を禁止（named export のみ） |
| `import-x/no-cycle`          | 循環参照を禁止（最大深度 3）                     |
| `import-x/no-duplicates`     | 重複 import を禁止                       |

### 命名規則

| 対象         | ルール                                                   |
| ---------- | ----------------------------------------------------- |
| boolean 変数 | `is`, `has`, `should`, `can`, `will`, `did` プレフィックス必須 |
| 型・インターフェース | PascalCase、`I` プレフィックス禁止                              |
| ファイル名      | kebab-case または PascalCase（コンポーネント）                    |

### 関数型プログラミング

| ルール                         | 説明                               |
| --------------------------- | -------------------------------- |
| `functional/no-let`         | `let` の使用を禁止（`mut_` プレフィックスで例外可） |
| `functional/immutable-data` | データの直接変更を禁止                      |

### セキュリティ

| ルール                                    | 説明                  |
| -------------------------------------- | ------------------- |
| `security/detect-unsafe-regex`         | ReDoS 脆弱性のある正規表現を検出 |
| `security/detect-eval-with-expression` | eval の動的使用を禁止       |
| `security/detect-object-injection`     | オブジェクトインジェクションの警告   |

### React / アクセシビリティ

| ルール                             | 説明                   |
| ------------------------------- | -------------------- |
| `react-hooks/rules-of-hooks`    | Hooks のルール違反を検出      |
| `react-hooks/exhaustive-deps`   | useEffect 等の依存配列の網羅性 |
| `jsx-a11y/*`                    | WCAG 準拠のアクセシビリティチェック |
| `react-compiler/react-compiler` | React Compiler 互換性   |

### テスト

| ルール                                     | 説明                    |
| --------------------------------------- | --------------------- |
| `vitest/no-focused-tests`               | `.only` の残存を禁止        |
| `vitest/consistent-test-it`             | `it` を使用（`test` ではなく） |
| `testing-library/prefer-screen-queries` | `screen.*` クエリの使用を推奨  |
| `testing-library/prefer-user-event`     | `userEvent` の使用を推奨    |

## 例外ルール

特定のファイルパターンでは、一部ルールが緩和されます。

### Next.js App Router ファイル

対象: `app/**/page.tsx`, `app/**/layout.tsx`, `app/**/route.ts` など。

| 緩和されるルール                         | 理由                           |
| -------------------------------- | ---------------------------- |
| `import-x/no-default-export`     | Next.js は default export を要求 |
| `explicit-function-return-type`  | Next.js が型を推論                |
| `explicit-module-boundary-types` | Next.js が型を推論                |

### Storybook ファイル

対象: `**/*.stories.tsx`, `stories/**/*.tsx`

| 緩和されるルール                        | 理由                             |
| ------------------------------- | ------------------------------ |
| `import-x/no-default-export`    | Storybook は default export を使用 |
| `naming-convention`             | Story 名は自由な命名が必要               |
| `explicit-function-return-type` | Story の型は推論される                 |
