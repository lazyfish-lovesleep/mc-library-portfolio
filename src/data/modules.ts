// ============================================================
// 模块与项目数据 —— "内容展示"栏目的全部内容都在这里
// 想加模块 / 加项目 / 写作业正文？只改这一个文件，无需动任何组件
// ============================================================

/** 项目（某个模块下的一篇内容） */
export interface Project {
  id: string // 项目 id，会出现在网址里：/works/模块id/项目id
  name: string // 项目名称（显示在目录页和标题上）
  content: string // 正文，支持 Markdown 格式
}

/** 模块（内容展示页里的一大类） */
export interface Module {
  id: string // 模块 id，会出现在网址里：/works/模块id
  name: string // 模块名称（显示在模块列表上）
  icon: 'book' | 'locked' // 图标：book=书本（正常模块），locked=锁（待解锁模块）
  locked: boolean // true = 待解锁模块（灰色展示，不可进入）
  projects: Project[] // 该模块下的项目列表，空数组 [] 表示暂无内容
}

// ── 改这里：模块列表、模块名称、项目内容都会随之改变 ─────────
// 想加新模块？在数组末尾照格式加一个大括号块即可
export const modules: Module[] = [
  {
    id: 'homework',
    name: '作业展示',
    icon: 'book',
    locked: false,
    // ── 改这里：这个模块下显示的项目会随之改变 ──────────────
    projects: [
      {
        id: 'homework-1',
        name: '第一次作业：网页初体验',
        // 正文支持 Markdown，用反引号包裹，可换行书写
        content: `
## 作业内容

这是我完成的第一次作业，主要练习了 HTML 基础结构。

## 收获

- 学会了标签的基本用法
- 理解了网页的骨架结构
        `,
      },
      {
        id: 'homework-2',
        name: '第二次作业：样式入门',
        content: `
## 作业内容

本次作业练习使用 CSS 美化页面。

## 收获

- 掌握了选择器
- 学会了盒模型
        `,
      },
    ],
  },
  {
    id: 'coming-soon',
    name: '待解锁',
    icon: 'locked',
    locked: true, // 待解锁模块：列表中显示锁定状态，无法进入
    projects: [],
  },
]

// ============================================================
// 以下为工具函数，供组件读取数据时使用，一般不需要修改
// ============================================================

/** 按 id 查找模块，找不到返回 undefined */
export function getModuleById(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId)
}

/** 按 id 在指定模块内查找项目，模块或项目不存在时返回 undefined */
export function getProjectById(
  moduleId: string,
  projectId: string,
): Project | undefined {
  return getModuleById(moduleId)?.projects.find((p) => p.id === projectId)
}

/**
 * 判断模块是否为"空模块"：
 * 没有任何项目、且不是待解锁模块（待解锁模块有自己的展示样式，不算空）
 */
export function isModuleEmpty(module: Module): boolean {
  return module.projects.length === 0 && !module.locked
}
