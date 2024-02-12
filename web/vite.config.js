import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#multi-page-app
export default defineConfig({
  plugins: [ vue() ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reports: resolve(__dirname, 'reports/index.html'),
        profile: resolve(__dirname, 'profile/index.html'),
      },
    },
  }
})