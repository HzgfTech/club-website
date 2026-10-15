import { ArrowUpRight, Copy, Code2, Music2, Paintbrush, Puzzle } from 'lucide-react'
import { PageHeading } from '../components/shared'
import { copyText, useStudio } from '../lib/store'

const departments = [
  {
    number: '01',
    name: '游戏开发部（策划 / 程序 / 美术 / 音效组）',
    summary: '组织游戏机制研究与开发工作坊，开展 3–5 人跨方向小组协作，推进原型制作、版本管理与试玩测试。',
  },
  {
    number: '02',
    name: '组织部（活动 / 外联组）',
    summary: '负责日常工作坊与试玩交流会安排，联系高校游戏开发社团与开源社区开展联合 Game Jam。',
  },
  {
    number: '03',
    name: '宣传部（媒体 / 技术组）',
    summary: '维护社团网站与社群平台，发布活动通知与社员作品介绍。',
  },
  {
    number: '04',
    name: '财务部',
    summary: '负责社团日常经费记录、凭证管理与公共设备清单维护。',
  },
]

const semesterProcess = [
  {
    number: '01',
    title: '方向分组与环境准备（第 1–2 周）',
    description: '完成社员登记与开发工具配置，按兴趣选择策划、程序、美术或音效方向。',
  },
  {
    number: '02',
    title: '四次基础工作坊（第 2–6 周）',
    description: '围绕玩法设计、Godot / Unity 入门、像素美术与 Git 协作开展跟随式练习，每次完成一个小功能。',
  },
  {
    number: '03',
    title: '小组原型创作（第 7–11 周）',
    description: '3–5 人自由组队，围绕清晰的核心玩法完成可运行的原创小型游戏原型。',
  },
  {
    number: '04',
    title: '作品试玩与复盘（第 12–14 周）',
    description: '举办作品试玩交流会，收集玩家反馈并整理开发复盘记录。',
  },
]

const faqs = [
  {
    q: '零基础可以参加吗？',
    a: '可以。前 6 周设有四次基础工作坊与 1 小时 Godot 入门跟练视频，新手可以从关卡测试、玩法策划、像素绘制或基础交互脚本开始。',
  },
  {
    q: '日常活动在什么时间进行？',
    a: '所有工作坊与试玩交流均安排在正常课余时段，考试周减少集中活动，不组织通宵开发。',
  },
  {
    q: '社团主要使用哪些工具？',
    a: '常用引擎包括 Godot 4 与 Unity，配合 Git 进行版本控制，使用 Pixelorama / LibreSprite / Aseprite 绘制像素美术，使用 jsfxr / BeepBox 制作音效与配乐。',
  },
  {
    q: '社员作品版权归谁？',
    a: '个人作品归创作者本人所有；团队项目由小组成员共同署名。',
  },
]

