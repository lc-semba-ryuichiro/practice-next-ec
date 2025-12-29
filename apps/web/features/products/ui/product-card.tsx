/**
 * Products Feature - 商品カード
 */

import Link from "next/link";

import { ProductImage, ProductPrice } from "@/entities/product";
import type { Product } from "@/entities/product";
import { ROUTES } from "@/shared/config/routes";

interface ProductCardProps {
  readonly product: Product;
}

/**
 * 商品カードコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.product - 商品データ
 * @returns 商品カード要素
 */
export function ProductCard({ product }: Readonly<ProductCardProps>): React.JSX.Element {
  return (
    <Link
      href={ROUTES.PRODUCTS.DETAIL(product.id)}
      className="group block overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
    >
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        className="aspect-square w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium group-hover:text-blue-600">{product.name}</h3>
        <ProductPrice
          price={product.price}
          className="mt-2"
        />
      </div>
    </Link>
  );
}
