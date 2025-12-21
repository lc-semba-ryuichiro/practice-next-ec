# 演習 2: 商品一覧ページ

## 目標

`/products` ルートに商品一覧ページを実装し、商品カードを表示する。ローディング状態と 404 ページも実装する。

---

## 前提条件

- [ ] 演習 1（レイアウト実装）を完了していること
- [ ] `layout.tsx` でヘッダー/フッターが表示されていること

---

## 完成イメージ

```text
┌─────────────────────────────────────────────┐
│ [ヘッダー]                                  │
├─────────────────────────────────────────────┤
│                                             │
│  商品一覧                                   │
│                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ [画像]  │ │ [画像]  │ │ [画像]  │       │
│  │ 商品名  │ │ 商品名  │ │ 商品名  │       │
│  │ ¥1,000  │ │ ¥2,000  │ │ ¥3,000  │       │
│  └─────────┘ └─────────┘ └─────────┘       │
│                                             │
├─────────────────────────────────────────────┤
│ [フッター]                                  │
└─────────────────────────────────────────────┘
```

---

## ステップ 1: モックデータの作成

### 1.1 型定義

`types/product.ts` を作成します。

```tsx
// types/product.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
};
```

### 1.2 モックデータ

`data/products.ts` を作成します。

```tsx
// data/products.ts
import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "ベーシック Tシャツ",
    price: 2980,
    description: "シンプルで着回しやすいTシャツ",
    imageUrl: "/images/products/tshirt-1.jpg",
    category: "shirts",
  },
  {
    id: "2",
    name: "スリムフィット デニム",
    price: 7980,
    description: "スタイリッシュなスリムフィットデニム",
    imageUrl: "/images/products/pants-1.jpg",
    category: "pants",
  },
  {
    id: "3",
    name: "レザースニーカー",
    price: 12800,
    description: "上質なレザーを使用したスニーカー",
    imageUrl: "/images/products/shoes-1.jpg",
    category: "shoes",
  },
  {
    id: "4",
    name: "オーバーサイズ パーカー",
    price: 5980,
    description: "トレンドのオーバーサイズシルエット",
    imageUrl: "/images/products/hoodie-1.jpg",
    category: "shirts",
  },
  {
    id: "5",
    name: "チノパンツ",
    price: 4980,
    description: "ビジネスカジュアルにも使えるチノパン",
    imageUrl: "/images/products/pants-2.jpg",
    category: "pants",
  },
  {
    id: "6",
    name: "キャンバススニーカー",
    price: 6980,
    description: "軽量で履き心地の良いキャンバス素材",
    imageUrl: "/images/products/shoes-2.jpg",
    category: "shoes",
  },
];
```

---

## ステップ 2: 商品カードコンポーネント

### 2.1 ファイル作成

`components/product/ProductCard.tsx` を作成します。

```tsx
// components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props): React.ReactElement {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
    >
      {/* 商品画像 */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* 商品情報 */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">¥{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
```

### 2.2 画像のプレースホルダー

実際の画像がない場合は、プレースホルダーを使用します。

`next.config.ts` に外部画像ドメインを追加します（プレースホルダー画像用）。

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
```

モックデータの `imageUrl` を更新します。

```tsx
imageUrl: "https://via.placeholder.com/400x400?text=Product",
```

---

## ステップ 3: 商品一覧ページ

### 3.1 ディレクトリ作成

```text
app/
└── products/
    ├── page.tsx
    └── loading.tsx
```

### 3.2 ページコンポーネント

`app/products/page.tsx` を作成します。

```tsx
// app/products/page.tsx
import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "商品一覧",
  description: "全商品の一覧ページです。",
};

export default function ProductsPage(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">商品一覧</h1>

      {/* 商品数 */}
      <p className="mb-6 text-gray-600">{products.length} 件の商品</p>

      {/* 商品グリッド */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## ステップ 4: ローディング UI

### 4.1 ローディングコンポーネント

`app/products/loading.tsx` を作成します。

```tsx
// app/products/loading.tsx
export default function ProductsLoading(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* タイトルのスケルトン */}
      <div className="mb-8 h-9 w-32 animate-pulse rounded bg-gray-200" />

      {/* 商品数のスケルトン */}
      <div className="mb-6 h-5 w-24 animate-pulse rounded bg-gray-200" />

      {/* 商品グリッドのスケルトン */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border bg-white"
          >
            {/* 画像のスケルトン */}
            <div className="aspect-square animate-pulse bg-gray-200" />

            {/* テキストのスケルトン */}
            <div className="space-y-3 p-4">
              <div className="h-5 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4.2 ローディングの確認

ローディング UI を確認するには、一時的にデータ取得を遅延させます。

```tsx
// app/products/page.tsx
// 開発時のみ：ローディング確認用
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function ProductsPage(): Promise<React.ReactElement> {
  // 開発時のみ：2秒遅延
  await delay(2000);

  return (
    // ... 既存のコード
  );
}
```

---

## ステップ 5: not-found ページ

### 5.1 404 ページ

`app/products/not-found.tsx` を作成します。

```tsx
// app/products/not-found.tsx
import Link from "next/link";

export default function ProductsNotFound(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold">商品が見つかりません</h2>
      <p className="mb-8 text-gray-600">お探しの商品は存在しないか、削除された可能性があります。</p>
      <Link
        href="/products"
        className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
      >
        商品一覧に戻る
      </Link>
    </div>
  );
}
```

---

## ステップ 6: 動作確認

### 6.1 確認項目

ブラウザで `http://localhost:3000/products` を開き、以下を確認します。

- [ ] 商品一覧が表示されている
- [ ] 各商品カードに画像、名前、説明、価格が表示されている
- [ ] 商品カードにホバーするとエフェクトが適用される
- [ ] 商品カードをクリックすると `/products/[id]` に遷移する（まだ 404）
- [ ] ローディング中にスケルトン UI が表示される

---

## 確認チェックリスト

- [ ] `types/product.ts` を作成した
- [ ] `data/products.ts` にモックデータを作成した
- [ ] `components/product/ProductCard.tsx` を作成した
- [ ] `app/products/page.tsx` を作成した
- [ ] `app/products/loading.tsx` を作成した
- [ ] `app/products/not-found.tsx` を作成した
- [ ] 商品一覧が正しく表示される

---

## トラブルシューティング

### 画像が表示されない

**解決策:**

1. `public/images/products/` ディレクトリを作成
2. 画像ファイルを配置するか、プレースホルダー URL を使用
3. 外部画像の場合は `next.config.ts` で許可

### TypeScript エラー

```text
Type '{ product: Product; }' is not assignable to type...
```

**解決策:**

- 型定義ファイルが正しくインポートされているか確認
- `@/types/product` のパスが正しいか確認

---

## 発展課題

1. **フィルター機能**: カテゴリでフィルターできるようにする
2. **ソート機能**: 価格順、新着順でソートできるようにする
3. **ページネーション**: 商品数が多い場合にページ分割する
4. **グリッド切り替え**: 2列/3列/4列表示を切り替えられるようにする

---

## 完了条件

- [ ] `/products` にアクセスすると商品一覧が表示される
- [ ] 商品カードに正しい情報が表示される
- [ ] ローディング UI が機能する
- [ ] TypeScript の型チェックを通過する
- [ ] レスポンシブデザインになっている

---

## 次の演習

商品一覧ページの実装が完了したら、[演習 3: 商品詳細ページ](./03-product-detail.md) に進んでください。
