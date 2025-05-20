import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'; // Import if you use tsconfig paths like @/*

export default defineConfig({
  plugins: [tsconfigPaths()], // Add this plugin to resolve tsconfig paths
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'], // Add this line
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/db/**',
        'src/**/index.ts', // Often entry points or config files
        'src/index.ts',
        'src/config/**',
        'src/**/*.d.ts',
        'src/**/request-types.ts',
        'src/**/validations.ts',
        // Consider excluding route files if handlers are fully mocked,
        // or include them if you want to test the route setup itself.
        // For now, let's include them as we are testing if routes call handlers.
        // 'src/**/routes.ts',
      ],
    },
  },
});
