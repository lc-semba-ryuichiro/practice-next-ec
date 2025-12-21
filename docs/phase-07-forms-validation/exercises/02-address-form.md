# 演習 2: 配送先住所フォーム

## 目標

EC サイトの購入フローで使用する配送先住所フォームを実装します。
郵便番号から住所を自動入力する機能も含めて作成します。

---

## 前提条件

以下を確認してください。

- 演習 1 を完了していること
- `packages/validators` と `apps/web` の環境が整っていること

---

## 完成イメージ

```text
┌─────────────────────────────────────────────┐
│           配送先住所                         │
│                                             │
│  郵便番号 *                                  │
│  ┌───────────────┐  ┌──────────────────┐   │
│  │ 100-0001      │  │  住所を検索      │   │
│  └───────────────┘  └──────────────────┘   │
│                                             │
│  都道府県 *                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 東京都                         ▼    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  市区町村 *                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 千代田区                             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  番地 *                                     │
│  ┌─────────────────────────────────────┐   │
│  │ 1-1-1                               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  建物名・部屋番号                            │
│  ┌─────────────────────────────────────┐   │
│  │ ○○マンション 101号室                 │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  電話番号 *                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 09012345678                         │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │            保存する                  │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## ステップ 1: Zod スキーマの作成

### 1.1 住所スキーマの作成

`packages/validators/src/address.ts` を作成します。

```typescript
import { z } from "zod";

/**
 * 都道府県リスト
 */
export const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;

export type Prefecture = (typeof prefectures)[number];

/**
 * 郵便番号の正規表現
 * ハイフンあり・なし両対応
 */
const postalCodeRegex = /^\d{3}-?\d{4}$/;

/**
 * 電話番号の正規表現
 * 固定電話・携帯電話両対応
 */
const phoneRegex = /^0\d{9,10}$/;

/**
 * 配送先住所スキーマ
 */
export const addressSchema = z.object({
  postalCode: z.string({ required_error: "郵便番号は必須です" }).regex(postalCodeRegex, {
    message: "郵便番号は「123-4567」または「1234567」の形式で入力してください",
  }),
  prefecture: z
    .string({ required_error: "都道府県は必須です" })
    .min(1, { message: "都道府県を選択してください" })
    .refine((val) => prefectures.includes(val as Prefecture), {
      message: "有効な都道府県を選択してください",
    }),
  city: z
    .string({ required_error: "市区町村は必須です" })
    .min(1, { message: "市区町村を入力してください" })
    .max(100, { message: "市区町村は100文字以内で入力してください" }),
  address: z
    .string({ required_error: "番地は必須です" })
    .min(1, { message: "番地を入力してください" })
    .max(100, { message: "番地は100文字以内で入力してください" }),
  building: z.string().max(100, { message: "建物名は100文字以内で入力してください" }).optional(),
  phone: z.string({ required_error: "電話番号は必須です" }).regex(phoneRegex, {
    message: "電話番号はハイフンなしで入力してください（例: 09012345678）",
  }),
});

/**
 * 配送先住所の入力型
 */
export type AddressInput = z.infer<typeof addressSchema>;
```

### 1.2 エクスポートの追加

`packages/validators/src/index.ts` を更新します。

```typescript
export * from "./user";
export * from "./address";
```

---

## ステップ 2: 郵便番号検索 API

### 2.1 郵便番号検索の型定義

`apps/web/types/postal.ts` を作成します。

```typescript
/**
 * 郵便番号検索 API のレスポンス型
 */
export type PostalSearchResult = {
  prefecture: string;
  city: string;
  address: string;
};
```

### 2.2 郵便番号を検索する関数

`apps/web/lib/postal.ts` を作成します。

```typescript
import type { PostalSearchResult } from "@/types/postal";

/**
 * 郵便番号から住所を検索する
 * 郵便番号検索 API (zipcloud) を使用
 */
export async function searchByPostalCode(postalCode: string): Promise<PostalSearchResult | null> {
  // ハイフンを除去
  const code = postalCode.replace(/-/g, "");

  if (!/^\d{7}$/.test(code)) {
    return null;
  }

  try {
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        prefecture: result.address1,
        city: result.address2,
        address: result.address3,
      };
    }

    return null;
  } catch (error) {
    console.error("Postal code search error:", error);
    return null;
  }
}
```

---

## ステップ 3: Server Action の実装

### 3.1 住所保存アクションの作成

`apps/web/app/actions/address.ts` を作成します。

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { addressSchema } from "@ec/validators/address";
import type { ActionState } from "@/types/action";

/**
 * 配送先住所を保存する Server Action
 */
export async function saveAddress(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    postalCode: formData.get("postalCode"),
    prefecture: formData.get("prefecture"),
    city: formData.get("city"),
    address: formData.get("address"),
    building: formData.get("building") || undefined,
    phone: formData.get("phone"),
  };

  // バリデーション
  const result = addressSchema.safeParse(rawData);

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
    console.log("Saving address:", result.data);

    // 擬似的な遅延
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 関連ページのキャッシュを再検証
    revalidatePath("/checkout");

    return {
      success: true,
      message: "配送先住所を保存しました",
    };
  } catch (error) {
    console.error("Address save error:", error);

    return {
      success: false,
      message: "保存に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
```

---

## ステップ 4: フォームコンポーネントの実装

### 4.1 セレクトフィールドコンポーネント

`apps/web/components/SelectField.tsx` を作成します。

