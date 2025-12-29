/**
 * User Entity - ユーザーアバター
 */

import Image from "next/image";

import { cn } from "@practice-next-ec/lib";

interface UserAvatarProps {
  readonly src?: string;
  readonly name: string;
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
};

/**
 * ユーザーアバターコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.src - アバター画像のURL
 * @param props.name - ユーザー名
 * @param props.size - アバターのサイズ
 * @param props.className - 追加のCSSクラス
 * @returns ユーザーアバター要素
 */
export function UserAvatar({
  src,
  name,
  size = "md",
  className,
}: Readonly<UserAvatarProps>): React.JSX.Element {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // eslint-disable-next-line security/detect-object-injection -- Record型のインデックスアクセスは安全
  const sizeClass = sizeClasses[size];

  if (src !== undefined) {
    return (
      <div className={cn("relative overflow-hidden rounded-full", sizeClass, className)}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600",
        sizeClass,
        className
      )}
    >
      {initials}
    </div>
  );
}
