# MSW ハンドラー作成

## 目次

- [ハンドラーの基本構文](#ハンドラーの基本構文)
- [HTTP メソッド対応表](#http-メソッド対応表)
- [パスパラメータの扱い](#パスパラメータの扱い)
  - [複数のパスパラメータ](#複数のパスパラメータ)
- [クエリパラメータの扱い](#クエリパラメータの扱い)
- [リクエストボディの処理](#リクエストボディの処理)
- [遅延レスポンス](#遅延レスポンス)
- [エラーレスポンス](#エラーレスポンス)
- [レスポンスヘッダーの設定](#レスポンスヘッダーの設定)
- [EC サイト向けハンドラー集](#ec-サイト向けハンドラー集)
  - [商品関連](#商品関連)
  - [カテゴリ関連](#カテゴリ関連)
  - [検索関連](#検索関連)
- [テストでのハンドラー上書き](#テストでのハンドラー上書き)
- [動的なレスポンス](#動的なレスポンス)
- [ハンドラーの優先順位](#ハンドラーの優先順位)
- [まとめ](#まとめ)
- [次のステップ](#次のステップ)

## ハンドラーの基本構文

MSW 2.x では、`http` オブジェクトを使ってハンドラーを定義します。

```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json([
      { id: "1", name: "商品 A" },
      { id: "2", name: "商品 B" },
    ]);
  }),
];
```

---

## HTTP メソッド対応表

| メソッド | MSW 関数        | ユースケース   |
| -------- | --------------- | -------------- |
| GET      | `http.get()`    | データ取得     |
| POST     | `http.post()`   | データ作成     |
| PUT      | `http.put()`    | データ全体更新 |
| PATCH    | `http.patch()`  | データ部分更新 |
| DELETE   | `http.delete()` | データ削除     |

---

## パスパラメータの扱い

URL に含まれるパスパラメータ（`:id` など）を取得できます。

```typescript
// mocks/handlers/products.ts
import { http, HttpResponse } from "msw";
import { products } from "../data/products";

export const productHandlers = [
  // GET /api/products/:id
  http.get("/api/products/:id", ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
```

### 複数のパスパラメータ

```typescript
// GET /api/categories/:categoryId/products/:productId
http.get("/api/categories/:categoryId/products/:productId", ({ params }) => {
  const { categoryId, productId } = params;
  // categoryId と productId を使用
});
```

---

## クエリパラメータの扱い

URL のクエリパラメータ（`?key=value`）を取得するには、`request.url` を使用します。

```typescript
// GET /api/products?category=food&sort=price
http.get("/api/products", ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort");
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";

  let filteredProducts = [...products];

  // カテゴリでフィルタリング
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.categoryId === category);
  }

  // ソート
  if (sort === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "-price") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // ページネーション
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const start = (pageNum - 1) * limitNum;
  const paginatedProducts = filteredProducts.slice(start, start + limitNum);

  return HttpResponse.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: pageNum,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
  });
});
```

---

## リクエストボディの処理

POST、PUT、PATCH リクエストでは、リクエストボディを取得できます。

```typescript
// mocks/handlers/cart.ts
import { http, HttpResponse } from "msw";

type AddToCartBody = {
  productId: string;
  quantity: number;
};

// カートの状態（メモリ内）
let cart: Array<{ productId: string; quantity: number }> = [];

export const cartHandlers = [
  // POST /api/cart
  http.post("/api/cart", async ({ request }) => {
    const body = (await request.json()) as AddToCartBody;
    const { productId, quantity } = body;

    // バリデーション
    if (!productId || quantity < 1) {
      return HttpResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // カートに追加
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    return HttpResponse.json({ success: true, cart }, { status: 201 });
  }),

  // DELETE /api/cart/:productId
  http.delete("/api/cart/:productId", ({ params }) => {
    const { productId } = params;

    cart = cart.filter((item) => item.productId !== productId);

    return HttpResponse.json({ success: true, cart });
  }),
];
```

---

## 遅延レスポンス

ローディング状態をテストするために、意図的に遅延を入れられます。

```typescript
import { http, HttpResponse, delay } from "msw";

http.get("/api/products", async () => {
  // 1 秒遅延
  await delay(1000);

  return HttpResponse.json(products);
});

// ランダムな遅延
http.get("/api/products", async () => {
  // 500ms 〜 2000ms のランダム遅延
  await delay(Math.random() * 1500 + 500);

  return HttpResponse.json(products);
});
```

---

## エラーレスポンス

様々なエラーケースをシミュレートできます。

```typescript
// mocks/handlers/errors.ts
import { http, HttpResponse } from "msw";

export const errorHandlers = [
  // 404 Not Found
  http.get("/api/products/:id", () => {
    return new HttpResponse(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  // 500 Internal Server Error
  http.get("/api/error", () => {
    return new HttpResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }),

  // 401 Unauthorized
  http.get("/api/protected", () => {
    return new HttpResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }),

  // ネットワークエラー
  http.get("/api/network-error", () => {
    return HttpResponse.error();
  }),
];
```

---

## レスポンスヘッダーの設定

```typescript
http.get("/api/products", () => {
  return new HttpResponse(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Total-Count": String(products.length),
      "Cache-Control": "max-age=3600",
    },
  });
});
```

---

## EC サイト向けハンドラー集

### 商品関連

```typescript
// mocks/handlers/products.ts
import { http, HttpResponse } from "msw";
import { products } from "../data/products";
import type { Product } from "@/types/product";

export const productHandlers = [
  // 商品一覧
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");

    let filtered = [...products];

    if (categoryId) {
      filtered = filtered.filter((p) => p.categoryId === categoryId);
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice, 10));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice, 10));
    }

    return HttpResponse.json(filtered);
  }),

  // 商品詳細
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  // 在庫確認
  http.get("/api/products/:id/stock", ({ params }) => {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return HttpResponse.json({
      productId: product.id,
      stock: product.stock,
      isAvailable: product.stock > 0,
    });
  }),
];
```

### カテゴリ関連

```typescript
// mocks/handlers/categories.ts
import { http, HttpResponse } from "msw";
import { categories } from "../data/categories";

export const categoryHandlers = [
  // カテゴリ一覧
  http.get("/api/categories", () => {
    return HttpResponse.json(categories);
  }),

  // カテゴリ詳細
  http.get("/api/categories/:slug", ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);

    if (!category) {
      return HttpResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return HttpResponse.json(category);
  }),
];
```

### 検索関連

```typescript
// mocks/handlers/search.ts
import { http, HttpResponse } from "msw";
import { products } from "../data/products";

export const searchHandlers = [
  // 商品検索
  http.get("/api/search", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    const categoryId = url.searchParams.get("categoryId");
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const order = url.searchParams.get("order") || "desc";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);

    // 検索
    let results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );

    // カテゴリフィルター
    if (categoryId) {
      results = results.filter((p) => p.categoryId === categoryId);
    }

    // ソート
    results.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue);
      const bStr = String(bValue);
      return order === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

    // ページネーション
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + limit);

    return HttpResponse.json({
      products: paginatedResults,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  }),
];
```

---

## テストでのハンドラー上書き

テストで特定のケースをシミュレートするために、ハンドラーを上書きできます。

```typescript
// __tests__/products.test.ts
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("Products", () => {
  it("handles empty product list", async () => {
    // このテストだけハンドラーを上書き
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([]);
      })
    );

    // テストコード...
  });

  it("handles server error", async () => {
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json({ error: "Internal server error" }, { status: 500 });
      })
    );

    // テストコード...
  });
});
```

---

## 動的なレスポンス

リクエストごとに異なるレスポンスを返すことも可能です。

```typescript
let requestCount = 0;

http.get("/api/products", () => {
  requestCount++;

  // 3 回目のリクエストでエラー
  if (requestCount === 3) {
    return HttpResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  return HttpResponse.json(products);
});
```

---

## ハンドラーの優先順位

同じパスに複数のハンドラーがある場合、後から追加したものが優先されます。

```typescript
const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(products);
  }),
];

// テストで上書き（こちらが優先）
server.use(
  http.get("/api/products", () => {
    return HttpResponse.json([]);
  })
);
```

---

## まとめ

| 機能             | 方法                            | 用途                  |
| ---------------- | ------------------------------- | --------------------- |
| パスパラメータ   | `{ params }`                    | `/api/products/:id`   |
| クエリパラメータ | `new URL(request.url)`          | `/api/products?q=...` |
| リクエストボディ | `await request.json()`          | POST/PUT/PATCH        |
| 遅延レスポンス   | `await delay(ms)`               | ローディングテスト    |
| エラーレスポンス | `HttpResponse(..., { status })` | エラーハンドリング    |
| ハンドラー上書き | `server.use(...)`               | テストケース          |

---

## 次のステップ

MSW ハンドラーの書き方を理解したら、[演習 1: 商品データ API](./exercises/01-product-api.md) で実際に商品 API を実装してみましょう。
