# ファイルベースルーティング

## 目次

- [概要](#概要)
- [ファイルベースルーティングとは](#ファイルベースルーティングとは)
  - [基本的な考え方](#基本的な考え方)
  - [従来のルーティングとの比較](#従来のルーティングとの比較)
- [App Router のディレクトリ構造](#app-router-のディレクトリ構造)
  - [基本構造](#基本構造)
  - [重要なルール](#重要なルール)
- [ルートセグメントの種類](#ルートセグメントの種類)
  - [1. 静的セグメント](#1-静的セグメント)
  - [2. 動的セグメント](#2-動的セグメント)
  - [3. キャッチオールセグメント](#3-キャッチオールセグメント)
  - [4. オプショナルキャッチオール](#4-オプショナルキャッチオール)
- [EC サイトでのルーティング例](#ec-サイトでのルーティング例)
- [ルートグループ](#ルートグループ)
  - [ルートグループの活用例](#ルートグループの活用例)
- [プライベートフォルダ](#プライベートフォルダ)
- [ベストプラクティス](#ベストプラクティス)
  - [1. フォルダ構造は直感的に](#1-フォルダ構造は直感的に)
  - [2. 関連ファイルはコロケーション](#2-関連ファイルはコロケーション)
  - [3. ルートグループで整理](#3-ルートグループで整理)
- [よくある間違い](#よくある間違い)
  - [1. `page.tsx` を忘れる](#1-pagetsx-を忘れる)
  - [2. フォルダ名のタイポ](#2-フォルダ名のタイポ)
  - [3. 動的セグメントの括弧忘れ](#3-動的セグメントの括弧忘れ)
- [まとめ](#まとめ)
- [次のステップ](#次のステップ)

## 概要

Next.jsのApp Routerは、**ファイルベースルーティング**を採用しています。これは、`app/` ディレクトリ内のフォルダ構造がそのままURLパスに対応するシステムです。従来のReactアプリケーションのように、ルーティング設定ファイルを書く必要がありません。

***

## ファイルベースルーティングとは

### 基本的な考え方

```mermaid
graph LR
    subgraph "ファイル構造"
        A[app/page.tsx]
        B[app/about/page.tsx]
        C[app/products/page.tsx]
    end
    subgraph "URL"
        D[/]
        E[/about]
        F[/products]
    end
    A --> D
    B --> E
    C --> F
```

フォルダを作成し、その中に `page.tsx` を配置するだけで、自動的にルートが作成されます。

### 従来のルーティングとの比較

| 項目     | 従来の React Router | Next.js App Router |
| ------ | ---------------- | ------------------ |
| ルート定義  | コードで定義           | ファイル構造で定義          |
| 設定ファイル | 必要               | 不要                 |
| 学習コスト  | 中                | 低                  |
| 可視性    | 設定を読む必要あり        | フォルダを見ればわかる        |

***

## App Router のディレクトリ構造

### 基本構造

```text
app/
├── page.tsx              # / （トップページ）
├── layout.tsx            # 全ページ共通レイアウト
├── about/
│   └── page.tsx          # /about
├── products/
│   ├── page.tsx          # /products
│   └── [id]/
│       └── page.tsx      # /products/123 など
└── categories/
    └── [slug]/
        └── page.tsx      # /categories/shoes など
```

### 重要なルール

1. **`page.tsx` が必須**: フォルダだけではルートにならない。`page.tsx` があって初めてアクセス可能
2. **フォルダ名 = パス**: `app/products/` は `/products` に対応
3. **ネスト可能**: `app/products/new/` は `/products/new` に対応

***

## ルートセグメントの種類

### 1. 静的セグメント

フォルダ名がそのままURLパスになります。

```text
app/
├── about/
│   └── page.tsx          # /about
├── contact/
│   └── page.tsx          # /contact
└── products/
    └── page.tsx          # /products
```

### 2. 動的セグメント

`[param]` 形式でフォルダを作ると、動的な値を受け取れます。

```text
app/
└── products/
    └── [id]/
        └── page.tsx      # /products/1, /products/2, /products/abc など
```

```tsx
// app/products/[id]/page.tsx
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props): Promise<React.ReactElement> {
  const { id } = await params;
  return <div>商品 ID: {id}</div>;
}
```

### 3. キャッチオールセグメント

`[...slug]` 形式で、複数のセグメントをまとめて受け取れます。

```text
app/
└── docs/
    └── [...slug]/
        └── page.tsx      # /docs/a, /docs/a/b, /docs/a/b/c など
```

```tsx
// app/docs/[...slug]/page.tsx
type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;
  // /docs/react/hooks → slug = ['react', 'hooks']
  return <div>パス: {slug.join("/")}</div>;
}
```

### 4. オプショナルキャッチオール

`[[...slug]]` 形式で、ルートセグメントも含めてマッチします。

```text
app/
└── shop/
    └── [[...slug]]/
        └── page.tsx      # /shop, /shop/a, /shop/a/b など
```

***

## EC サイトでのルーティング例

ECサイトでよく使うルート構成を示します。

```text
app/
├── page.tsx                      # / トップページ
├── products/
│   ├── page.tsx                  # /products 商品一覧
│   └── [id]/
│       └── page.tsx              # /products/123 商品詳細
├── categories/
│   └── [slug]/
│       └── page.tsx              # /categories/shoes カテゴリ別一覧
├── cart/
│   └── page.tsx                  # /cart カート
├── checkout/
│   ├── page.tsx                  # /checkout チェックアウト
│   ├── shipping/
│   │   └── page.tsx              # /checkout/shipping 配送先入力
│   └── payment/
│       └── page.tsx              # /checkout/payment 支払い
└── account/
    ├── page.tsx                  # /account マイページ
    ├── orders/
    │   ├── page.tsx              # /account/orders 注文履歴
    │   └── [id]/
    │       └── page.tsx          # /account/orders/123 注文詳細
    └── settings/
        └── page.tsx              # /account/settings 設定
```

***

## ルートグループ

`(groupName)` 形式でフォルダを作ると、URLを変えずにファイルを整理できます。

```text
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx          # /about
│   └── contact/
│       └── page.tsx          # /contact
├── (shop)/
│   ├── products/
│   │   └── page.tsx          # /products
│   └── cart/
│       └── page.tsx          # /cart
└── page.tsx                  # /
```

### ルートグループの活用例

```mermaid
graph TD
    subgraph "(marketing)"
        A[about/page.tsx]
        B[contact/page.tsx]
    end
    subgraph "(shop)"
        C[products/page.tsx]
        D[cart/page.tsx]
    end
    A --> E[/about]
    B --> F[/contact]
    C --> G[/products]
    D --> H[/cart]
```

**メリット:**

- 関連するページをグループ化できる
- グループごとに異なるレイアウトを適用できる
- URLは変わらないのでSEOに影響なし

***

## プライベートフォルダ

`_folderName` 形式でフォルダを作ると、ルーティングから除外されます。

```text
app/
├── _components/              # ルーティング対象外
│   ├── Header.tsx
│   └── Footer.tsx
├── _lib/                     # ルーティング対象外
│   └── utils.ts
└── products/
    └── page.tsx              # /products
```

**用途:**

- コンポーネントファイルの整理
- ユーティリティ関数の配置
- 内部ロジックの分離

***

## ベストプラクティス

### 1. フォルダ構造は直感的に

```text
# 良い例
app/products/[id]/page.tsx      # 商品詳細
app/categories/[slug]/page.tsx  # カテゴリ

# 避けたい例
app/p/[id]/page.tsx             # 何のページかわかりにくい
app/c/[slug]/page.tsx           # 略語は避ける
```

### 2. 関連ファイルはコロケーション

```text
app/products/
├── page.tsx                    # ページコンポーネント
├── loading.tsx                 # ローディング UI
├── error.tsx                   # エラー UI
└── _components/                # このルート専用のコンポーネント
    └── ProductGrid.tsx
```

### 3. ルートグループで整理

大規模なアプリでは、ルートグループを使って機能ごとに整理します。

```text
app/
├── (auth)/                     # 認証関連
│   ├── login/
│   └── register/
├── (main)/                     # メインコンテンツ
│   ├── products/
│   └── categories/
└── (checkout)/                 # 購入フロー
    ├── cart/
    └── payment/
```

***

## よくある間違い

### 1. `page.tsx` を忘れる

```text
# NG: page.tsx がないのでアクセスできない
app/
└── products/
    └── ProductList.tsx

# OK: page.tsx があるのでアクセスできる
app/
└── products/
    ├── page.tsx
    └── ProductList.tsx
```

### 2. フォルダ名のタイポ

```text
# NG: 大文字は一般的に避ける
app/Products/page.tsx           # /Products

# OK: 小文字のケバブケース
app/products/page.tsx           # /products
```

### 3. 動的セグメントの括弧忘れ

```text
# NG: 静的セグメントになる
app/products/id/page.tsx        # /products/id

# OK: 動的セグメント
app/products/[id]/page.tsx      # /products/123
```

***

## まとめ

| ポイント             | 説明                         |
| ---------------- | -------------------------- |
| ファイル = ルート       | `app/` 内のフォルダ構造がそのまま URL に |
| `page.tsx` が必須   | フォルダだけではルートにならない           |
| `[param]` で動的ルート | URL パラメータを受け取れる            |
| `(group)` で整理    | URL に影響せずファイルを整理           |
| `_folder` で除外    | ルーティング対象外にできる              |

***

## 次のステップ

ファイルベースルーティングを理解したら、次は [layout.tsx と page.tsx](./02-layouts.md) でレイアウトの仕組みを学びましょう。
