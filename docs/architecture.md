# 技術関連図

フェーズ間の依存関係と技術スタックの関連を可視化しています。

---

## フェーズ依存関係図

```mermaid
flowchart TD
    subgraph Part0["Part 0: プロジェクト基盤"]
        P0[Phase 0: モノレポ + Git/CI + Vercel]
    end

    subgraph Part1["Part 1: 基礎固め"]
        P1[Phase 1: React 基礎]
        P2[Phase 2: Next.js App Router]
        P3[Phase 3: コンポーネント設計]
    end

    subgraph Part2["Part 2: データと状態"]
        P4[Phase 4: Jotai 状態管理]
        P5[Phase 5: データ取得 + MSW]
    end

    subgraph Part3["Part 3: テスト"]
        P6[Phase 6: TDD]
    end

    subgraph Part4["Part 4: フルスタック"]
        P7[Phase 7: フォーム + Zod]
        P8[Phase 8: 認証]
        P9[Phase 9: 注文フロー]
    end

    subgraph Part5["Part 5: 最適化と SEO"]
        P10[Phase 10: パフォーマンス]
        P11[Phase 11: SEO + SSG + LP]
    end

    subgraph Part6["Part 6: 品質とツール"]
        P12[Phase 12: VRT + Stryker]
    end

    subgraph Part7["Part 7: 最新機能"]
        P13[Phase 13: React 19 / Next.js 16]
        P14[Phase 14: Error Handling]
    end

    subgraph Part8["Part 8: 管理画面"]
        P15[Phase 15: Admin Panel]
    end

    subgraph Part9["Part 9: 拡張機能"]
        P16[Phase 16: i18n]
        P17[Phase 17: Analytics]
        P18[Phase 18: PWA]
    end

    P0 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P6
    P6 --> P7
    P7 --> P8
    P8 --> P9
    P9 --> P10
    P10 --> P11
    P11 --> P12
    P12 --> P13
    P13 --> P14
    P14 --> P15
    P15 --> P16
    P16 --> P17
    P17 --> P18
```

---

## 技術スタック依存図

```mermaid
flowchart TD
    subgraph Runtime["ランタイム"]
        NODE[Node.js 24]
        PNPM[pnpm 10]
    end

    subgraph Core["コアフレームワーク"]
        REACT[React 19]
        NEXT[Next.js 16]
        TS[TypeScript 5.9+]
    end

    subgraph Styling["スタイリング"]
        TAILWIND[Tailwind CSS 4]
    end

    subgraph State["状態管理"]
        JOTAI[Jotai]
    end

    subgraph Validation["バリデーション"]
        ZOD[Zod 4]
    end

    subgraph Testing["テスト"]
        VITEST[Vitest]
        RTL[Testing Library]
        PLAYWRIGHT[Playwright]
        MSW[MSW]
        FASTCHECK[fast-check]
    end

    subgraph DevTools["開発ツール"]
        STORYBOOK[Storybook 10]
        TURBO[Turborepo]
    end

    subgraph Quality["品質ツール"]
        ESLINT[ESLint]
        PRETTIER[Prettier]
        REGSUIT[reg-suit]
        CHROMATIC[Chromatic]
        STRYKER[Stryker]
        DEPCRUISE[dependency-cruiser]
    end

    subgraph Deploy["デプロイ"]
        VERCEL[Vercel]
    end

    NODE --> PNPM
    PNPM --> REACT
    PNPM --> NEXT
    REACT --> NEXT
    TS --> REACT
    TS --> NEXT
    NEXT --> TAILWIND
    NEXT --> JOTAI
    NEXT --> ZOD
    NEXT --> VITEST
    VITEST --> RTL
    VITEST --> FASTCHECK
    NEXT --> PLAYWRIGHT
    MSW --> VITEST
    MSW --> STORYBOOK
    REACT --> STORYBOOK
    TURBO --> NEXT
    ESLINT --> NEXT
    PRETTIER --> NEXT
    STORYBOOK --> REGSUIT
    STORYBOOK --> CHROMATIC
    VITEST --> STRYKER
    NEXT --> VERCEL
```

---

## モノレポ パッケージ依存図

```mermaid
graph TD
    subgraph Apps["アプリケーション"]
        WEB["apps/web<br/>EC サイト"]
        ADMIN["apps/admin<br/>管理画面"]
        DOCS["apps/docs<br/>ドキュメント"]
        SB["apps/storybook<br/>Storybook"]
    end

    subgraph Packages["共有パッケージ"]
        UI["packages/ui<br/>UI コンポーネント"]
        SHARED["packages/shared<br/>共有ロジック"]
        API["packages/api-client<br/>API クライアント"]
        VAL["packages/validators<br/>Zod スキーマ"]
        STORE["packages/store<br/>Jotai Atoms"]
    end

    subgraph Tooling["ツール設定"]
        ESL["tooling/eslint-config"]
        TSC["tooling/typescript-config"]
        TW["tooling/tailwind-config"]
        PRT["tooling/prettier-config"]
    end

    WEB --> UI
    WEB --> SHARED
    WEB --> API
    WEB --> VAL
    WEB --> STORE

    ADMIN --> UI
    ADMIN --> SHARED
    ADMIN --> API
    ADMIN --> VAL

    SB --> UI

    UI --> SHARED
    API --> VAL

    WEB --> ESL
    WEB --> TSC
    WEB --> TW
    WEB --> PRT

    ADMIN --> ESL
    ADMIN --> TSC
    ADMIN --> TW
    ADMIN --> PRT

    UI --> ESL
    UI --> TSC
```

