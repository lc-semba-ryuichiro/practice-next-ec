# Compound Components パターン

## Compound Components とは

Compound Components は、**複数のコンポーネントが暗黙的に状態を共有し、協調して動作するパターン**です。
HTML の `<select>` と `<option>` の関係に似ています。

```tsx
{
  /* HTML ネイティブの例 */
}
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>;

{
  /* Compound Components の例 */
}
<Tabs defaultValue="description">
  <Tabs.List>
    <Tabs.Trigger value="description">商品説明</Tabs.Trigger>
    <Tabs.Trigger value="reviews">レビュー</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="description">商品の詳細説明...</Tabs.Content>
  <Tabs.Content value="reviews">レビュー一覧...</Tabs.Content>
</Tabs>;
```

---

## なぜ Compound Components を使うのか

### 従来の Props 地獄

```tsx
{
  /* 悪い例: Props が多すぎる */
}
<ProductTabs
  tabs={[
    { id: "description", label: "商品説明", content: <Description /> },
    { id: "reviews", label: "レビュー", content: <Reviews /> },
    { id: "shipping", label: "配送情報", content: <Shipping /> },
  ]}
  defaultTab="description"
  tabClassName="text-sm"
  contentClassName="p-4"
  onTabChange={(id) => console.log(id)}
/>;
```

### Compound Components で解決

```tsx
{
  /* 良い例: 柔軟で読みやすい */
}
<ProductTabs
  defaultValue="description"
  onValueChange={console.log}
>
  <ProductTabs.List className="border-b">
    <ProductTabs.Trigger value="description">商品説明</ProductTabs.Trigger>
    <ProductTabs.Trigger value="reviews">
      レビュー <Badge>{reviewCount}</Badge>
    </ProductTabs.Trigger>
    <ProductTabs.Trigger value="shipping">配送情報</ProductTabs.Trigger>
  </ProductTabs.List>

  <ProductTabs.Content
    value="description"
    className="p-4"
  >
    <Description />
  </ProductTabs.Content>
  <ProductTabs.Content
    value="reviews"
    className="p-4"
  >
    <Reviews />
  </ProductTabs.Content>
  <ProductTabs.Content
    value="shipping"
    className="p-4"
  >
    <Shipping />
  </ProductTabs.Content>
</ProductTabs>;
```

---

## 実装パターン

### 1. Context を使った状態共有

```typescript
// packages/ui/src/organisms/Accordion/AccordionContext.tsx
import { createContext, useContext, type ReactNode } from "react";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  isItemOpen: (value: string) => boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion compound components must be used within an Accordion");
  }
  return context;
}

export { AccordionContext };
```

### 2. ルートコンポーネント

```typescript
// packages/ui/src/organisms/Accordion/Accordion.tsx
"use client";

import { useState, useCallback, type ReactNode } from "react";
import { AccordionContext } from "./AccordionContext";

export interface AccordionProps {
  children: ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  children,
  type = "single",
  defaultValue = [],
  className,
}: AccordionProps): JSX.Element {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);

  const toggleItem = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        return type === "single" ? [value] : [...prev, value];
      });
    },
    [type]
  );

  const isItemOpen = useCallback(
    (value: string) => openItems.includes(value),
    [openItems]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, isItemOpen }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}
```

### 3. 子コンポーネント

```typescript
// packages/ui/src/organisms/Accordion/AccordionItem.tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";

interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within an Item");
  }
  return context;
}

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps): JSX.Element {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={className} data-state={value}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
```

```typescript
// packages/ui/src/organisms/Accordion/AccordionTrigger.tsx
"use client";

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItem";

export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps): JSX.Element {
  const { toggleItem, isItemOpen } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const isOpen = isItemOpen(value);

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium",
        "hover:underline",
        className
      )}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}
```

```typescript
// packages/ui/src/organisms/Accordion/AccordionContent.tsx
"use client";

import { type ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export function AccordionContent({
  children,
  className,
}: AccordionContentProps): JSX.Element {
  const { isItemOpen } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const isOpen = isItemOpen(value);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn("pb-4 pt-0", className)}
      role="region"
      aria-labelledby={`accordion-trigger-${value}`}
    >
      {children}
    </div>
  );
}
```

### 4. エクスポートの統合

```typescript
// packages/ui/src/organisms/Accordion/index.ts
import { Accordion as AccordionRoot } from "./Accordion";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export type { AccordionProps } from "./Accordion";
export type { AccordionItemProps } from "./AccordionItem";
export type { AccordionTriggerProps } from "./AccordionTrigger";
export type { AccordionContentProps } from "./AccordionContent";
```

