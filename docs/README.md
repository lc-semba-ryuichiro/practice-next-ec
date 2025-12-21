# EC サイト構築による React/Next.js 学習ガイド

React 初心者から、本格的な EC サイトのフルスタック開発をマスターするためのステップバイステップ学習ガイドです。
各フェーズで EC サイトの機能を実装しながら、技術を習得していきます。

***

## 目次

- [学習の進め方](#学習の進め方)
- [技術スタック](#技術スタック)
  - [コア技術](#コア技術)
  - [状態管理・バリデーション](#状態管理バリデーション)
  - [開発ツール](#開発ツール)
  - [品質管理](#品質管理)
- [フェーズ一覧](#フェーズ一覧)
  - [Part 0: プロジェクト基盤](#part-0-プロジェクト基盤)
  - [Part 1: 基礎固め](#part-1-基礎固め)
  - [Part 2: データと状態](#part-2-データと状態)
  - [Part 3: テスト](#part-3-テスト)
  - [Part 4: フルスタック機能](#part-4-フルスタック機能)
  - [Part 5: 最適化と SEO](#part-5-最適化と-seo)
  - [Part 6: 品質とツール](#part-6-品質とツール)
  - [Part 7: 最新機能とエラー処理](#part-7-最新機能とエラー処理)
  - [Part 8: 管理画面](#part-8-管理画面)
  - [Part 9: 拡張機能](#part-9-拡張機能)
- [完成時の EC サイト機能](#完成時の-ec-サイト機能)
  - [コア機能](#コア機能)
  - [品質 & UX](#品質--ux)
  - [SEO & マーケティング](#seo--マーケティング)
  - [国際化 & オフライン](#国際化--オフライン)
- [関連ドキュメント](#関連ドキュメント)
- [技術スタック活用マップ](#技術スタック活用マップ)

## 学習の進め方

1. 各フェーズは順番に進める - 前のフェーズの知識が次のフェーズで必要になる
2. 必ず手を動かす - 読むだけでなく、実際にコードを書いて動かす
3. Storybook を活用 - コンポーネントを可視化しながら開発する
4. テストを書く習慣 - Phase 6 以降は TDD を意識する
5. 疑問は都度解消 - 理解してから次へ進む

***

## 技術スタック

### コア技術

| 技術           | バージョン | 用途      |
| ------------ | ----- | ------- |
| React        | 19    | UI 構築   |
| Next.js      | 16    | フレームワーク |
| TypeScript   | 5.9+  | 型安全性    |
| Tailwind CSS | 4     | スタイリング  |
| Turborepo    | -     | モノレポ管理  |

### 状態管理・バリデーション

| 技術    | バージョン | 用途          |
| ----- | ----- | ----------- |
| Jotai | 2.16  | グローバル状態管理   |
| Zod   | 4     | スキーマバリデーション |

### 開発ツール

| 技術              | バージョン | 用途                 |
| --------------- | ----- | ------------------ |
| Storybook       | 10    | コンポーネント開発          |
| MSW             | 2     | API モック            |
| Vitest          | 4     | ユニットテスト            |
| Playwright      | 1.57  | E2E テスト            |
| Testing Library | 16    | コンポーネントテスト         |
| fast-check      | 4     | Property-based テスト |

### 品質管理

| 技術                 | 用途          |
| ------------------ | ----------- |
| ESLint + oxlint    | リンター        |
| Prettier           | フォーマッター     |
| reg-suit           | VRT（自己ホスト）  |
| Chromatic          | VRT（クラウド）   |
| Stryker            | ミューテーションテスト |
| dependency-cruiser | 依存関係分析      |

***

## フェーズ一覧

### Part 0: プロジェクト基盤

| Phase                                              | タイトル       | 概要                        |
| -------------------------------------------------- | ---------- | ------------------------- |
| [Phase 0](./phase-00-project-foundation/README.md) | プロジェクト基盤構築 | モノレポ、Git/CI、Vercel セットアップ |

### Part 1: 基礎固め

| Phase                                             | タイトル                    | 概要                                    |
| ------------------------------------------------- | ----------------------- | ------------------------------------- |
| [Phase 1](./phase-01-react-basics/README.md)      | React 基礎 + Storybook 入門 | コンポーネント、props、state、hooks の基本         |
| [Phase 2](./phase-02-nextjs-app-router/README.md) | Next.js App Router 基礎   | ルーティング、レイアウト、Server/Client Components |
| [Phase 3](./phase-03-component-design/README.md)  | コンポーネント設計パターン           | Atomic Design、再利用可能なコンポーネント設計         |

### Part 2: データと状態

| Phase                                            | タイトル            | 概要                                 |
| ------------------------------------------------ | --------------- | ---------------------------------- |
| [Phase 4](./phase-04-state-management/README.md) | 状態管理（Jotai）     | グローバル状態管理、カート機能の実装                 |
| [Phase 5](./phase-05-data-fetching/README.md)    | データ取得 + MSW モック | Server Components での fetch、API モック |

### Part 3: テスト

| Phase                                   | タイトル    | 概要                                           |
| --------------------------------------- | ------- | -------------------------------------------- |
| [Phase 6](./phase-06-testing/README.md) | テスト駆動開発 | Vitest、Testing Library、Playwright、fast-check |

### Part 4: フルスタック機能

| Phase                                            | タイトル                  | 概要                         |
| ------------------------------------------------ | --------------------- | -------------------------- |
| [Phase 7](./phase-07-forms-validation/README.md) | フォーム + Server Actions | Zod バリデーション、Server Actions |
| [Phase 8](./phase-08-authentication/README.md)   | 認証機能                  | Cookie ベース認証、Middleware    |
| [Phase 9](./phase-09-order-flow/README.md)       | 注文フロー + API Routes    | マルチステップフォーム、API 設計         |

### Part 5: 最適化と SEO

| Phase                                        | タイトル                  | 概要                                        |
| -------------------------------------------- | --------------------- | ----------------------------------------- |
| [Phase 10](./phase-10-performance/README.md) | パフォーマンス最適化            | Streaming、Suspense、画像最適化、Vercel Analytics |
| [Phase 11](./phase-11-seo-ssg-lp/README.md)  | SEO + SSG + キャンペーン LP | メタデータ、構造化データ、LP 制作                        |

### Part 6: 品質とツール

| Phase                                          | タイトル     | 概要                                            |
| ---------------------------------------------- | -------- | --------------------------------------------- |
| [Phase 12](./phase-12-quality-tools/README.md) | 品質担保ツール群 | reg-suit、Chromatic、Stryker、dependency-cruiser |

### Part 7: 最新機能とエラー処理

| Phase                                             | タイトル                      | 概要                             |
| ------------------------------------------------- | ------------------------- | ------------------------------ |
| [Phase 13](./phase-13-react19-nextjs16/README.md) | React 19 / Next.js 16 新機能 | use hook、Transitions、Turbopack |
| [Phase 14](./phase-14-error-handling/README.md)   | Error Handling            | Error Boundary、エラーログ収集         |

### Part 8: 管理画面

| Phase                                  | タイトル   | 概要                     |
| -------------------------------------- | ------ | ---------------------- |
| [Phase 15](./phase-15-admin/README.md) | 管理画面構築 | モノレポ活用、共有パッケージ、CRUD 実装 |

### Part 9: 拡張機能

| Phase                                      | タイトル           | 概要                |
| ------------------------------------------ | -------------- | ----------------- |
| [Phase 16](./phase-16-i18n/README.md)      | 国際化（i18n）      | 多言語対応、ローカライズ      |
| [Phase 17](./phase-17-analytics/README.md) | Analytics + 計測 | GA4、イベントトラッキング    |
| [Phase 18](./phase-18-pwa/README.md)       | PWA            | オフライン対応、インストール可能化 |

***

## 完成時の EC サイト機能

### コア機能

- 商品一覧/詳細/検索/フィルター
- カテゴリナビゲーション
- ショッピングカート
- お気に入り機能
- ユーザー認証（登録/ログイン）
- マイページ（注文履歴、お気に入り）
- 購入フロー（配送先、支払い、確認、完了）
- 商品レビュー
- **管理画面**（商品/注文/ユーザー管理）

### 品質 & UX

- レスポンシブデザイン
- アクセシビリティ対応
- エラーハンドリング
- スケルトンローディング
- 楽観的 UI 更新

### SEO & マーケティング

- SEO 最適化（メタデータ、構造化データ）
- OG 画像生成
- サイトマップ自動生成
- Analytics（GA4）
- **キャンペーン LP**（セール、新商品ローンチ）

### 国際化 & オフライン

- 多言語対応（日本語/英語）
- 通貨ローカライズ
- PWA（オフライン対応、インストール可能）

***

## 関連ドキュメント

| ドキュメント                             | 概要                      |
| ---------------------------------- | ----------------------- |
| [用語集](./glossary.md)               | React / Next.js 専門用語の解説 |
| [学習リソース集](./resources.md)          | 公式ドキュメント、チュートリアル、書籍     |
| [技術関連図](./architecture.md)         | フェーズ間の依存関係図（Mermaid）    |
| [つまずきポイント集](./troubleshooting.md)  | よくあるエラーと解決策             |
| [ECサイト機能対応表](./ec-site-mapping.md) | 各機能とフェーズの対応             |
| [モノレポ構成](./monorepo-structure.md)  | ディレクトリ構成と依存関係           |

***

## 技術スタック活用マップ

| 技術                 | 使用フェーズ    | 用途                 |
| ------------------ | --------- | ------------------ |
| React 19           | 全フェーズ     | UI 構築              |
| Next.js 16         | Phase 2〜  | ルーティング、SSR/SSG     |
| TypeScript         | 全フェーズ     | 型安全性               |
| Tailwind CSS 4     | 全フェーズ     | スタイリング             |
| Turborepo          | Phase 0〜  | モノレポ管理             |
| Storybook 10       | Phase 1〜  | コンポーネント開発          |
| Jotai              | Phase 4〜  | 状態管理               |
| Zod 4              | Phase 7〜  | バリデーション            |
| MSW                | Phase 5〜  | API モック            |
| Vitest             | Phase 6〜  | ユニット/コンポーネントテスト    |
| Playwright         | Phase 6〜  | E2E テスト            |
| Testing Library    | Phase 6〜  | コンポーネントテスト         |
| fast-check         | Phase 6〜  | Property-based テスト |
| Vercel             | Phase 0〜  | デプロイ、Analytics     |
| reg-suit           | Phase 12〜 | VRT（自己ホスト）         |
| Chromatic          | Phase 12〜 | VRT（クラウド）          |
| Stryker            | Phase 12〜 | ミューテーションテスト        |
| dependency-cruiser | Phase 12〜 | 依存関係分析             |
