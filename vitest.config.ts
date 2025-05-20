import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()], // Add this plugin to resolve tsconfig paths
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/db/**",
        "src/**/index.ts", // Often entry points or config files
        "src/index.ts",
        "src/config/**",
        "src/**/*.d.ts",
        "src/**/request-types.ts",
        "src/**/validations.ts",
      ],
    },
  },
});