---

## EC サイトでの活用例

### 1. 商品詳細タブ

```tsx
// apps/web/app/products/[id]/_components/ProductTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  reviews: Review[];
}

export function ProductTabs({
  description,
  specifications,
  reviews,
}: ProductTabsProps): JSX.Element {
  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">商品説明</TabsTrigger>
        <TabsTrigger value="specs">仕様</TabsTrigger>
        <TabsTrigger value="reviews">レビュー ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <p className="prose">{description}</p>
      </TabsContent>

      <TabsContent value="specs">
        <dl className="grid grid-cols-2 gap-2">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium">{key}</dt>
              <dd className="text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewList reviews={reviews} />
      </TabsContent>
    </Tabs>
  );
}
```

### 2. FAQ アコーディオン

```tsx
// apps/web/app/faq/_components/FAQAccordion.tsx
import { Accordion } from "@repo/ui";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps): JSX.Element {
  return (
    <Accordion
      type="single"
      className="w-full"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
        >
          <Accordion.Trigger>{item.question}</Accordion.Trigger>
          <Accordion.Content>
            <p className="text-muted-foreground">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
```

### 3. 商品フィルター

```tsx
// apps/web/app/products/_components/FilterPanel.tsx
import { Accordion } from "@repo/ui";
import { Checkbox } from "@repo/ui/atoms/Checkbox";

interface FilterPanelProps {
  categories: string[];
  brands: string[];
  priceRanges: { label: string; value: string }[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (type: string, values: string[]) => void;
}

export function FilterPanel({
  categories,
  brands,
  priceRanges,
  selectedFilters,
  onFilterChange,
}: FilterPanelProps): JSX.Element {
  return (
    <Accordion
      type="multiple"
      defaultValue={["category", "brand"]}
    >
      <Accordion.Item value="category">
        <Accordion.Trigger>カテゴリ</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={selectedFilters.category?.includes(category)}
                  onCheckedChange={(checked) => {
                    const current = selectedFilters.category ?? [];
                    const next = checked
                      ? [...current, category]
                      : current.filter((c) => c !== category);
                    onFilterChange("category", next);
                  }}
                />
                {category}
              </label>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="brand">
        <Accordion.Trigger>ブランド</Accordion.Trigger>
        <Accordion.Content>{/* 同様の実装 */}</Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="price">
        <Accordion.Trigger>価格帯</Accordion.Trigger>
        <Accordion.Content>{/* 価格帯フィルター */}</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

---

## shadcn/ui での Compound Components

shadcn/ui は Radix UI をベースにしており、多くの Compound Components パターンを採用しています。

| コンポーネント | 構成                                           |
| -------------- | ---------------------------------------------- |
| Accordion      | Root, Item, Trigger, Content                   |
| Tabs           | Root, List, Trigger, Content                   |
| Dialog         | Root, Trigger, Portal, Overlay, Content, Close |
| DropdownMenu   | Root, Trigger, Content, Item, Separator        |
| Sheet          | Root, Trigger, Portal, Overlay, Content        |
| AlertDialog    | Root, Trigger, Portal, Content, Action, Cancel |

### インストール例

```bash
# shadcn/ui のコンポーネントを追加
pnpm dlx shadcn@latest add accordion tabs dialog sheet
```

---

## Compound Components の利点

| 利点               | 説明                                              |
| ------------------ | ------------------------------------------------- |
| **柔軟性**         | 子コンポーネントの順序や構成を自由に変更できる    |
| **可読性**         | JSX の構造が HTML のように直感的                  |
| **拡張性**         | 新しい子コンポーネントを追加しやすい              |
| **カスタマイズ性** | 各子コンポーネントに個別のスタイルを適用できる    |
| **状態の隠蔽**     | 内部状態が Context で管理され、利用者は意識しない |

---

## まとめ

- Compound Components は**複数のコンポーネントが暗黙的に状態を共有するパターン**
- **Context** を使って親から子に状態を渡す
- **Props 地獄**を回避し、柔軟で読みやすい API を提供
- shadcn/ui の Accordion, Tabs, Dialog などで活用されている
- EC サイトでは商品詳細タブ、FAQ、フィルターパネルなどで使える

---

## 次のステップ

[03 カスタムフックパターン](./03-custom-hooks.md) では、コンポーネント間でロジックを再利用する方法を学びます。
