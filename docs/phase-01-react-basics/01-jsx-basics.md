# JSX の基本

## 目次

- [JSX とは](#jsx-とは)
  - [JSX の例](#jsx-の例)
- [JSX の基本ルール](#jsx-の基本ルール)
  - [1. 必ず1つの親要素で囲む](#1-必ず1つの親要素で囲む)
  - [2. すべてのタグを閉じる](#2-すべてのタグを閉じる)
  - [3. コンポーネントは大文字で始める](#3-コンポーネントは大文字で始める)
- [式の埋め込み](#式の埋め込み)
  - [変数の表示](#変数の表示)
  - [計算式](#計算式)
  - [関数の呼び出し](#関数の呼び出し)
- [HTML との違い](#html-との違い)
  - [属性名の違い](#属性名の違い)
  - [style 属性](#style-属性)
- [JSX でのコメント](#jsx-でのコメント)
- [React Fragment](#react-fragment)
  - [React.Fragment を使う方法](#reactfragment-を使う方法)
  - [短縮構文 `<></>`](#短縮構文-)
  - [Fragment が必要な場面](#fragment-が必要な場面)
- [三項演算子による条件分岐](#三項演算子による条件分岐)
  - [複雑な条件は避ける](#複雑な条件は避ける)
- [EC サイトでの実践例](#ec-サイトでの実践例)
  - [商品価格表示](#商品価格表示)
  - [商品カードの骨格](#商品カードの骨格)
- [よくある間違い](#よくある間違い)
  - [1. 中括弧の二重化](#1-中括弧の二重化)
  - [2. 属性値に文字列と中括弧を混在](#2-属性値に文字列と中括弧を混在)
  - [3. return で括弧を忘れる](#3-return-で括弧を忘れる)
- [まとめ](#まとめ)
- [次のステップ](#次のステップ)

## JSX とは

**JSX（JavaScript XML）** は、JavaScript の中に HTML のような構文を書ける拡張構文です。
React でコンポーネントの UI を記述するために使用します。

### JSX の例

```tsx
// JSX を使った React コンポーネント
function ProductCard(): React.ReactElement {
  return (
    <div className="product-card">
      <h2>商品名</h2>
      <p>¥1,000</p>
    </div>
  );
}
```

JSX は最終的に JavaScript にトランスパイルされます。

```javascript
// 上記の JSX はこのように変換される
function ProductCard() {
  return React.createElement(
    "div",
    { className: "product-card" },
    React.createElement("h2", null, "商品名"),
    React.createElement("p", null, "¥1,000")
  );
}
```

---

## JSX の基本ルール

### 1. 必ず1つの親要素で囲む

JSX は **1 つの親要素** を返す必要があります。

```tsx
// NG: 複数の要素を直接返せない
function Bad(): React.ReactElement {
  return (
    <h1>タイトル</h1>
    <p>本文</p>
  );
}

// OK: 1 つの親要素で囲む
function Good(): React.ReactElement {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  );
}
```

### 2. すべてのタグを閉じる

HTML では省略可能な閉じタグも、JSX では必須です。

```tsx
// NG: 閉じタグがない
<img src="product.jpg">
<input type="text">
<br>

// OK: 自己閉じタグを使用
<img src="product.jpg" />
<input type="text" />
<br />
```

### 3. コンポーネントは大文字で始める

React コンポーネントは **PascalCase（大文字始まり）** で命名します。

```tsx
// HTML 要素（小文字）
<div>
<span>
<button>

// React コンポーネント（大文字始まり）
<ProductCard>
<CartButton>
<PriceDisplay>
```

---

## 式の埋め込み

中括弧 `{}` を使って JavaScript の式を JSX に埋め込めます。

### 変数の表示

```tsx
function PriceDisplay(): React.ReactElement {
  const price = 1980;
  const productName = "Tシャツ";

  return (
    <div>
      <h2>{productName}</h2>
      <p>価格: ¥{price}</p>
    </div>
  );
}
```

### 計算式

```tsx
function CartTotal(): React.ReactElement {
  const price = 1980;
  const quantity = 3;
  const taxRate = 0.1;

  return (
    <div>
      <p>小計: ¥{price * quantity}</p>
      <p>税込: ¥{Math.floor(price * quantity * (1 + taxRate))}</p>
    </div>
  );
}
```

### 関数の呼び出し

```tsx
function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

function PriceDisplay(): React.ReactElement {
  const price = 12800;

  return <p>価格: {formatPrice(price)}</p>; // 価格: ¥12,800
}
```

---

## HTML との違い

JSX は HTML に似ていますが、いくつかの重要な違いがあります。

### 属性名の違い

| HTML        | JSX         | 理由                           |
| ----------- | ----------- | ------------------------------ |
| `class`     | `className` | `class` は JavaScript の予約語 |
| `for`       | `htmlFor`   | `for` は JavaScript の予約語   |
| `tabindex`  | `tabIndex`  | JSX は camelCase               |
| `onclick`   | `onClick`   | JSX は camelCase               |
| `readonly`  | `readOnly`  | JSX は camelCase               |
| `maxlength` | `maxLength` | JSX は camelCase               |

```tsx
// HTML
<label for="email" class="label">メール</label>
<input type="email" id="email" class="input" tabindex="1">

// JSX
<label htmlFor="email" className="label">メール</label>
<input type="email" id="email" className="input" tabIndex={1} />
```

### style 属性

HTML では文字列ですが、JSX では **オブジェクト** で指定します。

```tsx
// HTML
<div style="color: red; font-size: 16px; background-color: #f0f0f0;">

// JSX
<div style={{ color: "red", fontSize: "16px", backgroundColor: "#f0f0f0" }}>
```

プロパティ名は camelCase に変換されます。

| CSS                | JSX style オブジェクト |
| ------------------ | ---------------------- |
| `font-size`        | `fontSize`             |
| `background-color` | `backgroundColor`      |
| `border-radius`    | `borderRadius`         |
| `z-index`          | `zIndex`               |

---

## JSX でのコメント

JSX 内でコメントを書くには `{/* */}` を使います。

```tsx
function ProductCard(): React.ReactElement {
  return (
    <div className="product-card">
      {/* 商品画像 */}
      <img
        src="product.jpg"
        alt="商品画像"
      />

      {/* 商品情報 */}
      <div className="product-info">
        <h2>商品名</h2>
        {/* TODO: 価格フォーマットを適用する */}
        <p>¥1,000</p>
      </div>
    </div>
  );
}
```

---

## React Fragment

余分な DOM 要素を追加せずに複数の要素をグループ化できます。

### React.Fragment を使う方法

```tsx
import { Fragment } from "react";

function ProductInfo(): React.ReactElement {
  return (
    <Fragment>
      <h2>商品名</h2>
      <p>¥1,000</p>
      <p>在庫あり</p>
    </Fragment>
  );
}
```

### 短縮構文 `<></>`

```tsx
function ProductInfo(): React.ReactElement {
  return (
    <>
      <h2>商品名</h2>
      <p>¥1,000</p>
      <p>在庫あり</p>
    </>
  );
}
```

### Fragment が必要な場面

```tsx
// テーブルの行を返すコンポーネント
function TableRow(): React.ReactElement {
  return (
    <>
      <td>商品A</td>
      <td>¥1,000</td>
      <td>10個</td>
    </>
  );
}

// 使用例
function Table(): React.ReactElement {
  return (
    <table>
      <tbody>
        <tr>
          <TableRow />
        </tr>
      </tbody>
    </table>
  );
}
```

---

## 三項演算子による条件分岐

JSX 内で `if` 文は使えませんが、三項演算子は使えます。

```tsx
function StockBadge({ inStock }: { inStock: boolean }): React.ReactElement {
  return (
    <span className={inStock ? "badge-green" : "badge-red"}>
      {inStock ? "在庫あり" : "在庫切れ"}
    </span>
  );
}
```

### 複雑な条件は避ける

```tsx
// NG: 読みにくい
function Badge({ status }: { status: string }): React.ReactElement {
  return (
    <span>
      {status === "available"
        ? "在庫あり"
        : status === "low"
          ? "残りわずか"
          : status === "out"
            ? "在庫切れ"
            : "不明"}
    </span>
  );
}

// OK: 関数やオブジェクトに抽出
const STATUS_LABELS: Record<string, string> = {
  available: "在庫あり",
  low: "残りわずか",
  out: "在庫切れ",
};

function Badge({ status }: { status: string }): React.ReactElement {
  return <span>{STATUS_LABELS[status] ?? "不明"}</span>;
}
```

---

## EC サイトでの実践例

### 商品価格表示

```tsx
type PriceDisplayProps = {
  price: number;
  originalPrice?: number;
  currency?: string;
};

function PriceDisplay({
  price,
  originalPrice,
  currency = "¥",
}: PriceDisplayProps): React.ReactElement {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const discountRate = hasDiscount ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="price-display">
      {hasDiscount && (
        <span className="original-price">
          {currency}
          {originalPrice.toLocaleString()}
        </span>
      )}
      <span className="current-price">
        {currency}
        {price.toLocaleString()}
      </span>
      {hasDiscount && <span className="discount-badge">{discountRate}% OFF</span>}
    </div>
  );
}
```

### 商品カードの骨格

```tsx
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
};

function ProductCard({ product }: { product: Product }): React.ReactElement {
  return (
    <article className="product-card">
      {/* 商品画像 */}
      <div className="product-image">
        <img
          src={product.imageUrl}
          alt={product.name}
        />
        {!product.inStock && <div className="sold-out-overlay">SOLD OUT</div>}
      </div>

      {/* 商品情報 */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">¥{product.price.toLocaleString()}</p>
      </div>

      {/* アクションボタン */}
      <button
        type="button"
        className="add-to-cart-button"
        disabled={!product.inStock}
      >
        {product.inStock ? "カートに追加" : "入荷待ち"}
      </button>
    </article>
  );
}
```

---

## よくある間違い

### 1. 中括弧の二重化

```tsx
// NG: 二重中括弧の間違った使い方
<div style={{"color: red"}}>  // 文字列になってしまう

// OK: オブジェクトを渡す
<div style={{ color: "red" }}>
```

### 2. 属性値に文字列と中括弧を混在

```tsx
// NG: 中括弧と引用符を混在
<img src={"product.jpg"} />  // 動作するが冗長

// OK: 文字列リテラルはそのまま
<img src="product.jpg" />

// OK: 変数を使う場合は中括弧
const imageUrl = "product.jpg";
<img src={imageUrl} />
```

### 3. return で括弧を忘れる

```tsx
// NG: 括弧がないと undefined が返る
function Bad(): React.ReactElement {
  return;
  <div>Hello</div>; // この行は実行されない
}

// OK: 括弧で囲む
function Good(): React.ReactElement {
  return <div>Hello</div>;
}
```

---

## まとめ

| 概念               | 説明                                      |
| ------------------ | ----------------------------------------- |
| JSX                | JavaScript 内に HTML ライクな構文を書ける |
| 式の埋め込み       | `{}` で JavaScript の式を埋め込む         |
| className          | HTML の class の代わりに使用              |
| style オブジェクト | スタイルは camelCase のオブジェクトで指定 |
| Fragment           | 余分な DOM 要素なしで複数要素をグループ化 |
| 自己閉じタグ       | すべてのタグを閉じる必要がある            |

---

## 次のステップ

JSX の基本を理解したら、[コンポーネントと props](./02-components-props.md) に進んで、
再利用可能なコンポーネントの作り方を学びましょう。
