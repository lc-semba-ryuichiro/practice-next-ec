# EC サイト機能対応表

EC サイトの各機能がどのフェーズで実装されるかをまとめています。

---

## 機能とフェーズの対応

### コア機能

| 機能                   | 対応フェーズ | 画面/コンポーネント  | 主な技術               |
| ---------------------- | ------------ | -------------------- | ---------------------- |
| 商品カード表示         | Phase 1      | ProductCard          | React, Tailwind        |
| 商品一覧ページ         | Phase 1, 2   | /products            | Next.js, SSG           |
| 商品詳細ページ         | Phase 2      | /products/\[id\]     | 動的ルート, ISR        |
| カテゴリページ         | Phase 2      | /categories/\[slug\] | 動的ルート             |
| ページレイアウト       | Phase 2      | layout.tsx           | App Router             |
| デザインシステム       | Phase 3      | packages/ui          | Atomic Design          |
| フォームコンポーネント | Phase 3      | Input, Select, etc.  | Compound Components    |
| ショッピングカート     | Phase 4      | /cart, CartDrawer    | Jotai, localStorage    |
| お気に入り機能         | Phase 4      | /favorites           | Jotai, atomWithStorage |
| 最近見た商品           | Phase 4      | RecentlyViewed       | Jotai                  |
| 商品検索               | Phase 5      | /search              | MSW, Server fetch      |
| 商品フィルター         | Phase 5      | ProductFilter        | URL パラメータ         |

### 認証・ユーザー機能

| 機能             | 対応フェーズ | 画面/コンポーネント   | 主な技術            |
| ---------------- | ------------ | --------------------- | ------------------- |
| ユーザー登録     | Phase 7, 8   | /register             | Zod, Server Actions |
| ログイン         | Phase 8      | /login                | Cookie 認証         |
| ログアウト       | Phase 8      | -                     | Cookie 削除         |
| マイページ       | Phase 8      | /mypage               | Middleware 保護     |
| プロフィール編集 | Phase 8      | /mypage/profile       | Server Actions      |
| 注文履歴         | Phase 9      | /mypage/orders        | API Routes          |
| 注文詳細         | Phase 9      | /mypage/orders/\[id\] | 動的ルート          |

### 購入フロー

| 機能           | 対応フェーズ | 画面/コンポーネント | 主な技術            |
| -------------- | ------------ | ------------------- | ------------------- |
| カート確認     | Phase 9      | /checkout/cart      | Jotai               |
| 配送先入力     | Phase 9      | /checkout/shipping  | Zod, useActionState |
| 支払い方法選択 | Phase 9      | /checkout/payment   | ラジオボタン UI     |
| 注文確認       | Phase 9      | /checkout/confirm   | 確認画面パターン    |
| 注文完了       | Phase 9      | /checkout/complete  | 完了画面            |
| 注文 API       | Phase 9      | /api/orders         | API Routes          |

### 商品レビュー

| 機能         | 対応フェーズ | 画面/コンポーネント | 主な技術            |
| ------------ | ------------ | ------------------- | ------------------- |
| レビュー表示 | Phase 5      | ReviewList          | Server Components   |
| レビュー投稿 | Phase 7      | ReviewForm          | Zod, Server Actions |
| 星評価 UI    | Phase 3      | StarRating          | Compound Components |

### 管理画面

| 機能           | 対応フェーズ | 画面/コンポーネント | 主な技術                  |
| -------------- | ------------ | ------------------- | ------------------------- |
| 管理者認証     | Phase 15     | /admin/login        | ロールベース認可          |
| 商品管理 CRUD  | Phase 15     | /admin/products     | DataTable, Server Actions |
| 注文管理       | Phase 15     | /admin/orders       | ステータス更新            |
| ユーザー管理   | Phase 15     | /admin/users        | 検索・フィルター          |
| ダッシュボード | Phase 15     | /admin              | 統計表示                  |

---

## パフォーマンス・UX 機能

| 機能            | 対応フェーズ | 実装箇所                | 主な技術              |
| --------------- | ------------ | ----------------------- | --------------------- |
| 画像最適化      | Phase 10     | next/image              | Next.js Image         |
| スケルトン      | Phase 10     | Skeleton コンポーネント | Suspense              |
| 無限スクロール  | Phase 10     | ProductList             | Intersection Observer |
| 楽観的更新      | Phase 13     | カート、お気に入り      | useOptimistic         |
| ストリーミング  | Phase 10     | 商品一覧                | Suspense, Streaming   |
| Edge Middleware | Phase 10     | A/B テスト              | Vercel Edge           |

---

## SEO・マーケティング機能

