---
paths: packages/ui/**/*
---

# UI コンポーネントパッケージ規約

## 概要

shadcn/ui (new-york スタイル) + Radix UI プリミティブベースの共有UIライブラリ。

## コマンド

- コンポーネント追加: `pnpm dlx shadcn@latest add <component>`
- トークン再生成: `pnpm --filter @practice-next-ec/ui build:tokens`

## ディレクトリ構造

```text
src/components/<name>/
├── <name>.tsx           # コンポーネント本体
└── <name>.variants.ts   # バリアント定義（オプション）
```

## コンポーネント設計

- Props: `Readonly<ComponentProps<"element"> & VariantProps<typeof variants>>`
- 戻り値型: `React.ReactElement` を明示
- クラス結合: `cn()` 関数使用
- 状態公開: `data-slot`, `data-variant`, `data-size` 等の data 属性

## スタイリング

- CSS変数使用必須（`bg-primary` 等）
- ハードコード色禁止（`bg-blue-500` 等は使わない）

## バリアント基準

| variant     | 用途             |
| :---------- | :--------------- |
| default     | 主要アクション   |
| secondary   | 副次的アクション |
| outline     | キャンセル等     |
| ghost       | ツールバー等     |
| destructive | 削除・危険操作   |
| link        | ナビゲーション   |

| size    | 高さ | 用途       |
| :------ | :--- | :--------- |
| sm      | h-8  | コンパクト |
| default | h-9  | 標準       |
| lg      | h-10 | 強調       |

## アクセシビリティ

- WCAG 2.1 AA準拠（コントラスト比 4.5:1 以上）
- キーボード操作完全対応
- 必要な ARIA 属性を設定

## テスト要件

1. レンダリングテスト
2. バリアントテスト
3. インタラクションテスト
4. アクセシビリティテスト

## Storybook 要件

各コンポーネントに以下のストーリーを作成:

- Default / Variants / Sizes / States / Playground
