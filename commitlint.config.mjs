export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新機能
        "fix", // バグ修正
        "docs", // ドキュメント
        "style", // フォーマット（コードの意味に影響しない変更）
        "refactor", // リファクタリング
        "perf", // パフォーマンス改善
        "test", // テスト追加・修正
        "build", // ビルドシステム・外部依存
        "ci", // CI設定
        "chore", // その他の変更
        "revert", // コミットの取り消し
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", 100],
  },
};
