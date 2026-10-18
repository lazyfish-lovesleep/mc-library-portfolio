import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * ── GitHub Pages 仓库子路径 ──────────────────────────────────
 * 仓库地址形如 https://github.com/你的用户名/<仓库名>，
 * Pages 访问地址为 https://你的用户名.github.io/<仓库名>/，
 * 所以 base 必须设为 "/<仓库名>/"。
 * 把下面的 mc-library-portfolio 改成你实际的 GitHub 仓库名。
 */
const REPO_NAME = 'mc-library-portfolio'

/**
 * 构建结束后把 dist/index.html 复制为 dist/404.html
 * 解决 GitHub Pages 上 SPA 子路由直接访问/刷新时返回 404 的问题
 */
function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const indexHtml = path.resolve('dist', 'index.html')
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, path.resolve('dist', '404.html'))
        console.log('[spa-fallback-404] dist/404.html generated from index.html')
      }
    },
  }
}

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [react(), spaFallback404()],
})
