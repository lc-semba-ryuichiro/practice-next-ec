/**
 * Products Feature - 商品詳細
 */

"use client";

import { ProductImage, ProductPrice } from "@/entities/product";
import type { Product } from "@/entities/product";

interface ProductDetailProps {
  readonly product: Product;
}

/**
 * 商品詳細コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.product - 商品データ
 * @returns 商品詳細要素
 */
export function ProductDetail({ product }: Readonly<ProductDetailProps>): React.JSX.Element {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        className="aspect-square w-full rounded-lg object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <ProductPrice
          price={product.price}
          className="mt-4 text-xl"
        />
        <p className="mt-4 text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}
