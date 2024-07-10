import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    outDir: resolve(__dirname, 'public'),
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),

      name: 'Connector Asset Template',
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: (format) => `connector-asset.${format}.js`,
    },
  },
});
