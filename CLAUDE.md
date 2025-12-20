# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Next.js 16 の App Router を使用した EC サイト練習プロジェクト。TypeScript と Tailwind CSS を採用し、段階的な学習ガイド（Phase 0〜18）に沿って EC サイトを構築していく。

## 開発コマンド

```bash
# 開発サーバー（ポート 3000）
pnpm dev

# ビルド
pnpm build

# リント（ESLint）
pnpm lint

# Storybook 開発モード（ポート 6006）
pnpm storybook

# Storybook 静的ビルド
pnpm build-storybook
```

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript 5.9+ (strict モード)
- **スタイリング**: Tailwind CSS 4
- **状態管理**: Jotai
- **バリデーション**: Zod 4
- **テスト**: Vitest, Playwright, Testing Library, fast-check
- **コンポーネント開発**: Storybook 10
- **パッケージマネージャー**: pnpm 10 (workspace catalog でバージョン管理)
- **ランタイム**: Node.js 24 (mise で管理)
- **UI コンポーネント**: shadcn/ui (new-york スタイル、Lucide アイコン)

## プロジェクト構成

```text
app/           # Next.js App Router のページとレイアウト
stories/       # Storybook のストーリーとコンポーネントファイル
types/         # 共有 TypeScript 型定義
lib/           # ユーティリティ関数（cn() など）
docs/          # 学習ガイド（Phase 0〜18）
.storybook/    # Storybook 設定
```

## リント設定

ESLint と oxlint の両方を使用:

- **ESLint**: `eslint.config.mjs` - Next.js core-web-vitals + TypeScript 設定
- **oxlint**: `.oxlintrc.json` - Next.js、TypeScript、React Hooks、JSX a11y ルール

## パスエイリアス

`@/*` でプロジェクトルートからインポート可能:

```typescript
import { cn } from "@/lib/utils";
import { SomeType } from "@/types/validator";
```

## shadcn/ui 設定

`components.json` で設定済み:
- スタイル: new-york
- RSC: 有効
- アイコン: lucide-react
- コンポーネント: `@/components/ui`
- ユーティリティ: `@/lib/utils` (`cn()` 関数)

## pnpm workspace

`pnpm-workspace.yaml` で全依存関係のバージョンを catalog で一元管理。`catalogMode: strict` により、catalog に定義されていないバージョンの使用を禁止。
