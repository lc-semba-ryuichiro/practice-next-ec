# UI パッケージ貢献ガイド

このドキュメントは `@practice-next-ec/ui` パッケージ固有の開発ガイドラインです。
プロジェクト全体の貢献ガイドラインは [ルートの CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

## 目次

- [コンポーネント追加ワークフロー](#コンポーネント追加ワークフロー)
  - [shadcn/ui コンポーネントの追加](#shadcnui-コンポーネントの追加)
  - [カスタムコンポーネントの追加](#カスタムコンポーネントの追加)
- [ディレクトリ構造](#ディレクトリ構造)
- [コンポーネント設計原則](#コンポーネント設計原則)
  - [Props 設計](#props-設計)
  - [バリアント設計](#バリアント設計)
  - [合成パターン](#合成パターン)
- [スタイリング規約](#スタイリング規約)
  - [クラス結合](#クラス結合)
  - [data 属性](#data-属性)
  - [CSS 変数の使用](#css-変数の使用)
- [テスト要件](#テスト要件)
- [Storybook 要件](#storybook-要件)
- [デザイントークンの追加・変更](#デザイントークンの追加変更)
  - [トークンファイルの編集](#トークンファイルの編集)
  - [トークンの再生成](#トークンの再生成)
  - [命名規則](#命名規則)
  - [カラーコントラスト](#カラーコントラスト)

## コンポーネント追加ワークフロー

### shadcn/ui コンポーネントの追加

```bash
# プロジェクトルートから実行
pnpm dlx shadcn@latest add <component-name>

# 例: Dialog コンポーネントを追加
pnpm dlx shadcn@latest add dialog
```

追加後の作業は以下です。

1. 生成されたファイルを確認し、プロジェクト規約に合わせて調整
2. `src/index.ts` にエクスポートを追加
3. Storybookストーリーを作成
4. バリアントが複数ある場合はバリアントファイル（`*.variants.ts`）を分離

### カスタムコンポーネントの追加

1. `src/components/<component-name>/` ディレクトリを作成
2. 以下のファイルを作成
   - `<component-name>.tsx` - コンポーネント本体
   - `<component-name>.variants.ts` - バリアント定義（必要な場合）
3. `src/index.ts` にエクスポートを追加
4. Storybookストーリーを作成（`apps/admin` または `apps/web`）

## ディレクトリ構造

```text
src/
├── components/
│   └── <component-name>/
│       ├── <component-name>.tsx           # コンポーネント本体
│       └── <component-name>.variants.ts   # バリアント定義（オプション）
├── lib/
│   └── utils.ts                           # cn() 等のユーティリティ
├── styles/
│   ├── tokens.generated.css               # 生成された CSS 変数（ライト）
│   └── tokens.dark.generated.css          # 生成された CSS 変数（ダーク）
└── index.ts                               # パブリック API
```

## コンポーネント設計原則

### Props 設計

```tsx
// 良い例: Readonly + 明示的な型
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>): React.ReactElement {
  // ...
}
```

- `Readonly<T>` でイミュータブルなpropsを表現
- `React.ComponentProps<"element">` でネイティブ属性を継承
- `VariantProps<typeof variants>` でバリアント型を導出
- 明示的な戻り値型（`React.ReactElement`）を指定

### バリアント設計

バリアントは以下の基準で設計します。

| バリアント名        | 用途               |
| :------------ | :--------------- |
| `default`     | 主要アクション          |
| `secondary`   | 副次的アクション         |
| `outline`     | 軽いアクション、キャンセル    |
| `ghost`       | インラインアクション、ツールバー |
| `destructive` | 削除、危険な操作         |
| `link`        | ナビゲーション          |

サイズバリアントは次のように一貫性を保ちます。

| サイズ       | 高さ          | 用途       |
| :-------- | :---------- | :------- |
| `sm`      | 32px (h-8)  | コンパクト UI |
| `default` | 36px (h-9)  | 標準       |
| `lg`      | 40px (h-10) | 強調、タッチ対象 |

### 合成パターン

複合コンポーネントはCompound Componentsパターンを使用します。

```tsx
// 良い例: 名前空間による合成
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

// 使用例
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">タブ 1</TabsTrigger>
    <TabsTrigger value="tab2">タブ 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">コンテンツ 1</TabsContent>
  <TabsContent value="tab2">コンテンツ 2</TabsContent>
</Tabs>
```

## スタイリング規約

### クラス結合

`cn()` 関数を使用してクラスを結合します。

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", conditional && "conditional-class", className)} />
```

### data 属性

状態やバリアントをdata属性で公開します。これによりCSSセレクタやテストで活用できます。

```tsx
<button
  data-slot="button"
  data-variant={variant}
  data-size={size}
  data-loading={isLoading}
/>
```

### CSS 変数の使用

ハードコードされた色値ではなく、CSS変数を使用してください。

```tsx
// 良い例
className="bg-primary text-primary-foreground"

// 避ける
className="bg-blue-500 text-white"
```

## テスト要件

すべてのコンポーネントに以下のテストを実装してください。

1. レンダリングテスト: デフォルト状態での正常レンダリング
2. バリアントテスト: 各バリアントの適用確認
3. インタラクションテスト: クリック、キーボード操作
4. アクセシビリティテスト: ARIA属性、キーボードナビゲーション

```tsx
// button.test.tsx
describe("Button", () => {
  it("デフォルトバリアントでレンダリングされる", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "default");
  });

  it("destructive バリアントが適用される", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "destructive");
  });
});
```

## Storybook 要件

各コンポーネントに以下のストーリーを作成してください。

1. Default: デフォルト状態
2. Variants: 全バリアントの一覧
3. Sizes: 全サイズの一覧
4. States: disabled, loading等の状態
5. Playground: Controlsで全propsを操作可能

```tsx
// button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@practice-next-ec/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
```

## デザイントークンの追加・変更

### トークンファイルの編集

```text
tokens/
├── primitive/colors.json   # 新しい基本色を追加
├── neutral/colors.json     # ニュートラル色の調整
└── semantic/
    ├── colors.light.json   # ライトテーマのセマンティック定義
    └── colors.dark.json    # ダークテーマのセマンティック定義
```

### トークンの再生成

```bash
pnpm --filter @practice-next-ec/ui build:tokens
```

### 命名規則

- Primitive: `color-<hue>-<shade>`（例: `color-blue-500`）
- Semantic: `color-<purpose>[-<modifier>]`（例: `color-primary`, `color-primary-foreground`）

### カラーコントラスト

新しいカラーペアを追加する際は、WCAG 2.1 AA基準を満たしてください。

- 通常テキスト: 4.5:1以上
- 大きなテキスト（18pt以上）: 3:1以上
- UIコンポーネント: 3:1以上
