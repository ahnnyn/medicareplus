import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'myredux': path.resolve(__dirname, 'src/redux'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'services': path.resolve(__dirname, 'src/services'),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
