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

# リント（全ツール並列実行）
pnpm lint

# 型チェックのみ
pnpm typecheck

# 自動修正（Prettier → ESLint → Stylelint）
pnpm fix

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

## Git Hooks (Lefthook)

- **pre-commit**: Prettier でフォーマットチェック
- **commit-msg**: Conventional Commits 形式を強制（feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert）
- **pre-push**: ESLint, TypeScript, Stylelint, Secretlint, Textlint, Build を並列実行

## コーディング規約

### TypeScript

- `strict: true` に加え `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` 等の厳格オプション有効
- 関数には明示的な戻り値型を指定（`explicit-function-return-type`）
- 型インポートは `import { type Foo }` 形式（inline-type-imports）
- Boolean 変数は `is`, `has`, `should`, `can`, `will`, `did` プレフィックス必須
- インターフェースに `I` プレフィックス禁止

### インポート順序

1. React / Next.js
2. 外部ライブラリ
3. 内部モジュール（`@/*`）
4. 相対パス
5. 型インポート

### ファイル命名

- kebab-case または PascalCase（コンポーネント）
- default export は App Router 規約ファイル（page.tsx, layout.tsx 等）と Storybook のみ許可
