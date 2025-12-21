# 演習 1: レイアウト実装

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [完成イメージ](#完成イメージ)
- [ステップ 1: ヘッダーコンポーネントの作成](#ステップ-1-ヘッダーコンポーネントの作成)
  - [1.1 ファイル作成](#11-ファイル作成)
  - [1.2 確認ポイント](#12-確認ポイント)
- [ステップ 2: フッターコンポーネントの作成](#ステップ-2-フッターコンポーネントの作成)
  - [2.1 ファイル作成](#21-ファイル作成)
- [ステップ 3: ルートレイアウトの更新](#ステップ-3-ルートレイアウトの更新)
  - [3.1 レイアウトファイルの編集](#31-レイアウトファイルの編集)
  - [3.2 確認ポイント](#32-確認ポイント)
- [ステップ 4: トップページの作成](#ステップ-4-トップページの作成)
  - [4.1 ファイル作成](#41-ファイル作成)
- [ステップ 5: 動作確認](#ステップ-5-動作確認)
  - [5.1 開発サーバーの起動](#51-開発サーバーの起動)
  - [5.2 確認項目](#52-確認項目)
- [確認チェックリスト](#確認チェックリスト)
- [トラブルシューティング](#トラブルシューティング)
  - [モジュールが見つからないエラー](#モジュールが見つからないエラー)
  - [スタイルが適用されない](#スタイルが適用されない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)
- [次の演習](#次の演習)

## 目標

EC サイトの共通レイアウト（ヘッダー、フッター）を実装し、全ページで共有されるようにする。

***

## 前提条件

- [ ] Phase 1 を完了していること
- [ ] Next.js の開発サーバーが起動できること
- [ ] `app/` ディレクトリの構造を理解していること

***

## 完成イメージ

```text
┌─────────────────────────────────────┐
│ [ロゴ]  ホーム  商品一覧  カート(0) │  ← ヘッダー
├─────────────────────────────────────┤
│                                     │
│         ページコンテンツ            │  ← children
│                                     │
├─────────────────────────────────────┤
│ © 2024 My EC Site. All rights...    │  ← フッター
└─────────────────────────────────────┘
```

***

## ステップ 1: ヘッダーコンポーネントの作成

### 1.1 ファイル作成

`components/layout/Header.tsx` を作成します。

```tsx
// components/layout/Header.tsx
import Link from "next/link";

export function Header(): React.ReactElement {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="text-xl font-bold"
          >
            My EC Site
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900"
            >
              ホーム
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900"
            >
              商品一覧
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-900"
            >
              カート (0)
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
```

### 1.2 確認ポイント

- [ ] `next/link` から `Link` をインポートしている
- [ ] `href` 属性で内部リンクを指定している
- [ ] Tailwind CSS でスタイリングしている

***

## ステップ 2: フッターコンポーネントの作成

### 2.1 ファイル作成

`components/layout/Footer.tsx` を作成します。

```tsx
// components/layout/Footer.tsx
import Link from "next/link";

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* カテゴリ */}
          <div>
            <h3 className="mb-4 font-bold">カテゴリ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/categories/shirts"
                  className="hover:text-gray-900"
                >
                  シャツ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/pants"
                  className="hover:text-gray-900"
                >
                  パンツ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/shoes"
                  className="hover:text-gray-900"
                >
                  シューズ
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="mb-4 font-bold">サポート</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-gray-900"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-gray-900"
                >
                  配送について
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-900"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="mb-4 font-bold">会社情報</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-900"
                >
                  会社概要
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-900"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          © 2024 My EC Site. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

***

## ステップ 3: ルートレイアウトの更新

### 3.1 レイアウトファイルの編集

`app/layout.tsx` を更新します。

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My EC Site",
    template: "%s | My EC Site",
  },
  description: "Next.js で作る EC サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 3.2 確認ポイント

- [ ] `Header` と `Footer` をインポートしている
- [ ] `<html lang="ja">` で日本語を設定している
- [ ] `flex min-h-screen flex-col` でフッターを下部に固定している
- [ ] `<main className="flex-1">` でコンテンツ領域を広げている

***

## ステップ 4: トップページの作成

### 4.1 ファイル作成

`app/page.tsx` を更新します。

```tsx
// app/page.tsx
import Link from "next/link";

export default function HomePage(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヒーローセクション */}
      <section className="mb-8 rounded-lg bg-gray-100 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">ようこそ My EC Site へ</h1>
        <p className="mb-8 text-gray-600">最高品質の商品をお届けします</p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
        >
          商品を見る
        </Link>
      </section>

      {/* カテゴリセクション */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">カテゴリから探す</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["shirts", "pants", "shoes"].map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="block rounded-lg border p-6 text-center hover:border-blue-500"
            >
              <span className="text-lg font-medium capitalize">{category}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

***

## ステップ 5: 動作確認

### 5.1 開発サーバーの起動

```bash
pnpm dev
```

### 5.2 確認項目

ブラウザで `http://localhost:3000` を開き、以下を確認します。

- [ ] ヘッダーが表示されている
- [ ] フッターがページ下部に表示されている
- [ ] ナビゲーションリンクをクリックするとページ遷移する（遷移先はまだ 404）
- [ ] ロゴをクリックするとトップページに戻る

***

## 確認チェックリスト

- [ ] `components/layout/Header.tsx` を作成した
- [ ] `components/layout/Footer.tsx` を作成した
- [ ] `app/layout.tsx` を更新した
- [ ] ヘッダーとフッターが全ページで表示される
- [ ] ナビゲーションリンクが機能する
- [ ] レスポンシブデザインになっている

***

## トラブルシューティング

### モジュールが見つからないエラー

```text
Cannot find module '@/components/layout/Header'
```

**解決策:**

- `tsconfig.json` の `paths` 設定を確認
- ファイルパスが正しいか確認

### スタイルが適用されない

**解決策:**

- `app/globals.css` に Tailwind のディレクティブがあるか確認
- `tailwind.config.ts` の `content` 設定を確認

***

## 発展課題

1. **モバイルメニュー**: ハンバーガーメニューを実装する
2. **アクティブリンク**: 現在のページのリンクをハイライトする
3. **検索バー**: ヘッダーに検索入力欄を追加する
4. **カート数**: カートの商品数を動的に表示する

***

## 完了条件

- [ ] ヘッダーとフッターが正しく表示される
- [ ] 全ページでレイアウトが共有される
- [ ] ナビゲーションが正しく機能する
- [ ] コードが TypeScript の型チェックを通過する

***

## 次の演習

レイアウトの実装が完了したら、[演習 2: 商品一覧ページ](./02-products-page.md) に進んでください。
