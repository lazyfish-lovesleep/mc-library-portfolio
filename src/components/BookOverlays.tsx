import { useEffect } from 'react'
import iconLocked from '../assets/icon-locked-shelf.jpg'

/**
 * MC 书与笔风格浮层集合：
 * - BookOpening    点击模块后的"开书"过场动画
 * - BlankBookModal 空模块的"空白书页"弹窗
 * - LockedModal    待解锁模块的提示弹窗
 * 样式集中在 index.css 的"书与笔"一节
 */

/** 开书过场动画：mount 后自动播放，结束后触发 onDone */
export function BookOpening({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 900) // 与 CSS 动画时长一致
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="book-overlay" role="presentation">
      <div className="opening-book">
        <div className="opening-page opening-page-left" />
        <div className="opening-page opening-page-right" />
      </div>
    </div>
  )
}

/** 空白书页弹窗：一本摊开的书，两页空白 */
export function BlankBookModal({
  name,
  onClose,
}: {
  name: string
  onClose: () => void
}) {
  return (
    <div className="book-overlay" onClick={onClose} role="presentation">
      <div className="open-book" onClick={(e) => e.stopPropagation()}>
        <div className="open-page open-page-left" />
        <div className="open-page open-page-right blank-page">
          <p className="blank-page-hint">「{name}」还是一本空白的书</p>
          <p className="blank-page-sub">等待写下第一行字……</p>
        </div>
        <button type="button" className="mc-btn open-book-close" onClick={onClose}>
          合上书本
        </button>
      </div>
    </div>
  )
}

/** 待解锁提示弹窗 */
export function LockedModal({
  name,
  onClose,
}: {
  name: string
  onClose: () => void
}) {
  return (
    <div className="book-overlay" onClick={onClose} role="presentation">
      <div className="locked-modal" onClick={(e) => e.stopPropagation()}>
        <img className="locked-modal-icon" src={iconLocked} alt="" />
        <h2 className="locked-modal-title">待解锁</h2>
        <p className="locked-modal-text">「{name}」被锁链封住了，以后再来吧。</p>
        <button type="button" className="mc-btn" onClick={onClose}>
          知道了
        </button>
      </div>
    </div>
  )
}
