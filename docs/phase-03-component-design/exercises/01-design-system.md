# 演習 1: デザインシステム構築

## 目次

- [目標](#目標)
- [完成イメージ](#完成イメージ)
- [前提条件](#前提条件)
- [ステップ 1: デザイントークンの定義](#ステップ-1-デザイントークンの定義)
  - [1.1 カラートークン](#11-カラートークン)
  - [1.2 タイポグラフィトークン](#12-タイポグラフィトークン)
  - [1.3 スペーシングトークン](#13-スペーシングトークン)
  - [1.4 トークンのエクスポート](#14-トークンのエクスポート)
- [ステップ 2: 基本コンポーネントの作成](#ステップ-2-基本コンポーネントの作成)
  - [2.1 Button コンポーネント](#21-button-コンポーネント)
  - [2.2 Badge コンポーネント](#22-badge-コンポーネント)
  - [2.3 エクスポート](#23-エクスポート)
- [ステップ 3: Storybook でドキュメント化](#ステップ-3-storybook-でドキュメント化)
  - [3.1 カラーパレットのストーリー](#31-カラーパレットのストーリー)
  - [3.2 Button のストーリー](#32-button-のストーリー)
- [確認チェックリスト](#確認チェックリスト)
- [トラブルシューティング](#トラブルシューティング)
  - [pnpm build でエラー](#pnpm-build-でエラー)
  - [Storybook でコンポーネントが見つからない](#storybook-でコンポーネントが見つからない)
  - [TypeScript のパスエイリアスエラー](#typescript-のパスエイリアスエラー)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [次の演習](#次の演習)

## 目標

EC サイト向けのデザインシステムを構築し、一貫性のある UI を実現します。

***

## 完成イメージ

```text
packages/ui/
├── src/
│   ├── tokens/              # デザイントークン
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   │
│   ├── atoms/               # 基本コンポーネント
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Badge/
│   │   └── index.ts
│   │
│   └── index.ts
│
apps/storybook/
└── stories/
    ├── tokens/
    │   └── Colors.stories.tsx
    └── atoms/
        └── Button.stories.tsx
```

***

## 前提条件

- Node.js 24 以上がインストールされていること
- pnpm がインストールされていること
- Phase 1, 2 を完了していること

***

## ステップ 1: デザイントークンの定義

デザイントークンは、色、タイポグラフィ、スペーシングなどのデザイン値を一元管理するためのものです。

### 1.1 カラートークン

```typescript
// packages/ui/src/tokens/colors.ts

/**
 * EC サイトのカラーパレット
 * Tailwind CSS のテーマと連携
 */
export const colors = {
  // プライマリカラー（ブランドカラー）
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // メイン
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // セカンダリカラー
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b", // メイン
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // アクセントカラー（CTA、セール表示など）
  accent: {
    sale: "#ef4444", // セール価格
    new: "#22c55e", // 新商品バッジ
    warning: "#f59e0b", // 在庫少バッジ
    info: "#06b6d4", // お知らせ
  },

  // セマンティックカラー
  semantic: {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },
} as const;

export type ColorToken = typeof colors;
```

### 1.2 タイポグラフィトークン

```typescript
// packages/ui/src/tokens/typography.ts

/**
 * タイポグラフィ定義
 */
export const typography = {
  // フォントファミリー
  fontFamily: {
    sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
    mono: ["var(--font-geist-mono)", "monospace"],
  },

  // フォントサイズ（rem）
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // フォントウェイト
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // 行の高さ
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

/**
 * EC サイト向けのテキストスタイル
 */
export const textStyles = {
  // 見出し
  h1: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },

  // 本文
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // 価格表示
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },
  priceOriginal: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.tight,
  },
} as const;
```

### 1.3 スペーシングトークン

```typescript
// packages/ui/src/tokens/spacing.ts

/**
 * スペーシング定義（4px 単位）
 */
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
} as const;

/**
 * コンポーネント固有のスペーシング
 */
export const componentSpacing = {
  // カード
  card: {
    padding: spacing[4],
    gap: spacing[3],
  },

  // ボタン
  button: {
    paddingX: {
      sm: spacing[3],
      md: spacing[4],
      lg: spacing[6],
    },
    paddingY: {
      sm: spacing[2],
      md: spacing[2],
      lg: spacing[3],
    },
  },

  // フォーム
  form: {
    fieldGap: spacing[4],
    labelGap: spacing[2],
  },
} as const;
```

### 1.4 トークンのエクスポート

```typescript
// packages/ui/src/tokens/index.ts
export { colors, type ColorToken } from "./colors";
export { typography, textStyles } from "./typography";
export { spacing, componentSpacing } from "./spacing";
```

***

## ステップ 2: 基本コンポーネントの作成

### 2.1 Button コンポーネント

```typescript
// packages/ui/src/atoms/Button/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

const buttonVariants = cva(
  // 基本スタイル
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // EC 固有のバリアント
        addToCart: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
        buyNow: "bg-accent-sale text-white hover:bg-accent-sale/90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, isLoading, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            読み込み中...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
```

### 2.2 Badge コンポーネント

```typescript
// packages/ui/src/atoms/Badge/Badge.tsx
import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-current",
        // EC 固有のバリアント
        new: "bg-green-500 text-white",
        sale: "bg-red-500 text-white",
        soldOut: "bg-gray-500 text-white",
        lowStock: "bg-amber-500 text-white",
        freeShipping: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
```

### 2.3 エクスポート

```typescript
// packages/ui/src/atoms/index.ts
export { Button, buttonVariants, type ButtonProps } from "./Button/Button";
export { Badge, badgeVariants, type BadgeProps } from "./Badge/Badge";
// 他のコンポーネントを追加
```

```typescript
// packages/ui/src/index.ts
// Tokens
export * from "./tokens";

// Atoms
export * from "./atoms";

// Utils
export { cn } from "./lib/utils";
```

***

## ステップ 3: Storybook でドキュメント化

### 3.1 カラーパレットのストーリー

```tsx
// apps/storybook/stories/tokens/Colors.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "@repo/ui/tokens";

function ColorPalette(): JSX.Element {
  return (
    <div className="space-y-8">
      {/* プライマリカラー */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Primary</h2>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(colors.primary).map(([shade, color]) => (
            <div
              key={shade}
              className="text-center"
            >
              <div
                className="mb-2 h-16 w-full rounded"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm font-medium">{shade}</p>
              <p className="text-xs text-gray-500">{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* アクセントカラー */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Accent (EC)</h2>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(colors.accent).map(([name, color]) => (
            <div
              key={name}
              className="text-center"
            >
              <div
                className="mb-2 h-16 w-full rounded"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-gray-500">{color}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof ColorPalette> = {
  title: "Tokens/Colors",
  component: ColorPalette,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {};
```

### 3.2 Button のストーリー

```tsx
// apps/storybook/stories/atoms/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "addToCart", "buyNow"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    fullWidth: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基本バリエーション
export const Default: Story = {
  args: {
    children: "ボタン",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

// EC 向けバリエーション
export const ECVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="addToCart">
        <ShoppingCart className="h-4 w-4" />
        カートに追加
      </Button>
      <Button variant="buyNow">今すぐ購入</Button>
      <Button
        variant="outline"
        size="icon"
      >
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ローディング状態
export const Loading: Story = {
  args: {
    children: "送信中",
    isLoading: true,
  },
};

// フル幅
export const FullWidth: Story = {
  args: {
    children: "購入手続きへ",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
```

***

## 確認チェックリスト

- [ ] `packages/ui/src/tokens/` にカラー、タイポグラフィ、スペーシングが定義されている
- [ ] `packages/ui/src/atoms/` に Button, Badge が作成されている
- [ ] Storybook でカラーパレットが表示される
- [ ] Storybook で Button の各バリエーションが確認できる
- [ ] EC 向けバリアント（addToCart, sale バッジなど）が動作する
- [ ] `pnpm build` が成功する
- [ ] `pnpm storybook` でエラーなく表示される

***

## トラブルシューティング

### pnpm build でエラー

```bash
# 依存関係の再インストール
pnpm install

# キャッシュクリア
pnpm turbo clean
```

### Storybook でコンポーネントが見つからない

```bash
# stories のパターンを確認
# .storybook/main.ts の stories 設定を確認
```

### TypeScript のパスエイリアスエラー

```json
// packages/ui/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@repo/ui/*": ["./src/*"]
    }
  }
}
```

***

## 発展課題

1. **ダークモード対応**: CSS 変数を使ってダークモードのカラーを定義する
2. **アニメーショントークン**: transition や animation の定義を追加する
3. **ブレークポイント**: レスポンシブデザイン用のトークンを定義する
4. **Tailwind 統合**: デザイントークンを Tailwind のテーマに統合する

***

## 完了条件

- [ ] すべてのチェック項目を確認した
- [ ] `pnpm storybook` でデザインシステムが確認できる
- [ ] EC サイト向けのバリアントが追加されている

***

## 次の演習

[演習 2: フォームコンポーネント群](./02-form-components.md) に進みましょう。
