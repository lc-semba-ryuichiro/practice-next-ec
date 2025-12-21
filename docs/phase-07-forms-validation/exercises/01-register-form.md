# 演習 1: ユーザー登録フォーム

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [完成イメージ](#完成イメージ)
- [ステップ 1: Zod スキーマの作成](#ステップ-1-zod-スキーマの作成)
  - [1.1 validators パッケージの設定確認](#11-validators-パッケージの設定確認)
  - [1.2 ユーザー登録スキーマの作成](#12-ユーザー登録スキーマの作成)
  - [1.3 エクスポートの追加](#13-エクスポートの追加)
- [ステップ 2: 型定義の作成](#ステップ-2-型定義の作成)
  - [2.1 ActionState 型の定義](#21-actionstate-型の定義)
- [ステップ 3: Server Action の実装](#ステップ-3-server-action-の実装)
  - [3.1 登録アクションの作成](#31-登録アクションの作成)
- [ステップ 4: フォームコンポーネントの実装](#ステップ-4-フォームコンポーネントの実装)
  - [4.1 フォームフィールドコンポーネント](#41-フォームフィールドコンポーネント)
  - [4.2 送信ボタンコンポーネント](#42-送信ボタンコンポーネント)
  - [4.3 登録フォームコンポーネント](#43-登録フォームコンポーネント)
- [ステップ 5: ページの作成](#ステップ-5-ページの作成)
  - [5.1 登録ページ](#51-登録ページ)
- [ステップ 6: 動作確認](#ステップ-6-動作確認)
  - [6.1 開発サーバーの起動](#61-開発サーバーの起動)
  - [6.2 確認項目](#62-確認項目)
- [確認チェックリスト](#確認チェックリスト)
- [発展課題](#発展課題)
- [トラブルシューティング](#トラブルシューティング)
  - [@ec/validators が見つからない](#ecvalidators-が見つからない)
  - [useActionState が見つからない](#useactionstate-が見つからない)
  - [TypeScript エラー](#typescript-エラー)
- [完了条件](#完了条件)

## 目標

Zod と Server Actions を使ってユーザー登録フォームを実装します。
バリデーション、エラー表示、送信状態の管理を含む完全なフォームを作成します。

***

## 前提条件

以下を確認してください。

- Phase 7 の学習ドキュメント（01〜05）を読んでいること
- `packages/validators` パッケージが存在すること
- `apps/web` で開発できる環境が整っていること

***

## 完成イメージ

```
┌─────────────────────────────────────────────┐
│            ユーザー登録                      │
│                                             │
│  メールアドレス *                            │
│  ┌─────────────────────────────────────┐   │
│  │ example@email.com                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  パスワード *                                │
│  ┌─────────────────────────────────────┐   │
│  │ ••••••••                            │   │
│  └─────────────────────────────────────┘   │
│  ✓ 8文字以上 ✓ 大文字 ✓ 小文字 ✓ 数字      │
│                                             │
│  パスワード確認 *                            │
│  ┌─────────────────────────────────────┐   │
│  │ ••••••••                            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  お名前 *                                   │
│  ┌─────────────────────────────────────┐   │
│  │ 山田 太郎                            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ☐ 利用規約に同意する                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │             登録する                 │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

***

## ステップ 1: Zod スキーマの作成

### 1.1 validators パッケージの設定確認

`packages/validators/package.json` を確認します。

```json
{
  "name": "@ec/validators",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": "./src/index.ts",
    "./user": "./src/user.ts"
  },
  "dependencies": {
    "zod": "catalog:"
  },
  "devDependencies": {
    "@ec/typescript-config": "workspace:*",
    "typescript": "catalog:"
  }
}
```

### 1.2 ユーザー登録スキーマの作成

`packages/validators/src/user.ts` を作成します。

```typescript
import { z } from "zod";

/**
 * パスワードのバリデーションルール
 */
const passwordSchema = z
  .string({ required_error: "パスワードは必須です" })
  .min(8, { message: "パスワードは8文字以上で入力してください" })
  .max(100, { message: "パスワードは100文字以内で入力してください" })
  .regex(/[A-Z]/, { message: "大文字を1文字以上含めてください" })
  .regex(/[a-z]/, { message: "小文字を1文字以上含めてください" })
  .regex(/[0-9]/, { message: "数字を1文字以上含めてください" });

/**
 * ユーザー登録スキーマ
 */
export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "メールアドレスは必須です" })
      .email({ message: "有効なメールアドレスを入力してください" }),
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "パスワード確認は必須です",
    }),
    name: z
      .string({ required_error: "お名前は必須です" })
      .min(1, { message: "お名前を入力してください" })
      .max(50, { message: "お名前は50文字以内で入力してください" }),
    agreedToTerms: z.literal(true, {
      errorMap: () => ({ message: "利用規約に同意してください" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

/**
 * 登録フォームの入力型
 */
export type RegisterInput = z.infer<typeof registerSchema>;
```

### 1.3 エクスポートの追加

`packages/validators/src/index.ts` を更新します。

```typescript
export * from "./user";
```

***

## ステップ 2: 型定義の作成

### 2.1 ActionState 型の定義

`apps/web/types/action.ts` を作成します。

```typescript
/**
 * Server Action の戻り値の型
 */
export type ActionState<T = unknown> = {
  /** 処理が成功したかどうか */
  success: boolean;
  /** ユーザーへのメッセージ */
  message?: string;
  /** フィールドごとのエラーメッセージ */
  errors?: Record<string, string[]>;
  /** 成功時のデータ */
  data?: T;
};
```

***

## ステップ 3: Server Action の実装

### 3.1 登録アクションの作成

`apps/web/app/actions/auth.ts` を作成します。

```typescript
"use server";

import { registerSchema } from "@ec/validators/user";
import type { ActionState } from "@/types/action";

/**
 * ユーザー登録 Server Action
 */
export async function registerUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // FormData からオブジェクトに変換
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
    agreedToTerms: formData.get("agreedToTerms") === "on",
  };

  // バリデーション
  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    // フィールドごとのエラーを整形
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = errors[field] ?? [];
      errors[field].push(issue.message);
    }

    return {
      success: false,
      message: "入力内容を確認してください",
      errors,
    };
  }

  try {
    // 本番ではここでデータベースに保存
    // 今回は擬似的に成功を返す
    console.log("Registering user:", result.data.email);

    // 擬似的な遅延（実際の処理時間をシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "登録が完了しました。メールをご確認ください。",
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "登録に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
```

***

## ステップ 4: フォームコンポーネントの実装

### 4.1 フォームフィールドコンポーネント

`apps/web/components/FormField.tsx` を作成します。

```typescript
type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  errors?: string[];
  required?: boolean;
  placeholder?: string;
};

export function FormField({
  name,
  label,
  type = "text",
  errors,
  required = false,
  placeholder,
}: FormFieldProps): JSX.Element {
  const hasError = errors && errors.length > 0;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300"
          }
        `}
      />
      {hasError && (
        <div id={`${name}-error`} role="alert" className="mt-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 4.2 送信ボタンコンポーネント

`apps/web/components/SubmitButton.tsx` を作成します。

```typescript
"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  loadingText?: string;
};

export function SubmitButton({
  children,
  loadingText = "送信中...",
}: SubmitButtonProps): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full py-2 px-4 rounded-md text-white font-medium
        transition-colors duration-200
        ${pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
        }
      `}
    >
      {pending ? loadingText : children}
    </button>
  );
}
```

### 4.3 登録フォームコンポーネント

`apps/web/components/RegisterForm.tsx` を作成します。

```typescript
"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import type { ActionState } from "@/types/action";

const initialState: ActionState = {
  success: false,
};

export function RegisterForm(): JSX.Element {
  const [state, formAction] = useActionState(registerUser, initialState);

  // 登録成功時の表示
  if (state.success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-2">登録が完了しました</h2>
        <p className="text-gray-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* 全体エラーメッセージ */}
      {!state.success && state.message && !state.errors && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-md"
          role="alert"
        >
          <p className="text-red-700">{state.message}</p>
        </div>
      )}

      <FormField
        name="email"
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        errors={state.errors?.email}
        required
      />

      <FormField
        name="password"
        label="パスワード"
        type="password"
        placeholder="8文字以上（大文字・小文字・数字を含む）"
        errors={state.errors?.password}
        required
      />

      <FormField
        name="confirmPassword"
        label="パスワード確認"
        type="password"
        placeholder="パスワードを再入力"
        errors={state.errors?.confirmPassword}
        required
      />

      <FormField
        name="name"
        label="お名前"
        type="text"
        placeholder="山田 太郎"
        errors={state.errors?.name}
        required
      />

      {/* 利用規約同意 */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreedToTerms"
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">
            <a href="/terms" className="text-blue-500 underline">
              利用規約
            </a>
            に同意する
          </span>
        </label>
        {state.errors?.agreedToTerms && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.agreedToTerms[0]}
          </p>
        )}
      </div>

      <SubmitButton loadingText="登録中...">登録する</SubmitButton>
    </form>
  );
}
```

***

## ステップ 5: ページの作成

### 5.1 登録ページ

`apps/web/app/register/page.tsx` を作成します。

```typescript
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">ユーザー登録</h1>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          すでにアカウントをお持ちですか？{" "}
          <a href="/login" className="text-blue-500 underline">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
}
```

***

## ステップ 6: 動作確認

### 6.1 開発サーバーの起動

```bash
pnpm dev
```

### 6.2 確認項目

1. <http://localhost:3000/register> にアクセス
2. 以下のケースを確認:

| テストケース      | 期待する動作         |
| ----------- | -------------- |
| 何も入力せずに送信   | 全フィールドにエラー表示   |
| 無効なメールアドレス  | メールフィールドにエラー   |
| 8文字未満のパスワード | パスワードフィールドにエラー |
| パスワード不一致    | 確認フィールドにエラー    |
| 利用規約に未同意    | チェックボックス下にエラー  |
| 全て正しく入力     | 登録完了メッセージ表示    |

***

## 確認チェックリスト

以下を確認してください。

- [ ] Zod スキーマが正しく動作する
- [ ] Server Action が FormData を正しく処理する
- [ ] バリデーションエラーが各フィールドに表示される
- [ ] 送信中に「登録中...」と表示される
- [ ] 登録成功時に完了メッセージが表示される
- [ ] アクセシビリティ属性（aria-invalid, aria-describedby）が設定されている

***

## 発展課題

1. **パスワード強度インジケーター**
   - パスワード入力時にリアルタイムで強度を表示
   - 大文字・小文字・数字の含有をチェックマークで表示

2. **メールアドレス重複チェック**
   - Server Action で既存メールアドレスをチェック
   - 重複時にエラーメッセージを表示

3. **フォームリセット機能**
   - リセットボタンの追加
   - 確認ダイアログの表示

***

## トラブルシューティング

### @ec/validators が見つからない

```bash
# ワークスペースの依存関係を再インストール
pnpm install
```

### useActionState が見つからない

React 19 以降が必要です。`package.json` を確認してください。

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### TypeScript エラー

```bash
# 型チェック
pnpm typecheck
```

***

## 完了条件

以下がすべて動作すれば、この演習は完了です。

- Zod スキーマでバリデーションが動作する
- Server Action がフォームデータを処理する
- エラーメッセージが適切に表示される
- 送信中状態が表示される
- 登録完了時にメッセージが表示される

次は [演習 2: 配送先住所フォーム](./02-address-form.md) に進みましょう。