---

## EC サイト機能とフェーズの対応

```mermaid
flowchart LR
    subgraph Features["EC サイト機能"]
        PRODUCT["商品表示"]
        CART["カート"]
        AUTH["認証"]
        ORDER["注文"]
        ADMIN_F["管理"]
    end

    subgraph Phases["対応フェーズ"]
        P1_3["Phase 1-3"]
        P4["Phase 4"]
        P8["Phase 8"]
        P9["Phase 9"]
        P15["Phase 15"]
    end

    PRODUCT --> P1_3
    CART --> P4
    AUTH --> P8
    ORDER --> P9
    ADMIN_F --> P15
```

---

## レンダリング戦略の選択フロー

```mermaid
flowchart TD
    START[ページの種類] --> Q1{データは<br/>頻繁に更新?}

    Q1 -->|Yes| Q2{ユーザー固有<br/>のデータ?}
    Q1 -->|No| SSG[SSG<br/>静的生成]

    Q2 -->|Yes| SSR[SSR<br/>サーバーレンダリング]
    Q2 -->|No| Q3{リアルタイム性<br/>が必要?}

    Q3 -->|Yes| SSR
    Q3 -->|No| ISR[ISR<br/>増分静的再生成]

    SSG --> CACHE[CDN キャッシュ]
    ISR --> CACHE
    SSR --> EDGE{Edge で<br/>実行可能?}

    EDGE -->|Yes| EDGE_SSR[Edge SSR]
    EDGE -->|No| NODE_SSR[Node.js SSR]

    subgraph Examples["適用例"]
        SSG_EX["商品一覧<br/>LP ページ"]
        ISR_EX["商品詳細<br/>カテゴリページ"]
        SSR_EX["マイページ<br/>カート"]
    end

    SSG -.-> SSG_EX
    ISR -.-> ISR_EX
    SSR -.-> SSR_EX
```

---

## テスト戦略ピラミッド

```mermaid
flowchart TD
    subgraph Pyramid["テストピラミッド"]
        E2E["E2E テスト<br/>Playwright"]
        INTEGRATION["統合テスト<br/>Testing Library"]
        COMPONENT["コンポーネントテスト<br/>Storybook + Vitest"]
        UNIT["ユニットテスト<br/>Vitest"]
    end

    subgraph Quality["品質テスト"]
        VRT["VRT<br/>reg-suit / Chromatic"]
        MUTATION["ミューテーション<br/>Stryker"]
        PROPERTY["Property-based<br/>fast-check"]
    end

    UNIT --> COMPONENT
    COMPONENT --> INTEGRATION
    INTEGRATION --> E2E

    COMPONENT -.-> VRT
    UNIT -.-> MUTATION
    UNIT -.-> PROPERTY

    subgraph Coverage["カバレッジ目標"]
        UNIT_COV["Unit: 80%+"]
        COMPONENT_COV["Component: 70%+"]
        E2E_COV["E2E: クリティカルパス"]
    end
```

---

## CI/CD パイプライン

```mermaid
flowchart LR
    subgraph Trigger["トリガー"]
        PUSH[Push]
        PR[Pull Request]
    end

    subgraph Checks["チェック"]
        LINT[Lint<br/>ESLint + oxlint]
        TYPE[TypeCheck<br/>tsc]
        TEST[Test<br/>Vitest]
        E2E_CI[E2E<br/>Playwright]
        VRT_CI[VRT<br/>Chromatic]
    end

    subgraph Deploy_Stage["デプロイ"]
        PREVIEW[Preview<br/>Vercel]
        PROD[Production<br/>Vercel]
    end

    PUSH --> LINT
    PR --> LINT

    LINT --> TYPE
    TYPE --> TEST
    TEST --> E2E_CI
    E2E_CI --> VRT_CI

    PR --> PREVIEW
    VRT_CI --> PREVIEW

    PUSH -->|main| PROD
```

---

## 状態管理のスコープ

```mermaid
flowchart TD
    subgraph Global["グローバル状態（Jotai）"]
        CART_STATE["カート"]
        USER_STATE["ユーザー情報"]
        FAVORITES_STATE["お気に入り"]
    end

    subgraph Server["サーバー状態（RSC）"]
        PRODUCTS["商品データ"]
        CATEGORIES["カテゴリ"]
        ORDERS["注文履歴"]
    end

    subgraph Local["ローカル状態（useState）"]
        FORM["フォーム入力"]
        MODAL["モーダル開閉"]
        FILTER["フィルター条件"]
    end

    subgraph Persistent["永続化"]
        STORAGE["localStorage"]
        COOKIE["Cookie"]
    end

    CART_STATE --> STORAGE
    FAVORITES_STATE --> STORAGE
    USER_STATE --> COOKIE
```
