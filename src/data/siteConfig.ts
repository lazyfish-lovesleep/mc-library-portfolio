// ============================================================
// 全站文本配置 —— 所有对外展示的文字都集中在这里
// 想改标语 / 栏目名 / 个人信息？只改这一个文件，无需动任何组件
// ============================================================

// 头像图片：想换头像？直接替换 src/assets/avatar.jpg 这个文件即可，不用改代码
import avatarImg from '../assets/avatar.jpg'

/** 导航栏单个入口 */
export interface NavItem {
  name: string // 栏目名（显示在顶部导航栏上的文字）
  path: string // 路由路径（点击后跳转的地址）
}

/** 个人信息（用于"个人信息"页面） */
export interface Profile {
  name: string // 姓名
  avatar: string // 头像图片路径
  email: string // QQ 邮箱
  github: string // GitHub 主页链接
}

export interface SiteConfig {
  slogan: string // 首页核心标语
  nav: NavItem[] // 顶部导航栏的栏目列表
  profile: Profile // 个人信息
}

export const siteConfig: SiteConfig = {
  // ── 改这里：首页大标语会随之改变 ──────────────────────────
  slogan: '记录学习，沉淀成长。',

  // ── 改这里：顶部导航栏的栏目名 / 跳转路径会随之改变 ───────
  // 想加新栏目？在数组里加一项 { name, path } 即可
  nav: [
    { name: '首页', path: '/' },
    { name: '个人信息', path: '/about' },
    { name: '内容展示', path: '/works' },
  ],

  // ── 改这里：个人信息页展示的内容会随之改变 ────────────────
  profile: {
    name: '张三', // 你的姓名
    avatar: avatarImg, // 头像来自 src/assets/avatar.jpg（替换该文件即可换头像）
    email: '123456789@qq.com', // 你的 QQ 邮箱
    github: 'https://github.com/yourname', // 你的 GitHub 主页
  },
}
