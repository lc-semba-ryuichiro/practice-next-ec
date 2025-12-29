# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

React/Next.js を学習しながら EC サイトを構築するための Turborepo ベースのモノレポ。pnpm ワークスペースと厳格なカタログバージョニングを使用。

## よく使うコマンド

```bash
# 開発
pnpm dev                    # 全開発サーバー起動 (web: 3000, admin: 3000)
pnpm storybook              # Storybook 起動 (ポート 6006)

# ビルド & 品質チェック
pnpm build                  # 全パッケージビルド
pnpm lint                   # Turborepo 経由で ESLint 実行
pnpm typecheck              # TypeScript 型チェック
pnpm fix                    # 自動修正: prettier, eslint, stylelint

# テスト
pnpm test                   # Vitest テスト実行
pnpm test:e2e               # Playwright E2E テスト
pnpm test:ui                # Vitest UI モード

# アプリ個別実行（アプリディレクトリから実行）
cd apps/web && pnpm dev     # Next.js web アプリのみ
cd apps/admin && pnpm dev   # Vite admin アプリのみ
cd apps/admin && pnpm test  # admin テストのみ
```

## アーキテクチャ

```
apps/
├── web/                    # Next.js 16 (App Router) - EC フロントエンド
│                           # 使用: Jotai, react-hook-form, next-intl, pino
└── admin/                  # Vite + TanStack React Start - 管理画面
                            # 使用: TanStack (Router, Query, Table, Form), tRPC

packages/
├── ui/                     # 共有 shadcn/ui コンポーネント
├── lib/                    # 共有ユーティリティ関数
└── types/                  # 共有 TypeScript 型定義

tooling/
└── eslint/                 # 共有 ESLint 設定 (base, react, next, storybook, test)
```

## コードスタイル要件

### TypeScript

- ターゲット: ES2024、strict モード + `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- 関数には明示的な戻り値の型が必要
- `any` 型は使用禁止

### ESLint（厳格な設定）

- default export 禁止: named export のみ使用
- boolean 変数は `is*`, `has*`, `should*` プレフィックス必須
- import はパスグループ別にアルファベット順 (builtin → external → internal)
- `eslint-plugin-boundaries` によるアーキテクチャ境界の強制

### Prettier

- ダブルクォート、セミコロン、2 スペースインデント、100 文字幅
- ES5 スタイルの末尾カンマ
- `prettier-plugin-tailwindcss` による Tailwind クラスのソート

## パッケージ管理

- **pnpm のみ** - `preinstall` スクリプトで強制
- 全依存関係は `pnpm-workspace.yaml` の `catalog:` バージョニングを使用
- ワークスペースパッケージは `workspace:*` プロトコルを使用
- 依存関係の追加: まずカタログに追加し、`catalog:` で参照

## Git フック (Lefthook)

- **pre-commit**: Prettier チェックのみ（高速）
- **commit-msg**: Conventional Commits (commitlint)
- **pre-push**: 全 lint, typecheck, stylelint, secretlint, textlint, build, audit

## shadcn/ui コンポーネントの追加

```bash
pnpm dlx shadcn@latest add button
```

## ランタイム要件

- Node.js >= 24.12.0
- pnpm >= 10.26.2
- `mise install` で正しいバージョンをセットアップ
