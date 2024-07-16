import { resolve, dirname } from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    outDir: resolve(__dirname, 'public'),
  },
});
