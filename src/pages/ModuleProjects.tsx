import { useParams, Link, useNavigate } from 'react-router-dom'
import { getModuleById } from '../data/modules'
import iconBook from '../assets/icon-book.jpg'

/**
 * 项目目录页（/works/:moduleId）
 * 样式 = 一本摊开的书：左页放书本插图，右页为该模块的目录
 * 数据全部来自 modules.ts，点击项目名进入内容页
 */
function ModuleProjects() {
  const { moduleId = '' } = useParams()
  const navigate = useNavigate()
  const mod = getModuleById(moduleId)

  // 模块不存在（例如手动输错网址）：提示并允许返回书架
  if (!mod) {
    return (
      <main className="book-page-wrap">
        <div className="open-book">
          <div className="open-page open-page-left" />
          <div className="open-page open-page-right blank-page">
            <p className="blank-page-hint">书架上没有这本书</p>
            <button type="button" className="mc-btn" onClick={() => navigate('/works')}>
              返回书架
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="book-page-wrap">
      <div className="open-book">
        {/* 左页：装饰性书本插图 */}
        <div className="open-page open-page-left toc-cover">
          <img className="toc-cover-icon" src={iconBook} alt="" />
          <span className="toc-cover-name">{mod.name}</span>
        </div>

        {/* 右页：目录 */}
        <div className="open-page open-page-right toc">
          <h2 className="toc-title">目录</h2>
          <ul className="toc-list">
            {mod.projects.map((project, index) => (
              <li key={project.id} className="toc-item">
                <Link
                  to={`/works/${mod.id}/${project.id}`}
                  className="toc-link"
                >
                  <span className="toc-name">{project.name}</span>
                  <span className="toc-dots" aria-hidden="true" />
                  <span className="toc-no">{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mc-btn toc-back"
            onClick={() => navigate('/works')}
          >
            返回书架
          </button>
        </div>
      </div>
    </main>
  )
}

export default ModuleProjects
