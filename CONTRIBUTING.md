# 貢献ガイドライン

このプロジェクトへの貢献に興味を持っていただきありがとうございます。

## 目次

- [貢献の流れ](#貢献の流れ)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [コーディング規約](#コーディング規約)
  - [TypeScript](#typescript)
  - [スタイリング](#スタイリング)
  - [コンポーネント](#コンポーネント)
- [コミットメッセージ](#コミットメッセージ)
  - [Type](#type)
- [Pull Request](#pull-request)
  - [作成前のチェックリスト](#作成前のチェックリスト)
  - [タイトル](#タイトル)
  - [説明](#説明)
- [Issue](#issue)
  - [バグ報告](#バグ報告)
  - [機能リクエスト](#機能リクエスト)
- [質問](#質問)

## 貢献の流れ

1. リポジトリをForkする
2. featureブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'feat: add amazing feature'`)
4. ブランチをPushする (`git push origin feature/amazing-feature`)
5. Pull Requestを作成する

## 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/practice-next-ec.git
cd practice-next-ec

# ランタイムのインストール
mise install

# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

## コーディング規約

### TypeScript

- strictモードを有効にする
- `any` 型の使用を避ける
- 明示的な型注釈よりも型推論を優先する

### スタイリング

- Tailwind CSSのユーティリティクラスを使用する
- カスタムCSSは最小限に抑える
- `cn()` 関数でクラスを結合する

### コンポーネント

- Server Componentsをデフォルトとして使用する
- Client Componentsは必要な場合のみ `"use client"` を付与する
- コンポーネントにはStorybookストーリーを作成する

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/ja/) に従います。

```text
<type>: <description>

[optional body]

[optional footer]
```

### Type

| Type     | 説明                       |
| -------- | ------------------------ |
| feat     | 新機能                      |
| fix      | バグ修正                     |
| docs     | ドキュメントのみの変更              |
| style    | コードの意味に影響しない変更（フォーマットなど） |
| refactor | バグ修正や機能追加を伴わないコード変更      |
| test     | テストの追加・修正                |
| chore    | ビルドプロセスやツールの変更           |

## Pull Request

### 作成前のチェックリスト

- [ ] `pnpm lint` がエラーなく通る
- [ ] `pnpm build` が成功する
- [ ] 新機能にはStorybookストーリーを追加した
- [ ] 変更に伴いドキュメントを更新した

### タイトル

コミットメッセージと同様にConventional Commits形式で記述します。

```text
feat: カート機能を追加
```

### 説明

- 変更の目的と概要
- 関連するIssue番号（あれば）
- テスト方法や確認手順

## Issue

### バグ報告

- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（OS、ブラウザ、Node.jsバージョンなど）

### 機能リクエスト

- 提案する機能の説明
- ユースケース
- 代替案（検討した場合）

## 質問

Issueで `question` ラベルを付けて質問できます。
