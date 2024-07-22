import { resolve, dirname } from 'path';
import { defineConfig } from 'vite';

const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'public'),
  },
  publicDir: resolve(__dirname, 'static'),
});
