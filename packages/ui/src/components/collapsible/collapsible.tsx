import type * as React from "react";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * 折りたたみ可能なコンテンツのルート
 * @param root0 - コンポーネントのプロパティ
 * @returns 折りたたみルート要素
 */
function Collapsible({
  ...props
}: Readonly<React.ComponentProps<typeof CollapsiblePrimitive.Root>>): React.ReactElement {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
    />
  );
}

/**
 * 折りたたみを切り替えるトリガーボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns トリガー要素
 */
function CollapsibleTrigger({
  ...props
}: Readonly<
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>): React.ReactElement {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

/**
 * 折りたたまれるコンテンツ領域
 * @param root0 - コンポーネントのプロパティ
 * @returns コンテンツ要素
 */
function CollapsibleContent({
  ...props
}: Readonly<
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>): React.ReactElement {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
