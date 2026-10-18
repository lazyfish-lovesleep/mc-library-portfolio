import type { ReactNode } from 'react'
import bgImage from '../assets/library-bg.jpg'

interface LayoutProps {
  children: ReactNode
}

/**
 * 全局布局组件
 * 统一套用 MC 图书馆视觉规范：
 * - 固定像素风背景图（cover 铺满视口）
 * - 半透明暗色遮罩保证文字可读性
 * - 全局字体与配色通过 index.css 生效
 */
function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      {/* 背景层：MC 风格图书馆像素图 */}
      <div
        className="layout-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      {/* 遮罩层：半透明暗色，确保上层文字清晰 */}
      <div className="layout-overlay" aria-hidden="true" />
      {/* 内容层：页面实际内容 */}
      <div className="layout-content">{children}</div>
    </div>
  )
}

export default Layout
