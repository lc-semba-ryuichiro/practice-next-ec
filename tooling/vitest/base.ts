import { defineConfig } from "vitest/config";

export function createBaseConfig(): ReturnType<typeof defineConfig> {
  return defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      include: ["**/*.{test,spec}.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: ["node_modules/", "**/*.d.ts", "**/*.config.*", "**/types/**", "**/__mocks__/**"],
      },
    },
  });
}
