# TanStack アプリへようこそ

## はじめに

このアプリケーションを実行するには、以下のコマンドを実行します。

```bash
pnpm install
pnpm start
```

## 本番ビルド

本番環境用にビルドするには、以下のコマンドを実行します。

```bash
pnpm build
```

## テスト

このプロジェクトでは [Vitest](https://vitest.dev/) を使用しています。
以下のコマンドでテストを実行できます。

```bash
pnpm test
```

## スタイリング

このプロジェクトでは [Tailwind CSS](https://tailwindcss.com/) を使用しています。

## Lint とフォーマット

このプロジェクトでは [ESLint](https://eslint.org/) と [Prettier](https://prettier.io/) を使用しています。
ESLintは [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint) で設定されています。
以下のスクリプトが利用可能です。

```bash
pnpm lint
pnpm format
pnpm check
```

## shadcn

最新の [shadcn](https://ui.shadcn.com/) を使ってコンポーネントを追加します。

```bash
pnpm dlx shadcn@latest add button
```

## T3Env

- T3Envを使用して環境変数に型安全性を追加できる
- `src/env.mjs` ファイルに環境変数を追加する
- コード内で環境変数を使用する

### 使い方

```ts
import { env } from "@/env";

console.log(env.VITE_APP_TITLE);
```

## ルーティング

このプロジェクトでは [TanStack Router](https://tanstack.com/router) を使用しています。
初期設定はファイルベースのルーターです。ルートは `src/routes` 内のファイルとして管理されます。

### ルートの追加

新しいルートを追加するには、`./src/routes` ディレクトリに新しいファイルを追加します。

TanStackがルートファイルの内容を自動生成します。

2つのルートができたら、`Link` コンポーネントを使ってルート間をナビゲートできます。

### リンクの追加

SPAナビゲーションを使用するには、`@tanstack/react-router` から `Link` をインポートします。

```tsx
import { Link } from "@tanstack/react-router";
```

JSX内で以下のように使用できます。

```tsx
<Link to="/about">About</Link>
```

これにより `/about` ルートへのリンクが作成されます。

`Link` コンポーネントの詳細は [TanStack Router Link ドキュメント](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent)を参照してください。

### レイアウトの使用

ファイルベースルーティングでは、レイアウトは `src/routes/__root.tsx` にあります。
ルートルートに追加したものはすべてのルートに表示されます。
ルートのコンテンツは `<Outlet />` コンポーネントの位置に表示されます。

以下はヘッダーを含むレイアウトの例です。

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

`<TanStackRouterDevtools />` コンポーネントは任意です。不要であれば削除できます。

レイアウトの詳細は [レイアウトドキュメント](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts)を参照してください。

## データフェッチ

アプリケーションでデータをフェッチする方法は複数あります。
TanStack Queryを使用してサーバーからデータをフェッチできます。
また、TanStack Routerの `loader` 機能を使用して、ルートがレンダリングされる前にデータを読み込むこともできます。

以下は使用例です。

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaderはデータフェッチロジックを簡素化します。
詳細は [Loader ドキュメント](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters)を参照してください。

### React Query

React Queryはルートローディングへの優れた追加または代替手段です。
アプリケーションへの統合は簡単です。

まず依存関係を追加します。

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

次に、クエリクライアントとプロバイダーを作成します。`main.tsx` に配置することをお勧めします。

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

TanStack Query Devtoolsをルートルートに追加できます（任意）。

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

これで `useQuery` を使用してデータをフェッチできます。

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

React Queryの詳細は [React Query ドキュメント](https://tanstack.com/query/latest/docs/framework/react/overview)を参照してください。

## 状態管理

Reactアプリケーションでよく必要とされるのが状態管理です。
Reactには多くの状態管理オプションがあります。TanStack Storeはプロジェクトの出発点として最適です。

まずTanStack Storeを依存関係として追加します。

```bash
pnpm add @tanstack/store
```

デモとして `src/App.tsx` ファイルにシンプルなカウンターを作成してみましょう。

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>Increment - {count}</button>
    </div>
  );
}

export default App;
```

TanStack Storeの優れた機能の1つは、他の状態から派生状態を作成できることです。
派生状態は元の状態が更新されると自動的に更新されます。

派生状態を使用してカウントを2倍にしてみましょう。

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>Increment - {count}</button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

`Derived` クラスを使用して、別のストアから派生した新しいストアを作成します。
`Derived` クラスには派生ストアの更新を開始する `mount` メソッドがあります。

派生ストアを作成したら、`useStore` フックを使用して `App` コンポーネント内で使用できます。

TanStack Storeの詳細は [TanStack Store ドキュメント](https://tanstack.com/store/latest)を参照してください。

## デモファイル

`demo` プレフィックスが付いたファイルは安全に削除できます。
インストールした機能を試すための出発点として用意されています。

## 詳細情報

TanStackの詳細は [TanStack ドキュメント](https://tanstack.com)を参照してください。
