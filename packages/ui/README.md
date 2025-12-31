# @practice-next-ec/ui

モノレポ内で共有されるUIコンポーネントライブラリ。shadcn/ui（new-yorkスタイル）をベースに、デザイントークンシステムとアクセシビリティを重視した設計。

## 目次

- [パッケージの役割](#パッケージの役割)
- [使用方法](#使用方法)
  - [コンポーネントのインポート](#コンポーネントのインポート)
  - [スタイルのインポート](#スタイルのインポート)
- [コンポーネント一覧](#コンポーネント一覧)
- [デザイントークン](#デザイントークン)
  - [トークン階層](#トークン階層)
  - [トークンの使用](#トークンの使用)
  - [トークンのビルド](#トークンのビルド)
- [バリアントシステム](#バリアントシステム)
- [アクセシビリティ](#アクセシビリティ)

## パッケージの役割

このパッケージは以下の責務を持ちます。

- UIコンポーネント: Radix UIプリミティブをベースにした再利用可能なコンポーネント
- デザイントークン: カラー、スペーシング、タイポグラフィの一元管理
- バリアントシステム: class-variance-authority / tailwind-variantsによる型安全なスタイリング

## 使用方法

### コンポーネントのインポート

```tsx
import { Button, buttonVariants } from "@practice-next-ec/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@practice-next-ec/ui";
```

### スタイルのインポート

アプリケーションのエントリーポイントでトークンCSSをインポートしてください。

```tsx
// ライトテーマ（デフォルト）
import "@practice-next-ec/ui/styles/tokens.generated.css";

// ダークテーマ
import "@practice-next-ec/ui/styles/tokens.dark.generated.css";
```

## コンポーネント一覧

| コンポーネント       | 説明                     | Radix UI |
| :------------ | :--------------------- | :------: |
| `Accordion`   | 折りたたみ可能なコンテンツセクション     |    Yes   |
| `Button`      | 汎用ボタン（6 バリアント × 6 サイズ） |     -    |
| `ButtonGroup` | ボタンのグループ化              |     -    |
| `Separator`   | 視覚的な区切り線               |    Yes   |
| `Spinner`     | ローディングインジケーター          |     -    |
| `Switch`      | オン/オフトグル               |    Yes   |
| `Tabs`        | タブナビゲーション              |    Yes   |
| `Textarea`    | 複数行テキスト入力              |     -    |
| `Toggle`      | トグルボタン                 |    Yes   |
| `ToggleGroup` | 排他的/複数選択可能なトグルグループ     |    Yes   |
| `Tooltip`     | ホバー時のヒント表示             |    Yes   |

## デザイントークン

### トークン階層

```text
tokens/
├── primitive/colors.json   # 基本カラーパレット（gray-50〜950 等）
├── neutral/colors.json     # ニュートラルカラー
└── semantic/
    ├── colors.light.json   # ライトテーマのセマンティックカラー
    └── colors.dark.json    # ダークテーマのセマンティックカラー
```

- Primitive: 生のカラー値。直接使用せず、Semanticトークン経由で参照
- Semantic: 用途に基づいた命名（`background`, `foreground`, `primary`, `destructive` 等）

### トークンの使用

```tsx
// TypeScript でトークンを参照
import { tokens } from "@practice-next-ec/ui/tokens";

const primaryColor = tokens.light.primary;
```

```css
/* CSS 変数として使用 */
.custom-element {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

### トークンのビルド

```bash
pnpm --filter @practice-next-ec/ui build:tokens
```

Style Dictionaryにより `tokens/*.json` からCSS変数を生成。

## バリアントシステム

コンポーネントのスタイルバリアントは `class-variance-authority` で定義します。

```tsx
// button.variants.ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        destructive: "bg-destructive text-destructive-foreground ...",
        outline: "border border-input bg-background ...",
        secondary: "bg-secondary text-secondary-foreground ...",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

バリアント関数は単独でもエクスポートし、`asChild` パターンで活用可能です。

```tsx
import { buttonVariants } from "@practice-next-ec/ui";
import Link from "next/link";

<Link href="/signup" className={buttonVariants({ variant: "outline" })}>
  サインアップ
</Link>
```

## アクセシビリティ

すべてのコンポーネントは以下を遵守しています。

- WCAG 2.1 AA準拠: カラーコントラスト比4.5:1以上
- キーボード操作: Tab / Enter / Space / Arrowキーによる完全な操作
- スクリーンリーダー: 必要なARIA属性とrole
- フォーカス管理: 明確なフォーカスインジケーター

Radix UIプリミティブを使用するコンポーネントは、アクセシビリティが組み込まれています。
