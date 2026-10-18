import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { modules, isModuleEmpty } from '../data/modules'
import type { Module } from '../data/modules'
import { siteConfig } from '../data/siteConfig'
import { BookOpening, BlankBookModal, LockedModal } from '../components/BookOverlays'
import iconBook from '../assets/icon-book.jpg'
import iconLocked from '../assets/icon-locked-shelf.jpg'

/**
 * 模块列表页（/works）
 * 以 MC 物品栏格子呈现所有模块（数据全部来自 modules.ts）：
 * - 普通模块：书本图标
 * - locked 模块：锁链书架图标 + "待解锁"角标
 * 点击分流：locked → 待解锁提示；有项目 → 开书动画后进目录页；空模块 → 开书动画后弹"空白书页"
 */
function Works() {
  const navigate = useNavigate()
  // 栏目标题取自 siteConfig.nav 中 /works 对应的栏目名，不写死
  const sectionName =
    siteConfig.nav.find((item) => item.path === '/works')?.name ?? ''

  const [opening, setOpening] = useState<Module | null>(null) // 正在播放开书动画的模块
  const [blank, setBlank] = useState<Module | null>(null) // 空白书页弹窗
  const [lockedTip, setLockedTip] = useState<Module | null>(null) // 待解锁提示

  const handleClick = (mod: Module) => {
    if (mod.locked) {
      setLockedTip(mod) // 锁定模块：不进入内容，直接给提示
      return
    }
    setOpening(mod) // 其余模块：先还原 MC"书与笔"的打开过程
  }

  // 开书动画播放完毕后的分流
  const handleOpened = () => {
    if (!opening) return
    if (isModuleEmpty(opening)) {
      setBlank(opening) // 无项目 → 弹出空白书页
    } else {
      navigate(`/works/${opening.id}`) // 有项目 → 进入项目目录页
    }
    setOpening(null)
  }

  return (
    <main className="works">
      <h1 className="works-title">{sectionName}</h1>

      <div className="works-grid">
        {modules.map((mod) => (
          <button
            key={mod.id}
            type="button"
            className={`slot${mod.locked ? ' slot-locked' : ''}`}
            onClick={() => handleClick(mod)}
          >
            <span className="slot-icon-wrap">
              <img
                className="slot-icon"
                src={mod.icon === 'locked' ? iconLocked : iconBook}
                alt=""
              />
              {mod.locked && <span className="slot-badge">待解锁</span>}
            </span>
            <span className="slot-name">{mod.name}</span>
          </button>
        ))}
      </div>

      {/* 开书过场动画 */}
      {opening && <BookOpening onDone={handleOpened} />}
      {/* 空白书页弹窗 */}
      {blank && <BlankBookModal name={blank.name} onClose={() => setBlank(null)} />}
      {/* 待解锁提示弹窗 */}
      {lockedTip && (
        <LockedModal name={lockedTip.name} onClose={() => setLockedTip(null)} />
      )}
    </main>
  )
}

export default Works
