# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

Next.js 16 の App Router を使用した EC サイト練習プロジェクト。TypeScript と Tailwind CSS を採用。

## 開発コマンド

```bash
# 開発サーバー
pnpm dev

# ビルド
pnpm build

# リント
pnpm lint

# Storybook
pnpm storybook          # 開発モード (ポート 6006)
pnpm build-storybook    # 静的ビルド
```

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript 5.9+ (strict モード)
- **スタイリング**: Tailwind CSS 4
- **状態管理**: Jotai
- **バリデーション**: Zod
- **テスト**: Vitest, Playwright, Testing Library
- **コンポーネント開発**: Storybook 10
- **パッケージマネージャー**: pnpm 10 (workspace catalog でバージョン管理)
- **ランタイム**: Node.js 24 (mise で管理)

## プロジェクト構成

- `app/` - Next.js App Router のページとレイアウト
- `stories/` - Storybook のストーリーとコンポーネントファイル
- `types/` - 共有 TypeScript 型定義
- `.storybook/` - Storybook 設定

## リント

ESLint と oxlint の両方を使用:

- ESLint 設定: `eslint.config.mjs` (Next.js core-web-vitals + TypeScript)
- oxlint 設定: `.oxlintrc.json` (追加の Next.js と TypeScript ルール)

## パスエイリアス

`@/*` でプロジェクトルートからインポート可能 (例: `import { something } from "@/types/validator"`)
