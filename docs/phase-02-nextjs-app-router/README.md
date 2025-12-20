# Phase 2: Next.js App Router 基礎

## 概要

このフェーズでは、Next.js 16 の App Router を使ったルーティングとレイアウトを学びます。ファイルベースのルーティングシステム、Server Components と Client Components の違い、そして EC サイトの基本的なページ構成を実装します。

---

## 難易度

2/5。

React の基礎（Phase 1）を理解していれば、App Router の概念は直感的に理解できます。

---

## 所要時間目安

約 8〜10 時間。

---

## 前提知識

- [ ] Phase 1: React 基礎を完了していること
- [ ] React コンポーネントと props の基本を理解していること
- [ ] TypeScript の基本的な型定義ができること
- [ ] HTML/CSS の基本を理解していること

---

## 学習目標

このフェーズを完了すると、以下ができるようになります。

- [ ] App Router のファイルベースルーティングを理解し、ページを作成できる
- [ ] `layout.tsx` と `page.tsx` の役割を説明し、適切に使い分けられる
- [ ] Server Components と Client Components の違いを理解し、適切に選択できる
- [ ] `loading.tsx`、`error.tsx`、`not-found.tsx` を使って UX を向上できる
- [ ] 動的ルート（`[slug]`）を使って商品詳細ページを実装できる
- [ ] `<Link>` と `<Image>` コンポーネントを使ってパフォーマンスを最適化できる

---

## 作業場所

このフェーズでは主に `apps/web` ディレクトリで作業します。

```text
apps/web/
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   ├── loading.tsx         # ローディング UI
│   ├── error.tsx           # エラー UI
│   ├── not-found.tsx       # 404 ページ
│   ├── products/
│   │   ├── page.tsx        # 商品一覧ページ
│   │   └── [id]/
│   │       └── page.tsx    # 商品詳細ページ
│   └── categories/
│       └── [slug]/
│           └── page.tsx    # カテゴリページ
└── components/
    ├── Header.tsx
    └── Footer.tsx
```

---

## 目次

- [演習問題](#演習問題)
- [関連する EC サイト機能](#関連する-ec-サイト機能)
  - [EC サイトでの活用例](#ec-サイトでの活用例)
- [使用する主要概念](#使用する主要概念)
- [推奨学習リソース](#推奨学習リソース)
  - [公式ドキュメント](#公式ドキュメント)
  - [チュートリアル](#チュートリアル)
- [自己チェックリスト](#自己チェックリスト)
  - [理解度チェック](#理解度チェック)
  - [実装チェック](#実装チェック)
- [次のフェーズ](#次のフェーズ)

## 演習問題

| 演習                                                       | 内容                          | 難易度 |
| ---------------------------------------------------------- | ----------------------------- | ------ |
| [演習 1: レイアウト実装](./exercises/01-layout.md)         | ヘッダー/フッターの実装       | 易     |
| [演習 2: 商品一覧ページ](./exercises/02-products-page.md)  | `/products` ページの実装      | 中     |
| [演習 3: 商品詳細ページ](./exercises/03-product-detail.md) | `/products/[id]` ページの実装 | 中     |

---

## 関連する EC サイト機能

このフェーズで実装する EC サイト機能を示します。

| 機能         | 対応ルート           | 説明                          |
| ------------ | -------------------- | ----------------------------- |
| トップページ | `/`                  | EC サイトのランディングページ |
| 商品一覧     | `/products`          | 全商品の一覧表示              |
| 商品詳細     | `/products/[id]`     | 個別商品の詳細情報            |
| カテゴリ     | `/categories/[slug]` | カテゴリ別商品一覧            |

### EC サイトでの活用例

```mermaid
graph TD
    subgraph "App Router ルーティング"
        TOP[/ トップページ]
        PRODUCTS[/products 商品一覧]
        DETAIL[/products/123 商品詳細]
        CATEGORY[/categories/shoes カテゴリ]
    end

    TOP --> PRODUCTS
    PRODUCTS --> DETAIL
    TOP --> CATEGORY
    CATEGORY --> DETAIL
```

---

## 使用する主要概念

| 概念              | 説明                                       | 使用場面          |
| ----------------- | ------------------------------------------ | ----------------- |
| App Router        | Next.js 13+ のルーティングシステム         | 全ページ構成      |
| Server Components | サーバーでレンダリングされるコンポーネント | データ取得、SEO   |
| Client Components | クライアントで動作するコンポーネント       | インタラクション  |
| Dynamic Routes    | `[param]` 形式の動的ルーティング           | 商品詳細ページ    |
| Layouts           | 複数ページで共有される UI                  | ヘッダー/フッター |

---

## 推奨学習リソース

### 公式ドキュメント

- [Next.js App Router](https://nextjs.org/docs/app)
- [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

### チュートリアル

- [Next.js Learn Course](https://nextjs.org/learn) - 公式の無料チュートリアル

---

## 自己チェックリスト

Phase 2 を完了する前に、以下の項目を確認してください。

### 理解度チェック

- [ ] `app/` ディレクトリ内のファイル構造がルーティングにどう対応するか説明できる
- [ ] `layout.tsx` と `page.tsx` の違いを説明できる
- [ ] Server Components と Client Components の使い分けができる
- [ ] `"use client"` ディレクティブをいつ使うか判断できる
- [ ] 動的ルートの `[param]` と `[[...slug]]` の違いを説明できる

### 実装チェック

- [ ] ヘッダーとフッターを含むレイアウトを実装した
- [ ] 商品一覧ページを実装した
- [ ] 商品詳細ページを動的ルートで実装した
- [ ] `loading.tsx` でローディング UI を実装した
- [ ] `not-found.tsx` で 404 ページを実装した

---

## 次のフェーズ

Phase 2 を完了したら、[Phase 3: コンポーネント設計パターン](../phase-03-component-design/README.md) に進んでください。

Phase 3 では、Atomic Design や Compound Components などの設計パターンを学び、より再利用可能で保守性の高いコンポーネント設計を習得します。
