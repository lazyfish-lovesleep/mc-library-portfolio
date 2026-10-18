import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

/**
 * 首页（/）
 * 文案来源：slogan 与栏目卡片名称全部读取自 siteConfig，本组件不写死任何文案
 */
function Home() {
  // 栏目卡片 = 导航配置中除"首页"自身外的所有栏目
  // 以后在 siteConfig.nav 里加栏目，这里的卡片会自动多一张
  const sections = siteConfig.nav.filter((item) => item.path !== '/')

  return (
    <main className="home">
      {/* 核心标语：改 siteConfig.slogan 即可更换 */}
      <h1 className="home-slogan">{siteConfig.slogan}</h1>

      {/* 栏目导航卡片：点击跳转对应路由 */}
      <div className="home-cards">
        {sections.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="home-card parchment-card"
          >
            <span className="home-card-name">{item.name}</span>
            <span className="home-card-arrow" aria-hidden="true">
              &gt;
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Home
