# @practice-next-ec/typescript-config 貢献ガイド

このパッケージへの貢献に興味を持っていただきありがとうございます。

一般的な貢献フロー、コミットメッセージ規約、Pull Requestガイドラインについては、[プロジェクトルートの CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

## 目次

- [設定の追加・変更](#設定の追加変更)
  - [新しい設定プリセットの追加](#新しい設定プリセットの追加)
  - [既存設定の変更](#既存設定の変更)
- [依存関係の更新](#依存関係の更新)
  - [1. `pnpm-workspace.yaml` の `catalog` セクションを更新](#1-pnpm-workspaceyaml-の-catalog-セクションを更新)
  - [2. 依存関係を再インストール](#2-依存関係を再インストール)
  - [3. 利用先で型チェックを実行して動作確認](#3-利用先で型チェックを実行して動作確認)
- [テスト](#テスト)
- [変更時のチェックリスト](#変更時のチェックリスト)

## 設定の追加・変更

### 新しい設定プリセットの追加

新しい設定プリセット（例: `node` 環境用設定）を追加する場合は以下です。

#### 1. 設定ファイルの作成

```json
// tooling/typescript/node.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["esnext"],
    "module": "node16",
    "moduleResolution": "node16"
  }
}
```

#### 2. package.json の exports 更新

```json
{
  "exports": {
    "./base": "./base.json",
    "./nextjs": "./nextjs.json",
    "./vite": "./vite.json",
    "./library": "./library.json",
    "./node": "./node.json"
  }
}
```

#### 3. README.md の更新

新しいエクスポートと使い方をドキュメントに追加してください。

### 既存設定の変更

既存の設定を変更する前に、影響範囲を確認してください。

```bash
# このパッケージを利用しているアプリ・パッケージを検索
grep -r "@practice-next-ec/typescript-config" apps/ packages/ tooling/ --include="package.json"
```

現在の利用先は以下です。

- `apps/web` - nextjs設定を使用
- `apps/admin` - vite設定を使用
- `packages/ui` - library設定を使用
- `packages/lib` - library設定を使用
- `packages/types` - library設定を使用
- `packages/validators` - library設定を使用
- `tooling/vitest` - base設定を使用
- ルート - base設定を使用

## 依存関係の更新

TypeScriptのバージョンを更新する場合は以下です。

### 1. `pnpm-workspace.yaml` の `catalog` セクションを更新

```yaml
catalog:
  typescript: "^5.9.0"  # 新しいバージョン
```

### 2. 依存関係を再インストール

```bash
pnpm install
```

### 3. 利用先で型チェックを実行して動作確認

```bash
pnpm typecheck
```

## テスト

このパッケージ自体にはテストファイルがありませんが、設定変更の動作確認は全パッケージの型チェックで行います。

```bash
# 全パッケージの型チェック
pnpm typecheck

# 特定のアプリ/パッケージのみ型チェック
cd apps/web && pnpm typecheck
cd apps/admin && pnpm typecheck
cd packages/ui && pnpm typecheck
```

## 変更時のチェックリスト

- [ ] 利用先パッケージへの影響を確認した
- [ ] `pnpm typecheck` がエラーなく通る
- [ ] `pnpm build` が成功する
- [ ] 新しいエクスポートを追加した場合はREADME.mdを更新した
- [ ] 破壊的変更がある場合はCHANGELOGを追加した
