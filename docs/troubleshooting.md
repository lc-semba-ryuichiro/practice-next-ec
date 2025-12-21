# つまずきポイント集

React / Next.js 開発でよくあるエラーと解決策をまとめています。

---

## 目次

- [React 関連のエラー](#react-関連のエラー)
  - [Hooks の呼び出し規則違反](#hooks-の呼び出し規則違反)
  - [無限ループ（useEffect）](#無限ループuseeffect)
  - [Key の警告](#key-の警告)
- [Next.js 関連のエラー](#nextjs-関連のエラー)
  - [Hydration エラー](#hydration-エラー)
  - ["use client" ディレクティブ忘れ](#use-client-ディレクティブ忘れ)
  - [Server Component でのイベントハンドラ](#server-component-でのイベントハンドラ)
  - [Dynamic import のエラー](#dynamic-import-のエラー)
- [TypeScript 関連のエラー](#typescript-関連のエラー)
  - [型が見つからない](#型が見つからない)
  - [暗黙の any 型](#暗黙の-any-型)
  - [children の型エラー](#children-の型エラー)
- [テスト関連のエラー](#テスト関連のエラー)
  - [act() 警告](#act-警告)
  - [要素が見つからない](#要素が見つからない)
- [デバッグのヒント](#デバッグのヒント)
  - [React DevTools](#react-devtools)
  - [console.log の効果的な使い方](#consolelog-の効果的な使い方)
  - [Network タブの確認](#network-タブの確認)
  - [Next.js のデバッグ](#nextjs-のデバッグ)
- [アンチパターン](#アンチパターン)
  - [1. コンポーネント内での直接 DOM 操作](#1-コンポーネント内での直接-dom-操作)
  - [2. Props のミューテーション](#2-props-のミューテーション)
  - [3. useEffect 内での state 設定ループ](#3-useeffect-内での-state-設定ループ)
  - [4. 過度な re-render](#4-過度な-re-render)
  - [5. 条件付きレンダリングでの && の誤用](#5-条件付きレンダリングでの--の誤用)
  - [6. key にインデックスを使用（順序が変わる場合）](#6-key-にインデックスを使用順序が変わる場合)
  - [7. Server Component で Client 専用機能を使用](#7-server-component-で-client-専用機能を使用)

## React 関連のエラー

### Hooks の呼び出し規則違反

**エラーメッセージ:**

```
React Hook "useState" is called conditionally.
React Hooks must be called in the exact same order in every component render.
```

**原因:** Hooks を条件分岐やループの中で呼び出している。

**解決策:** Hooks はコンポーネントのトップレベルで呼び出す。

```tsx
// NG
function Component({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // 条件分岐内で呼び出し
  }
}

// OK
function Component({ condition }) {
  const [state, setState] = useState(0); // トップレベルで呼び出し
  if (condition) {
    // state を使用
  }
}
```

---

### 無限ループ（useEffect）

**症状:** ページがフリーズする、またはコンソールに大量のログが出力される。

**原因:** useEffect の依存配列が正しく設定されていない。

**解決策:** 依存配列を正しく設定する。

```tsx
// NG: 毎回新しいオブジェクトが作成され、無限ループ
useEffect(() => {
  setData({ ...data, loaded: true });
}, [data]); // data が変更されるたびに再実行

// OK: 関数形式で更新
useEffect(() => {
  setData((prev) => ({ ...prev, loaded: true }));
}, []); // 初回のみ実行
```

---

### Key の警告

**エラーメッセージ:**

```
Warning: Each child in a list should have a unique "key" prop.
```

**原因:** リストのアイテムに一意の key が設定されていない。

**解決策:** 各アイテムに一意の key を設定する。

```tsx
// NG
{
  items.map((item) => <li>{item.name}</li>);
}

// NG: index を key にする（順序が変わる可能性がある場合）
{
  items.map((item, index) => <li key={index}>{item.name}</li>);
}

// OK: 一意の ID を key にする
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

---

## Next.js 関連のエラー

### Hydration エラー

**エラーメッセージ:**

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**原因:** サーバーとクライアントのレンダリング結果が異なる。

**よくある原因と解決策:**

1. **Date や Math.random() の使用**

```tsx
// NG: サーバーとクライアントで異なる値
function Component() {
  return <p>Current time: {new Date().toISOString()}</p>;
}

// OK: useEffect で設定
function Component() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);

  return <p>Current time: {time ?? "Loading..."}</p>;
}
```

2. **window/localStorage の参照**

```tsx
// NG: サーバーには window がない
function Component() {
  const width = window.innerWidth; // Error
}

// OK: useEffect 内でアクセス
function Component() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
}
```

3. **HTML のネスト規則違反**

```tsx
// NG: <p> の中に <div> は不正
<p>
  <div>Content</div>
</p>

// OK
<div>
  <div>Content</div>
</div>
```

---

### "use client" ディレクティブ忘れ

**エラーメッセージ:**

```
You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client"
```

**原因:** Client Component として使用すべきコンポーネントに `"use client"` がない。

**解決策:** ファイルの先頭に `"use client"` を追加。

```tsx
"use client"; // 追加

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

---

### Server Component でのイベントハンドラ

**エラーメッセージ:**

```
Event handlers cannot be passed to Client Component props.
```

**原因:** Server Component から Client Component にイベントハンドラを直接渡している。

**解決策:** Client Component 内でイベントハンドラを定義する。

```tsx
// NG: Server Component で定義したハンドラを渡す
// ServerComponent.tsx
export default function ServerComponent() {
  const handleClick = () => console.log("clicked");
  return <Button onClick={handleClick} />; // Error
}

// OK: Client Component 内で定義
// Button.tsx
("use client");
export function Button() {
  const handleClick = () => console.log("clicked");
  return <button onClick={handleClick}>Click</button>;
}
```

---

### Dynamic import のエラー

**エラーメッセージ:**

```
Error: Element type is invalid. Received a promise that resolves to: [object Object].
```

**原因:** dynamic import の使い方が間違っている。

**解決策:** 正しい構文を使用する。

```tsx
// NG
const Modal = dynamic(() => import("./Modal").then((mod) => mod));

// OK: default export の場合
const Modal = dynamic(() => import("./Modal"));

// OK: named export の場合
const Modal = dynamic(() => import("./Modal").then((mod) => mod.Modal));
```

---

## TypeScript 関連のエラー

### 型が見つからない

**エラーメッセージ:**

```
Cannot find module '@/types/product' or its corresponding type declarations.
```

**原因:** パスエイリアスの設定が不完全。

**解決策:** `tsconfig.json` の paths 設定を確認。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### 暗黙の any 型

**エラーメッセージ:**

```
Parameter 'event' implicitly has an 'any' type.
```

**原因:** 型が指定されていない。

**解決策:** 明示的に型を指定する。

```tsx
// NG
const handleChange = (event) => {
  // ...
};

// OK
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

---

### children の型エラー

**エラーメッセージ:**

```
Property 'children' does not exist on type 'IntrinsicAttributes'.
```

**原因:** コンポーネントの props に children の型が定義されていない。

**解決策:** PropsWithChildren または ReactNode を使用。

```tsx
// 方法 1: PropsWithChildren
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

// 方法 2: ReactNode を直接指定
type Props = {
  title: string;
  children: React.ReactNode;
};
```

---

## テスト関連のエラー

### act() 警告

**エラーメッセージ:**

```
Warning: An update to Component inside a test was not wrapped in act(...).
```

**原因:** 状態更新がテストで正しく待機されていない。

**解決策:** userEvent を使用するか、waitFor で待機する。

```tsx
// NG
fireEvent.click(button);
expect(screen.getByText("Updated")).toBeInTheDocument();

// OK: userEvent を使用（自動で act でラップ）
await user.click(button);
expect(screen.getByText("Updated")).toBeInTheDocument();

// OK: waitFor で待機
await waitFor(() => {
  expect(screen.getByText("Updated")).toBeInTheDocument();
});
```

---

### 要素が見つからない

**エラーメッセージ:**

```
Unable to find an element with the text: "Submit"
```

**原因:** 要素がまだレンダリングされていない、または存在しない。

**解決策:** findBy クエリを使用して待機するか、要素の存在を確認。

```tsx
// NG: すぐに取得しようとする
const button = screen.getByText("Submit");

// OK: 非同期で待機
const button = await screen.findByText("Submit");

// OK: 存在しないことを確認したい場合
expect(screen.queryByText("Submit")).not.toBeInTheDocument();
```

---

## デバッグのヒント

### React DevTools

1. **Components タブ**: コンポーネントツリー、props、state を確認
2. **Profiler タブ**: レンダリングパフォーマンスを計測

### console.log の効果的な使い方

```tsx
// オブジェクトの展開
console.log("User:", { ...user });

// テーブル形式
console.table(items);

// グループ化
console.group("Fetch");
console.log("URL:", url);
console.log("Response:", data);
console.groupEnd();

// 条件付きログ
console.assert(value > 0, "Value must be positive");
```

### Network タブの確認

1. **XHR/Fetch フィルター**: API リクエストのみ表示
2. **Request/Response**: リクエスト内容とレスポンスを確認
3. **Timing**: リクエストのタイミングを分析

### Next.js のデバッグ

```bash
# 詳細なログを表示
DEBUG=* pnpm dev

# 特定のモジュールのログ
DEBUG=next:* pnpm dev
```

---

## アンチパターン

### 1. コンポーネント内での直接 DOM 操作

```tsx
// NG
function Component() {
  useEffect(() => {
    document.getElementById("my-element").style.color = "red";
  }, []);
}

// OK: React の state で管理
function Component() {
  const [color, setColor] = useState("black");
  return <div style={{ color }}>Content</div>;
}
```

### 2. Props のミューテーション

```tsx
// NG: props を直接変更
function Component({ items }) {
  items.push(newItem); // 親の配列も変更されてしまう
}

// OK: 新しい配列を作成
function Component({ items }) {
  const newItems = [...items, newItem];
}
```

### 3. useEffect 内での state 設定ループ

```tsx
// NG: 無限ループ
useEffect(() => {
  setCount(count + 1);
}, [count]);

// OK: 関数形式で更新
useEffect(() => {
  setCount((prev) => prev + 1);
}, []); // 依存配列を空に
```

### 4. 過度な re-render

```tsx
// NG: 毎回新しいオブジェクトが作成される
function Parent() {
  return <Child style={{ color: "red" }} />;
}

// OK: useMemo でメモ化
function Parent() {
  const style = useMemo(() => ({ color: "red" }), []);
  return <Child style={style} />;
}
```

### 5. 条件付きレンダリングでの && の誤用

```tsx
// NG: count が 0 の場合、"0" が表示される
{
  count && <span>{count}</span>;
}

// OK: 明示的に boolean に変換
{
  count > 0 && <span>{count}</span>;
}

// OK: 三項演算子を使用
{
  count ? <span>{count}</span> : null;
}
```

### 6. key にインデックスを使用（順序が変わる場合）

```tsx
// NG: 並べ替え・フィルターがある場合に問題
{
  items.map((item, index) => (
    <Item
      key={index}
      {...item}
    />
  ));
}

// OK: 一意の ID を使用
{
  items.map((item) => (
    <Item
      key={item.id}
      {...item}
    />
  ));
}
```

### 7. Server Component で Client 専用機能を使用

```tsx
// NG: Server Component で useState
export default function Page() {
  const [state, setState] = useState(0); // Error
}

// OK: "use client" を追加するか、別コンポーネントに分離
("use client");

export default function Page() {
  const [state, setState] = useState(0);
}
```
