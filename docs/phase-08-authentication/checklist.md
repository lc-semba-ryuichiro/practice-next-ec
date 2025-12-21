# Phase 8 自己チェックリスト

## 目次

- [概念理解](#概念理解)
  - [認証の基礎](#認証の基礎)
  - [NextAuth.js](#nextauthjs)
  - [セッション管理](#セッション管理)
- [実装スキル](#実装スキル)
  - [セットアップ](#セットアップ)
  - [認証プロバイダー](#認証プロバイダー)
  - [Middleware](#middleware)
  - [Server Component](#server-component)
  - [Client Component](#client-component)
  - [コールバック](#コールバック)
- [セキュリティチェック](#セキュリティチェック)
  - [必須事項](#必須事項)
  - [推奨事項](#推奨事項)
- [動作確認](#動作確認)
  - [基本機能](#基本機能)
  - [保護されたルート](#保護されたルート)
  - [セッション](#セッション)
- [理解度確認クイズ](#理解度確認クイズ)
  - [Q1: 以下のコードの問題点は何か](#q1-以下のコードの問題点は何か)
  - [Q2: JWT セッションを選ぶべき場合はどれか](#q2-jwt-セッションを選ぶべき場合はどれか)
  - [Q3: 以下の Middleware の問題点は何か](#q3-以下の-middleware-の問題点は何か)
- [次のステップ](#次のステップ)

## 概念理解

以下の質問に答えられるか確認してください。

### 認証の基礎

- [ ] 認証（Authentication）と認可（Authorization）の違いを説明できる
- [ ] Cookie ベース認証の仕組みを図で説明できる
- [ ] HttpOnly、Secure、SameSite 属性の役割を説明できる
- [ ] セッション Cookie と永続 Cookie の違いを理解している

### NextAuth.js

- [ ] NextAuth.js（Auth.js v5）の役割とメリットを説明できる
- [ ] Credentials Provider と OAuth Provider の違いを説明できる
- [ ] JWT セッションと Database セッションの違いを説明できる
- [ ] auth.ts、handlers、middleware の役割を説明できる

### セッション管理

- [ ] セッションの有効期限（maxAge）と更新間隔（updateAge）の関係を理解している
- [ ] ローリングセッションの仕組みを説明できる
- [ ] CSRF 攻撃とその対策を説明できる

***

## 実装スキル

以下の実装ができるか確認してください。

### セットアップ

- [ ] NextAuth.js をインストールしてセットアップできる
- [ ] auth.ts に基本的な設定を記述できる
- [ ] API Route（`app/api/auth/[...nextauth]/route.ts`）を作成できる
- [ ] 環境変数（AUTH\_SECRET など）を設定できる

### 認証プロバイダー

- [ ] Credentials Provider でメール/パスワード認証を実装できる
- [ ] OAuth Provider（GitHub など）を設定できる
- [ ] パスワードを bcrypt でハッシュ化して保存できる
- [ ] Zod でログインフォームをバリデーションできる

### Middleware

- [ ] middleware.ts を作成して認証チェックを実装できる
- [ ] matcher で適用するパスを指定できる
- [ ] 未認証ユーザーをログインページにリダイレクトできる
- [ ] callbackUrl を使って元のページに戻れる実装ができる

### Server Component

- [ ] auth() でセッションを取得できる
- [ ] 未認証時に redirect() でリダイレクトできる
- [ ] Route Groups を使って認証ルートを分離できる

### Client Component

- [ ] SessionProvider を設定できる
- [ ] useSession() でセッション情報を取得できる
- [ ] signIn() と signOut() を使ってログイン/ログアウトを実装できる
- [ ] status による条件分岐（loading, authenticated, unauthenticated）ができる

### コールバック

- [ ] jwt コールバックでカスタム情報をトークンに追加できる
- [ ] session コールバックでセッション情報をカスタマイズできる
- [ ] TypeScript の型定義を拡張できる

***

## セキュリティチェック

以下のセキュリティ対策ができているか確認してください。

### 必須事項

- [ ] パスワードを平文で保存していない（bcrypt でハッシュ化）
- [ ] AUTH\_SECRET を環境変数で管理している
- [ ] 本番環境で Secure Cookie を使用している
- [ ] センシティブなデータ（パスワードハッシュなど）をクライアントに送信していない

### 推奨事項

- [ ] ログイン試行回数の制限（レート制限）を実装している
- [ ] パスワードポリシー（長さ、複雑さ）を設定している
- [ ] 多層防御（Middleware + Server Component + データ取得）を実装している

***

## 動作確認

以下の動作を確認してください。

### 基本機能

- [ ] ユーザー登録ができる
- [ ] ログインができる
- [ ] ログアウトができる
- [ ] ログイン後、マイページへアクセスできる

### 保護されたルート

- [ ] 未認証で /mypage にアクセスするとログインページにリダイレクトされる
- [ ] ログイン後、元のページに戻れる（callbackUrl）
- [ ] 認証済みでログインページにアクセスするとマイページにリダイレクトされる

### セッション

- [ ] ブラウザを閉じても（永続 Cookie の場合）ログイン状態が維持される
- [ ] ログアウト後、保護されたページにアクセスできなくなる

***

## 理解度確認クイズ

### Q1: 以下のコードの問題点は何か

```typescript
// app/mypage/page.tsx
import { auth } from "@/auth";

export default async function MyPage() {
  const session = await auth();

  return (
    <div>
      <h1>マイページ</h1>
      <p>ようこそ、{session.user?.name} さん</p>
    </div>
  );
}
```

<details>
<summary>回答を見る</summary>

未認証の場合の処理がありません。`session` が `null` のときエラーが発生するか、意図しない表示になります。

```typescript
// 修正版
export default async function MyPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>マイページ</h1>
      <p>ようこそ、{session.user?.name} さん</p>
    </div>
  );
}
```

</details>

### Q2: JWT セッションを選ぶべき場合はどれか

- A. 管理者がユーザーのセッションを即座に無効化したい。
- B. スケーラビリティが重要で、データベースへの負荷を減らしたい。
- C. アクティブセッションの一覧を表示したい。

<details>
<summary>回答を見る</summary>

**B. スケーラビリティが重要で、データベースへの負荷を減らしたい場合**

JWT セッションはステートレスで、データベースへのアクセスが不要です。A と C は Database セッションが適しています。

</details>

### Q3: 以下の Middleware の問題点は何か

```typescript
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/:path*"],
};
```

<details>
<summary>回答を見る</summary>

ログインページ自体も保護されてしまい、**無限リダイレクト**が発生します。

```typescript
// 修正版
export const config = {
  matcher: ["/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"],
};
```

または Middleware 内で除外ロジックを追加します。

</details>

***

## 次のステップ

すべてのチェック項目を確認したら、[Phase 9: 注文フロー](../phase-09-order-flow/README.md) に進みましょう。
