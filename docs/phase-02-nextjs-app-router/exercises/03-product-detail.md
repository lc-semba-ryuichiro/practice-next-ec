# 演習 3: 商品詳細ページ

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [完成イメージ](#完成イメージ)
- [ステップ 1: ディレクトリ構造](#ステップ-1-ディレクトリ構造)
  - [1.1 必要なファイル](#11-必要なファイル)
- [ステップ 2: データ取得関数](#ステップ-2-データ取得関数)
  - [2.1 商品取得関数](#21-商品取得関数)
- [ステップ 3: 商品詳細ページ](#ステップ-3-商品詳細ページ)
  - [3.1 ページコンポーネント](#31-ページコンポーネント)
- [ステップ 4: ローディング UI](#ステップ-4-ローディング-ui)
  - [4.1 ローディングコンポーネント](#41-ローディングコンポーネント)
- [ステップ 5: 404 ページ](#ステップ-5-404-ページ)
  - [5.1 not-found コンポーネント](#51-not-found-コンポーネント)
- [ステップ 6: 静的パラメータの生成（オプション）](#ステップ-6-静的パラメータの生成オプション)
- [ステップ 7: 動作確認](#ステップ-7-動作確認)
  - [7.1 確認項目](#71-確認項目)
- [確認チェックリスト](#確認チェックリスト)
- [トラブルシューティング](#トラブルシューティング)
  - [params が undefined](#params-が-undefined)
  - [notFound() が機能しない](#notfound-が機能しない)
  - [画像が表示されない](#画像が表示されない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [Phase 2 完了](#phase-2-完了)
- [次のフェーズ](#次のフェーズ)

## 目標

動的ルート `/products/[id]` を使って商品詳細ページを実装する。存在しない商品へのアクセス時は 404 ページを表示する。

***

## 前提条件

- [ ] 演習 2（商品一覧ページ）を完了していること
- [ ] 動的ルートの概念を理解していること
- [ ] `notFound()` 関数の使い方を理解していること

***

## 完成イメージ

```text
┌─────────────────────────────────────────────┐
│ [ヘッダー]                                  │
├─────────────────────────────────────────────┤
│                                             │
│  ホーム > 商品一覧 > ベーシック Tシャツ     │
│                                             │
│  ┌─────────────┐  商品名: ベーシック Tシャツ│
│  │             │  ¥2,980                    │
│  │   [画像]    │                            │
│  │             │  シンプルで着回しやすい... │
│  └─────────────┘                            │
│                                             │
│                  [カートに追加]              │
│                                             │
├─────────────────────────────────────────────┤
│ [フッター]                                  │
└─────────────────────────────────────────────┘
```

***

## ステップ 1: ディレクトリ構造

### 1.1 必要なファイル

```text
app/
└── products/
    ├── page.tsx              # 一覧（演習2で作成済み）
    ├── loading.tsx           # 一覧のローディング
    └── [id]/
        ├── page.tsx          # 詳細ページ
        ├── loading.tsx       # 詳細のローディング
        └── not-found.tsx     # 商品が見つからない
```

***

## ステップ 2: データ取得関数

### 2.1 商品取得関数

`data/products.ts` に関数を追加します。

```tsx
// data/products.ts
import type { Product } from "@/types/product";

export const products: Product[] = [
  // ... 既存のデータ
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(category: string, excludeId: string): Product[] {
  return products
    .filter((product) => product.category === category && product.id !== excludeId)
    .slice(0, 3);
}
```

> **Note**: この演習ではモックデータを使用していますが、実際のプロジェクトでは API やデータベースからデータを取得します。Phase 5 でデータ取得について詳しく学びます。

***

## ステップ 3: 商品詳細ページ

### 3.1 ページコンポーネント

`app/products/[id]/page.tsx` を作成します。

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  params: Promise<{ id: string }>;
};

// 動的メタデータ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "商品が見つかりません",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: Props): Promise<React.ReactElement> {
  const { id } = await params;
  const product = getProduct(id);

  // 商品が見つからない場合は 404
  if (!product) {
    notFound();
  }

  // 関連商品を取得
  const relatedProducts = getRelatedProducts(product.category, product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずリスト */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link
          href="/"
          className="hover:text-gray-700"
        >
          ホーム
        </Link>
        {" > "}
        <Link
          href="/products"
          className="hover:text-gray-700"
        >
          商品一覧
        </Link>
        {" > "}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* 商品詳細 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 商品画像 */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* 商品情報 */}
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          <p className="mb-6 text-3xl font-bold text-gray-900">¥{product.price.toLocaleString()}</p>

          <p className="mb-8 text-gray-600">{product.description}</p>

          {/* カテゴリ */}
          <div className="mb-8">
            <span className="text-sm text-gray-500">カテゴリ: </span>
            <Link
              href={`/categories/${product.category}`}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              {product.category}
            </Link>
          </div>

          {/* 数量選択 */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">数量</label>
            <select className="w-24 rounded border border-gray-300 px-3 py-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <option
                  key={num}
                  value={num}
                >
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* カートに追加ボタン */}
          <button className="w-full rounded-lg bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-600">
            カートに追加
          </button>
        </div>
      </div>

      {/* 関連商品 */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">関連商品</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

***

## ステップ 4: ローディング UI

### 4.1 ローディングコンポーネント

`app/products/[id]/loading.tsx` を作成します。

```tsx
// app/products/[id]/loading.tsx
export default function ProductLoading(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずのスケルトン */}
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 画像のスケルトン */}
        <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />

        {/* 情報のスケルトン */}
        <div className="space-y-4">
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-20 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="h-12 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
```

***

## ステップ 5: 404 ページ

### 5.1 not-found コンポーネント

`app/products/[id]/not-found.tsx` を作成します。

```tsx
// app/products/[id]/not-found.tsx
import Link from "next/link";

export default function ProductNotFound(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-6xl font-bold text-gray-200">404</h1>
        <h2 className="mb-4 text-2xl font-bold">商品が見つかりません</h2>
        <p className="mb-8 text-gray-600">
          お探しの商品は存在しないか、販売が終了した可能性があります。
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          >
            商品一覧へ
          </Link>
          <Link
            href="/"
            className="inline-block rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
```

***

## ステップ 6: 静的パラメータの生成（オプション）

ビルド時に静的ページを生成する場合は、`generateStaticParams` を追加します。

```tsx
// app/products/[id]/page.tsx に追加

import { products } from "@/data/products";

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return products.map((product) => ({
    id: product.id,
  }));
}
```

***

## ステップ 7: 動作確認

### 7.1 確認項目

ブラウザで以下を確認します。

**正常系:**

- [ ] `http://localhost:3000/products/1` で商品詳細が表示される
- [ ] パンくずリストが正しく表示される
- [ ] 商品画像が表示される
- [ ] 商品名、価格、説明が表示される
- [ ] 関連商品が表示される
- [ ] カテゴリリンクが機能する

**異常系:**

- [ ] `http://localhost:3000/products/999` で 404 ページが表示される
- [ ] `http://localhost:3000/products/abc` で 404 ページが表示される

**ナビゲーション:**

- [ ] 商品一覧から商品詳細に遷移できる
- [ ] 商品詳細から商品一覧に戻れる
- [ ] 関連商品から別の商品詳細に遷移できる

***

## 確認チェックリスト

- [ ] `app/products/[id]/page.tsx` を作成した
- [ ] `app/products/[id]/loading.tsx` を作成した
- [ ] `app/products/[id]/not-found.tsx` を作成した
- [ ] 動的メタデータ（`generateMetadata`）を実装した
- [ ] `notFound()` で存在しない商品を処理した
- [ ] パンくずリストを実装した
- [ ] 関連商品を表示した

***

## トラブルシューティング

### params が undefined

```text
Cannot read properties of undefined (reading 'id')
```

**解決策:**

- `params` を `await` しているか確認
- Next.js 15 以降では `params` は Promise

### notFound() が機能しない

**解決策:**

- `next/navigation` からインポートしているか確認
- `not-found.tsx` ファイルが正しい場所にあるか確認

### 画像が表示されない

**解決策:**

- 画像パスが正しいか確認
- 外部画像の場合は `next.config.ts` で許可されているか確認
- `public/` ディレクトリに画像があるか確認

***

## 発展課題

1. **画像ギャラリー**: 複数画像を切り替えて表示する
2. **カートに追加機能**: 実際にカートに商品を追加する（Phase 4 で実装）
3. **在庫表示**: 在庫状況を表示する
4. **レビュー表示**: 商品レビューを表示する
5. **SNS シェアボタン**: Twitter/Facebook シェアボタンを追加

***

## 完了条件

- [ ] `/products/[id]` で商品詳細が表示される
- [ ] 存在しない商品 ID で 404 ページが表示される
- [ ] 動的メタデータが正しく設定される
- [ ] ローディング UI が機能する
- [ ] TypeScript の型チェックを通過する
- [ ] パンくずリストが正しく表示される

***

## Phase 2 完了

お疲れ様でした。Phase 2 の全演習が完了しました。

最後に [自己チェックリスト](../checklist.md) で学習内容を振り返りましょう。

***

## 次のフェーズ

Phase 2 を完了したら、[Phase 3: コンポーネント設計パターン](../../phase-03-component-design/README.md) に進んでください。
