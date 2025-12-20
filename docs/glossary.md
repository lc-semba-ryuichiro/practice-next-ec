# 用語集

React / Next.js 開発で使用する専門用語の解説です。

---

## 目次

- [React 関連](#react-関連)
  - [JSX (JavaScript XML)](#jsx-javascript-xml)
  - [Component（コンポーネント）](#componentコンポーネント)
  - [Props（プロパティ）](#propsプロパティ)
  - [State（ステート）](#stateステート)
  - [Hooks（フック）](#hooksフック)
  - [Virtual DOM（仮想 DOM）](#virtual-dom仮想-dom)
  - [Reconciliation（リコンシリエーション）](#reconciliationリコンシリエーション)
  - [Re-render（再レンダリング）](#re-render再レンダリング)
- [Next.js 関連](#nextjs-関連)
  - [App Router](#app-router)
  - [Pages Router](#pages-router)
  - [Server Components（サーバーコンポーネント）](#server-componentsサーバーコンポーネント)
  - [Client Components（クライアントコンポーネント）](#client-componentsクライアントコンポーネント)
  - [Layout（レイアウト）](#layoutレイアウト)
  - [Template（テンプレート）](#templateテンプレート)
  - [Dynamic Routes（動的ルート）](#dynamic-routes動的ルート)
  - [Route Groups（ルートグループ）](#route-groupsルートグループ)
  - [Parallel Routes（パラレルルート）](#parallel-routesパラレルルート)
  - [Intercepting Routes（インターセプティングルート）](#intercepting-routesインターセプティングルート)
  - [Middleware](#middleware)
  - [Edge Runtime](#edge-runtime)
- [レンダリング戦略](#レンダリング戦略)
  - [SSR (Server-Side Rendering)](#ssr-server-side-rendering)
  - [SSG (Static Site Generation)](#ssg-static-site-generation)
  - [ISR (Incremental Static Regeneration)](#isr-incremental-static-regeneration)
  - [PPR (Partial Prerendering)](#ppr-partial-prerendering)
  - [Streaming](#streaming)
  - [Hydration（ハイドレーション）](#hydrationハイドレーション)
- [状態管理](#状態管理)
  - [Atom（アトム）](#atomアトム)
  - [Derived Atom（派生アトム）](#derived-atom派生アトム)
  - [Atom Family](#atom-family)
  - [Provider](#provider)
- [テスト関連](#テスト関連)
  - [Unit Test（ユニットテスト）](#unit-testユニットテスト)
  - [Integration Test（統合テスト）](#integration-test統合テスト)
  - [E2E Test（End-to-End テスト）](#e2e-testend-to-end-テスト)
  - [TDD (Test-Driven Development)](#tdd-test-driven-development)
  - [Component Testing](#component-testing)
  - [Visual Regression Testing (VRT)](#visual-regression-testing-vrt)
  - [Mutation Testing（ミューテーションテスト）](#mutation-testingミューテーションテスト)
  - [Property-based Testing](#property-based-testing)
  - [Mock（モック）](#mockモック)
  - [Stub（スタブ）](#stubスタブ)
  - [Spy（スパイ）](#spyスパイ)
- [パフォーマンス](#パフォーマンス)
  - [Core Web Vitals](#core-web-vitals)
  - [Code Splitting（コード分割）](#code-splittingコード分割)
  - [Lazy Loading（遅延読み込み）](#lazy-loading遅延読み込み)
  - [Memoization（メモ化）](#memoizationメモ化)
  - [Tree Shaking](#tree-shaking)
  - [Bundle Analyzer](#bundle-analyzer)
- [略語一覧](#略語一覧)

## React 関連

### JSX (JavaScript XML)

JavaScript の中に HTML のような構文を書ける拡張構文。React コンポーネントの UI を記述するために使用する。

```tsx
// JSX の例
const element = <h1>Hello, World!</h1>;
```

### Component（コンポーネント）

UI を構成する再利用可能な部品。関数コンポーネントとクラスコンポーネントがあるが、現在は関数コンポーネントが主流。

```tsx
// 関数コンポーネント
function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
```

### Props（プロパティ）

親コンポーネントから子コンポーネントに渡されるデータ。読み取り専用で、子コンポーネントは受け取った props を変更できない。

```tsx
// props の例
<ProductCard
  name="商品名"
  price={1000}
/>
```

### State（ステート）

コンポーネント内で管理される変更可能なデータ。state が変更されると、コンポーネントが再レンダリングされる。

```tsx
const [count, setCount] = useState(0);
```

### Hooks（フック）

関数コンポーネントで state やライフサイクルなどの React 機能を使うための関数。`use` で始まる命名規則がある。

| Hook          | 用途                                         |
| ------------- | -------------------------------------------- |
| `useState`    | state の管理                                 |
| `useEffect`   | 副作用の処理（API 呼び出し、DOM 操作など）   |
| `useContext`  | Context からの値の取得                       |
| `useRef`      | DOM 参照や再レンダリングに影響しない値の保持 |
| `useMemo`     | 計算結果のメモ化                             |
| `useCallback` | 関数のメモ化                                 |
| `useReducer`  | 複雑な state ロジックの管理                  |

### Virtual DOM（仮想 DOM）

実際の DOM のメモリ上の軽量なコピー。React は Virtual DOM を使って効率的に UI を更新する。

### Reconciliation（リコンシリエーション）

React が Virtual DOM の差分を計算し、最小限の DOM 操作で UI を更新するプロセス。

### Re-render（再レンダリング）

state や props の変更によってコンポーネントが再描画されること。

---

## Next.js 関連

### App Router

Next.js 13 以降の新しいルーティングシステム。`app/` ディレクトリを使用する。

### Pages Router

Next.js の旧ルーティングシステム。`pages/` ディレクトリを使用する。

### Server Components（サーバーコンポーネント）

サーバー側でレンダリングされるコンポーネント。App Router ではデフォルトで全てのコンポーネントが Server Components になる。

**特徴:**

- データベースに直接アクセス可能
- API キーなどの機密情報を安全に扱える
- JavaScript バンドルに含まれない

### Client Components（クライアントコンポーネント）

ブラウザ側で実行されるコンポーネント。ファイルの先頭に `"use client"` ディレクティブを記述して宣言する。

**特徴:**

- `useState`、`useEffect` などの Hooks が使用可能
- イベントハンドラ（onClick など）が使用可能
- ブラウザ API にアクセス可能

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Layout（レイアウト）

複数のページで共有される UI。`layout.tsx` ファイルで定義する。

### Template（テンプレート）

Layout に似ているが、ナビゲーション時に毎回新しいインスタンスが作成される。

### Dynamic Routes（動的ルート）

URL パラメータを含むルート。`[slug]` や `[id]` のようにブラケットで囲む。

```text
app/
  products/
    [id]/
      page.tsx    # /products/1, /products/2, etc.
```

### Route Groups（ルートグループ）

`(folder)` のように括弧で囲むことで、URL に影響を与えずにルートを整理できる。

### Parallel Routes（パラレルルート）

`@folder` 構文を使って、同じレイアウト内で複数のページを同時に表示する機能。

### Intercepting Routes（インターセプティングルート）

`(.)`, `(..)`, `(...)`, `(..)(..)` 構文を使って、現在のレイアウト内で別のルートをインターセプトして表示する機能。

### Middleware

リクエストが完了する前に実行されるコード。認証、リダイレクト、ヘッダーの変更などに使用。

### Edge Runtime

サーバーサイドコードを CDN のエッジで実行する軽量ランタイム。

---

## レンダリング戦略

### SSR (Server-Side Rendering)

リクエストごとにサーバーでページを生成する。常に最新のデータを表示できる。

### SSG (Static Site Generation)

ビルド時にページを生成する。高速だが、データの更新にはリビルドが必要。

### ISR (Incremental Static Regeneration)

SSG の拡張。指定した間隔でページを再生成し、静的なパフォーマンスと動的なデータ更新を両立。

```tsx
// ISR の例（60秒ごとに再生成）
export const revalidate = 60;
```

### PPR (Partial Prerendering)

Next.js 14 以降の機能。静的部分と動的部分を組み合わせてレンダリングする。

### Streaming

サーバーからクライアントへ HTML を段階的に送信する技術。Suspense と組み合わせて使用。

### Hydration（ハイドレーション）

サーバーで生成された HTML に、クライアント側で JavaScript を紐付けてインタラクティブにするプロセス。

---

## 状態管理

### Atom（アトム）

Jotai における状態の最小単位。グローバルに共有可能な状態を表す。

```tsx
import { atom } from "jotai";

const countAtom = atom(0);
```

### Derived Atom（派生アトム）

他の Atom から計算される読み取り専用の Atom。

```tsx
const doubleCountAtom = atom((get) => get(countAtom) * 2);
```

### Atom Family

動的に Atom を生成するパターン。パラメータに基づいて異なる Atom を作成できる。

### Provider

状態のスコープを提供するコンポーネント。Jotai ではオプション。

---

## テスト関連

### Unit Test（ユニットテスト）

関数やコンポーネントを単体でテストする。

### Integration Test（統合テスト）

複数のコンポーネントやモジュールの連携をテストする。

### E2E Test（End-to-End テスト）

ユーザーの操作をシミュレートして、アプリケーション全体をテストする。

### TDD (Test-Driven Development)

テストを先に書いてから実装するアプローチ。

### Component Testing

個別のコンポーネントの動作とレンダリングをテストする。

### Visual Regression Testing (VRT)

UI のスクリーンショットを比較して、意図しない視覚的変更を検出するテスト。

### Mutation Testing（ミューテーションテスト）

テストの品質を検証する手法。コードを意図的に変更（ミューテーション）し、テストがそれを検出できるか確認する。

### Property-based Testing

ランダムな入力値を大量に生成してテストする手法。エッジケースを自動的に発見できる。

### Mock（モック）

テスト時に外部依存を置き換えるダミーオブジェクト。

### Stub（スタブ）

固定の値を返すモック。

### Spy（スパイ）

関数の呼び出しを記録しつつ、元の実装も実行するモック。

---

## パフォーマンス

### Core Web Vitals

Google が定義するウェブパフォーマンス指標。

| 指標                            | 意味                     | 良好な値  |
| ------------------------------- | ------------------------ | --------- |
| LCP (Largest Contentful Paint)  | 最大コンテンツの表示時間 | 2.5秒以下 |
| FID (First Input Delay)         | 初回入力遅延             | 100ms以下 |
| CLS (Cumulative Layout Shift)   | レイアウトのずれ         | 0.1以下   |
| INP (Interaction to Next Paint) | インタラクション応答性   | 200ms以下 |

### Code Splitting（コード分割）

バンドルを小さなチャンクに分割し、必要な時に読み込む技術。

### Lazy Loading（遅延読み込み）

コンポーネントやリソースを必要になるまで読み込まない技術。

```tsx
const Modal = dynamic(() => import("./Modal"));
```

### Memoization（メモ化）

計算結果をキャッシュして再利用する最適化技術。

### Tree Shaking

未使用のコードをバンドルから除外する最適化。

### Bundle Analyzer

バンドルサイズを可視化するツール。

---

## 略語一覧

| 略語 | 正式名称                          | 意味                                     |
| ---- | --------------------------------- | ---------------------------------------- |
| API  | Application Programming Interface | アプリケーション間の通信インターフェース |
| CDN  | Content Delivery Network          | コンテンツ配信ネットワーク               |
| CI   | Continuous Integration            | 継続的インテグレーション                 |
| CD   | Continuous Deployment/Delivery    | 継続的デプロイ/デリバリー                |
| CLI  | Command Line Interface            | コマンドラインインターフェース           |
| CLS  | Cumulative Layout Shift           | 累積レイアウトシフト                     |
| CORS | Cross-Origin Resource Sharing     | クロスオリジンリソース共有               |
| CSS  | Cascading Style Sheets            | スタイルシート言語                       |
| DOM  | Document Object Model             | ドキュメントオブジェクトモデル           |
| E2E  | End-to-End                        | エンドツーエンド                         |
| FCP  | First Contentful Paint            | 最初のコンテンツ表示                     |
| FID  | First Input Delay                 | 最初の入力遅延                           |
| HTML | HyperText Markup Language         | ハイパーテキストマークアップ言語         |
| HTTP | HyperText Transfer Protocol       | ハイパーテキスト転送プロトコル           |
| INP  | Interaction to Next Paint         | 次の描画までのインタラクション           |
| ISR  | Incremental Static Regeneration   | 増分的な静的再生成                       |
| JSON | JavaScript Object Notation        | JavaScript オブジェクト表記              |
| JSX  | JavaScript XML                    | JavaScript XML                           |
| LCP  | Largest Contentful Paint          | 最大コンテンツ描画                       |
| MSW  | Mock Service Worker               | モックサービスワーカー                   |
| OG   | Open Graph                        | Open Graph プロトコル                    |
| PPR  | Partial Prerendering              | 部分的プリレンダリング                   |
| PWA  | Progressive Web App               | プログレッシブウェブアプリ               |
| REST | Representational State Transfer   | REST アーキテクチャ                      |
| RSC  | React Server Components           | React サーバーコンポーネント             |
| SEO  | Search Engine Optimization        | 検索エンジン最適化                       |
| SPA  | Single Page Application           | シングルページアプリケーション           |
| SSG  | Static Site Generation            | 静的サイト生成                           |
| SSR  | Server-Side Rendering             | サーバーサイドレンダリング               |
| TDD  | Test-Driven Development           | テスト駆動開発                           |
| TSX  | TypeScript XML                    | TypeScript XML                           |
| UI   | User Interface                    | ユーザーインターフェース                 |
| URL  | Uniform Resource Locator          | URL                                      |
| UX   | User Experience                   | ユーザー体験                             |
| VRT  | Visual Regression Testing         | ビジュアル回帰テスト                     |
| a11y | Accessibility                     | アクセシビリティ                         |
| i18n | Internationalization              | 国際化                                   |
| l10n | Localization                      | ローカライゼーション                     |
