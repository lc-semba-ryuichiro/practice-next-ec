# Vitest 基礎

## 概要

Vitest は Vite ベースの高速なテストフレームワークです。
Jest との互換性を持ちながら、ESM ネイティブ対応やホットモジュールリプレースメント（HMR）による高速な開発体験を提供します。

このセクションでは、Vitest の基本的な使い方を学び、EC サイトのビジネスロジックをテストする方法を習得します。

---

## Vitest とは

### 特徴

- Vite のビルドパイプラインを利用し、Jest より高速に動作する
- `describe`, `it`, `expect` などの API が Jest と互換性を持つ
- ES Modules をネイティブで実行可能
- 設定不要で TypeScript をサポート
- ファイル変更時に関連するテストのみ再実行する watch モード

### Jest との比較

| 特徴              | Vitest     | Jest         |
| ----------------- | ---------- | ------------ |
| ESM 対応          | ネイティブ | 変換が必要   |
| TypeScript        | 設定不要   | ts-jest 必要 |
| watch 速度        | 高速       | 標準         |
| Vite プロジェクト | 最適       | 追加設定必要 |

---

## 基本構文

### テストの構造

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("テスト対象の名前", () => {
  // セットアップ（各テスト前に実行）
  beforeEach(() => {
    // 初期化処理
  });

  // クリーンアップ（各テスト後に実行）
  afterEach(() => {
    // 後処理
  });

  it("テストケースの説明", () => {
    // テストコード
    expect(実際の値).toBe(期待する値);
  });
});
```

### describe / it / test の違い

```typescript
// describe: テストをグループ化
describe("Cart", () => {
  // it と test は同じ（エイリアス）
  it("商品を追加できる", () => {
    // ...
  });

  test("商品を削除できる", () => {
    // ...
  });

  // ネストも可能
  describe("合計金額", () => {
    it("税込み価格を計算できる", () => {
      // ...
    });
  });
});
```

---

## アサーション（expect）

### 基本的なマッチャー

```typescript
// 等価性
expect(value).toBe(expected); // 厳密等価（===）
expect(value).toEqual(expected); // 深い等価（オブジェクト比較）

// 真偽値
expect(value).toBeTruthy(); // truthy な値
expect(value).toBeFalsy(); // falsy な値
expect(value).toBeNull(); // null
expect(value).toBeUndefined(); // undefined
expect(value).toBeDefined(); // undefined でない

// 数値
expect(value).toBeGreaterThan(3); // > 3
expect(value).toBeGreaterThanOrEqual(3); // >= 3
expect(value).toBeLessThan(3); // < 3
expect(value).toBeCloseTo(0.3, 5); // 浮動小数点の近似

// 文字列
expect(value).toMatch(/regex/); // 正規表現マッチ
expect(value).toContain("substring"); // 部分文字列

// 配列
expect(array).toContain(item); // 要素を含む
expect(array).toHaveLength(3); // 長さ
```

### オブジェクトのマッチャー

```typescript
// オブジェクトのプロパティ
expect(obj).toHaveProperty("key");
expect(obj).toHaveProperty("key", "value");

// 部分一致
expect(obj).toMatchObject({
  name: "テスト商品",
  // price は検証しない
});

// 例外
expect(() => {
  throw new Error("エラー");
}).toThrow("エラー");
```

---

## セットアップとティアダウン

### beforeEach / afterEach

```typescript
describe("Cart", () => {
  let cart: Cart;

  // 各テストの前に実行
  beforeEach(() => {
    cart = new Cart();
  });

  // 各テストの後に実行
  afterEach(() => {
    cart.clear();
  });

  it("初期状態は空", () => {
    expect(cart.items).toHaveLength(0);
  });

  it("商品を追加できる", () => {
    cart.addItem(product);
    expect(cart.items).toHaveLength(1);
  });
});
```

### beforeAll / afterAll

```typescript
describe("Database テスト", () => {
  // 全テストの前に1回だけ実行
  beforeAll(async () => {
    await db.connect();
  });

  // 全テストの後に1回だけ実行
  afterAll(async () => {
    await db.disconnect();
  });
});
```

---

## モック

### vi.fn() - モック関数

```typescript
import { vi } from "vitest";

it("コールバックが呼ばれる", () => {
  const callback = vi.fn();

  someFunction(callback);

  // 呼び出しを検証
  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("引数");
});
```

### vi.fn() の戻り値を設定

```typescript
const mockFn = vi
  .fn()
  .mockReturnValue("デフォルト値")
  .mockReturnValueOnce("1回目")
  .mockReturnValueOnce("2回目");

expect(mockFn()).toBe("1回目");
expect(mockFn()).toBe("2回目");
expect(mockFn()).toBe("デフォルト値");
```

### vi.mock() - モジュールモック

```typescript
import { vi } from "vitest";
import { fetchProducts } from "./api";

// モジュール全体をモック
vi.mock("./api", () => ({
  fetchProducts: vi.fn().mockResolvedValue([{ id: "1", name: "テスト商品", price: 1000 }]),
}));

it("商品を取得できる", async () => {
  const products = await fetchProducts();
  expect(products).toHaveLength(1);
});
```

### vi.spyOn() - 既存関数のスパイ

```typescript
import { vi } from "vitest";
import * as utils from "./utils";