| 機能            | 対応フェーズ | 実装箇所            | 主な技術                  |
| --------------- | ------------ | ------------------- | ------------------------- |
| メタデータ      | Phase 11     | generateMetadata    | Metadata API              |
| OG 画像生成     | Phase 11     | /api/og             | ImageResponse             |
| 構造化データ    | Phase 11     | JSON-LD             | Product, BreadcrumbList   |
| サイトマップ    | Phase 11     | sitemap.ts          | 動的生成                  |
| パンくずリスト  | Phase 11     | Breadcrumb          | 構造化データ連携          |
| キャンペーン LP | Phase 11     | /campaigns/\[slug\] | SSG, generateStaticParams |
| カウントダウン  | Phase 11     | Countdown           | Client Component          |

---

## 品質・テスト機能

| 機能                   | 対応フェーズ | 実装箇所                | 主な技術            |
| ---------------------- | ------------ | ----------------------- | ------------------- |
| ユニットテスト         | Phase 6      | \*.test.ts              | Vitest              |
| コンポーネントテスト   | Phase 6      | \*.stories.tsx          | Storybook + Vitest  |
| E2E テスト             | Phase 6      | e2e/\*.spec.ts          | Playwright          |
| VRT                    | Phase 12     | Storybook               | reg-suit, Chromatic |
| ミューテーションテスト | Phase 12     | stryker.config.js       | Stryker             |
| 依存関係分析           | Phase 12     | .dependency-cruiser.cjs | dependency-cruiser  |

---

## 国際化・アクセシビリティ

| 機能             | 対応フェーズ | 実装箇所         | 主な技術               |
| ---------------- | ------------ | ---------------- | ---------------------- |
| 多言語対応       | Phase 16     | /\[locale\]/\*   | i18n ルーティング      |
| 言語切替         | Phase 16     | LanguageSwitcher | URL ベース             |
| 通貨ローカライズ | Phase 16     | formatPrice      | Intl.NumberFormat      |
| 日付フォーマット | Phase 16     | formatDate       | Intl.DateTimeFormat    |
| アクセシビリティ | Phase 3      | 全コンポーネント | aria-\*, semantic HTML |
| キーボード操作   | Phase 3      | フォーカス管理   | focus-visible          |

---

## Analytics・計測

| 機能               | 対応フェーズ | 実装箇所          | 主な技術         |
| ------------------ | ------------ | ----------------- | ---------------- |
| ページビュー       | Phase 17     | \_app.tsx         | GA4              |
| カート追加イベント | Phase 17     | addToCart         | gtag             |
| 購入完了           | Phase 17     | checkout/complete | コンバージョン   |
| Core Web Vitals    | Phase 10, 17 | web-vitals        | Vercel Analytics |

---

## PWA 機能

| 機能             | 対応フェーズ | 実装箇所       | 主な技術         |
| ---------------- | ------------ | -------------- | ---------------- |
| オフラインカート | Phase 18     | Service Worker | Cache API        |
| インストール     | Phase 18     | manifest.json  | Web App Manifest |
| プッシュ通知     | Phase 18     | Push API       | Web Push         |

---

## エラーハンドリング

| 機能             | 対応フェーズ | 実装箇所         | 主な技術            |
| ---------------- | ------------ | ---------------- | ------------------- |
| 404 ページ       | Phase 14     | not-found.tsx    | App Router          |
| 500 ページ       | Phase 14     | error.tsx        | Error Boundary      |
| グローバルエラー | Phase 14     | global-error.tsx | Root Error Boundary |
| リトライ UI      | Phase 14     | RetryButton      | useTransition       |
| フォームエラー   | Phase 7      | FormError        | Zod エラー表示      |

---

## フェーズ別実装順序

### Phase 0: プロジェクト基盤

```text
モノレポセットアップ → pnpm workspace → Turborepo → Vercel 連携
```

### Phase 1-3: 基礎 UI

```text
ProductCard → ProductList → Layout → 商品詳細 → デザインシステム
```

### Phase 4-5: データ管理

```text
Jotai セットアップ → カート Atom → API モック → 商品 API 連携
```

### Phase 6: テスト

```text
Vitest セットアップ → コンポーネントテスト → E2E テスト → TDD 実践
```

### Phase 7-9: フルスタック

```text
Zod スキーマ → ユーザー登録 → ログイン → 購入フロー
```

### Phase 10-11: 最適化

```text
画像最適化 → Streaming → SEO → LP 制作
```

### Phase 12-14: 品質

```text
VRT → ミューテーションテスト → React 19 機能 → エラー処理
```

### Phase 15: 管理画面

```text
共有パッケージ活用 → Admin 認証 → 商品 CRUD → 注文管理
```

### Phase 16-18: 拡張

```text
i18n → Analytics → PWA
```
