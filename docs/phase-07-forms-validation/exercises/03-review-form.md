# 演習 3: 商品レビュー投稿フォーム

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [完成イメージ](#完成イメージ)
- [ステップ 1: Zod スキーマの作成](#ステップ-1-zod-スキーマの作成)
  - [1.1 レビュースキーマの作成](#11-レビュースキーマの作成)
  - [1.2 エクスポートの追加](#12-エクスポートの追加)
- [ステップ 2: Server Action の実装](#ステップ-2-server-action-の実装)
  - [2.1 レビュー投稿アクションの作成](#21-レビュー投稿アクションの作成)
- [ステップ 3: コンポーネントの実装](#ステップ-3-コンポーネントの実装)
  - [3.1 星評価コンポーネント](#31-星評価コンポーネント)
  - [3.2 テキストエリアコンポーネント](#32-テキストエリアコンポーネント)
  - [3.3 レビューカードコンポーネント](#33-レビューカードコンポーネント)
  - [3.4 レビューフォームコンポーネント](#34-レビューフォームコンポーネント)
- [ステップ 4: ページの作成](#ステップ-4-ページの作成)
  - [4.1 商品レビューページ](#41-商品レビューページ)
- [ステップ 5: 動作確認](#ステップ-5-動作確認)
  - [5.1 開発サーバーの起動](#51-開発サーバーの起動)
  - [5.2 確認項目](#52-確認項目)
- [ステップ 6: 楽観的更新の確認](#ステップ-6-楽観的更新の確認)
  - [6.1 ネットワーク遅延のシミュレート](#61-ネットワーク遅延のシミュレート)
- [確認チェックリスト](#確認チェックリスト)
- [発展課題](#発展課題)
- [トラブルシューティング](#トラブルシューティング)
  - [楽観的更新が動作しない](#楽観的更新が動作しない)
  - [フォームがリセットされない](#フォームがリセットされない)
  - [lucide-react がインストールされていない](#lucide-react-がインストールされていない)
- [完了条件](#完了条件)

## 目標

商品レビュー投稿フォームを実装します。
楽観的UI更新（useOptimistic）を使用して、投稿したレビューを即座に表示します。

***

## 前提条件

以下を確認してください。

- 演習1, 2を完了していること
- `packages/validators` と `apps/web` の環境が整っていること

***

## 完成イメージ

```text
┌─────────────────────────────────────────────┐
│  商品名: ワイヤレスイヤホン Pro              │
│                                             │
│  レビューを投稿                              │
│                                             │
│  評価 *                                     │
│  ☆ ☆ ☆ ☆ ☆  (クリックで選択)              │
│                                             │
│  タイトル *                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 音質が素晴らしい                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  レビュー内容 *                              │
│  ┌─────────────────────────────────────┐   │
│  │ 低音から高音までクリアに聞こえます。   │   │
│  │ ノイズキャンセリングも効果抜群です。   │   │
│  │                                       │   │
│  └─────────────────────────────────────┘   │
│  12 / 1000 文字                             │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │           レビューを投稿              │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  レビュー一覧                               │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ★★★★★  音質が素晴らしい           │   │
│  │ 低音から高音までクリアに...          │   │
│  │ 投稿者: 山田太郎  2024/01/15        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ★★★★☆  コスパ良好                 │   │
│  │ この価格でこの品質は...              │   │
│  │ 投稿者: 鈴木花子  2024/01/10        │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

***

## ステップ 1: Zod スキーマの作成

### 1.1 レビュースキーマの作成

`packages/validators/src/review.ts` を作成します。

```typescript
import { z } from "zod";

/**
 * 商品レビュースキーマ
 */
export const reviewSchema = z.object({
  productId: z.string().uuid({ message: "無効な商品IDです" }),
  rating: z
    .number({ required_error: "評価は必須です" })
    .int({ message: "評価は1〜5の整数で入力してください" })
    .min(1, { message: "評価は1以上で入力してください" })
    .max(5, { message: "評価は5以下で入力してください" }),
  title: z
    .string({ required_error: "タイトルは必須です" })
    .min(1, { message: "タイトルを入力してください" })
    .max(100, { message: "タイトルは100文字以内で入力してください" }),
  content: z
    .string({ required_error: "レビュー内容は必須です" })
    .min(10, { message: "レビューは10文字以上で入力してください" })
    .max(1000, { message: "レビューは1000文字以内で入力してください" }),
});

/**
 * レビュー入力の型
 */
export type ReviewInput = z.infer<typeof reviewSchema>;

/**
 * レビューデータの型（保存後）
 */
export type Review = ReviewInput & {
  id: string;
  userId: string;
  userName: string;
  createdAt: Date;
};
```

### 1.2 エクスポートの追加

`packages/validators/src/index.ts` を更新します。

```typescript
export * from "./user";
export * from "./address";
export * from "./review";
```

***

## ステップ 2: Server Action の実装

### 2.1 レビュー投稿アクションの作成

`apps/web/app/actions/review.ts` を作成します。

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { reviewSchema, type Review } from "@ec/validators/review";
import type { ActionState } from "@/types/action";

/**
 * レビューを投稿する Server Action
 */
export async function createReview(
  prevState: ActionState<Review>,
  formData: FormData
): Promise<ActionState<Review>> {
  const rawData = {
    productId: formData.get("productId"),
    rating: Number(formData.get("rating")),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  // バリデーション
  const result = reviewSchema.safeParse(rawData);

  if (!result.success) {
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
    // 本番ではデータベースに保存
    console.log("Creating review:", result.data);

    // 擬似的な遅延（サーバー処理をシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 保存されたレビューデータ
    const review: Review = {
      ...result.data,
      id: crypto.randomUUID(),
      userId: "user-123", // 本番では認証ユーザーIDを使用
      userName: "あなた",
      createdAt: new Date(),
    };

    // 商品ページのキャッシュを再検証
    revalidatePath(`/products/${result.data.productId}`);

    return {
      success: true,
      message: "レビューを投稿しました",
      data: review,
    };
  } catch (error) {
    console.error("Review creation error:", error);

    return {
      success: false,
      message: "投稿に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
```

***

## ステップ 3: コンポーネントの実装

### 3.1 星評価コンポーネント

`apps/web/components/StarRating.tsx` を作成します。

```typescript
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  name: string;
  value?: number;
  onChange?: (rating: number) => void;
  errors?: string[];
  readonly?: boolean;
};

export function StarRating({
  name,
  value = 0,
  onChange,
  errors,
  readonly = false,
}: StarRatingProps): JSX.Element {
  const [hoverValue, setHoverValue] = useState(0);
  const hasError = errors && errors.length > 0;

  const displayValue = hoverValue || value;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        評価
        <span className="text-red-500 ml-1" aria-hidden="true">
          *
        </span>
      </label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onMouseLeave={() => !readonly && setHoverValue(0)}
            className={`
              p-1 transition-colors
              ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}
            `}
            aria-label={`${star}つ星`}
          >
            <Star
              size={24}
              fill={star <= displayValue ? "#fbbf24" : "none"}
              stroke={star <= displayValue ? "#fbbf24" : "#9ca3af"}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {displayValue > 0 ? `${displayValue}つ星` : "選択してください"}
        </span>
      </div>
      <input type="hidden" name={name} value={value} />
      {hasError && (
        <div role="alert" className="mt-1">
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

### 3.2 テキストエリアコンポーネント

`apps/web/components/TextareaField.tsx` を作成します。

```typescript
type TextareaFieldProps = {
  name: string;
  label: string;
  errors?: string[];
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
};

export function TextareaField({
  name,
  label,
  errors,
  required = false,
  placeholder,
  maxLength = 1000,
  rows = 5,
}: TextareaFieldProps): JSX.Element {
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
      <textarea
        id={name}
        name={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`
          w-full px-3 py-2 border rounded-md resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300"
          }
        `}
        onInput={(e) => {
          const target = e.currentTarget;
          const counter = target.nextElementSibling;
          if (counter) {
            counter.textContent = `${target.value.length} / ${maxLength} 文字`;
          }
        }}
      />
      <p className="text-sm text-gray-500 mt-1">0 / {maxLength} 文字</p>
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

### 3.3 レビューカードコンポーネント

`apps/web/components/ReviewCard.tsx` を作成します。

```typescript
import { Star } from "lucide-react";
import type { Review } from "@ec/validators/review";

type ReviewCardProps = {
  review: Review;
  isOptimistic?: boolean;
};

export function ReviewCard({
  review,
  isOptimistic = false,
}: ReviewCardProps): JSX.Element {
  return (
    <div
      className={`
        p-4 border rounded-lg
        ${isOptimistic ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}
      `}
    >
      {isOptimistic && (
        <span className="text-xs text-blue-600 mb-2 block">投稿中...</span>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              fill={star <= review.rating ? "#fbbf24" : "none"}
              stroke={star <= review.rating ? "#fbbf24" : "#9ca3af"}
            />
          ))}
        </div>
        <span className="font-medium">{review.title}</span>
      </div>
      <p className="text-gray-600 mb-2 line-clamp-2">{review.content}</p>
      <div className="text-sm text-gray-500">
        投稿者: {review.userName}
        <span className="mx-2">|</span>
        {review.createdAt.toLocaleDateString("ja-JP")}
      </div>
    </div>
  );
}
```

### 3.4 レビューフォームコンポーネント

`apps/web/components/ReviewForm.tsx` を作成します。

```typescript
"use client";

import { useActionState, useOptimistic, useState, useRef, useTransition } from "react";
import { createReview } from "@/app/actions/review";
import { StarRating } from "./StarRating";
import { FormField } from "./FormField";
import { TextareaField } from "./TextareaField";
import { SubmitButton } from "./SubmitButton";
import { ReviewCard } from "./ReviewCard";
import type { ActionState } from "@/types/action";
import type { Review } from "@ec/validators/review";

type ReviewFormProps = {
  productId: string;
  productName: string;
  initialReviews: Review[];
};

const initialState: ActionState<Review> = {
  success: false,
};

export function ReviewForm({
  productId,
  productName,
  initialReviews,
}: ReviewFormProps): JSX.Element {
  const [state, formAction] = useActionState(createReview, initialState);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  // 楽観的更新
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    (currentReviews, newReview: Review) => [newReview, ...currentReviews]
  );

  const handleSubmit = (formData: FormData): void => {
    const optimisticReview: Review = {
      id: `temp-${Date.now()}`,
      productId,
      rating: Number(formData.get("rating")),
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      userId: "temp-user",
      userName: "あなた",
      createdAt: new Date(),
    };

    startTransition(async () => {
      // 楽観的にレビューを追加
      addOptimisticReview(optimisticReview);

      // Server Action を実行
      const result = await createReview(initialState, formData);

      if (result.success && result.data) {
        // 成功したら実際のデータで更新
        setReviews((prev) => [result.data!, ...prev]);
        setRating(0);
        formRef.current?.reset();
      } else {
        // 失敗時はエラーをコンソールに出力
        // 注: useOptimistic は transition 終了時に自動的にリバートするため、
        // 手動でのロールバックは不要
        console.error("レビューの投稿に失敗しました:", result.message);
        // 実際のアプリケーションでは toast 通知などでユーザーに知らせる
        // 例: toast.error(result.message ?? "レビューの投稿に失敗しました");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* フォーム */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">レビューを投稿</h2>
        <p className="text-gray-600 mb-4">商品: {productName}</p>

        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <input type="hidden" name="productId" value={productId} />

          {/* 全体エラーメッセージ */}
          {!state.success && state.message && !state.errors && (
            <div
              className="p-4 bg-red-50 border border-red-200 rounded-md"
              role="alert"
            >
              <p className="text-red-700">{state.message}</p>
            </div>
          )}

          {/* 成功メッセージ */}
          {state.success && state.message && (
            <div
              className="p-4 bg-green-50 border border-green-200 rounded-md"
              role="status"
            >
              <p className="text-green-700">{state.message}</p>
            </div>
          )}

          <StarRating
            name="rating"
            value={rating}
            onChange={setRating}
            errors={state.errors?.rating}
          />

          <FormField
            name="title"
            label="タイトル"
            placeholder="レビューのタイトルを入力"
            errors={state.errors?.title}
            required
          />

          <TextareaField
            name="content"
            label="レビュー内容"
            placeholder="商品の使用感などをお書きください（10文字以上）"
            errors={state.errors?.content}
            required
            maxLength={1000}
          />

          <SubmitButton loadingText="投稿中...">レビューを投稿</SubmitButton>
        </form>
      </div>

      {/* レビュー一覧 */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          レビュー一覧（{optimisticReviews.length}件）
        </h2>
        {optimisticReviews.length === 0 ? (
          <p className="text-gray-500">まだレビューはありません</p>
        ) : (
          <div className="space-y-4">
            {optimisticReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isOptimistic={review.id.startsWith("temp-")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

***

## ステップ 4: ページの作成

### 4.1 商品レビューページ

`apps/web/app/products/[id]/reviews/page.tsx` を作成します。

```typescript
import { ReviewForm } from "@/components/ReviewForm";
import type { Review } from "@ec/validators/review";

// 擬似的な既存レビューデータ
const mockReviews: Review[] = [
  {
    id: "review-1",
    productId: "product-1",
    rating: 4,
    title: "コスパ良好",
    content:
      "この価格でこの品質は素晴らしいです。音質もクリアで、バッテリーの持ちも良好です。",
    userId: "user-1",
    userName: "鈴木花子",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "review-2",
    productId: "product-1",
    rating: 5,
    title: "最高の買い物",
    content:
      "今まで使った中で一番のイヤホンです。ノイズキャンセリングが特に優れています。長時間使用しても耳が痛くなりません。",
    userId: "user-2",
    userName: "田中一郎",
    createdAt: new Date("2024-01-05"),
  },
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductReviewsPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  // 本番ではデータベースから取得
  const productName = "ワイヤレスイヤホン Pro";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">商品レビュー</h1>
        <ReviewForm
          productId={id}
          productName={productName}
          initialReviews={mockReviews}
        />
      </div>
    </div>
  );
}
```

***

## ステップ 5: 動作確認

### 5.1 開発サーバーの起動

```bash
pnpm dev
```

### 5.2 確認項目

1. <http://localhost:3000/products/product-1/reviews> にアクセス
2. 以下のケースを確認:

| テストケース      | 期待する動作       |
| ----------- | ------------ |
| 星をクリック      | 評価が選択される     |
| 星をホバー       | ホバー状態が表示される  |
| 評価なしで送信     | エラーメッセージ表示   |
| 10文字未満のレビュー | エラーメッセージ表示   |
| 正しく入力して送信   | 楽観的にレビューが追加  |
| 送信完了後       | 「投稿中...」が消える |

***

## ステップ 6: 楽観的更新の確認

### 6.1 ネットワーク遅延のシミュレート

Server Actionに意図的な遅延を入れているため、以下の動作を確認できます。

1. 送信ボタンをクリック
2. 即座にレビューがリストに追加される（「投稿中...」表示）
3. 1.5秒後にサーバー処理が完了
4. 「投稿中...」が消え、通常のレビューとして表示

***

## 確認チェックリスト

以下を確認してください。

- [ ] 星評価のインタラクションが動作する
- [ ] バリデーションエラーが表示される
- [ ] レビュー投稿時に楽観的に表示される
- [ ] 楽観的レビューは「投稿中...」と表示される
- [ ] サーバー処理完了後、正常なレビューとして表示される
- [ ] フォームがリセットされる

***

## 発展課題

1. **レビューの編集・削除**
   - 自分のレビューの編集機能
   - 削除確認ダイアログ

2. **レビューのソート**
   - 新着順 / 評価順でソート
   - フィルタリング機能

3. **画像添付**
   - レビューに画像を添付
   - プレビュー表示

4. **役に立ったボタン**
   - 「役に立った」ボタンの実装
   - 楽観的更新でカウントアップ

***

## トラブルシューティング

### 楽観的更新が動作しない

`useOptimistic` と `useTransition` が正しく連携しているか確認してください。
`startTransition` 内で `addOptimisticReview` を呼び出す必要があります。

### フォームがリセットされない

`formRef.current?.reset()` が成功時に呼び出されているか確認してください。

### lucide-react がインストールされていない

```bash
pnpm add lucide-react
```

***

## 完了条件

以下がすべて動作すれば、この演習は完了です。

- 星評価が正しく動作する
- バリデーションエラーが表示される
- レビュー投稿時に楽観的更新が動作する
- 投稿完了後にフォームがリセットされる

Phase 7のすべての演習が完了しました。
最後に [チェックリスト](../checklist.md) を確認して、理解度をチェックしましょう。
