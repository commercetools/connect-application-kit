import { resolve } from 'path';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'public'),
  },
  publicDir: resolve(__dirname, 'static'),
});
