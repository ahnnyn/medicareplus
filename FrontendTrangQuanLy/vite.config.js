import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';

// Set the DNS resolution order (if needed for DNS resolution)
dns.setDefaultResultOrder('verbatim');

// Vite config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // React app running on port 3001
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy requests to Node.js server
    },
  },
});
