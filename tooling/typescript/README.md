# @practice-next-ec/typescript-config

モノレポ内で共有するTypeScript設定を提供するパッケージです。

## 目次

- [概要](#概要)
- [インストール](#インストール)
- [使い方](#使い方)
  - [基本設定 (base)](#基本設定-base)
  - [Next.js 設定 (nextjs)](#nextjs-設定-nextjs)
  - [Vite 設定 (vite)](#vite-設定-vite)
  - [ライブラリ設定 (library)](#ライブラリ設定-library)
- [設定オプション](#設定オプション)
  - [基本設定 (base.json)](#基本設定-basejson)
  - [Next.js 設定 (nextjs.json)](#nextjs-設定-nextjsjson)
  - [Vite 設定 (vite.json)](#vite-設定-vitejson)
  - [ライブラリ設定 (library.json)](#ライブラリ設定-libraryjson)
- [カスタマイズ](#カスタマイズ)
  - [パスエイリアスの設定](#パスエイリアスの設定)
  - [include/exclude の設定](#includeexclude-の設定)
- [依存パッケージ](#依存パッケージ)

## 概要

このパッケージは、モノレポ内のアプリケーションやパッケージで一貫したTypeScript設定を使用するためのプリセットを提供します。

| エクスポート      | 用途              |
| ----------- | --------------- |
| `./base`    | 汎用的な基本設定        |
| `./nextjs`  | Next.js アプリ用設定  |
| `./vite`    | Vite アプリ用設定     |
| `./library` | 共有ライブラリパッケージ用設定 |

## インストール

ワークスペース内のパッケージから利用する場合、`package.json` に以下を追加します。

```json
{
  "devDependencies": {
    "@practice-next-ec/typescript-config": "workspace:*"
  }
}
```

## 使い方

### 基本設定 (base)

ルートの `tsconfig.json` などで使用します。

```json
{
  "extends": "@practice-next-ec/typescript-config/base",
  "exclude": ["node_modules", "apps", "packages", "tooling"]
}
```

### Next.js 設定 (nextjs)

Next.jsアプリケーション（`apps/web`）で使用します。

```json
{
  "extends": "@practice-next-ec/typescript-config/nextjs",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Vite 設定 (vite)

Viteアプリケーション（`apps/admin`）で使用します。

```json
{
  "extends": "@practice-next-ec/typescript-config/vite",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### ライブラリ設定 (library)

共有パッケージ（`packages/*`）で使用します。

```json
{
  "extends": "@practice-next-ec/typescript-config/library",
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 設定オプション

### 基本設定 (base.json)

すべてのプリセットが継承する基本設定です。厳格な型チェックを有効にしています。

#### コンパイルターゲット

| オプション              | 値                                   | 説明               |
| ------------------ | ----------------------------------- | ---------------- |
| `target`           | `es2024`                            | ES2024 をターゲットに出力 |
| `lib`              | `["dom", "dom.iterable", "esnext"]` | 利用可能なライブラリ       |
| `module`           | `esnext`                            | ESNext モジュールシステム |
| `moduleResolution` | `bundler`                           | バンドラー向けモジュール解決   |

#### 厳格な型チェック

| オプション                                | 値      | 説明                          |
| ------------------------------------ | ------ | --------------------------- |
| `strict`                             | `true` | すべての strict オプションを有効化       |
| `noUncheckedIndexedAccess`           | `true` | インデックスアクセス時に undefined を考慮  |
| `exactOptionalPropertyTypes`         | `true` | オプショナルプロパティと undefined を区別  |
| `noImplicitOverride`                 | `true` | オーバーライド時に override キーワードを強制 |
| `noPropertyAccessFromIndexSignature` | `true` | インデックスシグネチャへのドットアクセスを禁止     |

#### 未使用コード検出

| オプション                        | 値      | 説明                       |
| ---------------------------- | ------ | ------------------------ |
| `noUnusedLocals`             | `true` | 未使用のローカル変数をエラー           |
| `noUnusedParameters`         | `true` | 未使用のパラメータをエラー            |
| `noFallthroughCasesInSwitch` | `true` | switch の fallthrough を禁止 |

#### モジュールと出力

| オプション                  | 値      | 説明                      |
| ---------------------- | ------ | ----------------------- |
| `verbatimModuleSyntax` | `true` | import/export 構文をそのまま維持 |
| `isolatedModules`      | `true` | 各ファイルを独立してトランスパイル可能に    |
| `esModuleInterop`      | `true` | CommonJS/ESM 間の相互運用性を向上 |
| `resolveJsonModule`    | `true` | JSON ファイルのインポートを許可      |
| `erasableSyntaxOnly`   | `true` | 型のみの構文を出力時に削除           |
| `noEmit`               | `true` | JavaScript ファイルを出力しない   |
| `incremental`          | `true` | インクリメンタルビルドを有効化         |

#### その他

| オプション                              | 値           | 説明                  |
| ---------------------------------- | ----------- | ------------------- |
| `allowJs`                          | `true`      | JavaScript ファイルを許可  |
| `skipLibCheck`                     | `true`      | 型定義ファイルのチェックをスキップ   |
| `jsx`                              | `react-jsx` | React 17+ の新 JSX 変換 |
| `forceConsistentCasingInFileNames` | `true`      | ファイル名の大文字小文字を厳格に区別  |

### Next.js 設定 (nextjs.json)

基本設定に加えて、以下が追加されます。

| オプション     | 値                      | 説明                       |
| --------- | ---------------------- | ------------------------ |
| `plugins` | `[{ "name": "next" }]` | Next.js TypeScript プラグイン |

### Vite 設定 (vite.json)

基本設定から以下が変更・追加されます。

| オプション                  | 値                 | 説明                |
| ---------------------- | ----------------- | ----------------- |
| `verbatimModuleSyntax` | `false`           | Vite との互換性のため無効化  |
| `types`                | `["vite/client"]` | Vite クライアント型定義を追加 |

### ライブラリ設定 (library.json)

基本設定をそのまま継承します。追加の変更はありません。

## カスタマイズ

プロジェクト固有の設定を追加できます。

### パスエイリアスの設定

```json
{
  "extends": "@practice-next-ec/typescript-config/library",
  "compilerOptions": {
    "paths": {
      "@practice-next-ec/lib": ["../lib/src"],
      "@practice-next-ec/types": ["../types/src"]
    }
  }
}
```

### include/exclude の設定

```json
{
  "extends": "@practice-next-ec/typescript-config/vite",
  "include": ["**/*.ts", "**/*.tsx", ".storybook/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## 依存パッケージ

このパッケージには以下の依存関係が含まれており、利用先で個別にインストールする必要はありません。

| パッケージ        | 用途               |
| ------------ | ---------------- |
| `typescript` | TypeScript コンパイラ |
