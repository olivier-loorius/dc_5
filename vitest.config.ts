import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig(async () => {
  const mdx = (await import("@mdx-js/rollup")).default;
  return {
    plugins: [
      // Support des imports MDX en tests
      mdx({ jsxImportSource: "react" }),
    ],
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
        include: ["src/**/*.{ts,tsx}", "src/content/**/*.{md,mdx}"],
        exclude: ["src/**/__tests__/**", "**/*.spec.*"],
        thresholds: {
          lines: 70,
          functions: 70,
          statements: 70,
          branches: 60,
        },
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
  };
});
