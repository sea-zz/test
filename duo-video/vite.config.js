// vite.config.js
import {
  defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      // 如下写法转化请求地址
      // http://localhost:5173/api/
      // -> https://httpbin.org/
      '/api': {
        target: 'https://site-tools.netlify.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  }
});
