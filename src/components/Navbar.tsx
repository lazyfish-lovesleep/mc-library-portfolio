import { NavLink } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

/**
 * 顶部导航栏
 * 栏目名与路径全部读取自 siteConfig.nav，不写死；
 * 样式见 index.css 的 .navbar 一节（MC 木质风格，含响应式）
 */
function Navbar() {
  return (
    <nav className="navbar">
      {siteConfig.nav.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
