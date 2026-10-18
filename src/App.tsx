import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import ModuleProjects from './pages/ModuleProjects'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:moduleId" element={<ModuleProjects />} />
          <Route path="/works/:moduleId/:projectId" element={<ProjectDetail />} />
          {/* 未匹配路径兜底：重定向回首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
