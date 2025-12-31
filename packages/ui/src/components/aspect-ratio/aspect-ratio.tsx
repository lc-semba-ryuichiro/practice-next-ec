import type * as React from "react";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * 子要素のアスペクト比を維持するコンテナ
 * @param root0 - コンポーネントのプロパティ
 * @returns アスペクト比コンテナ要素
 */
function AspectRatio({
  ...props
}: Readonly<React.ComponentProps<typeof AspectRatioPrimitive.Root>>): React.ReactElement {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      {...props}
    />
  );
}

export { AspectRatio };