```typescript
type SelectFieldProps = {
  name: string;
  label: string;
  options: readonly string[];
  errors?: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export function SelectField({
  name,
  label,
  options,
  errors,
  required = false,
  value,
  onChange,
}: SelectFieldProps): JSX.Element {
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`
          w-full px-3 py-2 border rounded-md bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300"
          }
        `}
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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

### 4.2 住所フォームコンポーネント

`apps/web/components/AddressForm.tsx` を作成します。

```typescript
"use client";

import { useActionState, useState, useTransition } from "react";
import { saveAddress } from "@/app/actions/address";
import { searchByPostalCode } from "@/lib/postal";
import { prefectures } from "@ec/validators/address";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { SubmitButton } from "./SubmitButton";
import type { ActionState } from "@/types/action";

const initialState: ActionState = {
  success: false,
};

export function AddressForm(): JSX.Element {
  const [state, formAction] = useActionState(saveAddress, initialState);
  const [isPending, startTransition] = useTransition();

  // 住所フィールドの状態（郵便番号検索で更新するため）
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handlePostalSearch = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setSearchError(null);

    const form = e.currentTarget.closest("form");
    const postalCodeInput = form?.querySelector(
      'input[name="postalCode"]'
    ) as HTMLInputElement | null;
    const postalCode = postalCodeInput?.value;

    if (!postalCode) {
      setSearchError("郵便番号を入力してください");
      return;
    }

    startTransition(async () => {
      const result = await searchByPostalCode(postalCode);

      if (result) {
        setPrefecture(result.prefecture);
        setCity(result.city);
        setAddress(result.address);
      } else {
        setSearchError("住所が見つかりませんでした");
      }
    });
  };

  if (state.success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-2">保存が完了しました</h2>
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

      {/* 郵便番号 */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <FormField
            name="postalCode"
            label="郵便番号"
            placeholder="123-4567"
            errors={state.errors?.postalCode}
            required
          />
        </div>
        <button
          type="button"
          onClick={handlePostalSearch}
          disabled={isPending}
          className={`
            px-4 py-2 mb-4 rounded-md text-sm font-medium
            ${isPending
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
            }
          `}
        >
          {isPending ? "検索中..." : "住所を検索"}
        </button>
      </div>
      {searchError && (
        <p className="text-sm text-red-500 -mt-3">{searchError}</p>
      )}

      {/* 都道府県 */}
      <SelectField
        name="prefecture"
        label="都道府県"
        options={prefectures}
        value={prefecture}
        onChange={setPrefecture}
        errors={state.errors?.prefecture}
        required
      />

      {/* 市区町村 */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          市区町村
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="千代田区"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.city && (
          <p className="mt-1 text-sm text-red-500">{state.errors.city[0]}</p>
        )}
      </div>

      {/* 番地 */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          番地
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="1-1-1"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.address && (
          <p className="mt-1 text-sm text-red-500">{state.errors.address[0]}</p>
        )}
      </div>

      {/* 建物名 */}
      <FormField
        name="building"
        label="建物名・部屋番号"
        placeholder="○○マンション 101号室"
        errors={state.errors?.building}
      />

      {/* 電話番号 */}
      <FormField
        name="phone"
        label="電話番号"
        type="tel"
        placeholder="09012345678（ハイフンなし）"
        errors={state.errors?.phone}
        required
      />

      <SubmitButton loadingText="保存中...">保存する</SubmitButton>
    </form>
  );
}
```

---

## ステップ 5: ページの作成

### 5.1 住所入力ページ

`apps/web/app/checkout/address/page.tsx` を作成します。

```typescript
import { AddressForm } from "@/components/AddressForm";

export default function AddressPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">配送先住所</h1>
        <AddressForm />
      </div>
    </div>
  );
}
```

---

## ステップ 6: 動作確認

### 6.1 開発サーバーの起動

```bash
pnpm dev
```

### 6.2 確認項目

1. <http://localhost:3000/checkout/address> にアクセス
2. 以下のケースを確認:

| テストケース               | 期待する動作                       |
| -------------------------- | ---------------------------------- |
| 郵便番号を入力して検索     | 都道府県・市区町村・番地が自動入力 |
| 無効な郵便番号             | エラーメッセージ表示               |
| 存在しない郵便番号         | 「住所が見つかりませんでした」表示 |
| 必須項目が未入力のまま送信 | 各フィールドにエラー表示           |
| 無効な電話番号             | 電話番号フィールドにエラー         |
| 全て正しく入力             | 保存完了メッセージ表示             |

---

## 確認チェックリスト

以下を確認してください。

- [ ] 郵便番号検索が動作する
- [ ] 検索結果がフォームに反映される
- [ ] バリデーションエラーが表示される
- [ ] 都道府県のセレクトが正しく動作する
- [ ] 保存成功時に完了メッセージが表示される

---

## 発展課題

1. **住所履歴の表示**
   - 過去に登録した住所を一覧表示
   - クリックで選択・自動入力

2. **住所の編集・削除**
   - 既存住所の編集機能
   - 削除確認ダイアログ

3. **デフォルト住所の設定**
   - 「この住所をデフォルトにする」チェックボックス
   - 次回から自動で選択

---

## トラブルシューティング

### 郵便番号検索が動作しない

外部 API（zipcloud）への接続を確認してください。
開発環境ではプロキシ設定を要する場合があります。

### 都道府県の選択が反映されない

`useState` と `SelectField` の `value` / `onChange` が正しく連携しているか確認してください。

---

## 完了条件

以下がすべて動作すれば、この演習は完了です。

- 郵便番号検索で住所が自動入力される
- 都道府県のセレクトが正しく動作する
- バリデーションエラーが表示される
- 保存成功時にメッセージが表示される

次は [演習 3: 商品レビュー投稿フォーム](./03-review-form.md) に進みましょう。