it("formatPrice が呼ばれる", () => {
  // 既存の関数を監視
  const spy = vi.spyOn(utils, "formatPrice");

  // 関数を使用
  displayPrice(1000);

  // 呼び出しを検証
  expect(spy).toHaveBeenCalledWith(1000);

  // スパイを解除
  spy.mockRestore();
});
```

---

## EC サイトでの活用例

### カート計算ロジックのテスト

```typescript
// cart.ts
export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.1): number {
  return Math.floor(subtotal * taxRate);
}
```

```typescript
// cart.test.ts
import { describe, it, expect } from "vitest";
import { calculateTotal, calculateTax, type CartItem } from "./cart";

describe("calculateTotal", () => {
  it("空のカートは 0 を返す", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("単一商品の合計を計算できる", () => {
    const items: CartItem[] = [{ product: { id: "1", name: "Tシャツ", price: 1000 }, quantity: 2 }];
    expect(calculateTotal(items)).toBe(2000);
  });

  it("複数商品の合計を計算できる", () => {
    const items: CartItem[] = [
      { product: { id: "1", name: "Tシャツ", price: 1000 }, quantity: 2 },
      { product: { id: "2", name: "パンツ", price: 3000 }, quantity: 1 },
    ];
    expect(calculateTotal(items)).toBe(5000);
  });
});

describe("calculateTax", () => {
  it("消費税を計算できる", () => {
    expect(calculateTax(1000)).toBe(100);
  });

  it("税率を指定できる", () => {
    expect(calculateTax(1000, 0.08)).toBe(80);
  });

  it("端数を切り捨てる", () => {
    expect(calculateTax(999)).toBe(99); // 999 * 0.1 = 99.9 → 99
  });
});
```

---

## NG / OK パターン

### NG: テストが独立していない

```typescript
// NG: 前のテストの状態に依存している
describe("Cart", () => {
  const cart = new Cart(); // describe スコープで作成

  it("商品を追加できる", () => {
    cart.addItem(product);
    expect(cart.items).toHaveLength(1);
  });

  it("商品を削除できる", () => {
    // NG: 前のテストで追加された商品に依存
    cart.removeItem(product.id);
    expect(cart.items).toHaveLength(0);
  });
});
```

### OK: 各テストが独立している

```typescript
// OK: beforeEach で初期化
describe("Cart", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart(); // 各テスト前に新規作成
  });

  it("商品を追加できる", () => {
    cart.addItem(product);
    expect(cart.items).toHaveLength(1);
  });

  it("商品を削除できる", () => {
    cart.addItem(product); // このテスト用にセットアップ
    cart.removeItem(product.id);
    expect(cart.items).toHaveLength(0);
  });
});
```

### NG: 実装の詳細をテストしている

```typescript
// NG: 内部実装に依存
it("カートに追加する", () => {
  cart.addItem(product);
  expect(cart._items[0]).toEqual(product); // プライベート配列に直接アクセス
  expect(cart._lastUpdated).toBeDefined(); // 内部状態をテスト
});
```

### OK: 公開 API をテストしている

```typescript
// OK: 公開されたインターフェースをテスト
it("カートに追加する", () => {
  cart.addItem(product);
  expect(cart.items).toContainEqual(expect.objectContaining({ product }));
  expect(cart.getTotal()).toBe(product.price);
});
```

---

## 非同期テスト

### async/await

```typescript
it("商品を取得できる", async () => {
  const products = await fetchProducts();
  expect(products).toHaveLength(10);
});
```

### Promise

```typescript
it("商品を取得できる", () => {
  return fetchProducts().then((products) => {
    expect(products).toHaveLength(10);
  });
});
```

### タイムアウト設定

```typescript
// 個別のテストにタイムアウトを設定
it("時間のかかる処理", async () => {
  await longRunningTask();
}, 10000); // 10秒

// describe 全体に設定
describe("API テスト", { timeout: 10000 }, () => {
  // ...
});
```

---

## 確認質問

1. `describe`, `it`, `test` の違いは何ですか？

   **回答例**: `describe` はテストをグループ化するために使用する。`it` と `test` は同じ機能で、個別のテストケースを定義する。

2. `vi.fn()` と `vi.spyOn()` の使い分けはどうしますか？

   **回答例**: `vi.fn()` は新しいモック関数を作成する場合に使用する。`vi.spyOn()` は既存の関数を監視・置換する場合に使用し、テスト後は `mockRestore()` で元に戻せる。

3. `beforeEach` と `beforeAll` の違いは何ですか？

   **回答例**: `beforeEach` は各テストの前に毎回実行される。`beforeAll` は describe ブロック内のすべてのテストの前に1回だけ実行される。

4. `toBe` と `toEqual` の違いは何ですか？

   **回答例**: `toBe` は厳密等価（===）で比較する。プリミティブ値や同じ参照のオブジェクトに使用する。`toEqual` は深い等価比較で、オブジェクトや配列の内容を再帰的に比較する。

---

## 次のステップ

Vitest の基礎を学んだら、次は [Testing Library](./02-testing-library.md) でコンポーネントテストを学びましょう。
