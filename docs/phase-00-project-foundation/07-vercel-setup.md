# Vercel セットアップ

## Vercel とは

**Vercel** は、フロントエンドのデプロイ・ホスティングプラットフォームです。
Next.js の開発元であり、Next.js との統合が最も優れています。

### 特徴

- ゼロ設定デプロイ - Git リポジトリを接続するだけ
- プレビューデプロイ - PR ごとに自動でプレビュー URL を発行
- Edge Functions - エッジでの高速なサーバーレス実行
- Analytics - Web Vitals の自動計測
- モノレポ対応 - Turborepo との連携

---

## アカウント作成

### 1. Vercel にサインアップ

1. [vercel.com](https://vercel.com) にアクセス
2. 「Start Deploying」をクリック
3. GitHub アカウントで認証

### 2. GitHub との連携

1. 「Import Git Repository」を選択
2. GitHub アカウントを連携
3. リポジトリへのアクセスを許可

---

## プロジェクトのインポート

### 1. リポジトリを選択

```text
Import Git Repository
├── Select a Git Provider: GitHub
├── Import Git Repository
│   └── リポジトリを選択
└── Configure Project
```

### 2. プロジェクト設定

| 設定項目         | 値                       |
| ---------------- | ------------------------ |
| Project Name     | ec-web                   |
| Framework Preset | Next.js                  |
| Root Directory   | apps/web                 |
| Build Command    | turbo build --filter=web |
| Install Command  | pnpm install             |
| Output Directory | .next                    |

### 3. 環境変数の設定

```text
Environment Variables
├── NEXT_PUBLIC_API_URL: https://api.example.com
├── DATABASE_URL: (シークレット)
└── TURBO_TOKEN: (リモートキャッシュ用)
```

---

## vercel.json の設定

プロジェクトルートに `vercel.json` を作成します。

### 基本設定

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "turbo build --filter=web",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

### 詳細設定

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "turbo build --filter=web",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

---

## 環境変数の管理

### Dashboard での設定

```text
Project Settings → Environment Variables

変数名: DATABASE_URL
値: postgresql://...
環境: Production, Preview, Development

変数名: NEXT_PUBLIC_API_URL
値: https://api.example.com
環境: Production
```

### 環境ごとの設定

| 環境        | 説明                         | 例                                |
| ----------- | ---------------------------- | --------------------------------- |
| Production  | 本番環境                     | `https://api.example.com`         |
| Preview     | PR プレビュー環境            | `https://staging-api.example.com` |
| Development | ローカル開発（`vercel dev`） | `http://localhost:3001`           |

### .env ファイルとの関係

```text
.env                    # Git に含めない（.gitignore）
.env.local              # ローカル開発用
.env.development        # 開発環境用
.env.production         # 本番環境用（vercel.json から参照しない）
```

---

## プレビューデプロイ

### 仕組み

1. PR を作成
2. Vercel が自動でビルド
3. 一意の URL でプレビュー公開
4. PR コメントに URL が追加

### URL 形式

```text
https://<project>-<hash>-<team>.vercel.app
例: https://ec-web-abc123-my-team.vercel.app
```

### PR コメントの例

```text
✅ Deploy Preview ready!

🔍 Inspect: https://vercel.com/my-team/ec-web/abc123
🔗 Preview: https://ec-web-abc123-my-team.vercel.app
```

### ブランチごとのプレビュー設定

```text
Project Settings → Git → Preview Branches

All branches             # すべてのブランチでプレビュー
Only production branch   # main のみ
Custom                   # 指定したパターンのみ
```

---

## ドメインの設定

### カスタムドメインの追加

```text
Project Settings → Domains

1. ドメインを入力: shop.example.com
2. DNS 設定を更新
3. SSL 証明書が自動発行
```

### DNS 設定

```text
# CNAME レコード（サブドメイン）
shop.example.com  CNAME  cname.vercel-dns.com

# A レコード（ルートドメイン）
example.com  A  76.76.21.21
```

### 環境ごとのドメイン

| 環境       | ドメイン                 |
| ---------- | ------------------------ |
| Production | shop.example.com         |
| Preview    | preview.shop.example.com |
| Staging    | staging.shop.example.com |

---

## Vercel CLI

### インストール

```bash
pnpm add -g vercel
```

### ログイン

```bash
vercel login
```

### よく使うコマンド

```bash
# プロジェクトをリンク
vercel link

# ローカル開発（Vercel の環境変数を使用）
vercel dev

# プレビューデプロイ
vercel

# 本番デプロイ
vercel --prod

# 環境変数を取得
vercel env pull .env.local

# プロジェクト情報
vercel inspect <url>

# ログ確認
vercel logs <url>
```

---

## ビルド設定

### 推奨設定

```json
// apps/web/package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### ビルドキャッシュ

Vercel は自動でビルドキャッシュを使用します。

```text
Using build cache from previous deployment
Cache hit: node_modules/.cache
Cache hit: .next/cache
```

### Turborepo リモートキャッシュ

```bash
# Turborepo と Vercel を連携
npx turbo login
npx turbo link
```

環境変数に以下を設定します。

```text
TURBO_TOKEN: <token>
TURBO_TEAM: <team>
```

---

## Analytics と Speed Insights

### Vercel Analytics

Web Vitals を自動計測できます。

```bash
pnpm add @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights

パフォーマンスの詳細分析ができます。

```bash
pnpm add @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## チーム設定

### チームの作成

```text
Vercel Dashboard → Create Team
Team Name: my-ec-team
```

### メンバーの招待

```text
Team Settings → Members → Invite
- Owner: 全権限
- Member: デプロイ、設定変更
- Viewer: 閲覧のみ
```

### プロジェクトの移動

```text
Project Settings → Transfer Project
→ チームを選択
```

---

## トラブルシューティング

### ビルドエラー

```text
Error: Build failed
```

以下を確認してください。

1. Vercel Dashboard でログを確認する
2. ローカルで `pnpm build` を実行する
3. 環境変数が正しく設定されているか確認する

### 504 Gateway Timeout

サーバーレス関数のタイムアウト（デフォルト 10 秒）を延長できます。

```typescript
// app/api/heavy-task/route.ts
export const maxDuration = 30; // 最大 30 秒
```

### CORS エラー

```json
// vercel.json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }]
    }
  ]
}
```

---

## 料金プラン

| プラン     | 料金     | 特徴                       |
| ---------- | -------- | -------------------------- |
| Hobby      | 無料     | 個人プロジェクト、制限あり |
| Pro        | $20/月   | チーム向け、Analytics 含む |
| Enterprise | カスタム | SLA、専用サポート          |

### 無料枠の制限

- ビルド: 100 回/日
- 帯域: 100GB/月
- Serverless Functions: 100GB-時間/月

---

## 次のステップ

Vercel の基本設定が完了したら、[モノレポでの Vercel 設定](./08-vercel-monorepo.md) で複数アプリのデプロイを設定しましょう。