export function AboutPage() {
  const { catalog, setContact } = useStudio()
  const club = catalog!.club
  const qqGroup = club.qqGroup ?? '1130062117'
  const phone = club.phone ?? '19730031977'
  const email = club.email

  return <div className="inner-page">
    <PageHeading title="关于幻造工坊" description="浙江科技大学幻造工坊游戏开发社团简介、部门设置与联系方式。">
      <button type="button" className="studio-btn studio-btn--primary" onClick={() => setContact('contact')}>
        联系工坊<ArrowUpRight size={16} />
      </button>
    </PageHeading>

    <section className="about-layout">
      <div className="about-copy">
        <p>
          <strong>浙江科技大学幻造工坊游戏开发社团</strong>（简称“幻造工坊”）是由我校爱好游戏设计、编程实践、音效制作与动画美术的在校学生组成的学术科技类社团。
        </p>
        <p>
          我们提倡<strong>“先做出可玩的东西，再通过试玩继续打磨”</strong>。成员可以从策划、程序、美术或音效切入，在基础工作坊、跨专业小组开发与 Game Jam 比赛中共同完成原创游戏作品。
        </p>
      </div>

      <dl className="about-facts">
        <div className="about-fact">
          <dt>社团全称</dt>
          <dd>浙江科技大学幻造工坊游戏开发社团</dd>
        </div>
        <div className="about-fact">
          <dt>社团类别</dt>
          <dd>学术科技类学生社团</dd>
        </div>
        <div className="about-fact">
          <dt>社团宗旨</dt>
          <dd>以创为乐，向暖生活，心怀美好，手创未来</dd>
        </div>
        <div className="about-fact">
          <dt>创作方向</dt>
          <dd>游戏策划 · 程序开发 · 视觉美术 · 音乐音效</dd>
        </div>
        <div className="about-fact">
          <dt>招新 QQ 群</dt>
          <dd>
            <button type="button" className="inline-copy-btn" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
              {qqGroup} <Copy size={13} />
            </button>
          </dd>
        </div>
        <div className="about-fact">
          <dt>联系电话</dt>
          <dd><a href={`tel:${phone}`}>{phone}</a></dd>
        </div>
        <div className="about-fact">
          <dt>联系邮箱</dt>
          <dd><a href={`mailto:${email}`}>{email}</a></dd>
        </div>
      </dl>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>部门设置</h2>
      </div>
      <div className="service-list">
        {departments.map(dept => (
          <article key={dept.number} className="service-row">
            <span className="row-number">{dept.number}</span>
            <div>
              <h3>{dept.name}</h3>
              <p>{dept.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="studio-section">
      <div className="process-layout">
        <div>
          <h2>学期活动安排</h2>
          <p className="muted">从入门练习到完成可玩的原创原型。</p>
        </div>
        <ol className="process-list">
          {semesterProcess.map(step => (
            <li key={step.number} className="process-item">
              <span className="row-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="studio-section studio-section--last">
      <div className="studio-section__head">
        <h2>常见问题</h2>
      </div>
      <div className="faq-grid">
        {faqs.map(item => (
          <article key={item.q} className="faq-box">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
}

const directions = [
  {
    id: 'game-design',
    title: '游戏设计',
    brief: '玩法机制 · 关卡灰盒 · 叙事',
    text: '设计核心规则与关卡动线，搭建灰盒测试可玩性，让每次操作与选择都有清晰反馈。',
    icon: Puzzle,
  },
  {
    id: 'programming',
    title: '程序开发',
    brief: 'Godot 4 · Unity · 状态机 · 工具',
    text: '用代码实现角色控制、时间与窗口交互机制、2D 光影、存档系统及多人同步。',
    icon: Code2,
  },
  {
    id: 'visual-art',
    title: '视觉创作',
    brief: '像素精灵 · 帧动画 · 场景与 UI',
    text: '绘制角色立绘、像素序列帧动画与 TileMap 瓦片地图，构建独特的画面氛围。',
    icon: Paintbrush,
  },
  {
    id: 'audio',
    title: '声音创作',
    brief: '循环 BGM · 8-bit 音效 · 氛围',
    text: '合成跳跃、拾取与机关触发音效，创作契合世界观的循环配乐。',
    icon: Music2,
  },
]

export function JoinPage() {
  const { setContact, catalog } = useStudio()
  const club = catalog!.club
  const qqGroup = club.qqGroup ?? '1130062117'
  const phone = club.phone ?? '19730031977'
  const email = club.email

  return <div className="inner-page">
    <PageHeading title="加入幻造工坊" description="选择一个感兴趣的方向，和我们一起做出下一款游戏。">
      <button type="button" className="studio-btn studio-btn--primary" onClick={() => setContact('join')}>
        填写加入邮件<ArrowUpRight size={16} />
      </button>
    </PageHeading>

    <section id="directions" className="studio-section">
      <div className="studio-section__head">
        <h2>参与方向</h2>
      </div>
      <div className="direction-list">
        {directions.map(({ id, title, brief, text, icon: Icon }, i) => (
          <details id={id} key={title} open={i === 0 || location.hash === '#' + id}>
            <summary>
              <Icon size={20} strokeWidth={2} />
              <h3>{title}</h3>
              <span>{brief}</span>
              <span className="detail-toggle">+</span>
            </summary>
            <p>{text}</p>
          </details>
        ))}
      </div>
    </section>

    <section className="contact-band">
      <div>
        <h2>直接加入或联系</h2>
        <p>加入招新 QQ 群获取最新工作坊通知，或通过电话、邮件联系我们。</p>
      </div>
      <div className="contact-band__actions">
        <button type="button" className="studio-btn studio-btn--primary" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
          复制招新 QQ 群：{qqGroup}<Copy size={14} />
        </button>
        <a href={`tel:${phone}`} className="contact-band__link">电话：{phone}</a>
        <a href={`mailto:${email}`} className="contact-band__link">{email}</a>
      </div>
    </section>
  </div>
}
