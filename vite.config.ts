import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Netlify deployment: root base
export default defineConfig({
  base: '/',
  plugins: [react()]
});
