import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin({
      injectCodeFunction: function injectCodeCustomRunTimeFunction(cssCode, options) {
        try {
          if (typeof document != 'undefined') {
            // Defer injection until first interaction or DOMContentLoaded to strictly eliminate render blocking
            var inject = function () {
              var elementStyle = document.createElement('style');
              elementStyle.appendChild(document.createTextNode(cssCode));
              document.head.appendChild(elementStyle);
            };
            if (document.readyState === 'loading') {
              window.addEventListener('DOMContentLoaded', inject);
            } else {
              inject();
            }
          }
        } catch (e) {
          console.error('vite-plugin-css-injected-by-js', e);
        }
      }
    }),
    // visualizer({
    //   open: true, 
    //   filename: 'bundle-stats.html',
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ],

  server: {
    host: true,
    port: 5174
  },
  preview: {
    allowedHosts: 'all',
    port: 4173
  },
  build: {
    cssMinify: true,
    minify: 'terser',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    modulePreload: {
      polyfill: true
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace']
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('react-dom')) return 'react-dom'; 
            if (id.includes('react-router')) return 'router';
            if (id.includes('react-helmet')) return 'helmet'; 
          }
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['gsap']
  }
})