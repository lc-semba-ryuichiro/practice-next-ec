import { createBaseConfig } from "@practice-next-ec/eslint-config/base";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfig(import.meta.dirname)]);
