# @practice-next-ec/stylelint-config

このモノレポ内で共有されるStylelint設定パッケージです。

## 目次

- [概要](#概要)
- [使用方法](#使用方法)
- [設定内容](#設定内容)
  - [拡張設定](#拡張設定)
  - [プラグイン](#プラグイン)
  - [主要ルール](#主要ルール)
- [コマンド](#コマンド)
- [Tailwind CSS 対応](#tailwind-css-対応)
  - [許可された @rule](#許可された-rule)
  - [許可された関数](#許可された関数)
- [無視パターン](#無視パターン)

## 概要

このパッケージは、プロジェクト全体で一貫したCSSコードスタイルを維持するためのStylelint設定を提供します。Tailwind CSSとの完全な互換性を持ち、パフォーマンスと保守性を考慮したルールセットを含んでいます。

## 使用方法

ワークスペースパッケージのため、`pnpm install` で自動的にインストールされます。

プロジェクトルートの `stylelint.config.mjs` で次のように設定します。

```javascript
export { default } from "@practice-next-ec/stylelint-config";
```

## 設定内容

### 拡張設定

| 設定名                          | 説明                   |
| :--------------------------- | :------------------- |
| stylelint-config-standard    | Stylelint の標準ルールセット  |
| stylelint-config-tailwindcss | Tailwind CSS 構文のサポート |

### プラグイン

| プラグイン                                | 説明                     |
| :----------------------------------- | :--------------------- |
| stylelint-order                      | CSS プロパティの順序を制御        |
| stylelint-declaration-strict-value   | 特定プロパティの値を変数に制限        |
| stylelint-high-performance-animation | パフォーマンスに影響するアニメーションを検出 |

### 主要ルール

#### プロパティ順序

```css
/* Good: アルファベット順 */
.example {
  background: white;
  color: black;
  display: flex;
  margin: 0;
  padding: 0;
}
```

#### 色指定の厳格チェック

`color`, `fill`, `stroke` および `/color$/` にマッチするプロパティは、以下のキーワード以外は変数の使用を強制します。

- `currentColor`
- `inherit`
- `transparent`
- `initial`
- `none`
- `unset`

```css
/* Good */
.example {
  color: var(--text-color);
  background-color: transparent;
}

/* Bad */
.example {
  color: #333;
  background-color: blue;
}
```

#### パフォーマンスアニメーション

`width`, `height`, `top`, `left` などのレイアウトプロパティのアニメーションは警告されます。代わりに `transform` や `opacity` を使用してください。

```css
/* Good */
.example {
  transition: transform 0.3s, opacity 0.3s;
}

/* Bad */
.example {
  transition: width 0.3s, height 0.3s;
}
```

## コマンド

プロジェクトルートから実行できます。

```bash
# CSS ファイルのリント
pnpm lint:stylelint

# 自動修正
pnpm fix:stylelint
```

## Tailwind CSS 対応

### 許可された @rule

以下のTailwind CSS固有の @ruleが許可されています。

- `@tailwind`
- `@apply`
- `@variants`
- `@responsive`
- `@screen`
- `@layer`
- `@theme`
- `@source`
- `@utility`
- `@plugin`
- `@custom-variant`

### 許可された関数

以下のTailwind CSS固有の関数が許可されています。

- `theme()`
- `screen()`
- `oklch()`

## 無視パターン

以下のファイルはStylelintの対象外です。

- `stories/**/*.css` - Storybookのストーリーファイル
- `**/dist/**/*.css` - ビルド成果物
