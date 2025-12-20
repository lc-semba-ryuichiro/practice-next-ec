# 演習 2: Vercel へデプロイ

## 目標

モノレポ構成のプロジェクトを Vercel にデプロイし、プレビューデプロイとリモートキャッシュを設定します。

---

## 前提条件

- 演習 1 が完了していること
- GitHub アカウントを持っていること
- Vercel アカウントを持っていること（なければ作成）

---

## ステップ 1: GitHub にプッシュ

### 1.1 .gitignore を確認

プロジェクトルートの `.gitignore`:

```text
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.next/
dist/
storybook-static/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Turbo
.turbo/

# Testing
coverage/
playwright-report/
```

### 1.2 GitHub リポジトリを作成

```bash
# GitHub でリポジトリを作成後
git remote add origin https://github.com/your-username/ec-monorepo.git
git branch -M main
git add .
git commit -m "chore: 初期セットアップ"
git push -u origin main
```

---

## ステップ 2: Vercel アカウントの準備

### 2.1 Vercel にサインアップ

1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHub アカウントで認証

### 2.2 GitHub との連携

1. 「Configure GitHub App」をクリック
2. アクセスするリポジトリを選択（または「All repositories」）
3. 「Install」をクリック

---

## ステップ 3: web アプリのデプロイ

### 3.1 プロジェクトをインポート

1. Vercel Dashboard で「Add New...」→「Project」
2. 「Import Git Repository」で `ec-monorepo` を選択
3. 「Import」をクリック

### 3.2 プロジェクト設定

| 設定項目         | 値                                     |
| ---------------- | -------------------------------------- |
| Project Name     | ec-web                                 |
| Framework Preset | Next.js                                |
| Root Directory   | `apps/web`（Configure で設定）         |
| Build Command    | `cd ../.. && turbo build --filter=web` |
| Install Command  | `pnpm install`                         |

### 3.3 デプロイ実行

1. 「Deploy」をクリック
2. ビルドログを確認
3. デプロイ完了後、URL にアクセスして確認

---

## ステップ 4: Turborepo リモートキャッシュの設定

### 4.1 ローカルで認証

```bash
npx turbo login
```

ブラウザが開き、Vercel で認証します。

### 4.2 プロジェクトをリンク

```bash
npx turbo link
```

チームを選択（個人の場合は自分のアカウント）。

### 4.3 環境変数を取得

```bash
turbo login
# Token が表示される
```

### 4.4 Vercel に環境変数を設定

Vercel Dashboard → Project Settings → Environment Variables:

```text
TURBO_TOKEN: <取得したトークン>
TURBO_TEAM: <チーム名またはユーザー名>
```

---

## ステップ 5: プレビューデプロイの確認

### 5.1 ブランチを作成

```bash
git checkout -b feature/test-preview
```

### 5.2 変更を加える

`apps/web/app/page.tsx` を編集します。

```tsx
export default function Home() {
  return (
    <main>
      <h1>EC サイト - プレビューテスト</h1>
    </main>
  );
}
```

### 5.3 コミット & プッシュ

```bash
git add .
git commit -m "feat: プレビューテスト"
git push origin feature/test-preview
```

### 5.4 PR を作成

GitHub で Pull Request を作成します。

### 5.5 プレビューを確認

1. PR のコメントに Vercel bot がプレビュー URL を投稿
2. URL にアクセスして変更を確認
3. レビュー後、マージ

---

## ステップ 6: GitHub Actions の設定

### 6.1 ワークフローファイルを作成

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, typecheck]
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

### 6.2 GitHub シークレットを設定

GitHub → Settings → Secrets and variables → Actions:

**Secrets:**

- `TURBO_TOKEN`: Turborepo のトークン

**Variables:**

- `TURBO_TEAM`: チーム名

### 6.3 コミット & プッシュ

```bash
git add .
git commit -m "ci: GitHub Actions ワークフローを追加"
git push
```

### 6.4 Actions の実行を確認

GitHub → Actions タブでワークフローの実行を確認。

---

## ステップ 7: turbo-ignore の設定（オプション）

変更のないアプリのビルドをスキップする設定です。

### 7.1 vercel.json を作成

プロジェクトルートに以下のファイルを作成します。

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "pnpm install",
  "ignoreCommand": "npx turbo-ignore"
}
```

### 7.2 コミット & プッシュ

```bash
git add .
git commit -m "chore: turbo-ignore を設定"
git push
```

---

## 確認チェックリスト

以下を確認してください。

- [ ] Vercel にプロジェクトがデプロイされている
- [ ] デプロイ URL でサイトが表示される
- [ ] PR を作成するとプレビュー URL が発行される
- [ ] GitHub Actions が正常に実行される
- [ ] Turborepo のリモートキャッシュが有効（ビルドログで確認）

---

## トラブルシューティング

### ビルドエラー: モジュールが見つからない

```text
Error: Cannot find module '@ec/shared'
```

以下を確認してください。

- `apps/web/package.json` に `"@ec/shared": "workspace:*"` があるか確認する
- `pnpm install` を再実行する

### Turborepo キャッシュが効かない

以下を確認してください。

- 環境変数 `TURBO_TOKEN` と `TURBO_TEAM` が正しく設定されているか確認する
- `npx turbo login` で再認証する

### プレビューデプロイが作成されない

以下を確認してください。

- Vercel の GitHub App が正しく設定されているか確認する
- Project Settings → Git → Preview Branches の設定を確認する

---

## 発展課題

1. `apps/admin` を別の Vercel プロジェクトとしてデプロイ
2. カスタムドメインを設定
3. 環境ごとの環境変数を設定（Production/Preview/Development）

---

## 完了条件

以下がすべて動作すれば、この演習は完了です。

- [ ] Vercel に web アプリがデプロイされている
- [ ] PR でプレビューデプロイが自動生成される
- [ ] GitHub Actions の CI が正常に動作する
- [ ] Turborepo のリモートキャッシュが有効になっている

---

## 次のステップ

Phase 0 の演習が完了しました。
[チェックリスト](../checklist.md) で理解度を確認し、[Phase 1: React 基礎 + Storybook 入門](../../phase-01-react-basics/README.md) に進みましょう。
