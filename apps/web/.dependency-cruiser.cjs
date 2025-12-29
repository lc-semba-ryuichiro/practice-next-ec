/**
 * dependency-cruiser 設定
 *
 * FSD (Feature-Sliced Design) の依存関係ルールを検証
 *
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    // ===========================================
    // FSD レイヤー間の依存関係ルール
    // ===========================================

    // features → features 禁止（features 間の直接参照を禁止）
    {
      name: "no-cross-feature-imports",
      comment: "features 間の直接参照は禁止です。shared または entities を経由してください。",
      severity: "error",
      from: { path: "^features/([^/]+)/" },
      to: {
        path: "^features/(?!\\1/)",
        pathNot: "^features/[^/]+/index\\.ts$",
      },
    },

    // entities → features 禁止
    {
      name: "no-entity-to-feature",
      comment:
        "entities は features を参照できません（下位レイヤーから上位レイヤーへの参照は禁止）。",
      severity: "error",
      from: { path: "^entities/" },
      to: { path: "^features/" },
    },

    // shared → features/entities/widgets/app 禁止
    {
      name: "no-shared-to-upper-layers",
      comment: "shared は上位レイヤーを参照できません。",
      severity: "error",
      from: { path: "^shared/" },
      to: { path: "^(features|entities|widgets|app)/" },
    },

    // entities → widgets/app 禁止
    {
      name: "no-entity-to-app-widgets",
      comment: "entities は widgets/app を参照できません。",
      severity: "error",
      from: { path: "^entities/" },
      to: { path: "^(widgets|app)/" },
    },

    // features → widgets/app 禁止
    {
      name: "no-feature-to-app-widgets",
      comment: "features は widgets/app を参照できません。",
      severity: "error",
      from: { path: "^features/" },
      to: { path: "^(widgets|app)/" },
    },

    // ===========================================
    // Public API ルール
    // ===========================================

    // features の内部ファイルへの直接参照禁止（index.ts 経由のみ許可）
    {
      name: "no-deep-imports-features",
      comment:
        "features の内部ファイルに直接アクセスしないでください。index.ts からエクスポートされたものを使用してください。",
      severity: "warn",
      from: { pathNot: "^features/" },
      to: { path: "^features/[^/]+/(ui|model|api|lib)/" },
    },

    // entities の内部ファイルへの直接参照禁止
    {
      name: "no-deep-imports-entities",
      comment:
        "entities の内部ファイルに直接アクセスしないでください。index.ts からエクスポートされたものを使用してください。",
      severity: "warn",
      from: { pathNot: "^entities/" },
      to: { path: "^entities/[^/]+/(ui|model|api|lib)/" },
    },

    // ===========================================
    // 循環依存禁止
    // ===========================================
    {
      name: "no-circular",
      comment: "循環依存は禁止です。",
      severity: "error",
      from: {},
      to: { circular: true },
    },

    // ===========================================
    // その他の依存関係ルール
    // ===========================================

    // app/api は shared/api のみ参照可能
    {
      name: "api-routes-only-use-shared",
      comment: "API Routes は shared/api のみ使用できます。",
      severity: "warn",
      from: { path: "^app/api/" },
      to: { path: "^(features|entities)/" },
    },
  ],

  allowed: [
    // 許可されるモジュールタイプ
    {
      from: {},
      to: {
        dependencyTypesNot: ["deprecated", "npm-no-pkg", "npm-optional", "npm-peer", "npm-unknown"],
      },
    },
  ],

  options: {
    doNotFollow: {
      path: ["node_modules", "\\.next", "dist"],
    },

    exclude: {
      path: [
        "\\.test\\.(ts|tsx)$",
        "\\.stories\\.(ts|tsx)$",
        "\\.spec\\.(ts|tsx)$",
        "__tests__",
        "__mocks__",
      ],
    },

    tsPreCompilationDeps: true,

    tsConfig: {
      fileName: "tsconfig.json",
    },

    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },

    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(@[^/]+/[^/]+|[^/]+)",
        theme: {
          graph: {
            rankdir: "TB",
            splines: "ortho",
          },
          modules: [
            {
              criteria: { source: "^app/" },
              attributes: { fillcolor: "#ffcccc" },
            },
            {
              criteria: { source: "^widgets/" },
              attributes: { fillcolor: "#ffe4cc" },
            },
            {
              criteria: { source: "^features/" },
              attributes: { fillcolor: "#ffffcc" },
            },
            {
              criteria: { source: "^entities/" },
              attributes: { fillcolor: "#ccffcc" },
            },
            {
              criteria: { source: "^shared/" },
              attributes: { fillcolor: "#ccccff" },
            },
          ],
        },
      },
      archi: {
        collapsePattern: "^(features|entities|shared|widgets|app)/[^/]+",
        theme: {
          graph: {
            rankdir: "TB",
            splines: "ortho",
          },
        },
      },
    },
  },
};
