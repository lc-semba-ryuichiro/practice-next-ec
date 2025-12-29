# 演習 3: Modal/Drawer 実装

## 目次

- [目標](#目標)
- [完成イメージ](#完成イメージ)
- [前提条件](#前提条件)
- [ステップ 1: Dialog（Modal）の実装](#ステップ-1-dialogmodalの実装)
  - [1.1 Context の作成](#11-context-の作成)
  - [1.2 ルートコンポーネント](#12-ルートコンポーネント)
  - [1.3 Trigger コンポーネント](#13-trigger-コンポーネント)
  - [1.4 Content コンポーネント（フォーカストラップ付き）](#14-content-コンポーネントフォーカストラップ付き)
  - [1.5 Header / Footer コンポーネント](#15-header--footer-コンポーネント)
  - [1.6 エクスポート](#16-エクスポート)
- [ステップ 2: Drawer の実装](#ステップ-2-drawer-の実装)
  - [2.1 Context](#21-context)
  - [2.2 Drawer コンポーネント](#22-drawer-コンポーネント)
  - [2.3 DrawerContent](#23-drawercontent)
  - [2.4 エクスポート](#24-エクスポート)
- [ステップ 3: EC サイト向け実装例](#ステップ-3-ec-サイト向け実装例)
  - [3.1 確認ダイアログ](#31-確認ダイアログ)
  - [3.2 カート Drawer](#32-カート-drawer)
  - [3.3 商品クイックビュー](#33-商品クイックビュー)
- [確認チェックリスト](#確認チェックリスト)
  - [機能](#機能)
  - [アクセシビリティ](#アクセシビリティ)
  - [Storybook](#storybook)
- [トラブルシューティング](#トラブルシューティング)
  - [ポータルでレンダリングされない](#ポータルでレンダリングされない)
  - [フォーカストラップが動作しない](#フォーカストラップが動作しない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [次のステップ](#次のステップ)

## 目標

Compound Componentsパターンを使って、アクセシブルなModalとDrawerコンポーネントを実装します。

***

## 完成イメージ

```text
packages/ui/
├── src/
│   └── organisms/
│       ├── Dialog/
│       │   ├── Dialog.tsx
│       │   ├── DialogContext.tsx
│       │   ├── DialogTrigger.tsx
│       │   ├── DialogContent.tsx
│       │   ├── DialogHeader.tsx
│       │   ├── DialogFooter.tsx
│       │   └── index.ts
│       │
│       └── Drawer/
│           ├── Drawer.tsx
│           ├── DrawerContext.tsx
│           ├── DrawerTrigger.tsx
│           ├── DrawerContent.tsx
│           └── index.ts
```

***

## 前提条件

- 演習1, 2を完了していること
- Compound Componentsパターンを理解していること

***

## ステップ 1: Dialog（Modal）の実装

### 1.1 Context の作成

```typescript
// packages/ui/src/organisms/Dialog/DialogContext.tsx
"use client";

import { createContext, useContext } from "react";

interface DialogContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}

export { DialogContext };
```

### 1.2 ルートコンポーネント

```typescript
// packages/ui/src/organisms/Dialog/Dialog.tsx
"use client";

import {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { DialogContext } from "./DialogContext";

export interface DialogProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DialogProps): JSX.Element {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  // 制御・非制御モードの判定
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const open = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  // Escape キーで閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // body のスクロールをロック
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
}
```

### 1.3 Trigger コンポーネント

```typescript
// packages/ui/src/organisms/Dialog/DialogTrigger.tsx
"use client";

import { type ReactNode, cloneElement, isValidElement } from "react";
import { useDialogContext } from "./DialogContext";

export interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function DialogTrigger({
  children,
  asChild = false,
}: DialogTriggerProps): JSX.Element {
  const { open } = useDialogContext();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...children.props,
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        open();
      },
    });
  }

  return (
    <button type="button" onClick={open}>
      {children}
    </button>
  );
}
```

### 1.4 Content コンポーネント（フォーカストラップ付き）

```typescript
// packages/ui/src/organisms/Dialog/DialogContent.tsx
"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useDialogContext } from "./DialogContext";
import { Button } from "@repo/ui/atoms/Button";

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function DialogContent({
  children,
  className,
  showCloseButton = true,
}: DialogContentProps): JSX.Element | null {
  const { isOpen, close } = useDialogContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // フォーカス管理
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      contentRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // フォーカストラップ
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const content = contentRef.current;
    const focusableElements = content.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    content.addEventListener("keydown", handleKeyDown);
    return () => content.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={close}
      />

      {/* ダイアログ本体 */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg bg-background p-6 shadow-lg",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={close}
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### 1.5 Header / Footer コンポーネント

```typescript
// packages/ui/src/organisms/Dialog/DialogHeader.tsx
import { type ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({
  children,
  className,
}: DialogHeaderProps): JSX.Element {
  return (
    <div className={cn("mb-4 space-y-1.5", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({
  children,
  className,
}: DialogHeaderProps): JSX.Element {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
}: DialogHeaderProps): JSX.Element {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
```

```typescript
// packages/ui/src/organisms/Dialog/DialogFooter.tsx
import { type ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({
  children,
  className,
}: DialogFooterProps): JSX.Element {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
    >
      {children}
    </div>
  );
}
```

### 1.6 エクスポート

```typescript
// packages/ui/src/organisms/Dialog/index.ts
import { Dialog as DialogRoot } from "./Dialog";
import { DialogTrigger } from "./DialogTrigger";
import { DialogContent } from "./DialogContent";
import { DialogHeader, DialogTitle, DialogDescription } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
});

export type { DialogProps } from "./Dialog";
export type { DialogTriggerProps } from "./DialogTrigger";
export type { DialogContentProps } from "./DialogContent";
```

***

## ステップ 2: Drawer の実装

### 2.1 Context

```typescript
// packages/ui/src/organisms/Drawer/DrawerContext.tsx
"use client";

import { createContext, useContext } from "react";

interface DrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  side: "left" | "right";
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

export { DrawerContext };
```

### 2.2 Drawer コンポーネント

```typescript
// packages/ui/src/organisms/Drawer/Drawer.tsx
"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { DrawerContext } from "./DrawerContext";

export interface DrawerProps {
  children: ReactNode;
  side?: "left" | "right";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Drawer({
  children,
  side = "right",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DrawerProps): JSX.Element {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const open = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, open, close, side }}>
      {children}
    </DrawerContext.Provider>
  );
}
```

### 2.3 DrawerContent

```typescript
// packages/ui/src/organisms/Drawer/DrawerContent.tsx
"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useDrawerContext } from "./DrawerContext";
import { Button } from "@repo/ui/atoms/Button";

export interface DrawerContentProps {
  children: ReactNode;
  className?: string;
}

export function DrawerContent({
  children,
  className,
}: DrawerContentProps): JSX.Element | null {
  const { isOpen, close, side } = useDrawerContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={close}
      />

      {/* Drawer 本体 */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "fixed inset-y-0 z-10 flex w-full max-w-sm flex-col bg-background shadow-lg",
          side === "left" && "left-0 animate-in slide-in-from-left",
          side === "right" && "right-0 animate-in slide-in-from-right",
          className
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
```

### 2.4 エクスポート

```typescript
// packages/ui/src/organisms/Drawer/index.ts
import { Drawer as DrawerRoot } from "./Drawer";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerContent } from "./DrawerContent";

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
});

export type { DrawerProps } from "./Drawer";
export type { DrawerContentProps } from "./DrawerContent";
```

***

## ステップ 3: EC サイト向け実装例

### 3.1 確認ダイアログ

```tsx
// apps/web/app/_components/ConfirmDialog.tsx
"use client";

import { Dialog, Button } from "@repo/ui";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "確認",
  cancelLabel = "キャンセル",
  isDestructive = false,
}: ConfirmDialogProps): JSX.Element {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

// 使用例
function DeleteCartItemButton({ itemId }: { itemId: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { removeItem } = useCart();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => removeItem(itemId)}
        title="商品を削除しますか？"
        description="この操作は取り消せません。"
        confirmLabel="削除する"
        isDestructive
      />
    </>
  );
}
```

### 3.2 カート Drawer

```tsx
// apps/web/app/_components/CartDrawer.tsx
"use client";

import { Drawer, Button, Badge } from "@repo/ui";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@repo/shared/hooks/useCart";

export function CartDrawer(): JSX.Element {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <Drawer side="right">
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0"
              variant="sale"
            >
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">カートを開く</span>
        </Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <h2 className="mb-4 text-lg font-bold">カート ({totalItems}点)</h2>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-center">カートは空です</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4"
                >
                  {/* カートアイテムの表示 */}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>合計</span>
                <span>¥{totalPrice.toLocaleString()}</span>
              </div>
              <Button fullWidth>レジに進む</Button>
            </div>
          </>
        )}
      </Drawer.Content>
    </Drawer>
  );
}
```

### 3.3 商品クイックビュー

```tsx
// apps/web/app/_components/ProductQuickView.tsx
"use client";

import { Dialog, Button } from "@repo/ui";
import Image from "next/image";
import { useCart } from "@repo/shared/hooks/useCart";

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps): JSX.Element {
  const { addItem } = useCart();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content className="max-w-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div>
            <Dialog.Header>
              <Dialog.Title>{product.name}</Dialog.Title>
              <Dialog.Description>{product.description}</Dialog.Description>
            </Dialog.Header>

            <div className="my-4 text-2xl font-bold">¥{product.price.toLocaleString()}</div>

            <div className="space-y-2">
              <Button
                fullWidth
                variant="addToCart"
                onClick={() => {
                  addItem(product.id);
                  onClose();
                }}
              >
                カートに追加
              </Button>
              <Button
                fullWidth
                variant="outline"
                asChild
              >
                <a href={`/products/${product.id}`}>商品詳細を見る</a>
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
```

***

## 確認チェックリスト

### 機能

- [ ] Dialogが開閉する
- [ ] Drawerが左右から開閉する
- [ ] Escapeキーで閉じる
- [ ] オーバーレイクリックで閉じる
- [ ] bodyのスクロールがロックされる

### アクセシビリティ

- [ ] `role="dialog"` がある
- [ ] `aria-modal="true"` がある
- [ ] フォーカスがダイアログ内に移動する
- [ ] フォーカストラップが動作する
- [ ] 閉じるとフォーカスが元の位置に戻る
- [ ] 閉じるボタンに `aria-label` がある

### Storybook

- [ ] Dialogのストーリーがある
- [ ] Drawerのストーリーがある
- [ ] 確認ダイアログのストーリーがある
- [ ] addon-a11yでエラーがない

***

## トラブルシューティング

### ポータルでレンダリングされない

```tsx
// クライアントコンポーネントであることを確認
"use client";

// document.body が存在することを確認
if (typeof window === "undefined") return null;
```

### フォーカストラップが動作しない

```tsx
// focusableElements のセレクタを確認
const focusableElements = content.querySelectorAll<HTMLElement>(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
```

***

## 発展課題

1. **アニメーション**: Framer Motionを使ったスムーズなアニメーション
2. **ネストしたダイアログ**: ダイアログ内からさらにダイアログを開く
3. **サイズバリエーション**: sm, md, lg, fullscreenなどのサイズ対応
4. **ドラッグで閉じる**: モバイルでのスワイプでDrawerを閉じる

***

## 完了条件

- [ ] すべてのチェック項目を確認した
- [ ] Dialog, DrawerがStorybookで確認できる
- [ ] ECサイト向けの確認ダイアログ、カートDrawerが動作する
- [ ] アクセシビリティチェックに合格している

***

## 次のステップ

[checklist.md](../checklist.md) でPhase 3全体の理解度を確認しましょう。
