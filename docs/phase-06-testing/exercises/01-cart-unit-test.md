# 演習 1: カート機能ユニットテスト

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [完成イメージ](#完成イメージ)
- [ステップ 1: テストファイルの作成](#ステップ-1-テストファイルの作成)
- [ステップ 2: addItem のテスト（Red）](#ステップ-2-additem-のテストred)
- [ステップ 3: 最小限の実装（Green）](#ステップ-3-最小限の実装green)
- [ステップ 4: removeItem のテスト](#ステップ-4-removeitem-のテスト)
- [ステップ 5: updateQuantity のテスト](#ステップ-5-updatequantity-のテスト)
- [ステップ 6: getTotal のテスト](#ステップ-6-gettotal-のテスト)
- [ステップ 7: 完成したコード](#ステップ-7-完成したコード)
  - [cart.ts](#cartts)
  - [cart.test.ts](#carttestts)
- [確認チェックリスト](#確認チェックリスト)
- [トラブルシューティング](#トラブルシューティング)
  - [テストが見つからない](#テストが見つからない)
  - [型エラーが出る](#型エラーが出る)
  - [モックデータの変更が反映されない](#モックデータの変更が反映されない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [次の演習](#次の演習)

## 目標

Vitest を使って、カート機能のビジネスロジックをテストします。
TDD（テスト駆動開発）のワークフローを実践し、テストファーストでコードを書く感覚を身につけます。

```mermaid
graph LR
    A["テストを書く"] --> B["テスト失敗<br/>（Red）"]
    B --> C["実装する"]
    C --> D["テスト成功<br/>（Green）"]
    D --> E["リファクタ"]
    E --> A
```

---

## 前提条件

- [01-vitest-basics.md](../01-vitest-basics.md) を読んでいること
- Vitest のセットアップ済み

---

## 完成イメージ

以下はテスト実行結果の例です。

```text
 ✓ Cart
   ✓ addItem
     ✓ 商品をカートに追加できる
     ✓ 同じ商品を追加すると数量が増える
   ✓ removeItem
     ✓ 商品をカートから削除できる
     ✓ 存在しない商品を削除してもエラーにならない
   ✓ updateQuantity
     ✓ 数量を変更できる
     ✓ 数量が 0 になると商品が削除される
   ✓ getTotal
     ✓ 合計金額を計算できる
     ✓ 空のカートは 0 を返す
```

---

## ステップ 1: テストファイルの作成

まず、テストファイルを作成し、テスト対象の型を定義します。

```typescript
// lib/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from "vitest";

// 型定義（実装がなくてもテストは書ける）
interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// テスト用のモックデータ
const mockProduct: Product = {
  id: "1",
  name: "プレミアム T シャツ",
  price: 3980,
};

const mockProduct2: Product = {
  id: "2",
  name: "デニムパンツ",
  price: 7980,
};
```

---

## ステップ 2: addItem のテスト（Red）

まず、`addItem` のテストを書きます。この時点では `Cart` クラスが存在しないので、テストは失敗します。

```typescript
// lib/__tests__/cart.test.ts（続き）

describe("Cart", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  describe("addItem", () => {
    it("商品をカートに追加できる", () => {
      cart.addItem(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({
        product: mockProduct,
        quantity: 1,
      });
    });

    it("同じ商品を追加すると数量が増える", () => {
      cart.addItem(mockProduct);
      cart.addItem(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]?.quantity).toBe(2);
    });
  });
});
```

テストを実行すると、`Cart` が定義されていないのでエラーになります。

```bash
pnpm test cart.test.ts
```

---

## ステップ 3: 最小限の実装（Green）

テストを通すための最小限の実装をします。

```typescript
// lib/cart.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: Product): void {
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }
}
```

テストファイルでインポートを追加します。

```typescript
// lib/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Cart, type Product } from "../cart";

// モックデータは同じ
```

テストを実行します。

```bash
pnpm test cart.test.ts
# ✓ addItem のテストが通る
```

---

## ステップ 4: removeItem のテスト

```typescript
describe("removeItem", () => {
  it("商品をカートから削除できる", () => {
    cart.addItem(mockProduct);
    cart.removeItem(mockProduct.id);

    expect(cart.items).toHaveLength(0);
  });

  it("存在しない商品を削除してもエラーにならない", () => {
    expect(() => {
      cart.removeItem("non-existent-id");
    }).not.toThrow();
  });
});
```

以下のように実装します。

```typescript
// lib/cart.ts に追加
removeItem(productId: string): void {
  this.items = this.items.filter(
    (item) => item.product.id !== productId
  );
}
```

---

## ステップ 5: updateQuantity のテスト

```typescript
describe("updateQuantity", () => {
  it("数量を変更できる", () => {
    cart.addItem(mockProduct);
    cart.updateQuantity(mockProduct.id, 5);

    expect(cart.items[0]?.quantity).toBe(5);
  });

  it("数量が 0 になると商品が削除される", () => {
    cart.addItem(mockProduct);
    cart.updateQuantity(mockProduct.id, 0);

    expect(cart.items).toHaveLength(0);
  });

  it("数量が負の値になると商品が削除される", () => {
    cart.addItem(mockProduct);
    cart.updateQuantity(mockProduct.id, -1);

    expect(cart.items).toHaveLength(0);
  });
});
```

以下のように実装します。

```typescript
// lib/cart.ts に追加
updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    this.removeItem(productId);
    return;
  }

  const item = this.items.find(
    (item) => item.product.id === productId
  );

  if (item) {
    item.quantity = quantity;
  }
}
```

---

## ステップ 6: getTotal のテスト

```typescript
describe("getTotal", () => {
  it("合計金額を計算できる", () => {
    cart.addItem(mockProduct); // 3980円
    cart.addItem(mockProduct2); // 7980円

    expect(cart.getTotal()).toBe(11960);
  });

  it("数量を考慮して計算できる", () => {
    cart.addItem(mockProduct);
    cart.updateQuantity(mockProduct.id, 3);

    expect(cart.getTotal()).toBe(11940); // 3980 × 3
  });

  it("空のカートは 0 を返す", () => {
    expect(cart.getTotal()).toBe(0);
  });
});
```

以下のように実装します。

```typescript
// lib/cart.ts に追加
getTotal(): number {
  return this.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}
```

---

## ステップ 7: 完成したコード

### cart.ts

```typescript
// lib/cart.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: Product): void {
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
```

### cart.test.ts

```typescript
// lib/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Cart, type Product } from "../cart";

const mockProduct: Product = {
  id: "1",
  name: "プレミアム T シャツ",
  price: 3980,
};

const mockProduct2: Product = {
  id: "2",
  name: "デニムパンツ",
  price: 7980,
};

describe("Cart", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  describe("addItem", () => {
    it("商品をカートに追加できる", () => {
      cart.addItem(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({
        product: mockProduct,
        quantity: 1,
      });
    });

    it("同じ商品を追加すると数量が増える", () => {
      cart.addItem(mockProduct);
      cart.addItem(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]?.quantity).toBe(2);
    });
  });

  describe("removeItem", () => {
    it("商品をカートから削除できる", () => {
      cart.addItem(mockProduct);
      cart.removeItem(mockProduct.id);

      expect(cart.items).toHaveLength(0);
    });

    it("存在しない商品を削除してもエラーにならない", () => {
      expect(() => {
        cart.removeItem("non-existent-id");
      }).not.toThrow();
    });
  });

  describe("updateQuantity", () => {
    it("数量を変更できる", () => {
      cart.addItem(mockProduct);
      cart.updateQuantity(mockProduct.id, 5);

      expect(cart.items[0]?.quantity).toBe(5);
    });

    it("数量が 0 になると商品が削除される", () => {
      cart.addItem(mockProduct);
      cart.updateQuantity(mockProduct.id, 0);

      expect(cart.items).toHaveLength(0);
    });

    it("数量が負の値になると商品が削除される", () => {
      cart.addItem(mockProduct);
      cart.updateQuantity(mockProduct.id, -1);

      expect(cart.items).toHaveLength(0);
    });
  });

  describe("getTotal", () => {
    it("合計金額を計算できる", () => {
      cart.addItem(mockProduct);
      cart.addItem(mockProduct2);

      expect(cart.getTotal()).toBe(11960);
    });

    it("数量を考慮して計算できる", () => {
      cart.addItem(mockProduct);
      cart.updateQuantity(mockProduct.id, 3);

      expect(cart.getTotal()).toBe(11940);
    });

    it("空のカートは 0 を返す", () => {
      expect(cart.getTotal()).toBe(0);
    });
  });
});
```

---

## 確認チェックリスト

- [ ] テストファイルを作成できた
- [ ] `beforeEach` で Cart を初期化している
- [ ] `addItem` のテストがパスする
- [ ] `removeItem` のテストがパスする
- [ ] `updateQuantity` のテストがパスする
- [ ] `getTotal` のテストがパスする
- [ ] `pnpm test` でテストが成功する

---

## トラブルシューティング

### テストが見つからない

```bash
# ファイルパスを確認
pnpm test lib/__tests__/cart.test.ts
```

### 型エラーが出る

```bash
# tsconfig.json の設定を確認
# "strict": true が設定されているか
```

### モックデータの変更が反映されない

`beforeEach` で毎回新しい Cart インスタンスを作成しているか確認してください。

---

## 発展課題

1. **最大数量制限**: `updateQuantity` に最大数量（99 など）のバリデーションを追加
2. **在庫チェック**: 在庫数を超える数量を設定できないようにする
3. **割引適用**: クーポンコードによる割引機能を追加

---

## 完了条件

- [ ] すべてのテストがパスする
- [ ] `pnpm test:coverage` でカバレッジ 80% 以上

---

## 次の演習

[演習 2: コンポーネントテスト](./02-component-test.md) に進みましょう。
