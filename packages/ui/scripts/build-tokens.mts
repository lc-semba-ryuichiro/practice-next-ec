/**
 * Style Dictionary トークンのビルドスクリプト。
 * カラー、タイポグラフィ、スペーシングトークンをビルドする。
 */

import StyleDictionary, { type Config, type TransformedToken } from "style-dictionary";

// シンプルな変数名を出力するカスタム名前変換（例: --semantic-background ではなく --background）
StyleDictionary.registerTransform({
  name: "name/simple",
  type: "name",
  transform: (token: TransformedToken): string => {
    // 不要なプレフィックスを削除し、'-' で結合
    const path = token.path.filter(
      (p) => p !== "semantic" && p !== "light" && p !== "dark" && p !== "text"
    );
    return path.join("-");
  },
});

// Typography 用の名前変換（typography プレフィックスを削除）
StyleDictionary.registerTransform({
  name: "name/typography",
  type: "name",
  transform: (token: TransformedToken): string => {
    const path = token.path.filter((p) => p !== "typography");
    return path.join("-");
  },
});

// カスタムトランスフォームグループを登録
StyleDictionary.registerTransformGroup({
  name: "css/simple",
  transforms: ["attribute/cti", "name/simple", "color/css"],
});

StyleDictionary.registerTransformGroup({
  name: "css/typography",
  transforms: ["attribute/cti", "name/typography"],
});

// Spacing 用の名前変換（spacing プレフィックスを削除）
StyleDictionary.registerTransform({
  name: "name/spacing",
  type: "name",
  transform: (token: TransformedToken): string => {
    const path = token.path.filter((p) => p !== "spacing");
    return `spacing-${path.join("-")}`;
  },
});

StyleDictionary.registerTransformGroup({
  name: "css/spacing",
  transforms: ["attribute/cti", "name/spacing"],
});

const lightConfig: Config = {
  source: [
    "tokens/primitive/colors.json",
    "tokens/neutral/colors.json",
    "tokens/semantic/colors.light.json",
  ],
  platforms: {
    css: {
      transformGroup: "css/simple",
      buildPath: "src/styles/",
      files: [
        {
          destination: "tokens.generated.css",
          format: "css/variables",
          filter: (token: TransformedToken): boolean => !token.path.includes("primitive"),
          options: {
            outputReferences: false,
            selector: ":root",
          },
        },
      ],
    },
  },
};

const darkConfig: Config = {
  source: [
    "tokens/primitive/colors.json",
    "tokens/neutral/colors.json",
    "tokens/semantic/colors.dark.json",
  ],
  platforms: {
    css: {
      transformGroup: "css/simple",
      buildPath: "src/styles/",
      files: [
        {
          destination: "tokens.dark.generated.css",
          format: "css/variables",
          filter: (token: TransformedToken): boolean => !token.path.includes("primitive"),
          options: {
            outputReferences: false,
            selector: ".dark",
          },
        },
      ],
    },
  },
};

const typographyConfig: Config = {
  source: ["tokens/primitive/typography.json"],
  platforms: {
    css: {
      transformGroup: "css/typography",
      buildPath: "src/styles/",
      files: [
        {
          destination: "typography.generated.css",
          format: "css/variables",
          options: {
            outputReferences: false,
            selector: ":root",
          },
        },
      ],
    },
  },
};

const spacingConfig: Config = {
  source: ["tokens/primitive/spacing.json"],
  platforms: {
    css: {
      transformGroup: "css/spacing",
      buildPath: "src/styles/",
      files: [
        {
          destination: "spacing.generated.css",
          format: "css/variables",
          options: {
            outputReferences: false,
            selector: ":root",
          },
        },
      ],
    },
  },
};

/**
 * すべてのトークンをビルドする。
 * @returns ビルド完了時に解決される Promise
 */
async function build(): Promise<void> {
  console.log("Building light theme tokens...");
  const sdLight = new StyleDictionary(lightConfig);
  await sdLight.buildAllPlatforms();

  console.log("Building dark theme tokens...");
  const sdDark = new StyleDictionary(darkConfig);
  await sdDark.buildAllPlatforms();

  console.log("Building typography tokens...");
  const sdTypography = new StyleDictionary(typographyConfig);
  await sdTypography.buildAllPlatforms();

  console.log("Building spacing tokens...");
  const sdSpacing = new StyleDictionary(spacingConfig);
  await sdSpacing.buildAllPlatforms();

  console.log("Token build complete!");
}

build().catch((error: unknown) => {
  console.error("Build failed:", error);
  throw new Error("Token build failed");
});
