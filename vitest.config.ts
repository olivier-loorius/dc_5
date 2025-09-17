import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
    watchExclude: [
      "**/.next/**",
      "**/.coverage/**",
      "**/coverage/**",
      "**/build/**",
      "**/out/**",
      "**/node_modules/**",
    ],
    reporters: ["default", "verbose"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "node_modules/.cache/vitest-coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/__tests__/**", "**/*.spec.*"],
    },
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
