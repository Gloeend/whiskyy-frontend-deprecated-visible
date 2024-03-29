import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      'axios/lib': path.resolve(__dirname, './node_modules/axios/lib')
    },
  },
  plugins: [react(), vitePluginSvgr({include: "**/*.svg?react"})],
})
