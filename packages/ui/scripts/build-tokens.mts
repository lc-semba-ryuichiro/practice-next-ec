/**
 * Style Dictionary トークンのビルドスクリプト。
 * トークンの衝突を避けるため、ライトテーマとダークテーマを別々にビルドする。
 */

import StyleDictionary, { type Config, type TransformedToken } from "style-dictionary";

// シンプルな変数名を出力するカスタム名前変換（例: --semantic-background ではなく --background）
StyleDictionary.registerTransform({
  name: "name/simple",
  type: "name",
  transform: (token: TransformedToken): string => {
    // 'semantic' プレフィックスを削除し、'-' で結合
    const path = token.path.filter((p) => p !== "semantic" && p !== "light" && p !== "dark");
    return path.join("-");
  },
});

// カスタムトランスフォームグループを登録
StyleDictionary.registerTransformGroup({
  name: "css/simple",
  transforms: ["attribute/cti", "name/simple", "color/css"],
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
            outputReferences: false, // 参照を実際の値に解決
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
            outputReferences: false, // 参照を実際の値に解決
            selector: ".dark",
          },
        },
      ],
    },
  },
};

/**
 * ライトテーマとダークテーマの両方のトークンをビルドする。
 * @returns ビルド完了時に解決される Promise
 */
async function build(): Promise<void> {
  console.log("Building light theme tokens...");
  const sdLight = new StyleDictionary(lightConfig);
  await sdLight.buildAllPlatforms();

  console.log("Building dark theme tokens...");
  const sdDark = new StyleDictionary(darkConfig);
  await sdDark.buildAllPlatforms();

  console.log("Token build complete!");
}

build().catch((error: unknown) => {
  console.error("Build failed:", error);
  throw new Error("Token build failed");
});
