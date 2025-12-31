# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

Next.js 16 を使用した EC サイト練習プロジェクト。段階的な学習ガイド（Phase 0〜18）に沿って構築。pnpm モノレポ + Turborepo 構成。

## 開発コマンド

```bash
# 依存関係のインストール（pnpm のみ - preinstall hook で強制）
pnpm install

# 開発サーバー
pnpm dev                    # 全アプリを turbo 経由で起動
pnpm storybook              # Storybook（ポート 6006）

# ビルド・型チェック
pnpm build                  # 全パッケージ/アプリをビルド
pnpm typecheck              # 全パッケージの型チェック

# リント・フォーマット
pnpm lint                   # ESLint + oxlint（turbo 経由）
pnpm fix                    # 自動修正: Prettier -> ESLint -> Stylelint

# テスト
pnpm test                   # 全テスト実行（turbo 経由）
pnpm test:e2e               # Playwright E2E テスト
pnpm test:ui                # Vitest UI モード
pnpm test:coverage          # Vitest カバレッジ付き

# ビジュアルリグレッションテスト
pnpm vrt:local              # Storybook ビルド、キャプチャ、ローカル比較
pnpm vrt:chromatic          # Chromatic VRT 実行
pnpm vrt:lostpixel          # Lost Pixel VRT 実行

# 特定パッケージのテスト実行
pnpm --filter @practice-next-ec/web test
pnpm --filter @practice-next-ec/admin test
```

## モノレポ構成

```text
apps/
  web/          # Next.js 16 App Router - メイン EC サイト
  admin/        # TanStack Start + tRPC - 管理画面
docs/           # 段階的な学習ガイド（Phase 0〜18）
packages/
  ui/           # 共有 UI コンポーネント（shadcn/ui ベース）
  lib/          # 共有ユーティリティ（cn() ヘルパー）
  types/        # 共有 TypeScript 型定義
  validators/   # 共有バリデーションスキーマ
tooling/
  eslint/       # ESLint 設定（@practice-next-ec/eslint-config）
  typescript/   # TypeScript 設定（@practice-next-ec/typescript-config）
  prettier/     # Prettier 設定（@practice-next-ec/prettier-config）
  stylelint/    # Stylelint 設定（@practice-next-ec/stylelint-config）
  vitest/       # Vitest 設定（@practice-next-ec/vitest-config）
```

## アーキテクチャ

### Web アプリ（apps/web）

- Feature-Sliced Design (FSD) 採用: `app/`, `entities/`, `features/`, `pages/`, `shared/`, `widgets/`
- Next.js 16 App Router + React 19
- 状態管理: Jotai
- フォーム: react-hook-form + Zod

### Admin アプリ（apps/admin）

- TanStack Start + TanStack Router
- API レイヤー: tRPC
- TanStack Query + Table

### 共有パッケージ

- `@practice-next-ec/ui`: shadcn/ui コンポーネント（new-york スタイル）
- `@practice-next-ec/lib`: `cn()` ユーティリティ（`packages/lib/src/utils`）
- 全パッケージバージョンは `pnpm-workspace.yaml` の catalog で一元管理（strict モード）

## 技術スタック

- **ランタイム**: Node.js 24, pnpm 10（mise でバージョン管理）
- **フレームワーク**: Next.js 16 (App Router), TanStack Start
- **言語**: TypeScript 5.9+（strict モード + 追加の厳格オプション）
- **スタイリング**: Tailwind CSS 4, shadcn/ui（new-york スタイル）
- **テスト**: Vitest, Playwright, Testing Library, fast-check, pact, stryker-mutator
- **コンポーネント開発**: Storybook 10

## コーディング規約

### t-wada の TDD

絶対に t-wada の推奨する TDD に従うこと。

### TypeScript

- strict モード + `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` 有効
- 明示的な戻り値型を指定（`explicit-function-return-type`）
- インライン型インポート: `import { type Foo }` 形式（`import type { Foo }` ではない）
- Boolean 変数は `is`, `has`, `should`, `can`, `will`, `did` プレフィックス必須
- インターフェースに `I` プレフィックス禁止

### インポート順序

1. React / Next.js
2. 外部ライブラリ
3. 内部モジュール（`@/*` または `@practice-next-ec/*`）
4. 相対パス
5. 型インポート

### ファイル命名

- kebab-case または PascalCase（コンポーネント）
- default export は App Router 規約ファイル（page.tsx, layout.tsx 等）と Storybook のみ許可

## Git Hooks（Lefthook）

- **pre-commit**: Prettier フォーマットチェック
- **commit-msg**: Conventional Commits 形式（feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert）
- **pre-push**: ESLint, TypeScript, Stylelint, Secretlint, Textlint, Build（並列実行）

## shadcn/ui コンポーネントの追加

```bash
pnpm dlx shadcn@latest add button
```

コンポーネントは `packages/ui/src/components/ui/` にインストールされます。
