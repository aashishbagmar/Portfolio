import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap', '@gsap/react'],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Optimize build
    minify: 'terser',
    cssMinify: true,
    // Increase chunk size limit
    chunkSizeWarningLimit: 600,
  },
  // Enable compression
  optimizeDeps: {
    include: ['gsap', '@gsap/react', 'react', 'react-dom', 'react-router-dom'],
  },
}));
