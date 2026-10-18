import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getModuleById, getProjectById } from '../data/modules'

/**
 * 项目内容页（/works/:moduleId/:projectId）
 * 样式 = MC"书与笔"的阅读界面：一张羊皮纸书页
 * 正文渲染 project.content（Markdown），数据全部来自 modules.ts
 */
function ProjectDetail() {
  const { moduleId = '', projectId = '' } = useParams()
  const navigate = useNavigate()
  const mod = getModuleById(moduleId)
  const project = getProjectById(moduleId, projectId)

  // 模块或项目不存在：提示并允许返回书架
  if (!mod || !project) {
    return (
      <main className="book-page-wrap">
        <article className="book-page">
          <p className="blank-page-hint">这一页不存在</p>
          <button type="button" className="mc-btn" onClick={() => navigate('/works')}>
            返回书架
          </button>
        </article>
      </main>
    )
  }

  return (
    <main className="book-page-wrap">
      <article className="book-page">
        <header className="book-page-header">
          <span className="book-page-module">{mod.name}</span>
          <h1 className="book-page-title">{project.name}</h1>
        </header>

        <div className="markdown-body">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>

        <footer className="book-page-footer">
          <button
            type="button"
            className="mc-btn"
            onClick={() => navigate(`/works/${mod.id}`)}
          >
            返回目录
          </button>
        </footer>
      </article>
    </main>
  )
}

export default ProjectDetail
