# イベントハンドリング

## 目次

- [イベントハンドラとは](#イベントハンドラとは)
- [イベント属性の命名規則](#イベント属性の命名規則)
- [よく使うイベント](#よく使うイベント)
  - [onClick（クリック）](#onclickクリック)
  - [onChange（入力変更）](#onchange入力変更)
  - [onSubmit（フォーム送信）](#onsubmitフォーム送信)
  - [onFocus / onBlur（フォーカス）](#onfocus--onblurフォーカス)
- [イベントオブジェクト](#イベントオブジェクト)
  - [よく使うプロパティ](#よく使うプロパティ)
- [TypeScript でのイベント型](#typescript-でのイベント型)
  - [主要なイベント型](#主要なイベント型)
  - [要素ごとの型](#要素ごとの型)
- [イベントハンドラの定義方法](#イベントハンドラの定義方法)
  - [1. 名前付き関数（推奨）](#1-名前付き関数推奨)
  - [2. インライン関数](#2-インライン関数)
  - [3. 引数を渡す場合](#3-引数を渡す場合)
  - [名前付き関数 vs インライン関数](#名前付き関数-vs-インライン関数)
- [イベントの伝播](#イベントの伝播)
  - [イベントバブリング](#イベントバブリング)
  - [stopPropagation で伝播を停止](#stoppropagation-で伝播を停止)
- [preventDefault](#preventdefault)
- [EC サイトでの実践例](#ec-サイトでの実践例)
  - [カートに追加ボタン](#カートに追加ボタン)
  - [数量入力フォーム](#数量入力フォーム)
  - [商品検索フォーム](#商品検索フォーム)
  - [お気に入りボタン](#お気に入りボタン)
- [よくある間違い](#よくある間違い)
  - [1. ハンドラを呼び出してしまう](#1-ハンドラを呼び出してしまう)
  - [2. イベント型の間違い](#2-イベント型の間違い)
  - [3. preventDefault の位置](#3-preventdefault-の位置)
- [まとめ](#まとめ)
- [次のステップ](#次のステップ)

## イベントハンドラとは

**イベントハンドラ** は、ユーザーの操作（クリック、入力、送信など）に応答する関数です。
React では、JSX の属性としてイベントハンドラを設定します。

```tsx
function Button(): React.ReactElement {
  const handleClick = (): void => {
    console.log("クリックされました");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      クリック
    </button>
  );
}
```

***

## イベント属性の命名規則

HTML のイベント属性は小文字（onclick）ですが、React では **camelCase** を使います。

| HTML 属性        | React 属性       |
| -------------- | -------------- |
| `onclick`      | `onClick`      |
| `onchange`     | `onChange`     |
| `onsubmit`     | `onSubmit`     |
| `onfocus`      | `onFocus`      |
| `onblur`       | `onBlur`       |
| `onkeydown`    | `onKeyDown`    |
| `onmouseenter` | `onMouseEnter` |

***

## よく使うイベント

### onClick（クリック）

```tsx
function AddToCartButton(): React.ReactElement {
  const handleClick = (): void => {
    console.log("カートに追加しました");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      カートに追加
    </button>
  );
}
```

### onChange（入力変更）

```tsx
function SearchInput(): React.ReactElement {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="商品を検索"
    />
  );
}
```

### onSubmit（フォーム送信）

```tsx
function LoginForm(): React.ReactElement {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // ページリロードを防ぐ
    console.log("フォームが送信されました");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="メールアドレス"
      />
      <input
        type="password"
        placeholder="パスワード"
      />
      <button type="submit">ログイン</button>
    </form>
  );
}
```

### onFocus / onBlur（フォーカス）

```tsx
function FocusableInput(): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      className={isFocused ? "input-focused" : "input-normal"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="クリックしてフォーカス"
    />
  );
}
```

***

## イベントオブジェクト

イベントハンドラは **イベントオブジェクト** を引数として受け取ります。

```tsx
function InputLogger(): React.ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("入力値:", event.target.value);
    console.log("要素の name:", event.target.name);
    console.log("要素の type:", event.target.type);
  };

  return (
    <input
      type="text"
      name="username"
      onChange={handleChange}
    />
  );
}
```

### よく使うプロパティ

| プロパティ                     | 説明             |
| ------------------------- | -------------- |
| `event.target`            | イベントが発生した要素    |
| `event.target.value`      | 入力要素の値         |
| `event.target.name`       | 要素の name 属性    |
| `event.currentTarget`     | ハンドラがアタッチされた要素 |
| `event.preventDefault()`  | デフォルト動作を防ぐ     |
| `event.stopPropagation()` | イベントの伝播を停止     |

***

## TypeScript でのイベント型

### 主要なイベント型

```tsx
// クリックイベント
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {};

// 入力変更イベント
const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {};

// フォーム送信イベント
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {};

// キーボードイベント
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {};

// フォーカスイベント
const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {};
```

### 要素ごとの型

```tsx
// input 要素
React.ChangeEvent<HTMLInputElement>;

// textarea 要素
React.ChangeEvent<HTMLTextAreaElement>;

// select 要素
React.ChangeEvent<HTMLSelectElement>;

// button 要素
React.MouseEvent<HTMLButtonElement>;

// div 要素
React.MouseEvent<HTMLDivElement>;
```

***

## イベントハンドラの定義方法

### 1. 名前付き関数（推奨）

```tsx
function ProductCard(): React.ReactElement {
  const handleAddToCart = (): void => {
    console.log("カートに追加");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
    >
      カートに追加
    </button>
  );
}
```

### 2. インライン関数

```tsx
function ProductCard(): React.ReactElement {
  return (
    <button
      type="button"
      onClick={() => console.log("カートに追加")}
    >
      カートに追加
    </button>
  );
}
```

### 3. 引数を渡す場合

```tsx
function ProductCard({ productId }: { productId: string }): React.ReactElement {
  const handleAddToCart = (id: string): void => {
    console.log(`商品 ${id} をカートに追加`);
  };

  return (
    <button
      type="button"
      onClick={() => handleAddToCart(productId)}
    >
      カートに追加
    </button>
  );
}
```

### 名前付き関数 vs インライン関数

| 方法      | メリット          | デメリット      |
| ------- | ------------- | ---------- |
| 名前付き関数  | 読みやすい、再利用しやすい | コード量が増える   |
| インライン関数 | 簡潔、引数を渡しやすい   | 読みにくくなる可能性 |

一般的に、ロジックが複雑な場合は名前付き関数、シンプルな場合はインライン関数を使うとよい。

***

## イベントの伝播

### イベントバブリング

子要素のイベントは親要素に伝播（バブリング）します。

```tsx
function NestedButtons(): React.ReactElement {
  const handleOuterClick = (): void => {
    console.log("外側がクリックされました");
  };

  const handleInnerClick = (): void => {
    console.log("内側がクリックされました");
  };

  return (
    <div onClick={handleOuterClick}>
      <button
        type="button"
        onClick={handleInnerClick}
      >
        内側のボタン
      </button>
    </div>
  );
  // 内側のボタンをクリックすると、両方のハンドラが実行される
}
```

### stopPropagation で伝播を停止

```tsx
function NestedButtons(): React.ReactElement {
  const handleOuterClick = (): void => {
    console.log("外側がクリックされました");
  };

  const handleInnerClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation(); // 伝播を停止
    console.log("内側がクリックされました");
  };

  return (
    <div onClick={handleOuterClick}>
      <button
        type="button"
        onClick={handleInnerClick}
      >
        内側のボタン
      </button>
    </div>
  );
  // 内側のボタンをクリックしても、外側のハンドラは実行されない
}
```

***

## preventDefault

フォームの送信やリンクのナビゲーションなど、ブラウザのデフォルト動作を防ぎます。

```tsx
function SearchForm(): React.ReactElement {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // ページリロードを防ぐ
    console.log("検索クエリ:", query);
    // 検索処理を実行
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  );
}
```

***

## EC サイトでの実践例

### カートに追加ボタン

```tsx
type AddToCartButtonProps = {
  productId: string;
  productName: string;
  disabled?: boolean;
};

function AddToCartButton({
  productId,
  productName,
  disabled = false,
}: AddToCartButtonProps): React.ReactElement {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async (): Promise<void> => {
    setIsAdding(true);
    try {
      // API 呼び出しをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(`${productName} (${productId}) をカートに追加しました`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isAdding}
      className="add-to-cart-button"
    >
      {isAdding ? "追加中..." : "カートに追加"}
    </button>
  );
}
```

### 数量入力フォーム

```tsx
type QuantityInputProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

function QuantityInput({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityInputProps): React.ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleIncrement = (): void => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = (): void => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="quantity-input">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
```

### 商品検索フォーム

```tsx
type SearchFormProps = {
  onSearch: (query: string) => void;
};

function SearchForm({ onSearch }: SearchFormProps): React.ReactElement {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleClear = (): void => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form"
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="商品を検索..."
      />
      {query !== "" && (
        <button
          type="button"
          onClick={handleClear}
          className="clear-button"
        >
          ✕
        </button>
      )}
      <button type="submit">検索</button>
    </form>
  );
}
```

### お気に入りボタン

```tsx
type FavoriteButtonProps = {
  productId: string;
  initialFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
};

function FavoriteButton({
  productId,
  initialFavorite = false,
  onToggle,
}: FavoriteButtonProps): React.ReactElement {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation(); // カードのクリックイベントに伝播しない
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onToggle?.(newValue);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`favorite-button ${isFavorite ? "active" : ""}`}
      aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
```

***

## よくある間違い

### 1. ハンドラを呼び出してしまう

```tsx
// NG: 関数を呼び出している（レンダリング時に実行される）
<button onClick={handleClick()}>クリック</button>

// OK: 関数を渡す
<button onClick={handleClick}>クリック</button>

// OK: 引数を渡す場合はアロー関数で
<button onClick={() => handleClick(id)}>クリック</button>
```

### 2. イベント型の間違い

```tsx
// NG: 型が間違っている
const handleChange = (event: React.MouseEvent<HTMLInputElement>): void => {};

// OK: 正しい型を使用
const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {};
```

### 3. preventDefault の位置

```tsx
// NG: 条件分岐の後に preventDefault
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  if (isInvalid) {
    return; // preventDefault されない!
  }
  event.preventDefault();
};

// OK: 最初に preventDefault
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  if (isInvalid) {
    return;
  }
  // 処理を続行
};
```

***

## まとめ

| 概念              | 説明                            |
| --------------- | ----------------------------- |
| イベントハンドラ        | ユーザー操作に応答する関数                 |
| camelCase       | React のイベント属性は camelCase で記述  |
| イベントオブジェクト      | イベントの詳細情報を持つオブジェクト            |
| preventDefault  | デフォルト動作を防ぐ                    |
| stopPropagation | イベントの伝播を停止                    |
| TypeScript 型    | React.〇〇Event<HTMLElement> 形式 |

***

## 次のステップ

イベントハンドリングを理解したら、[条件レンダリングとリスト](./05-conditional-lists.md) に進んで、
動的な UI の表示方法を学びましょう。
