import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import path from 'path';

// Set the DNS resolution order (nếu bạn cần)
dns.setDefaultResultOrder('verbatim');

// Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'config': path.resolve(__dirname, 'src/components'),
      'controllers': path.resolve(__dirname, 'src/pages'),
      'models': path.resolve(__dirname, 'src/redux'),
      'routes': path.resolve(__dirname, 'src/utils'),
      'services': path.resolve(__dirname, 'src/services'),
    }
  },
  server: {
    port: 3001,  // React app chạy port 3001
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API tới Node backend
    },
  },
});
