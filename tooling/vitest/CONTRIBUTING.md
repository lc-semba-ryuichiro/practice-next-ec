# @practice-next-ec/vitest-config 貢献ガイド

このパッケージへの貢献に興味を持っていただきありがとうございます。

一般的な貢献フロー、コミットメッセージ規約、Pull Requestガイドラインについては、[プロジェクトルートの CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

## 目次

- [設定の追加・変更](#設定の追加変更)
  - [新しい設定プリセットの追加](#新しい設定プリセットの追加)
  - [既存設定の変更](#既存設定の変更)
- [依存関係の更新](#依存関係の更新)
  - [1. `pnpm-workspace.yaml` の `catalog` セクションを更新](#1-pnpm-workspaceyaml-の-catalog-セクションを更新)
  - [2. 依存関係を再インストール](#2-依存関係を再インストール)
  - [3. 利用先アプリでテストを実行して動作確認](#3-利用先アプリでテストを実行して動作確認)
- [テスト](#テスト)
- [変更時のチェックリスト](#変更時のチェックリスト)

## 設定の追加・変更

### 新しい設定プリセットの追加

新しい設定プリセット（例: `node` 環境用設定）を追加する場合は以下です。

#### 1. 設定ファイルの作成

```typescript
// tooling/vitest/node.ts
import { defineConfig, mergeConfig } from "vitest/config";
import { createBaseConfig } from "./base.ts";

export function createNodeConfig(): ReturnType<typeof defineConfig> {
  return mergeConfig(
    createBaseConfig(),
    defineConfig({
      test: {
        environment: "node",
      },
    })
  );
}
```

#### 2. package.json の exports 更新

```json
{
  "exports": {
    "./base": "./base.ts",
    "./react": "./react.ts",
    "./node": "./node.ts"
  }
}
```

#### 3. README.md の更新

新しいエクスポートと使い方をドキュメントに追加してください。

### 既存設定の変更

既存の設定を変更する前に、影響範囲を確認してください。

```bash
# このパッケージを利用しているアプリ・パッケージを検索
grep -r "@practice-next-ec/vitest-config" apps/ packages/ --include="package.json"
```

現在の利用先は以下です。

- `apps/admin`

## 依存関係の更新

VitestやTesting Libraryのバージョンを更新する場合は以下です。

### 1. `pnpm-workspace.yaml` の `catalog` セクションを更新

```yaml
catalog:
  vitest: "^5.0.0"  # 新しいバージョン
```

### 2. 依存関係を再インストール

```bash
pnpm install
```

### 3. 利用先アプリでテストを実行して動作確認

```bash
pnpm test
```

## テスト

このパッケージ自体にはテストファイルがありませんが、設定変更の動作確認は利用先アプリで行います。

```bash
# admin アプリでテスト実行
cd apps/admin && pnpm test

# カバレッジ付きでテスト実行
cd apps/admin && pnpm test --coverage
```

## 変更時のチェックリスト

- [ ] 利用先アプリへの影響を確認した
- [ ] `pnpm typecheck` がエラーなく通る
- [ ] 利用先アプリで `pnpm test` が成功する
- [ ] 新しいエクスポートを追加した場合はREADME.mdを更新した
- [ ] 破壊的変更がある場合はCHANGELOGを追加した
