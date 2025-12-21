# 演習 1: モノレポ初期セットアップ

## 目次

- [目標](#目標)
- [前提条件](#前提条件)
- [ステップ 1: プロジェクトの作成](#ステップ-1-プロジェクトの作成)
  - [1.1 ディレクトリ作成](#11-ディレクトリ作成)
  - [1.2 mise（またはnvm）でNode.jsバージョンを固定](#12-miseまたはnvmでnodejsバージョンを固定)
  - [1.3 ルート package.json を作成](#13-ルート-packagejson-を作成)
- [ステップ 2: pnpm ワークスペース設定](#ステップ-2-pnpm-ワークスペース設定)
  - [2.1 pnpm-workspace.yaml を作成](#21-pnpm-workspaceyaml-を作成)
  - [2.2 ディレクトリ構造を作成](#22-ディレクトリ構造を作成)
- [ステップ 3: Turborepo 設定](#ステップ-3-turborepo-設定)
  - [3.1 turbo.json を作成](#31-turbojson-を作成)
- [ステップ 4: 共有設定パッケージの作成](#ステップ-4-共有設定パッケージの作成)
  - [4.1 TypeScript 設定](#41-typescript-設定)
  - [4.2 Prettier 設定](#42-prettier-設定)
- [ステップ 5: 共有パッケージの作成](#ステップ-5-共有パッケージの作成)
  - [5.1 @ec/shared パッケージ](#51-ecshared-パッケージ)
- [ステップ 6: web アプリの作成](#ステップ-6-web-アプリの作成)
  - [6.1 Next.js アプリを作成](#61-nextjs-アプリを作成)
  - [6.2 package.json を編集](#62-packagejson-を編集)
  - [6.3 tsconfig.json を編集](#63-tsconfigjson-を編集)
- [ステップ 7: 依存関係のインストール](#ステップ-7-依存関係のインストール)
- [ステップ 8: 動作確認](#ステップ-8-動作確認)
  - [8.1 開発サーバーの起動](#81-開発サーバーの起動)
  - [8.2 ビルド](#82-ビルド)
  - [8.3 型チェック](#83-型チェック)
- [確認チェックリスト](#確認チェックリスト)
- [トラブルシューティング](#トラブルシューティング)
  - [pnpm install でエラー](#pnpm-install-でエラー)
  - [TypeScript のパスが解決されない](#typescript-のパスが解決されない)
  - [Turborepo が見つからない](#turborepo-が見つからない)
- [発展課題](#発展課題)
- [完了条件](#完了条件)

## 目標

Turborepo + pnpm ワークスペースを使ったモノレポ構成をゼロから構築します。

***

## 前提条件

以下がインストールされていることを確認してください。

```bash
# Node.js 24+
node --version

# pnpm 10+
pnpm --version

# Git
git --version
```

***

## ステップ 1: プロジェクトの作成

### 1.1 ディレクトリ作成

```bash
mkdir ec-monorepo
cd ec-monorepo
git init
```

### 1.2 mise（またはnvm）でNode.jsバージョンを固定

```bash
# mise を使用する場合
echo "nodejs 24" > .mise.toml

# または .nvmrc
echo "24" > .nvmrc
```

### 1.3 ルート package.json を作成

```bash
pnpm init
```

以下のように編集します。

```json
{
  "name": "ec-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test"
  },
  "devDependencies": {
    "turbo": "^2.3.0"
  },
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=24.0.0",
    "pnpm": ">=10.0.0"
  }
}
```

***

## ステップ 2: pnpm ワークスペース設定

### 2.1 pnpm-workspace.yaml を作成

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tooling/*"
```

### 2.2 ディレクトリ構造を作成

```bash
mkdir -p apps/web
mkdir -p apps/admin
mkdir -p apps/storybook
mkdir -p packages/ui
mkdir -p packages/shared
mkdir -p packages/validators
mkdir -p packages/store
mkdir -p tooling/eslint-config
mkdir -p tooling/typescript-config
mkdir -p tooling/tailwind-config
mkdir -p tooling/prettier-config
```

***

## ステップ 3: Turborepo 設定

### 3.1 turbo.json を作成

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "storybook": {
      "cache": false,
      "persistent": true
    }
  }
}
```

***

## ステップ 4: 共有設定パッケージの作成

### 4.1 TypeScript 設定

```bash
cd tooling/typescript-config
pnpm init
```

`tooling/typescript-config/package.json`:

```json
{
  "name": "@ec/typescript-config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./base": "./base.json",
    "./next": "./next.json",
    "./react-library": "./react-library.json"
  }
}
```

`tooling/typescript-config/base.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true
  }
}
```

`tooling/typescript-config/next.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "allowJs": true
  }
}
```

`tooling/typescript-config/react-library.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx"
  }
}
```

### 4.2 Prettier 設定

`tooling/prettier-config/package.json`:

```json
{
  "name": "@ec/prettier-config",
  "version": "0.0.1",
  "private": true,
  "main": "index.js",
  "exports": {
    ".": "./index.js"
  },
  "peerDependencies": {
    "prettier": "^3.0.0"
  }
}
```

`tooling/prettier-config/index.js`:

```javascript
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
};

module.exports = config;
```

***

## ステップ 5: 共有パッケージの作成

### 5.1 @ec/shared パッケージ

`packages/shared/package.json`:

```json
{
  "name": "@ec/shared",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@ec/typescript-config": "workspace:*",
    "typescript": "^5.9.0"
  }
}
```

`packages/shared/tsconfig.json`:

```json
{
  "extends": "@ec/typescript-config/react-library",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

`packages/shared/src/index.ts`:

```typescript
export * from "./types";
```

`packages/shared/src/types/index.ts`:

```typescript
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};
```

***

## ステップ 6: web アプリの作成

### 6.1 Next.js アプリを作成

```bash
cd apps/web
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 6.2 package.json を編集

```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings 0",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@ec/shared": "workspace:*",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@ec/typescript-config": "workspace:*",
    "typescript": "^5.9.0"
  }
}
```

### 6.3 tsconfig.json を編集

```json
{
  "extends": "@ec/typescript-config/next",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

***

## ステップ 7: 依存関係のインストール

```bash
# プロジェクトルートに戻る
cd ../..

# 全パッケージの依存関係をインストール
pnpm install
```

***

## ステップ 8: 動作確認

### 8.1 開発サーバーの起動

```bash
pnpm dev
```

### 8.2 ビルド

```bash
pnpm build
```

### 8.3 型チェック

```bash
pnpm typecheck
```

***

## 確認チェックリスト

以下を確認してください。

- [ ] `pnpm install` がエラーなく完了する
- [ ] `pnpm dev` で web アプリが起動する
- [ ] `pnpm build` がエラーなく完了する
- [ ] `pnpm typecheck` がエラーなく完了する
- [ ] `@ec/shared` からの型インポートが動作する

***

## トラブルシューティング

### pnpm install でエラー

```bash
# ロックファイルを再生成
rm pnpm-lock.yaml
pnpm install
```

### TypeScript のパスが解決されない

`tsconfig.json` の `extends` パスを確認してください。

```json
{
  "extends": "@ec/typescript-config/next"
}
```

### Turborepo が見つからない

```bash
pnpm add -D turbo --workspace-root
```

***

## 発展課題

1. `packages/ui` に Button コンポーネントを作成し、`apps/web` で使用する
2. `packages/validators` に Zod スキーマを作成する
3. `apps/storybook` を追加し、コンポーネントを表示する

***

## 完了条件

以下がすべて動作すれば、この演習は完了です。

```bash
# 全パッケージのインストール
pnpm install ✓

# 開発サーバー起動
pnpm dev ✓

# ビルド
pnpm build ✓

# 型チェック
pnpm typecheck ✓
```

次は [演習 2: Vercel へデプロイ](./02-deploy-vercel.md) に進みましょう。
