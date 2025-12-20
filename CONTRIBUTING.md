# 貢献ガイドライン

このプロジェクトへの貢献に興味を持っていただきありがとうございます。

## 貢献の流れ

1. リポジトリを Fork する
2. feature ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'feat: add amazing feature'`)
4. ブランチを Push する (`git push origin feature/amazing-feature`)
5. Pull Request を作成する

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

- strict モードを有効にする
- `any` 型の使用を避ける
- 明示的な型注釈よりも型推論を優先する

### スタイリング

- Tailwind CSS のユーティリティクラスを使用する
- カスタム CSS は最小限に抑える
- `cn()` 関数でクラスを結合する

### コンポーネント

- Server Components をデフォルトとして使用する
- Client Components は必要な場合のみ `"use client"` を付与する
- コンポーネントには Storybook ストーリーを作成する

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/ja/) に従います。

```text
<type>: <description>

[optional body]

[optional footer]
```

### Type

| Type     | 説明                                           |
| -------- | ---------------------------------------------- |
| feat     | 新機能                                         |
| fix      | バグ修正                                       |
| docs     | ドキュメントのみの変更                         |
| style    | コードの意味に影響しない変更（フォーマット等） |
| refactor | バグ修正や機能追加を伴わないコード変更         |
| test     | テストの追加・修正                             |
| chore    | ビルドプロセスやツールの変更                   |

## Pull Request

### 作成前のチェックリスト

- [ ] `pnpm lint` がエラーなく通る
- [ ] `pnpm build` が成功する
- [ ] 新機能には Storybook ストーリーを追加した
- [ ] 変更に伴いドキュメントを更新した

### タイトル

コミットメッセージと同様に Conventional Commits 形式で記述します。

```text
feat: カート機能を追加
```

### 説明

- 変更の目的と概要
- 関連する Issue 番号（あれば）
- テスト方法や確認手順

## Issue

### バグ報告

- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（OS、ブラウザ、Node.js バージョン等）

### 機能リクエスト

- 提案する機能の説明
- ユースケース
- 代替案（検討した場合）

## 質問

Issue で `question` ラベルを付けて質問できます。
