# @practice-next-ec/prettier-config 貢献ガイド

このパッケージへの貢献に興味を持っていただきありがとうございます。

一般的な貢献フロー、コミットメッセージ規約、Pull Requestガイドラインについては、[プロジェクトルートの CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

## 目次

- [設定の変更](#設定の変更)
  - [フォーマット設定の変更](#フォーマット設定の変更)
  - [プラグインの追加](#プラグインの追加)
- [依存関係の更新](#依存関係の更新)
  - [1. `pnpm-workspace.yaml` の catalog セクションを更新](#1-pnpm-workspaceyaml-の-catalog-セクションを更新)
  - [2. 依存関係を再インストール](#2-依存関係を再インストール)
  - [3. フォーマットを実行して動作確認](#3-フォーマットを実行して動作確認)
- [動作確認](#動作確認)
- [変更時のチェックリスト](#変更時のチェックリスト)

## 設定の変更

### フォーマット設定の変更

`index.mjs` のオプションを変更する場合は、影響範囲が広いため慎重に行ってください。

#### 1. 設定ファイルの編集

```javascript
// tooling/prettier/index.mjs
/** @type {import("prettier").Config} */
export default {
  // 変更したいオプションを編集
  printWidth: 120, // 例: 100 → 120 に変更
  // ...
};
```

#### 2. 変更の影響確認

```bash
# フォーマット差分を確認（実行前）
pnpm prettier --check .

# 変更を適用
pnpm fix

# 差分を確認
git diff
```

### プラグインの追加

新しいPrettierプラグインを追加する場合は以下の手順で行います。

#### 1. `pnpm-workspace.yaml` の catalog に追加

```yaml
catalog:
  # 既存のエントリ
  prettier: 3.7.4
  prettier-plugin-packagejson: 2.5.20
  prettier-plugin-tailwindcss: 0.7.2
  # 新しいプラグインを追加
  prettier-plugin-example: 1.0.0
```

#### 2. `package.json` の dependencies に追加

```json
{
  "dependencies": {
    "prettier": "catalog:",
    "prettier-plugin-packagejson": "catalog:",
    "prettier-plugin-tailwindcss": "catalog:",
    "prettier-plugin-example": "catalog:"
  }
}
```

#### 3. `index.mjs` の plugins 配列に追加

```javascript
/** @type {import("prettier").Config} */
export default {
  // ...
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-example", // 追加
  ],
};
```

#### 4. README.md の更新

プラグイン設定と依存パッケージのセクションに新しいプラグインを追加してください。

## 依存関係の更新

Prettierやプラグインのバージョンを更新する場合は以下の手順で行います。

### 1. `pnpm-workspace.yaml` の catalog セクションを更新

```yaml
catalog:
  prettier: "3.8.0"  # 新しいバージョン
```

### 2. 依存関係を再インストール

```bash
pnpm install
```

### 3. フォーマットを実行して動作確認

```bash
pnpm fix
```

## 動作確認

設定変更後は以下のコマンドで動作確認を行ってください。

```bash
# フォーマットの自動修正
pnpm fix

# フォーマット差分の確認
git diff

# ESLint との整合性確認（eslint-config-prettier）
pnpm lint
```

## 変更時のチェックリスト

- [ ] `pnpm fix` がエラーなく動作する
- [ ] `pnpm lint` が成功する（eslint-config-prettierとの整合性）
- [ ] `pnpm typecheck` がエラーなく通る
- [ ] 新しいプラグインを追加した場合はREADME.mdを更新した
- [ ] 破壊的変更がある場合はチームへ周知した
