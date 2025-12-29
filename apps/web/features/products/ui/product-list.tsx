/**
 * Products Feature - 商品一覧
 */

"use client";

import type { Product } from "@/entities/product";

import { ProductCard } from "./product-card";

interface ProductListProps {
  readonly products: Array<Product>;
  readonly isLoading?: boolean;
}

/**
 * 商品一覧コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.products - 商品リスト
 * @param props.isLoading - ローディング状態
 * @returns 商品一覧要素
 */
export function ProductList({
  products,
  isLoading = false,
}: Readonly<ProductListProps>): React.JSX.Element {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="py-12 text-center text-gray-500">商品が見つかりませんでした</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
