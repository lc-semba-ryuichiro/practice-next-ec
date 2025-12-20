# 学習リソース集

React / Next.js 学習に役立つリソースをまとめています。

---

## 目次

- [公式ドキュメント](#公式ドキュメント)
- [チュートリアル](#チュートリアル)
- [動画教材](#動画教材)
- [書籍](#書籍)
- [ツール・拡張機能](#ツール拡張機能)
- [コミュニティ](#コミュニティ)

---

## 公式ドキュメント

### コア技術

| 技術         | URL                                    | 備考                                  |
| ------------ | -------------------------------------- | ------------------------------------- |
| React        | <https://react.dev/>                   | React 19 対応の新しい公式ドキュメント |
| Next.js      | <https://nextjs.org/docs>              | App Router 中心の構成                 |
| TypeScript   | <https://www.typescriptlang.org/docs/> | ハンドブックが充実                    |
| Tailwind CSS | <https://tailwindcss.com/docs>         | v4 の新機能も掲載                     |

### 状態管理・バリデーション

| 技術  | URL                      | 備考                   |
| ----- | ------------------------ | ---------------------- |
| Jotai | <https://jotai.org/docs> | シンプルで分かりやすい |
| Zod   | <https://zod.dev/>       | v4 対応                |

### テストツール

| 技術            | URL                                                            | 備考                            |
| --------------- | -------------------------------------------------------------- | ------------------------------- |
| Vitest          | <https://vitest.dev/>                                          | Vite ベースの高速テストランナー |
| Playwright      | <https://playwright.dev/>                                      | E2E テスト                      |
| Testing Library | <https://testing-library.com/docs/react-testing-library/intro> | React 向けテストユーティリティ  |
| MSW             | <https://mswjs.io/docs/>                                       | API モック                      |
| fast-check      | <https://fast-check.dev/>                                      | Property-based テスト           |

### 開発ツール

| 技術      | URL                             | 備考                                 |
| --------- | ------------------------------- | ------------------------------------ |
| Storybook | <https://storybook.js.org/docs> | v10 対応                             |
| Turborepo | <https://turbo.build/repo/docs> | モノレポツール                       |
| pnpm      | <https://pnpm.io/ja/>           | パッケージマネージャー（日本語あり） |
| Vercel    | <https://vercel.com/docs>       | デプロイ・ホスティング               |

### 品質ツール

| 技術               | URL                                              | 備考                   |
| ------------------ | ------------------------------------------------ | ---------------------- |
| ESLint             | <https://eslint.org/docs/latest/>                | Flat Config 対応       |
| Prettier           | <https://prettier.io/docs/en/>                   | コードフォーマッター   |
| Chromatic          | <https://www.chromatic.com/docs/>                | VRT（クラウド）        |
| reg-suit           | <https://reg-viz.github.io/reg-suit/>            | VRT（自己ホスト）      |
| Stryker            | <https://stryker-mutator.io/docs/>               | ミューテーションテスト |
| dependency-cruiser | <https://github.com/sverweij/dependency-cruiser> | 依存関係分析           |

---

## チュートリアル

### 公式チュートリアル

| タイトル                   | URL                                   | 内容                           |
| -------------------------- | ------------------------------------- | ------------------------------ |
| React チュートリアル       | <https://react.dev/learn>             | 三目並べゲームを作りながら学ぶ |
| Next.js Learn              | <https://nextjs.org/learn>            | ダッシュボードアプリを作成     |
| Storybook チュートリアル   | <https://storybook.js.org/tutorials/> | コンポーネント駆動開発を学ぶ   |
| Playwright Getting Started | <https://playwright.dev/docs/intro>   | E2E テストの基礎               |

### 推奨チュートリアル

| タイトル              | URL                                             | 内容                             |
| --------------------- | ----------------------------------------------- | -------------------------------- |
| TypeScript Handbook   | <https://www.typescriptlang.org/docs/handbook/> | TypeScript の基礎から応用まで    |
| Tailwind CSS Tutorial | <https://tailwindcss.com/docs/installation>     | ユーティリティファーストの考え方 |

---

## 動画教材

### YouTube チャンネル

| チャンネル         | URL                                         | 内容                  |
| ------------------ | ------------------------------------------- | --------------------- |
| Vercel             | <https://www.youtube.com/@VercelHQ>         | Next.js 公式解説      |
| Theo - t3.gg       | <https://www.youtube.com/@t3dotgg>          | モダン Web 開発       |
| Web Dev Simplified | <https://www.youtube.com/@WebDevSimplified> | React/JavaScript 解説 |
| Fireship           | <https://www.youtube.com/@Fireship>         | 短時間で技術を学ぶ    |

### 日本語チャンネル

| チャンネル       | URL                                   | 内容                         |
| ---------------- | ------------------------------------- | ---------------------------- |
| トラハック       | <https://www.youtube.com/@torahack>   | React/Next.js チュートリアル |
| しまぶーのIT大学 | <https://www.youtube.com/@shimabu_it> | Web 開発入門                 |

---

## 書籍

### React / Next.js

| タイトル                                            | 著者     | 備考            |
| --------------------------------------------------- | -------- | --------------- |
| りあクト！ TypeScript で始めるつらくない React 開発 | oukayuka | 最新版を確認    |
| 実践 Next.js                                        | 吉井健文 | App Router 対応 |

### TypeScript

| タイトル                                                         | 著者        | 備考                   |
| ---------------------------------------------------------------- | ----------- | ---------------------- |
| プロを目指す人のための TypeScript 入門                           | 鈴木僚太    | 通称「ブルーベリー本」 |
| TypeScript とReact/Next.js でつくる実践 Web アプリケーション開発 | 手島拓也 他 | 実践的な内容           |

### テスト

| タイトル                             | 著者     | 備考                 |
| ------------------------------------ | -------- | -------------------- |
| フロントエンド開発のためのテスト入門 | 吉井健文 | Testing Library 解説 |

---

## ツール・拡張機能

### VS Code 拡張機能

| 拡張機能                               | 用途                          |
| -------------------------------------- | ----------------------------- |
| ES7+ React/Redux/React-Native snippets | React スニペット              |
| Tailwind CSS IntelliSense              | Tailwind 補完                 |
| Prettier - Code formatter              | コードフォーマット            |
| ESLint                                 | リント                        |
| GitLens                                | Git 履歴表示                  |
| Error Lens                             | エラー表示強化                |
| Auto Rename Tag                        | タグ自動リネーム              |
| Path Intellisense                      | パス補完                      |
| Pretty TypeScript Errors               | TypeScript エラーの可読性向上 |

### ブラウザ拡張機能

| 拡張機能              | 用途                                 |
| --------------------- | ------------------------------------ |
| React Developer Tools | React コンポーネント検査             |
| Redux DevTools        | 状態管理デバッグ（Jotai でも使用可） |
| Lighthouse            | パフォーマンス計測                   |
| Web Vitals            | Core Web Vitals 表示                 |

### 開発ツール

| ツール  | URL                        | 用途                     |
| ------- | -------------------------- | ------------------------ |
| mise    | <https://mise.jdx.dev/>    | ランタイムバージョン管理 |
| Warp    | <https://www.warp.dev/>    | モダンターミナル         |
| Fig     | <https://fig.io/>          | ターミナル補完           |
| Raycast | <https://www.raycast.com/> | ランチャー + 開発ツール  |

---

## コミュニティ

### 日本語コミュニティ

| コミュニティ | URL                              | 内容                     |
| ------------ | -------------------------------- | ------------------------ |
| Zenn         | <https://zenn.dev/>              | 技術記事プラットフォーム |
| Qiita        | <https://qiita.com/>             | 技術記事プラットフォーム |
| React Japan  | <https://react-japan.slack.com/> | Slack コミュニティ       |

### 英語コミュニティ

| コミュニティ    | URL                                 | 内容         |
| --------------- | ----------------------------------- | ------------ |
| React Discord   | <https://discord.gg/react>          | 公式 Discord |
| Next.js Discord | <https://nextjs.org/discord>        | 公式 Discord |
| r/reactjs       | <https://www.reddit.com/r/reactjs/> | Reddit       |
| r/nextjs        | <https://www.reddit.com/r/nextjs/>  | Reddit       |

### 情報収集

| サービス           | URL                             | 内容                           |
| ------------------ | ------------------------------- | ------------------------------ |
| This Week in React | <https://thisweekinreact.com/>  | 週刊ニュースレター             |
| Frontend Focus     | <https://frontendfoc.us/>       | フロントエンドニュース         |
| JavaScript Weekly  | <https://javascriptweekly.com/> | JavaScript ニュース            |
| Bytes              | <https://bytes.dev/>            | JavaScript/TypeScript ニュース |

---

## フェーズ別おすすめリソース

### Phase 0: プロジェクト基盤

- Turborepo ドキュメント: <https://turbo.build/repo/docs>
- pnpm Workspaces: <https://pnpm.io/workspaces>
- Vercel Monorepos: <https://vercel.com/docs/monorepos>

### Phase 1: React 基礎

- React 公式チュートリアル: <https://react.dev/learn>
- りあクト！シリーズ

### Phase 2: Next.js App Router

- Next.js Learn: <https://nextjs.org/learn>
- Next.js ドキュメント（App Router）: <https://nextjs.org/docs/app>

### Phase 3: コンポーネント設計

- Storybook チュートリアル: <https://storybook.js.org/tutorials/>
- Atomic Design: <https://atomicdesign.bradfrost.com/>

### Phase 4: 状態管理

- Jotai ドキュメント: <https://jotai.org/docs>

### Phase 5: データ取得

- Next.js Data Fetching: <https://nextjs.org/docs/app/building-your-application/data-fetching>
- MSW ドキュメント: <https://mswjs.io/docs/>

### Phase 6: テスト

- フロントエンド開発のためのテスト入門（書籍）
- Vitest ドキュメント: <https://vitest.dev/>
- Playwright ドキュメント: <https://playwright.dev/>

### Phase 7-9: フルスタック機能

- Zod ドキュメント: <https://zod.dev/>
- Next.js Server Actions: <https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations>

### Phase 10-11: パフォーマンス・SEO

- web.dev (Core Web Vitals): <https://web.dev/vitals/>
- Next.js SEO: <https://nextjs.org/docs/app/building-your-application/optimizing/metadata>
