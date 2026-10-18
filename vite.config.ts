import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages 使用独立域名 <项目名>.pages.dev，从根路径提供服务，base 用 '/'。
// SPA 子路由刷新 404 问题由 public/_redirects（构建时复制到 dist）解决。
export default defineConfig({
  base: '/',
  plugins: [react()],
})
