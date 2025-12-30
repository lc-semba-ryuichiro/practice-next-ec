# ESLint 設定への貢献ガイドライン

このパッケージへの貢献に興味を持っていただきありがとうございます。

## 目次

- [貢献の流れ](#貢献の流れ)
- [新しいルールの追加](#新しいルールの追加)
  - [1. 設定ファイルを選択](#1-設定ファイルを選択)
  - [2. ルールを追加](#2-ルールを追加)
  - [3. コメントを記載](#3-コメントを記載)
- [新しいプラグインの追加](#新しいプラグインの追加)
  - [1. pnpm-workspace.yaml のカタログに追加](#1-pnpm-workspaceyaml-のカタログに追加)
  - [2. package.json に依存関係を追加](#2-packagejson-に依存関係を追加)
  - [3. 設定ファイルにプラグインを統合](#3-設定ファイルにプラグインを統合)
  - [4. README.md を更新](#4-readmemd-を更新)
- [既存ルールの変更](#既存ルールの変更)
  - [変更前の検討事項](#変更前の検討事項)
  - [変更手順](#変更手順)
  - [ルールの無効化について](#ルールの無効化について)
- [テスト方法](#テスト方法)
  - [1. 型チェック](#1-型チェック)
  - [2. Lint の実行](#2-lint-の実行)
  - [3. 自動修正の確認](#3-自動修正の確認)
  - [4. ビルドの確認](#4-ビルドの確認)
- [コミットメッセージ](#コミットメッセージ)
  - [スコープ](#スコープ)
  - [Type の選択](#type-の選択)
  - [例](#例)
- [Pull Request](#pull-request)
  - [作成前のチェックリスト](#作成前のチェックリスト)
  - [タイトル](#タイトル)
  - [説明](#説明)

## 貢献の流れ

1. リポジトリをForkする
2. featureブランチを作成する (`git checkout -b feature/add-eslint-rule`)
3. 変更をコミットする (`git commit -m 'chore(eslint): add new rule'`)
4. ブランチをPushする (`git push origin feature/add-eslint-rule`)
5. Pull Requestを作成する

## 新しいルールの追加

### 1. 設定ファイルを選択

| 設定ファイル          | 対象                                       |
| --------------- | ---------------------------------------- |
| `base.mts`      | 全パッケージ共通のルール（TypeScript、import、セキュリティなど） |
| `react.mts`     | React 固有のルール（Hooks、アクセシビリティなど）           |
| `next.mts`      | Next.js 固有のルール（App Router など）            |
| `storybook.mts` | Storybook ファイル固有のルール                     |
| `test.mts`      | テストファイル固有のルール（Vitest、Testing Library など） |

### 2. ルールを追加

既存のセクションに追加するか、新しいセクションを作成します。

```typescript
// 既存のセクション内に追加
{
  rules: {
    // 既存のルール
    "existing-rule": "error",
    // 新しいルールを追加
    "new-rule": ["error", { option: true }],
  },
},
```

### 3. コメントを記載

ルールの目的が明確でない場合は、日本語でコメントを追加してください。

```typescript
{
  rules: {
    // boolean コンテキストでの暗黙的な型変換を禁止
    "@typescript-eslint/strict-boolean-expressions": "error",
  },
},
```

## 新しいプラグインの追加

### 1. pnpm-workspace.yaml のカタログに追加

```yaml
catalog:
  # 既存のプラグイン
  eslint-plugin-example: ^1.0.0
```

### 2. package.json に依存関係を追加

```json
{
  "dependencies": {
    "eslint-plugin-example": "catalog:"
  }
}
```

### 3. 設定ファイルにプラグインを統合

```typescript
import example from "eslint-plugin-example";

export function createBaseConfig(tsconfigRootDir: string): Linter.Config[] {
  return [
    // ...既存の設定

    // =====================
    // Example Plugin
    // =====================
    {
      plugins: { example },
      rules: {
        "example/rule-name": "error",
      },
    },
  ];
}
```

### 4. README.md を更新

「含まれるプラグイン」セクションに新しいプラグインを追加してください。

## 既存ルールの変更

### 変更前の検討事項

1. **影響範囲の確認**: ルールの変更は全パッケージに影響する
2. **妥当性の検証**: なぜルールを変更する必要があるか明確にする
3. **代替案の検討**: ルールを無効化するより、設定オプションで調整できないか確認

### 変更手順

1. 該当するルールを見つける
2. ルールの設定を変更する
3. 全パッケージで `pnpm lint` を実行して影響を確認
4. 変更理由をコミットメッセージに記載

### ルールの無効化について

ルールを無効化する場合は、コメントで理由を記載してください。

```typescript
{
  rules: {
    "unicorn/no-null": "off", // React では null を使う
  },
},
```

## テスト方法

### 1. 型チェック

```bash
pnpm typecheck
```

### 2. Lint の実行

```bash
# 全パッケージで lint を実行
pnpm lint

# 特定のアプリ/パッケージで実行
cd apps/web && pnpm lint
cd apps/admin && pnpm lint
```

### 3. 自動修正の確認

```bash
pnpm fix
```

### 4. ビルドの確認

```bash
pnpm build
```

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/ja/) に従います。

### スコープ

ESLint設定の変更には `eslint` スコープを使用します。

```text
<type>(eslint): <description>
```

### Type の選択

| Type    | 使用場面                            |
| ------- | ------------------------------- |
| `chore` | ルールの追加・プラグインの追加・依存関係の更新         |
| `fix`   | 誤った設定の修正・不具合の修正                 |
| `feat`  | 新しいエクスポート設定の追加                  |
| `docs`  | README.md や CONTRIBUTING.md の更新 |

### 例

```text
chore(eslint): add sonarjs plugin for code quality
fix(eslint): correct strict-boolean-expressions options
feat(eslint): add vue config for future vue support
docs(eslint): update README with new plugins
```

## Pull Request

### 作成前のチェックリスト

- [ ] `pnpm lint` が全パッケージでエラーなく通る
- [ ] `pnpm typecheck` が成功する
- [ ] `pnpm build` が成功する
- [ ] 新しいプラグイン追加時はREADME.mdを更新した
- [ ] 破壊的変更がある場合は明記した

### タイトル

コミットメッセージと同様にConventional Commits形式で記述します。

```text
chore(eslint): add react-compiler plugin
```

### 説明

以下の内容を含めてください。

- 変更の目的と概要
- 影響を受けるパッケージ
- 新しいルールの場合、そのルールが検出するコード例
- 破壊的変更がある場合、既存コードへの影響と対応方法
