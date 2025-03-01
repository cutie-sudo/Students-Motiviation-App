// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // Updated import to avoid potential issues

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Ensure the correct path with './src'
    },
  },
});
