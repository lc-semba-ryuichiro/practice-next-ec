# @practice-next-ec/prettier-config

モノレポ内で共有するPrettier設定を提供するパッケージです。

## 目次

- [概要](#概要)
- [インストール](#インストール)
- [使い方](#使い方)
- [設定オプション](#設定オプション)
  - [フォーマット設定](#フォーマット設定)
  - [プラグイン設定](#プラグイン設定)
  - [Tailwind プラグイン設定](#tailwind-プラグイン設定)
- [カスタマイズ](#カスタマイズ)
- [依存パッケージ](#依存パッケージ)

## 概要

このパッケージは、モノレポ内のアプリケーションやパッケージで一貫したコードフォーマットを適用するためのPrettier設定を提供します。

| エクスポート | 用途               |
| ------ | ---------------- |
| `.`    | デフォルトのPrettier設定 |

## インストール

このパッケージはプロジェクトルートで利用されるため、個別のインストールは不要です。

プロジェクトルートの `prettier.config.mjs` で以下のように参照されています。

```javascript
export { default } from "@practice-next-ec/prettier-config";
```

ルートの `package.json` には以下の依存関係が設定されています。

```json
{
  "devDependencies": {
    "@practice-next-ec/prettier-config": "workspace:*"
  }
}
```

## 使い方

プロジェクトルートで以下のコマンドを実行すると、Prettierによる自動フォーマットが適用されます。

```bash
# フォーマットの自動修正
pnpm fix

# または Prettier を直接実行
pnpm prettier --write .
```

## 設定オプション

### フォーマット設定

| オプション                    | 値          | 説明                  |
| ------------------------ | ---------- | ------------------- |
| `semi`                   | `true`     | 文末にセミコロンを追加         |
| `singleQuote`            | `false`    | ダブルクォートを使用          |
| `tabWidth`               | `2`        | 2スペースインデント          |
| `useTabs`                | `false`    | タブではなくスペースを使用       |
| `trailingComma`          | `"es5"`    | ES5スタイルの末尾カンマ       |
| `printWidth`             | `100`      | 1行の最大文字数            |
| `bracketSpacing`         | `true`     | オブジェクトリテラル内にスペースを挿入 |
| `bracketSameLine`        | `false`    | JSX の閉じ括弧を別行に配置     |
| `arrowParens`            | `"always"` | アロー関数の引数に常に括弧を付与    |
| `endOfLine`              | `"lf"`     | LF改行コードを使用          |
| `singleAttributePerLine` | `true`     | JSX/HTML 属性を1行ずつ配置  |

### プラグイン設定

| プラグイン                         | 用途                       |
| ----------------------------- | ------------------------ |
| `prettier-plugin-packagejson` | package.json のキー順序を自動整形  |
| `prettier-plugin-tailwindcss` | Tailwind CSS クラスを推奨順にソート |

### Tailwind プラグイン設定

| オプション               | 値                       | 説明                     |
| ------------------- | ----------------------- | ---------------------- |
| `tailwindFunctions` | `["cn", "clsx", "cva"]` | クラス結合関数内のクラスもソート対象に含める |

`cn`、`clsx`、`cva` 関数内で使用されるTailwindクラスも自動的にソートされます。

```typescript
// ソート前
cn("mt-4 flex items-center bg-white p-2")

// ソート後（Tailwind推奨順）
cn("flex items-center bg-white p-2 mt-4")
```

## カスタマイズ

特定のパッケージでカスタム設定が必要な場合は、そのパッケージ内に `prettier.config.mjs` を作成し、スプレッド構文で拡張できます。

```javascript
import baseConfig from "@practice-next-ec/prettier-config";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  // プロジェクト固有の設定
  printWidth: 80,
};
```

## 依存パッケージ

このパッケージには以下の依存関係が含まれています。

| パッケージ                         | バージョン  | 用途                   |
| ----------------------------- | ------ | -------------------- |
| `prettier`                    | 3.7.4  | コードフォーマッター本体         |
| `prettier-plugin-packagejson` | 2.5.20 | package.json 整形プラグイン |
| `prettier-plugin-tailwindcss` | 0.7.2  | Tailwind クラスソートプラグイン |
