# 貢献ガイドライン

このパッケージへの貢献に興味を持っていただきありがとうございます。

全体的な貢献の流れについては、[プロジェクトルートの CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

## 目次

- [ルールの追加・変更](#ルールの追加変更)
  - [既存ルールの変更](#既存ルールの変更)
  - [新しいルールの追加](#新しいルールの追加)
- [プラグインの追加](#プラグインの追加)
  - [1. pnpm-workspace.yaml に追加](#1-pnpm-workspaceyaml-に追加)
  - [2. package.json に追加](#2-packagejson-に追加)
  - [3. index.mjs で設定](#3-indexmjs-で設定)
  - [4. knip.json に追加](#4-knipjson-に追加)
  - [5. 依存関係をインストール](#5-依存関係をインストール)
- [テスト方法](#テスト方法)
  - [ローカルでの動作確認](#ローカルでの動作確認)
  - [CI での検証](#ci-での検証)
- [コミット規約](#コミット規約)
  - [例](#例)

## ルールの追加・変更

### 既存ルールの変更

`index.mjs` の `rules` オブジェクトを編集します。

```javascript
rules: {
  // 既存ルールの例
  "order/properties-alphabetical-order": true,

  // ルールを無効化する場合
  "selector-class-pattern": null,

  // オプション付きルールの例
  "at-rule-no-unknown": [
    true,
    {
      ignoreAtRules: ["tailwind", "apply"],
    },
  ],
}
```

### 新しいルールの追加

1. `index.mjs` の `rules` オブジェクトに追加
2. 追加ルールが外部プラグインを使用する場合は `extends` や `plugins` も更新
3. `pnpm lint:stylelint` で動作確認

## プラグインの追加

新しいStylelintプラグインを追加する場合は以下です。

### 1. pnpm-workspace.yaml に追加

```yaml
catalog:
  # 既存のエントリ...
  stylelint-new-plugin: X.X.X  # バージョンを指定
```

### 2. package.json に追加

```json
{
  "dependencies": {
    "stylelint-new-plugin": "catalog:"
  }
}
```

### 3. index.mjs で設定

```javascript
plugins: [
  "stylelint-order",
  "stylelint-new-plugin",  // 追加
],
rules: {
  "new-plugin/rule-name": true,  // ルールを有効化
}
```

### 4. knip.json に追加

```json
{
  "tooling/stylelint": {
    "ignoreDependencies": [
      "stylelint-new-plugin"
    ]
  }
}
```

### 5. 依存関係をインストール

```bash
pnpm install
```

## テスト方法

### ローカルでの動作確認

```bash
# プロジェクトルートから実行
pnpm lint:stylelint

# 特定ファイルのみ
pnpm exec stylelint "apps/web/**/*.css"

# 自動修正を試す
pnpm fix:stylelint
```

### CI での検証

pre-pushフックで自動的に `stylelint` が実行されます。

## コミット規約

Stylelint設定の変更には以下のプレフィックスを使用してください。

| Type  | 用途               |
| :---- | :--------------- |
| chore | 設定の追加・変更・削除      |
| fix   | バグ修正（誤った設定の修正など） |
| docs  | ドキュメントの更新        |

### 例

```bash
# ルールの追加
git commit -m "chore(stylelint): add declaration-strict-value rule"

# プラグインの追加
git commit -m "chore(stylelint): add stylelint-order plugin"

# バグ修正
git commit -m "fix(stylelint): correct tailwind at-rule configuration"

# ドキュメント更新
git commit -m "docs(stylelint): update README with new rules"
```
