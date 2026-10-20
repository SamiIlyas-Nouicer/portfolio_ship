import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
        format: 'iife',
        name: 'ArchipelagoApp',
        inlineDynamicImports: true,
      },
    },
  },
});
