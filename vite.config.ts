import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages: set VITE_BASE env var (e.g. /trivia-game/) during deploy build.
// In dev it defaults to '/'.
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [react()],
});
