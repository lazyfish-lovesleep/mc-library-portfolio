import { siteConfig } from '../data/siteConfig'

/**
 * 个人信息页（/about）
 * 姓名 / 头像 / 邮箱 / GitHub 全部读取自 siteConfig.profile，本组件不写死任何内容
 */
function About() {
  const { name, avatar, email, github } = siteConfig.profile

  return (
    <main className="about">
      <div className="about-card parchment-card">
        {/* 头像：MC 方块风格，方形框更贴合主题 */}
        <img className="about-avatar" src={avatar} alt={name} />

        <h1 className="about-name">{name}</h1>

        <ul className="about-contacts">
          <li>
            {/* 点击唤起系统邮件客户端 */}
            <a className="about-contact" href={`mailto:${email}`}>
              <span className="about-contact-icon" aria-hidden="true">
                ✉
              </span>
              {email}
            </a>
          </li>
          <li>
            {/* 新标签页打开 GitHub 主页 */}
            <a
              className="about-contact"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="about-contact-icon" aria-hidden="true">
                ⌥
              </span>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default About
