import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Make the dev server accessible by other containers
    port: 3000, // Set the port Vite will run on
  }
});