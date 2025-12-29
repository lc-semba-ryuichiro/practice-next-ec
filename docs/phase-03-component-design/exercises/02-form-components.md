# 演習 2: フォームコンポーネント群

## 目次

- [目標](#目標)
- [完成イメージ](#完成イメージ)
- [前提条件](#前提条件)
- [ステップ 1: 基本入力コンポーネント（Atoms）](#ステップ-1-基本入力コンポーネントatoms)
  - [1.1 Input コンポーネント](#11-input-コンポーネント)
  - [1.2 Label コンポーネント](#12-label-コンポーネント)
  - [1.3 Select コンポーネント](#13-select-コンポーネント)
  - [1.4 Checkbox コンポーネント](#14-checkbox-コンポーネント)
- [ステップ 2: フォームフィールドコンポーネント（Molecules）](#ステップ-2-フォームフィールドコンポーネントmolecules)
  - [2.1 FormField コンポーネント](#21-formfield-コンポーネント)
  - [2.2 FormSelect コンポーネント](#22-formselect-コンポーネント)
  - [2.3 FormRadioGroup コンポーネント](#23-formradiogroup-コンポーネント)
- [ステップ 3: EC サイト向けフォーム実装例](#ステップ-3-ec-サイト向けフォーム実装例)
  - [3.1 配送先住所フォーム](#31-配送先住所フォーム)
  - [3.2 支払い方法選択フォーム](#32-支払い方法選択フォーム)
- [ステップ 4: Storybook でドキュメント化](#ステップ-4-storybook-でドキュメント化)
  - [4.1 FormField のストーリー](#41-formfield-のストーリー)
- [確認チェックリスト](#確認チェックリスト)
  - [コンポーネント実装](#コンポーネント実装)
  - [アクセシビリティ](#アクセシビリティ)
  - [Storybook](#storybook)
- [トラブルシューティング](#トラブルシューティング)
  - [ラベルクリックで Input にフォーカスしない](#ラベルクリックで-input-にフォーカスしない)
  - [スクリーンリーダーでエラーが読み上げられない](#スクリーンリーダーでエラーが読み上げられない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [次の演習](#次の演習)

## 目標

ECサイトで使用するフォームコンポーネント群を実装し、アクセシビリティに配慮した設計を習得します。

***

## 完成イメージ

```text
packages/ui/
├── src/
│   ├── atoms/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Select/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   └── Textarea/
│   │
│   └── molecules/
│       ├── FormField/
│       ├── FormSelect/
│       ├── FormCheckbox/
│       └── FormRadioGroup/
```

***

## 前提条件

- 演習1（デザインシステム構築）を完了していること
- shadcn/uiの基本コンポーネントがインストールされていること

***

## ステップ 1: 基本入力コンポーネント（Atoms）

### 1.1 Input コンポーネント

```typescript
// packages/ui/src/atoms/Input/Input.tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
      },
      inputSize: {
        sm: "h-8 text-sm",
        md: "h-10",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, hasError, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant: hasError ? "error" : variant,
            inputSize,
          }),
          className
        )}
        ref={ref}
        aria-invalid={hasError}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { inputVariants };
```

### 1.2 Label コンポーネント

```typescript
// packages/ui/src/atoms/Label/Label.tsx
import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";
```

### 1.3 Select コンポーネント

```typescript
// packages/ui/src/atoms/Select/Select.tsx
import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, hasError, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 pr-8 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input",
            className
          )}
          aria-invalid={hasError}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }
);
Select.displayName = "Select";
```

### 1.4 Checkbox コンポーネント

```typescript
// packages/ui/src/atoms/Checkbox/Checkbox.tsx
"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hasError?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, hasError, id, ...props }, ref) => {
    const checkboxId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className="peer sr-only"
            aria-invalid={hasError}
            {...props}
          />
          <div
            className={cn(
              "h-4 w-4 rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "peer-checked:border-primary peer-checked:bg-primary",
              hasError ? "border-destructive" : "border-input",
              className
            )}
          >
            <Check className="h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
```

***

## ステップ 2: フォームフィールドコンポーネント（Molecules）

### 2.1 FormField コンポーネント

```typescript
// packages/ui/src/molecules/FormField/FormField.tsx
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Input, type InputProps } from "@repo/ui/atoms/Input";
import { Label } from "@repo/ui/atoms/Label";
import { cn } from "@repo/ui/lib/utils";

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, required, id, className, ...inputProps }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s/g, "-");
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;
    const hasError = !!error;

    // aria-describedby に含める ID のリスト
    const describedBy = [
      hint && hintId,
      hasError && errorId,
    ].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>

        <Input
          ref={ref}
          id={fieldId}
          hasError={hasError}
          aria-describedby={describedBy}
          aria-required={required}
          {...inputProps}
        />

        {hint && !hasError && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";
```

### 2.2 FormSelect コンポーネント

```typescript
// packages/ui/src/molecules/FormSelect/FormSelect.tsx
import { forwardRef } from "react";
import { Select, type SelectProps } from "@repo/ui/atoms/Select";
import { Label } from "@repo/ui/atoms/Label";
import { cn } from "@repo/ui/lib/utils";

export interface FormSelectProps extends SelectProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, required, id, className, ...selectProps }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s/g, "-");
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;
    const hasError = !!error;

    const describedBy = [
      hint && hintId,
      hasError && errorId,
    ].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>

        <Select
          ref={ref}
          id={fieldId}
          hasError={hasError}
          aria-describedby={describedBy}
          aria-required={required}
          {...selectProps}
        />

        {hint && !hasError && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
```

### 2.3 FormRadioGroup コンポーネント

```typescript
// packages/ui/src/molecules/FormRadioGroup/FormRadioGroup.tsx
"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Label } from "@repo/ui/atoms/Label";
import { cn } from "@repo/ui/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FormRadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  options: RadioOption[];
  error?: string;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
}

export const FormRadioGroup = forwardRef<HTMLInputElement, FormRadioGroupProps>(
  (
    {
      label,
      options,
      error,
      required,
      orientation = "vertical",
      name,
      className,
      ...props
    },
    ref
  ) => {
    const groupName = name ?? label.toLowerCase().replace(/\s/g, "-");
    const hasError = !!error;

    return (
      <fieldset className={cn("space-y-3", className)}>
        <legend className="text-sm font-medium">
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </legend>

        <div
          className={cn(
            "space-y-2",
            orientation === "horizontal" && "flex flex-wrap gap-4 space-y-0"
          )}
          role="radiogroup"
          aria-required={required}
          aria-invalid={hasError}
        >
          {options.map((option, index) => (
            <div key={option.value} className="flex items-start gap-2">
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                id={`${groupName}-${option.value}`}
                name={groupName}
                value={option.value}
                disabled={option.disabled}
                className="mt-1 h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...props}
              />
              <div>
                <label
                  htmlFor={`${groupName}-${option.value}`}
                  className="text-sm font-medium leading-none"
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {hasError && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);
FormRadioGroup.displayName = "FormRadioGroup";
```

***

## ステップ 3: EC サイト向けフォーム実装例

### 3.1 配送先住所フォーム

```tsx
// apps/web/app/checkout/_components/ShippingAddressForm.tsx
"use client";

import { useState } from "react";
import { FormField, FormSelect, Button } from "@repo/ui";

const prefectures = [
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" },
  { value: "kanagawa", label: "神奈川県" },
  // ... 他の都道府県
];

interface ShippingAddressFormProps {
  onSubmit: (data: ShippingAddress) => void;
}

export function ShippingAddressForm({ onSubmit }: ShippingAddressFormProps): JSX.Element {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // バリデーションとサブミット処理
    // ...

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold">配送先住所</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          name="lastName"
          label="姓"
          placeholder="山田"
          required
          error={errors.lastName}
          autoComplete="family-name"
        />
        <FormField
          name="firstName"
          label="名"
          placeholder="太郎"
          required
          error={errors.firstName}
          autoComplete="given-name"
        />
      </div>

      <FormField
        name="postalCode"
        label="郵便番号"
        placeholder="123-4567"
        required
        error={errors.postalCode}
        hint="ハイフンありで入力してください"
        autoComplete="postal-code"
        inputMode="numeric"
      />

      <FormSelect
        name="prefecture"
        label="都道府県"
        options={prefectures}
        placeholder="選択してください"
        required
        error={errors.prefecture}
        autoComplete="address-level1"
      />

      <FormField
        name="city"
        label="市区町村"
        placeholder="渋谷区"
        required
        error={errors.city}
        autoComplete="address-level2"
      />

      <FormField
        name="address"
        label="番地・建物名"
        placeholder="1-2-3 サンプルビル 101"
        required
        error={errors.address}
        autoComplete="street-address"
      />

      <FormField
        name="phone"
        label="電話番号"
        type="tel"
        placeholder="090-1234-5678"
        required
        error={errors.phone}
        autoComplete="tel"
        inputMode="tel"
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        次へ進む
      </Button>
    </form>
  );
}
```

### 3.2 支払い方法選択フォーム

```tsx
// apps/web/app/checkout/_components/PaymentMethodForm.tsx
"use client";

import { FormRadioGroup, Button } from "@repo/ui";

const paymentMethods = [
  {
    value: "credit",
    label: "クレジットカード",
    description: "VISA, Mastercard, JCB, AMEX",
  },
  {
    value: "convenience",
    label: "コンビニ決済",
    description: "セブン-イレブン、ローソン、ファミリーマート",
  },
  {
    value: "bank",
    label: "銀行振込",
    description: "ご注文後7日以内にお振込みください",
  },
  {
    value: "cod",
    label: "代金引換",
    description: "手数料330円（税込）",
  },
];

export function PaymentMethodForm(): JSX.Element {
  return (
    <form className="space-y-6">
      <h2 className="text-xl font-bold">お支払い方法</h2>

      <FormRadioGroup
        name="paymentMethod"
        label="お支払い方法を選択してください"
        options={paymentMethods}
        required
      />

      <Button
        type="submit"
        fullWidth
      >
        注文内容を確認する
      </Button>
    </form>
  );
}
```

***

## ステップ 4: Storybook でドキュメント化

### 4.1 FormField のストーリー

```tsx
// apps/storybook/stories/molecules/FormField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "@repo/ui";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "example@example.com",
    type: "email",
  },
};

export const Required: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "example@example.com",
    type: "email",
    required: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "パスワード",
    type: "password",
    required: true,
    hint: "8文字以上で入力してください",
  },
};

export const WithError: Story = {
  args: {
    label: "メールアドレス",
    type: "email",
    required: true,
    error: "有効なメールアドレスを入力してください",
    defaultValue: "invalid-email",
  },
};

export const Disabled: Story = {
  args: {
    label: "メールアドレス",
    disabled: true,
    defaultValue: "disabled@example.com",
  },
};
```

***

## 確認チェックリスト

### コンポーネント実装

- [ ] Input, Label, Select, Checkboxが作成されている
- [ ] FormField, FormSelect, FormRadioGroupが作成されている
- [ ] すべてのコンポーネントに `ref` を転送している

### アクセシビリティ

- [ ] LabelとInputが `htmlFor` / `id` で関連付けられている
- [ ] エラーメッセージが `aria-describedby` で関連付けられている
- [ ] エラーメッセージに `role="alert"` がある
- [ ] 必須項目に `aria-required="true"` がある
- [ ] エラー状態で `aria-invalid="true"` がある

### Storybook

- [ ] 各コンポーネントのストーリーが作成されている
- [ ] 必須、ヒント、エラー状態のストーリーがある
- [ ] addon-a11yでエラーがない

***

## トラブルシューティング

### ラベルクリックで Input にフォーカスしない

```tsx
// Label の htmlFor と Input の id を確認
<Label htmlFor="email">メール</Label>
<Input id="email" /> // id が一致していること
```

### スクリーンリーダーでエラーが読み上げられない

```tsx
// aria-describedby と role="alert" を確認
<Input aria-describedby="email-error" />
<p id="email-error" role="alert">エラーメッセージ</p>
```

***

## 発展課題

1. **パスワード表示切り替え**: パスワード入力欄に表示/非表示トグルを追加
2. **オートコンプリート**: 住所入力の郵便番号からの自動補完
3. **リアルタイムバリデーション**: 入力中にバリデーションを実行
4. **複数ファイルアップロード**: 商品画像アップロード用コンポーネント

***

## 完了条件

- [ ] すべてのチェック項目を確認した
- [ ] Storybookでフォームコンポーネントが確認できる
- [ ] アクセシビリティチェックに合格している

***

## 次の演習

[演習 3: Modal/Drawer 実装](./03-modal-drawer.md) に進みましょう。
