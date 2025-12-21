import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { createTestConfig } from "@practice-next-ec/eslint-config/test";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfig(import.meta.dirname), ...createTestConfig()]);
