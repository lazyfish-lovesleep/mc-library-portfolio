// ============================================================
// 模块与项目数据 —— "内容展示"栏目的全部内容都在这里
// 想加模块 / 加项目 / 写作业正文？只改这一个文件，无需动任何组件
// ============================================================

/** 项目（某个模块下的一篇内容） */
export interface Project {
  id: string // 项目 id，会出现在网址里：/works/模块id/项目id
  name: string // 项目名称（显示在目录页和标题上）
  content: string // 正文，支持 Markdown 格式
  demo?: string // 可选：交互演示页地址（文件放在 public/ 下），有值时在书页下方嵌入
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
        id: 'ai-agent-log',
        name: 'AI Agent 使用记录',
        // 正文支持 Markdown，用反引号包裹，可换行书写
        content: `
## 使用的 Agent

**TraeCodeCN**

## 用途

制作个人网站。

## 过程

用其他 AI 生成提示词，让 Trae 执行。

## 效果

成功运行并访问。
        `,
      },
      {
        id: 'xor-network',
        name: 'XOR 神经网络代码演示',
        // 正文支持 Markdown；demo 指向 public/xor-visualizer.html（正文下方嵌入交互演示）
        content: `
## 作业目标

用 PyTorch 实现的 2-2-1 的 Sigmoid 网络，把 XOR 的四个样本全部分对：00→0、01→1、10→1、11→0。

XOR 是线性不可分的——一条直线无论怎么摆，都会分错一个点。所以必须加一层隐藏层，把输入映射到新的空间之后再分类。

## 网络结构

- 输入层 2 个神经元：x1、x2
- 隐藏层 2 个神经元：h1、h2（sigmoid 激活）
- 输出层 1 个神经元：输出 0～1 的概率，≥0.5 判为 1
- 损失函数：binary_cross_entropy_with_logits，直接接收原始分数，内部再做 sigmoid
- 优化器：Adam，学习率 0.03，训练 300 轮
- 用 torch.manual_seed(7) 固定随机种子，float64 保证数值稳定

## 代码实现

\`\`\`python
"""Train a 2-2-1 sigmoid network to classify the four XOR samples."""

import torch
import torch.nn.functional as F


torch.manual_seed(7)
torch.set_default_dtype(torch.float64)

# ① 张量：x 的四行依次是 00、01、10、11；两列分别是 x1、x2。
# target 每行一个 XOR 正确答案：00→0，01→1，10→1，11→0。
x = torch.tensor(
    [[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]],
    dtype=torch.float64,
)
target = torch.tensor([[0.0], [1.0], [1.0], [0.0]], dtype=torch.float64)

# ② 模型：Parameter 表示可学习的连接权重 W、v 和偏置 b。
# W 从两个输入连向两个隐藏单元；v 从隐藏层连向一个输出。
W = torch.nn.Parameter(torch.tensor([[2.0, -2.0], [-2.0, 2.0]]))
b_hidden = torch.nn.Parameter(torch.tensor([-1.0, -1.0]))
v = torch.nn.Parameter(torch.tensor([[3.0], [3.0]]))
b_output = torch.nn.Parameter(torch.tensor([-2.5]))

parameters = [W, b_hidden, v, b_output]
optimizer = torch.optim.Adam(parameters, lr=0.03)

for epoch in range(1, 301):
    optimizer.zero_grad(set_to_none=True)
    hidden = torch.sigmoid(x @ W + b_hidden)  # 每例两个隐藏值
    logits = hidden @ v + b_output  # 每例一个原始输出分数
    loss = F.binary_cross_entropy_with_logits(logits, target)  # ③ 损失
    loss.backward()  # ④ 梯度写入各参数的 .grad
    optimizer.step()  # ⑤ Adam 读取梯度并更新参数

with torch.no_grad():
    hidden = torch.sigmoid(x @ W + b_hidden)
    final_logits = hidden @ v + b_output
    final_loss = F.binary_cross_entropy_with_logits(final_logits, target)
    probabilities = torch.sigmoid(final_logits)  # 0～1 的概率
    predictions = (probabilities >= 0.5).to(torch.int64)
    correct = torch.all(predictions == target.to(torch.int64)).item()

print(f"epoch={epoch}, loss={final_loss.item():.4f}")
print("x1 x2 | target | hidden (h1, h2) | probability | predicted")
for sample, label, hidden_row, probability, prediction in zip(
    x, target, hidden, probabilities, predictions
):
    print(
        f"{int(sample[0].item())}  {int(sample[1].item())}  |"
        f"   {int(label[0].item())}    |"
        f"    ({hidden_row[0].item():.3f}, {hidden_row[1].item():.3f})    |"
        f"    {probability[0].item():.4f}    |"
        f"     {prediction[0].item()}"
    )

if not correct:
    raise SystemExit("XOR was not fully classified; try more epochs.")
print("All four XOR samples classified correctly.")
\`\`\`

## 训练流程

1. 前向：hidden = sigmoid(x @ W + b_hidden)，logits = hidden @ v + b_output
2. 反向：loss.backward() 把梯度写进各参数的 .grad
3. 更新：optimizer.step() 交给 Adam 按梯度修改参数
4. 收尾：在 torch.no_grad() 下重新前向，打印每个样本的隐藏层激活、概率与预测，并检查四个样本是否全部分对

## 交互演示

页面下方的可视化用同一套 2-2-1 结构，把网络结构、输入空间、隐藏空间、损失曲线和参数梯度同时画了出来：可以单步训练、连续训练，也能切换学习率（0.5 / 1.0 / 2.0）观察收敛差异。
        `,
        demo: '/xor-visualizer.html',
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
