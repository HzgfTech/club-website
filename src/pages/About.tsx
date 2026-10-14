import { ArrowUpRight, BookOpen, CheckCircle2, Code2, Copy, FileCheck2, HelpCircle, Layers, Mail, MessageSquare, Music2, Paintbrush, Phone, Puzzle, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { PageHeading } from '../components/shared'
import { copyText, useStudio } from '../lib/store'

const departments = [
  {
    name: '游戏开发部',
    groups: '下设：策划组 · 程序组 · 美术组 · 音效组',
    summary: '组织游戏机制研究与开发工作坊，开展跨方向 3–5 人项目组协作，推进原创游戏原型制作、版本管理、内部试玩与展映交流。',
    icon: Code2,
  },
  {
    name: '组织部',
    groups: '下设：活动组 · 外联组',
    summary: '负责日常工作坊与试玩展映策划、成员注册登记、会议记录与档案管理；联系各高校游戏开发社团、互助组织与开源社区开展联合 Game Jam。',
    icon: Users,
  },
  {
    name: '宣传部',
    groups: '下设：媒体组 · 技术组',
    summary: '负责招新与活动宣传，维护社团官方网站与社群平台，发布社团动态与社员作品展映，落实公开作品的素材授权与内容合规核验。',
    icon: Layers,
  },
  {
    name: '财务部',
    groups: '由主管财务的副社长统筹监督',
    summary: '严格执行“零入会费、财务公开、管理透明”原则，登记经费收支、保存真实凭证、管理公共设备借还清单，并定期向成员大会公开报告。',
    icon: FileCheck2,
  },
]

const semesterPlan = [
  {
    period: '获批后 30 日内',
    stage: '成员大会与建制启航',
    action: '召开全体成员大会，审议通过《社团章程》，选举产生执行机构与负责人，完成正式成员登记与首次活动安全规范说明。',
    archive: '留存档案：章程文本、大会决议、成员登记表',
  },
  {
    period: '第 2 至 6 周',
    stage: '四次核心基础工作坊',
    action: '围绕玩法机制设计、Godot / Unity 引擎入门、像素美术与音频协作、Git 版本管理开展分方向练习，每次活动完成一个可操作的小型任务。',
    archive: '留存档案：工作坊讲义、实操工程文件、签到与总结',
  },
  {
    period: '第 7 至 11 周',
    stage: '3–5 人跨专业小组原型创作',
    action: '按成员兴趣与能力自由组队，采用灰盒先行原则将项目范围聚焦于清晰的核心玩法与精炼场景，合作完成可运行的原创小型游戏原型。',
    archive: '留存档案：团队分工与署名约定、Git 版本记录、素材许可清单',
  },
  {
    period: '第 12 至 14 周',
    stage: '成果展映与试玩复盘会',
    action: '举办校内作品试玩交流会，收集真实玩家体验反馈；严格核查作品署名、内容合规及外部素材开源协议，整理复盘文档并上架社团作品展。',
    archive: '留存档案：试玩反馈记录、复盘报告、公开作品包',
  },
]

const charterPrinciples = [
  {
    title: '零门槛加入 · 不收任何会费',
    text: '凡具有浙江科技大学正式学籍的全日制本科生、研究生均可自愿申请加入。入社不以已有开发经验或购买软硬件为条件，社团不收取任何入会费，不强制个人购买付费工具。',
  },
  {
    title: '作品著作权 100% 归属创作者',
    text: '依据《社团章程》第二章，成员个人作品的著作权及其他合法权益归权利人所有，不因入社而自动转移。团队项目在启动前明确记录分工、署名及对外展示授权范围。',
  },
  {
    title: '开源与素材许可合规审查',
    text: '依据《安全管理细则》第四章，项目使用的精灵图、3D 模型、字体、配乐、音效、代码与插件须为原创或具备明确适用许可（如 CC0 / CC-BY / MIT），保留来源与作者署名。',
  },
  {
    title: '健康作息 · 拒绝通宵与熬夜开发',
    text: '社团所有学习、工作坊与创作活动均安排在正常课余时段，服从课程、考试与宿舍作息安排，绝不组织通宵创作或留宿教室，学业任务需要时可随时请假。',
  },
  {
    title: '扁平化项目制 · 民主透明治理',
    text: '社团成员大会为最高议事机构；干部人数严格控制在成员总数的 30% 以内，策划、程序、美术与音效采用扁平化项目分工，不额外堆叠官僚岗位。',
  },
  {
    title: '现场用电与数字安全防线',
    text: '严格落实活动审批、场地容量核查、用电安全与 VR/闪烁内容提前提示；公开试玩包发布前须经项目负责人核验来源与运行测试，保障成员数字与人身安全。',
  },
]

const faqs = [
  {
    q: '完全零基础的同学可以加入幻造工坊吗？',
    a: '完全可以！社团不要求任何编程或绘画前置经验。新成员可以先参加前 6 周的四次基础工作坊（配有由 Amiya_desi 整理的 1 小时 Godot 跟随式入门视频与实操讲义），从关卡测试、玩法策划、简单像素绘制或基础交互脚本开始，逐步加入 3–5 人小组项目。',
  },
  {
    q: '参加社团活动会影响正常上课、实验和期末考试吗？',
    a: '不会。社团严格遵守学校作息规定，所有工作坊与试玩交流均安排在正常课余时段，考试周减少集中活动，严禁组织通宵开发。采用短周期、小范围的原型目标设计，让同学在不影响学业的前提下获得完整创作正反馈。',
  },
  {
    q: '在社团里做出来的游戏，版权和署名归谁？',
    a: '《幻造工坊社团章程》明确规定：成员个人作品的著作权归创作者本人所有；团队协作项目在立项时共同约定分工与署名顺序。社团官网或展映活动展示社员作品前，均须先取得创作者本人的明确授权。',
  },
  {
    q: '社团主要使用什么游戏引擎和开发工具？',
    a: '我们鼓励优先选择免费、开源或许可友好的主流工具：目前社员广泛使用 Godot 4（GDScript / C#）与 Unity 进行 2D/3D 游戏开发，配合 Git / GitHub 进行版本管理，使用 LibreSprite / Pixelorama / Aseprite 绘制像素美术，使用 jsfxr / BeepBox 制作音效与配乐。',
  },
  {
    q: '如何判断每次社团活动的学习价值？',
    a: '我们拒绝空泛的理论宣讲。每次工作坊和项目活动都写明具体的练习内容与可验证成果——例如亲手实现一个角色二段跳与冲刺状态机、搭建一张带碰撞的瓦片地图，或配置一段与操作对应的动作音效，并在试玩会中通过玩家反馈检验设计。',
  },
  {
    q: '非游戏相关专业的同学在项目组里能做什么？',
    a: '游戏是综合性的第九艺术！除了写代码，一个游戏同样急需有趣的规则与谜题设计（策划）、动人的世界观与对话文本（叙事）、独特的视觉与界面表达（美术）、富有感染力的旋律与音效（音频），以及细致的关卡测试与调优。任何专业的同学都能找到发光的位置。',
  },
]

export function AboutPage() {
  const { catalog, setContact } = useStudio()
  const club = catalog!.club
  const qqGroup = club.qqGroup ?? '1130062117'
  const phone = club.phone ?? '19730031977'
  const email = club.email

  return <div className="about-page">
    <PageHeading
      title="以创为乐，向暖生活，心怀美好，手创未来。"
      description="浙江科技大学幻造工坊游戏开发社团 · 社团简介、组织架构、章程规范与联系方式"
    >
      <Button asChild variant="outline"><a href="/resource.html?id=club-charter-and-guide">下载章程与活动指南<ArrowUpRight size={15} /></a></Button>
    </PageHeading>

    <section className="about-intro">
      <div className="about-mark">
        <img src="/favicon.svg" alt="幻造工坊标识" />
        <div className="about-mark-caption">
          <strong>浙江科技大学 · 幻造工坊</strong>
          <span>学术科技类学生社团</span>
        </div>
      </div>
      <div className="about-intro-content">
        <span className="section-kicker">社团总则与创立初衷</span>
        <h2>浙江科技大学幻造工坊游戏开发社团</h2>
        <p>
          <strong>浙江科技大学幻造工坊游戏开发社团</strong>（简称“幻造工坊”，Huanzao Workshop）是由我校爱好游戏设计、编程实践、音效制作、动画美术等的在校学生自愿组成的<strong>学术科技类学生社团</strong>，接受学校党委领导、校团委指导和校学生社团管理中心管理。
        </p>
        <p>
          游戏制作同时融合了交互设计、计算机编程、视觉艺术与声音表达。幻造工坊致力于增进校内游戏制作爱好者的交流学习，通过<strong>「基础工作坊实操 + 跨专业小组原型开发 + 联合 Game Jam 赛事 + 公开试玩复盘」</strong>的培养闭环，帮助不同专业的同学在共同完成原创游戏作品的过程中掌握工程技能、锻炼团队协作与问题解决能力。
        </p>
        <div className="about-charter-pills">
          <span><Sparkles size={14} />宗旨：以创为乐，向暖生活，心怀美好，手创未来</span>
          <span><BookOpen size={14} />原则：立足理论，联系实际，以学习为本</span>
        </div>
        <div className="about-links">
          <a href="/works.html">浏览社员作品<ArrowUpRight size={16} /></a>
          <a href="/members.html">认识优秀社员<ArrowUpRight size={16} /></a>
          <a href="/resources.html">Godot 教程与资源库<ArrowUpRight size={16} /></a>
          <a href="/join.html">加入幻造工坊<ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>

    <section className="editorial-section" id="organization">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">组织机构与职能分工 · 摘自《社团章程》第三、四章</span>
          <h2>扁平化项目协作，让精力真正集中在做游戏上。</h2>
        </div>
        <span className="subtle-count">干部比例 ≤ 30% · 成员大会最高监督</span>
      </div>
      <div className="departments-grid">
        {departments.map(({ name, groups, summary, icon: Icon }) => (
          <article key={name} className="department-card">
            <div className="department-head">
              <span className="pillar-icon"><Icon size={20} /></span>
              <div>
                <h3>{name}</h3>
                <span className="department-groups">{groups}</span>
              </div>
            </div>
            <p>{summary}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="editorial-section" id="roadmap">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">一学期培养与实践路线 · 摘自《社团成立答辩稿》第四节</span>
          <h2>从第一次打开引擎，到站在试玩会现场展示你的作品。</h2>
        </div>
      </div>
      <div className="semester-timeline">
        {semesterPlan.map((item, idx) => (
          <div key={item.period} className="timeline-item">
            <div className="timeline-index">0{idx + 1}</div>
            <div className="timeline-body">
              <div className="timeline-header">
                <span className="roadmap-phase">{item.period}</span>
                <h3>{item.stage}</h3>
              </div>
              <p>{item.action}</p>
              <span className="timeline-archive">{item.archive}</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="editorial-section" id="principles">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">社团章程与安全管理准则 · 保障每位创作者的权益</span>
          <h2>零会费、重版权、讲合规、守安全。</h2>
        </div>
      </div>
      <div className="principles-grid">
        {charterPrinciples.map(item => (
          <article key={item.title} className="principle-card">
            <div className="principle-title">
              <ShieldCheck size={19} />
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="editorial-section" id="faq">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">常见问答 · 整理自《幻造工坊成立答辩稿》第五节</span>
          <h2>关于加入社团与日常开发，你可能关心的问题。</h2>
        </div>
      </div>
      <div className="faq-grid">
        {faqs.map(item => (
          <article key={item.q} className="faq-card">
            <h3><HelpCircle size={18} /><span>{item.q}</span></h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="contact-section" id="contact">
      <div className="contact-section-top">
        <div>
          <span className="section-kicker">联系幻造工坊 · 随时欢迎你的加入与交流</span>
          <h2>通过 QQ 群、电话或邮件找到我们。</h2>
          <p>无论是申请加入社团、咨询工作坊安排、投递原创游戏作品，还是洽谈跨校 Game Jam 与技术交流合作，都可以通过以下任一方式直接联系。</p>
        </div>
        <div className="about-contact-actions">
          <Button size="lg" onClick={() => setContact('contact')}>在线撰写联系邮件<ArrowUpRight /></Button>
          <Button size="lg" variant="outline" asChild><a href="/resource.html?id=club-contact">下载 vCard 联系卡</a></Button>
        </div>
      </div>

      <div className="contact-cards-grid">
        <div className="contact-channel-card">
          <div className="channel-icon"><MessageSquare size={22} /></div>
          <span className="channel-label">社团招新 / 交流 QQ 群</span>
          <strong className="channel-value">{qqGroup}</strong>
          <p>加入社团官方交流群，获取最新工作坊通知、组队招募与开发答疑。</p>
          <Button variant="outline" size="sm" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
            <Copy size={14} />一键复制 QQ 群号
          </Button>
        </div>

        <div className="contact-channel-card">
          <div className="channel-icon"><Phone size={22} /></div>
          <span className="channel-label">社团联系电话</span>
          <strong className="channel-value"><a href={`tel:${phone}`}>{phone}</a></strong>
          <p>社团日常事务、招新咨询与校内外活动联络电话。</p>
          <div className="channel-btn-row">
            <Button variant="outline" size="sm" onClick={() => copyText(phone, '联系电话已复制')}>
              <Copy size={14} />复制号码
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={`tel:${phone}`}>直接拨打<ArrowUpRight size={14} /></a>
            </Button>
          </div>
        </div>

        <div className="contact-channel-card">
          <div className="channel-icon"><Mail size={22} /></div>
          <span className="channel-label">社团官方邮箱</span>
          <strong className="channel-value"><a href={`mailto:${email}`}>{email}</a></strong>
          <p>用于接收成员申请、游戏作品投稿、优秀社员档案及正式合作函件。</p>
          <div className="channel-btn-row">
            <Button variant="outline" size="sm" onClick={() => copyText(email, '社团邮箱已复制')}>
              <Copy size={14} />复制邮箱
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={`mailto:${email}`}>发送邮件<ArrowUpRight size={14} /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
}

const directions = [
  {
    id: 'game-design',
    title: '游戏设计（策划组）',
    brief: '玩法机制 · 关卡灰盒 · 叙事分支',
    text: '构思一套自洽而有趣的规则，用 Excalidraw 与引擎灰盒搭建富有节奏感的解谜或动作关卡，设计多分支角色对话，并通过现场试玩观察玩家反应、持续调优体验。',
    starter: '新人第一课：拆解一款经典小游戏的核心循环，并用纯色方块搭出第一张可跳跃通关的灰盒地图。',
    icon: Puzzle,
  },
  {
    id: 'programming',
    title: '程序开发（程序组）',
    brief: 'Godot 4 / Unity · 状态机 · 工具插件',
    text: '将奇思妙想转化为稳定运行的帧逻辑。无论是时间延迟残影、跨窗口桌面交互、2D 动态光影，还是有限状态机（FSM）、存档序列化与多人同步，代码是构建世界物理法则的基石。',
    starter: '新人第一课：跟随社团提供的 1 小时 Godot 入门视频，亲手实现角色移动、瓦片碰撞与金币收集。',
    icon: Code2,
  },
  {
    id: 'visual-art',
    title: '视觉创作（美术组）',
    brief: '像素精灵 · 序列帧动画 · 场景光影与 UI',
    text: '从 16×16 的像素小人、四方向行走与攻击序列帧，到温馨治愈的岛屿四季 TileMap、2D 法线贴图受光与灵动的对话框 UI，用画面为游戏世界注入第一眼的惊艳与温度。',
    starter: '新人第一课：使用 Piskel / LibreSprite / Pixelorama 绘制你的第一个待机与奔跑像素角色序列帧。',
    icon: Paintbrush,
  },
  {
    id: 'audio',
    title: '声音创作（音效组）',
    brief: '循环 BGM · 8-bit 音效合成 · 氛围声景',
    text: '一段恰到好处的跳跃、挥剑或机关解锁音效，能让操作手感瞬间提升一个档次；一段契合场景情绪的 Loop BGM，能让玩家长久记住那个世界。',
    starter: '新人第一课：使用 jsfxr / ChipTone 合成一套角色的跳跃、拾取与受击音效，并用 BeepBox 编写一段 8 小节循环旋律。',
    icon: Music2,
  },
]

export function JoinPage() {
  const { setContact, catalog } = useStudio()
  const club = catalog!.club
  const qqGroup = club.qqGroup ?? '1130062117'
  const phone = club.phone ?? '19730031977'
  const email = club.email

  return <div className="join-page">
    <section className="join-intro">
      <div>
        <p className="intro-label">加入浙江科技大学幻造工坊</p>
        <h1>不只做游戏的玩家，来做世界的创造者。</h1>
        <p className="join-lead">
          无论你是已经写过完整项目的独立开发者，还是刚刚萌生“我也想做一款自己的游戏”念头的零基础同学，幻造工坊都欢迎你的加入。<strong>不收会费、不卡专业、不强制自备高配硬件</strong>——带上一份好奇心就够了。
        </p>
        <div className="hero-cta-row">
          <Button size="lg" onClick={() => setContact('join')}>在线填写加入意向<ArrowUpRight /></Button>
          <button type="button" className="qq-quick-btn" onClick={() => copyText(qqGroup, '招新 QQ 群号已复制')}>
            <MessageSquare size={15} />
            <span>招新 QQ 群：{qqGroup}</span>
            <Copy size={13} />
          </button>
        </div>
      </div>

      <div className="join-steps-card">
        <span className="section-kicker">三步加入流程</span>
        <h3>如何开启你的第一款游戏项目？</h3>
        <ol className="join-step-list">
          <li>
            <strong>01 · 加入社群或发送意向邮件</strong>
            <span>搜索加入社团招新 QQ 群（{qqGroup}），或点击按钮发送一封简短的自我介绍邮件。</span>
          </li>
          <li>
            <strong>02 · 参加新手工作坊与基础跟练</strong>
            <span>跟随社团整理的 Godot / Unity 实操路线与四次基础工作坊，完成第一个小交互练习。</span>
          </li>
          <li>
            <strong>03 · 自由组队，开启原型或 Game Jam</strong>
            <span>结识策划、程序、美术与音效伙伴，组建 3–5 人小队，把想法做成能玩的原创作品。</span>
          </li>
        </ol>
      </div>
    </section>

    <section id="directions" className="directions-section">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">从你喜欢的地方开始 · 游戏开发部四大分组</span>
          <h2>一款游戏，不止一种参与方式。</h2>
        </div>
        <p>不必一开始就全能，选一个最吸引你的方向切入。</p>
      </div>
      <div className="direction-list">
        {directions.map(({ id, title, brief, text, starter, icon: Icon }, i) => (
          <details id={id} key={title} open={i === 0 || location.hash === '#' + id}>
            <summary>
              <Icon size={23} strokeWidth={1.6} />
              <h3>{title}</h3>
              <span>{brief}</span>
              <span className="detail-toggle">+</span>
            </summary>
            <div className="direction-detail-body">
              <p>{text}</p>
              <div className="direction-starter">
                <CheckCircle2 size={16} />
                <span>{starter}</span>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>

    <section className="contact-section join-contact-panel">
      <div className="contact-section-top">
        <div>
          <span className="section-kicker">立即联系我们</span>
          <h2>你的想法，从这里出发。</h2>
          <p>直接加入招新 QQ 群与学长学姐交流，或通过电话、邮件联系社团负责人。</p>
        </div>
        <Button size="lg" onClick={() => setContact('join')}>准备加入邮件<ArrowUpRight /></Button>
      </div>

      <div className="contact-cards-grid">
        <div className="contact-channel-card">
          <div className="channel-icon"><MessageSquare size={22} /></div>
          <span className="channel-label">招新与交流 QQ 群</span>
          <strong className="channel-value">{qqGroup}</strong>
          <p>推荐首选方式！进群即可获取新人入门包、工作坊时间与组队信息。</p>
          <Button variant="outline" size="sm" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
            <Copy size={14} />复制群号：{qqGroup}
          </Button>
        </div>

        <div className="contact-channel-card">
          <div className="channel-icon"><Phone size={22} /></div>
          <span className="channel-label">社团联系电话</span>
          <strong className="channel-value"><a href={`tel:${phone}`}>{phone}</a></strong>
          <p>招新咨询与社团日常事务联系。</p>
          <Button variant="outline" size="sm" onClick={() => copyText(phone, '联系电话已复制')}>
            <Copy size={14} />复制电话：{phone}
          </Button>
        </div>

        <div className="contact-channel-card">
          <div className="channel-icon"><Mail size={22} /></div>
          <span className="channel-label">社团官方邮箱</span>
          <strong className="channel-value"><a href={`mailto:${email}`}>{email}</a></strong>
          <p>发送加入意向、个人作品集或合作咨询。</p>
          <Button variant="outline" size="sm" onClick={() => copyText(email, '社团邮箱已复制')}>
            <Copy size={14} />复制邮箱
          </Button>
        </div>
      </div>
    </section>
  </div>
}
