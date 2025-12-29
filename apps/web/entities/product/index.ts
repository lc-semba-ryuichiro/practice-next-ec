/**
 * Product Entity - 商品エンティティ
 * @module entities/product
 */

// UI Components
export { ProductImage } from "./ui/product-image";
export { ProductPrice } from "./ui/product-price";
export { ProductBadge } from "./ui/product-badge";

// Types
export type { Product, ProductCategory } from "./model/product.types";

// Schemas
export { productSchema } from "./model/product.schemas";

// Utils
export { formatProductPrice, isProductInStock } from "./lib/product.utils";
