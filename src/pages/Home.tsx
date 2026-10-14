import { ArrowUpRight, BookOpen, Code2, Compass, Copy, Gamepad2, Layers, MessageSquare, Music2, Paintbrush, Phone, Puzzle, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'
import { LevelScene } from '../components/LevelScene'
import { copyText, useStudio } from '../lib/store'

const pillars = [
  {
    id: 'game-design',
    step: 'TRACK 01',
    title: '玩法与关卡策划',
    subtitle: '机制推演 · 关卡灰盒 · 非线性叙事',
    description: '从核心循环（Core Loop）出发设计有趣的规则，使用灰盒测试空间节奏与解谜动线，让玩家的每一次选择都获得明确反馈。',
    tags: ['核心机制', '关卡设计', '叙事分支', '试玩调优'],
    icon: Puzzle,
  },
  {
    id: 'programming',
    step: 'TRACK 02',
    title: '引擎与系统程序',
    subtitle: 'Godot 4 · Unity · 状态机 · 工具链',
    description: '将设计文档转化为稳定运行的交互系统。涵盖有限状态机（FSM）、物理与碰撞解耦、2D/3D Shader、模块化存档及 Git 协作。',
    tags: ['Godot 4 / GDScript', 'Unity / C#', '状态机架构', '开源插件'],
    icon: Code2,
  },
  {
    id: 'visual-art',
    step: 'TRACK 03',
    title: '像素与视觉美术',
    subtitle: '角色立绘 · 序列帧动画 · 2D 动态光影',
    description: '从像素精灵（Sprite）、TileMap 瓦片地形到 2D 法线光照与动态 UI，构建具有辨识度的游戏视觉风格与镜头演出质感。',
    tags: ['像素动画', '瓦片地图', '2D 光影氛围', 'UI 交互动效'],
    icon: Paintbrush,
  },
  {
    id: 'audio',
    step: 'TRACK 04',
    title: '配乐与交互音效',
    subtitle: '循环 BGM · 8-bit 音效 · 听觉反馈',
    description: '为跳跃、受击、解谜触发定制清脆的动作音效，创作契合世界观的 Chiptune 或幻想系循环配乐，赋予虚拟世界呼吸感。',
    tags: ['8-bit 音效合成', 'Loop BGM 编曲', '环境音设计', '音频管理器'],
    icon: Music2,
  },
]

const roadmap = [
  {
    phase: '阶段 01 · 第 1–2 周',
    title: '建制启航与方向分组',
    summary: '召开社团成员大会，完成零门槛成员登记、开发环境配置、Git 基础教学与安全准则说明，按兴趣自由加入策划、程序、美术或音效方向。',
    deliverable: '产出：环境配置就绪 · 个人方向档案',
  },
  {
    phase: '阶段 02 · 第 2–6 周',
    title: '四次核心基础工作坊',
    summary: '围绕「玩法设计」「Godot / Unity 引擎入门」「美术音频协作」「版本管理与工程解耦」开展跟随式实操，每次完成一个可运行的小型任务。',
    deliverable: '产出：1 个交互机制 / 1 张灰盒关卡',
  },
  {
    phase: '阶段 03 · 第 7–11 周',
    title: '3–5 人跨专业原型共创',
    summary: '组建精干的跨专业开发小组，控制项目范围在清晰的核心玩法与少量高密度场景，同时鼓励组队参加 GodotHub、GMTK、034 等 Game Jam 赛事。',
    deliverable: '产出：可运行的原创小型游戏原型',
  },
  {
    phase: '阶段 04 · 第 12–14 周',
    title: '试玩展映与开源复盘',
    summary: '举办社员作品公开试玩会，收集真实玩家操作反馈；核查团队署名与开源素材许可，将优秀原型与复盘笔记归档至社团作品展与资源库。',
    deliverable: '产出：公开试玩版 · 赛后复盘文档',
  },
]

export function HomePage({ language = 'zh' }: { language?: 'zh' | 'en' }) {
  const { catalog, setContact } = useStudio()
  const data = catalog!
  if (language === 'en') return <EnglishHomePage data={data} />

  const featuredWorks = data.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data.club.qqGroup ?? '1130062117'
  const phone = data.club.phone ?? '19730031977'
  const email = data.club.email

  return <div className="home-page">
    <section className="hero-showcase">
      <div className="hero-main">
        <div className="hero-badges">
          <span className="intro-label">浙江科技大学 · 学术科技类学生社团</span>
          <span className="hero-sub-pill"><Sparkles size={13} />以创为乐，向暖生活，心怀美好，手创未来</span>
        </div>
        <h1>把脑海里的世界，锻造成真正能玩的游戏。</h1>
        <p className="hero-lead">
          <strong>幻造工坊（Huanzao Workshop）</strong>是由浙江科技大学热爱游戏设计、编程实践、动画美术与音效创作的同学自愿组成的学术科技类社团。我们以<strong>「先做出可玩的原型，再在试玩中打磨」</strong>为核心理念，提供零基础工作坊、跨专业组队开发与 Game Jam 实战支持。
        </p>
        <div className="hero-cta-row">
          <a href="/join.html" className="solid-link">加入幻造工坊<ArrowUpRight size={17} /></a>
          <a href="/works.html" className="outline-cta-link"><Gamepad2 size={17} />浏览社团作品（{data.works.length}）</a>
          <button type="button" className="qq-quick-btn" onClick={() => copyText(qqGroup, '招新 QQ 群号已复制')}>
            <MessageSquare size={15} />
            <span>招新 QQ 群：{qqGroup}</span>
            <Copy size={13} />
          </button>
        </div>
      </div>

      <aside className="hero-identity-card">
        <div className="identity-card-header">
          <span className="identity-status-dot" />
          <span>社团档案 · 2026 学年持续招新中</span>
        </div>
        <h3>为什么来幻造工坊做游戏？</h3>
        <ul className="identity-feature-list">
          <li>
            <ShieldCheck size={18} />
            <div>
              <strong>零门槛 · 零会费 · 自由组队</strong>
              <span>不要求已有开发经验或购买付费硬件，从 1 小时入门工作坊开始上手。</span>
            </div>
          </li>
          <li>
            <Trophy size={18} />
            <div>
              <strong>真实赛事与可玩作品沉淀</strong>
              <span>社员已产出 GodotHub 二等奖、GMTK 与 034 GameJam 参赛作及 30+ 期开发日志。</span>
            </div>
          </li>
          <li>
            <Layers size={18} />
            <div>
              <strong>著作权 100% 归属创作者</strong>
              <span>尊重每一份原创代码、画作与曲目，正常课余开展活动，拒绝熬夜通宵。</span>
            </div>
          </li>
        </ul>
        <div className="identity-card-footer">
          <a href="/about.html" className="plain-link">查看社团章程与组织架构<ArrowUpRight size={15} /></a>
          <a href={`tel:${phone}`} className="identity-phone"><Phone size={13} />{phone}</a>
        </div>
      </aside>
    </section>

    <section className="metrics-strip" aria-label="社团核心概览">
      <div className="metric-card">
        <span className="metric-value">4 大创作组</span>
        <span className="metric-label">策划 · 程序 · 美术 · 音效协同</span>
      </div>
      <div className="metric-card">
        <span className="metric-value">{data.works.length} 款代表成果</span>
        <span className="metric-label">涵盖 Godot 4 / Unity 游戏与开源插件</span>
      </div>
      <div className="metric-card">
        <span className="metric-value">4 阶段培养</span>
        <span className="metric-label">工作坊实操 → 小组原型 → 试玩展映</span>
      </div>
      <div className="metric-card">
        <span className="metric-value">0 元入会费</span>
        <span className="metric-label">面向浙科大全体本硕学生开放</span>
      </div>
    </section>

    <LevelScene />

    <section className="editorial-section club-pillars-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">四大创作方向 · 跨专业组队</span>
          <h2>一款独立游戏的诞生，需要不同灵感的碰撞。</h2>
        </div>
        <a className="plain-link" href="/join.html#directions">查看各方向新人指南<ArrowUpRight size={17} /></a>
      </div>
      <div className="pillars-grid">
        {pillars.map(({ id, step, title, subtitle, description, tags, icon: Icon }) => (
          <a href={`/join.html#${id}`} key={id} className="pillar-card">
            <div className="pillar-card-top">
              <span className="pillar-step">{step}</span>
              <span className="pillar-icon"><Icon size={20} strokeWidth={1.7} /></span>
            </div>
            <h3>{title}</h3>
            <p className="pillar-subtitle">{subtitle}</p>
            <p className="pillar-desc">{description}</p>
            <div className="specialty-tags">
              {tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="editorial-section works-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">社团作品精选 · 实机与试玩</span>
          <h2>从限时 Game Jam 到长期沙盒企划，先做出来再打磨。</h2>
        </div>
        <a className="plain-link" href="/works.html">全部 {data.works.length} 款作品<ArrowUpRight size={17} /></a>
      </div>
      <div className="home-works-grid">
        {featuredWorks.map(work => (
          <a href={`/work.html?id=${work.id}`} className="showcase-card" key={work.id}>
            <div className="showcase-card-media">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <div className="work-placeholder"><Gamepad2 size={44} strokeWidth={1.2} /></div>}
              <div className="showcase-badges">
                {work.engine && <span className="badge-engine">{work.engine}</span>}
                {work.status && <span className="badge-status">{work.status}</span>}
              </div>
            </div>
            <div className="showcase-card-body">
              <div className="showcase-card-meta">
                <span className="showcase-category">{work.category}</span>
                <span className="showcase-author">创作者 · {work.author}</span>
              </div>
              <div className="showcase-card-title">
                <h3>{work.title}</h3>
                <ArrowUpRight size={18} />
              </div>
              <p>{work.summary}</p>
              {work.tags && (
                <div className="showcase-tags">
                  {work.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="editorial-section roadmap-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">一学期实践节奏 · 拒绝空谈</span>
          <h2>从零基础工作坊到可玩原型，每一步都有清晰反馈。</h2>
        </div>
        <a className="plain-link" href="/about.html#roadmap">查看完整章程与培养计划<ArrowUpRight size={17} /></a>
      </div>
      <div className="roadmap-grid">
        {roadmap.map(item => (
          <article key={item.phase} className="roadmap-card">
            <span className="roadmap-phase">{item.phase}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="roadmap-deliverable">{item.deliverable}</div>
          </article>
        ))}
      </div>
    </section>

    <section className="editorial-section portals-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">探索幻造工坊生态</span>
          <h2>认识创作者、获取实战教程、了解社团规范。</h2>
        </div>
      </div>
      <div className="portals-grid">
        <a href="/members.html" className="portal-card">
          <div className="portal-icon"><Users size={24} /></div>
          <div className="portal-content">
            <span className="portal-tag">独立社员档案页 · {data.members.length} 位代表创作者</span>
            <h3>优秀社员展示</h3>
            <p>认识 Amiya_desi、就是Helen 等核心社员，浏览他们的独立游戏工作室、B站 30+ 期开发日志与参赛故事。</p>
            <span className="portal-action">前往优秀社员页面<ArrowUpRight size={16} /></span>
          </div>
        </a>

        <a href="/resources.html" className="portal-card">
          <div className="portal-icon"><BookOpen size={24} /></div>
          <div className="portal-content">
            <span className="portal-tag">由 Amiya_desi 整理提供 · 教程与导航</span>
            <h3>游戏开发资源库</h3>
            <p>收录 Godot 入门与《勇者传说》进阶视频教程、Steam 开发者避坑指南、常用插件清单及 200+ 素材音频导航站。</p>
            <span className="portal-action">打开教程与资源库<ArrowUpRight size={16} /></span>
          </div>
        </a>

        <a href="/about.html" className="portal-card">
          <div className="portal-icon"><Compass size={24} /></div>
          <div className="portal-content">
            <span className="portal-tag">组织机构 · 安全细则 · 常见问答</span>
            <h3>关于工坊与社团章程</h3>
            <p>了解浙江科技大学幻造工坊的学术科技类定位、四大部门职责、作品版权归属原则与安全运营规范。</p>
            <span className="portal-action">了解关于工坊<ArrowUpRight size={16} /></span>
          </div>
        </a>
      </div>
    </section>

    <section className="join-band">
      <div className="join-band-main">
        <span className="join-band-pill">加入浙江科技大学幻造工坊</span>
        <h2>下一次按下「开始游戏」，上面会有你的名字。</h2>
        <p>无论你想写第一行 GDScript / C#、画第一张像素精灵、写一段关卡设定，还是寻找志同道合的 Game Jam 队友，这里都为你留好了位置。</p>
        <div className="join-band-actions">
          <a href="/join.html" className="light-link">了解加入方式<ArrowUpRight size={18} /></a>
          <button type="button" className="join-band-outline" onClick={() => setContact('join')}>在线填写加入意向<ArrowUpRight size={17} /></button>
        </div>
      </div>
      <div className="join-band-contacts">
        <div className="join-contact-item">
          <span>社团招新 / 交流 QQ 群</span>
          <strong>{qqGroup}</strong>
          <button type="button" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>复制群号<Copy size={13} /></button>
        </div>
        <div className="join-contact-item">
          <span>社团联系电话</span>
          <strong>{phone}</strong>
          <button type="button" onClick={() => copyText(phone, '联系电话已复制')}>复制电话<Copy size={13} /></button>
        </div>
        <div className="join-contact-item">
          <span>社团官方邮箱</span>
          <strong>{email}</strong>
          <button type="button" onClick={() => copyText(email, '社团邮箱已复制')}>复制邮箱<Copy size={13} /></button>
        </div>
      </div>
      <span className="join-band-cross" aria-hidden="true">+</span>
    </section>
  </div>
}

function EnglishHomePage({ data }: { data: ReturnType<typeof useStudio>['catalog'] }) {
  const works = data!.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data!.club.qqGroup ?? '1130062117'
  const phone = data!.club.phone ?? '19730031977'
  const email = data!.club.email

  return <div className="home-page">
    <section className="hero-showcase">
      <div className="hero-main">
        <div className="hero-badges">
          <span className="intro-label">ZUST · Academic & Tech Game Development Club</span>
          <span className="hero-sub-pill"><Sparkles size={13} />Joy in creation, warmth in life</span>
        </div>
        <h1>Turn the worlds in your head into playable games.</h1>
        <p className="hero-lead">
          <strong>Huanzao Workshop</strong> is the student game development club at Zhejiang University of Science & Technology. We bring together game designers, programmers, pixel artists, and composers through hands-on workshops, cross-disciplinary prototype teams, and Game Jams.
        </p>
        <div className="hero-cta-row">
          <a href="/join.html" className="solid-link">Join the Workshop<ArrowUpRight size={17} /></a>
          <a href="/works.html" className="outline-cta-link"><Gamepad2 size={17} />Explore Games ({data!.works.length})</a>
        </div>
      </div>
      <aside className="hero-identity-card">
        <div className="identity-card-header">
          <span className="identity-status-dot" />
          <span>Club Overview · Open to All ZUST Students</span>
        </div>
        <h3>How We Build Together</h3>
        <ul className="identity-feature-list">
          <li>
            <ShieldCheck size={18} />
            <div>
              <strong>Beginner Friendly & Zero Membership Fee</strong>
              <span>No prior experience required. Start from 1-hour guided Godot & Unity workshops.</span>
            </div>
          </li>
          <li>
            <Trophy size={18} />
            <div>
              <strong>Award-Winning Game Jam Culture</strong>
              <span>Home to GodotHub 2nd Prize winners, GMTK & 034 Jam entries, and 30+ devlog episodes.</span>
            </div>
          </li>
          <li>
            <Layers size={18} />
            <div>
              <strong>Creators Keep 100% IP Ownership</strong>
              <span>Every member retains full copyright of their code, art, music, and prototypes.</span>
            </div>
          </li>
        </ul>
      </aside>
    </section>

    <LevelScene language="en" />

    <section className="editorial-section works-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">Featured Club Projects</span>
          <h2>Playable prototypes, Game Jam winners, and open-source tools.</h2>
        </div>
        <a className="plain-link" href="/works.html">All {data!.works.length} projects<ArrowUpRight size={17} /></a>
      </div>
      <div className="home-works-grid">
        {works.map(work => (
          <a href={`/work.html?id=${work.id}`} className="showcase-card" key={work.id}>
            <div className="showcase-card-media">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <div className="work-placeholder"><Gamepad2 size={44} strokeWidth={1.2} /></div>}
              <div className="showcase-badges">
                {work.engine && <span className="badge-engine">{work.engine}</span>}
                {work.status && <span className="badge-status">{work.status}</span>}
              </div>
            </div>
            <div className="showcase-card-body">
              <div className="showcase-card-meta">
                <span className="showcase-category">{work.category}</span>
                <span className="showcase-author">By {work.author}</span>
              </div>
              <div className="showcase-card-title">
                <h3>{work.title}</h3>
                <ArrowUpRight size={18} />
              </div>
              <p>{work.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="join-band">
      <div className="join-band-main">
        <span className="join-band-pill">Join Huanzao Workshop</span>
        <h2>Your next game starts here.</h2>
        <p>Connect with us via QQ Group, phone, or email to join our next workshop or submit your game.</p>
        <div className="join-band-actions">
          <a href="/join.html" className="light-link">Get Started<ArrowUpRight size={18} /></a>
        </div>
      </div>
      <div className="join-band-contacts">
        <div className="join-contact-item">
          <span>QQ Group</span>
          <strong>{qqGroup}</strong>
        </div>
        <div className="join-contact-item">
          <span>Phone</span>
          <strong>{phone}</strong>
        </div>
        <div className="join-contact-item">
          <span>Email</span>
          <strong>{email}</strong>
        </div>
      </div>
      <span className="join-band-cross" aria-hidden="true">+</span>
    </section>
  </div>
}
