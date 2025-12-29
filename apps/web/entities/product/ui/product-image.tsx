/**
 * Product Entity - 商品画像
 */

import Image from "next/image";

import { cn } from "@practice-next-ec/lib";

interface ProductImageProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly priority?: boolean;
}

/**
 * 商品画像コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.src - 画像のURL
 * @param props.alt - 代替テキスト
 * @param props.className - 追加のCSSクラス
 * @param props.priority - 優先読み込みフラグ
 * @returns 商品画像要素
 */
export function ProductImage({
  src,
  alt,
  className,
  priority = false,
}: Readonly<ProductImageProps>): React.JSX.Element {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
    </div>
  );
}
