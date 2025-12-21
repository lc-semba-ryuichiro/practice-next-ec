# Practice Next.js EC

React/Next.js を学習しながら EC サイトを構築するプロジェクトです。

## 目次

- [概要](#概要)
- [技術スタック](#技術スタック)
- [セットアップ](#セットアップ)
  - [前提条件](#前提条件)
  - [インストール](#インストール)
- [開発](#開発)
- [プロジェクト構成](#プロジェクト構成)
- [学習ガイド](#学習ガイド)
- [ライセンス](#ライセンス)
- [貢献](#貢献)

## 概要

このプロジェクトは、React 初心者が段階的に学習しながら本格的な EC サイトを構築することを目的としています。Phase 0〜18 の学習ガイドに沿って、基礎から応用まで体系的に学べます。

## 技術スタック

| カテゴリ        | 技術                                  |
| :---------- | :---------------------------------- |
| フレームワーク     | Next.js 16 (App Router)             |
| 言語          | TypeScript 5.9+                     |
| スタイリング      | Tailwind CSS 4, shadcn/ui           |
| 状態管理        | Jotai                               |
| バリデーション     | Zod 4                               |
| テスト         | Vitest, Playwright, Testing Library |
| コンポーネント開発   | Storybook 10                        |
| パッケージマネージャー | pnpm 10                             |
| ランタイム       | Node.js 24                          |

## セットアップ

### 前提条件

- [mise](https://mise.jdx.dev/) がインストールされていること

### インストール

```bash
# ランタイムのインストール（Node.js, pnpm）
mise install

# 依存関係のインストール
pnpm install
```

## 開発

```bash
# 開発サーバー起動（http://localhost:3000）
pnpm dev

# Storybook 起動（http://localhost:6006）
pnpm storybook

# リント
pnpm lint

# ビルド
pnpm build
```

## プロジェクト構成

```text
app/           # Next.js App Router のページとレイアウト
components/    # UI コンポーネント（shadcn/ui）
lib/           # ユーティリティ関数
stories/       # Storybook ストーリー
types/         # TypeScript 型定義
docs/          # 学習ガイド（Phase 0〜18）
```

## 学習ガイド

詳細な学習ガイドは [docs/README.md](./docs/README.md) を参照してください。

## ライセンス

[MIT](./LICENSE)

## 貢献

貢献方法については [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。
