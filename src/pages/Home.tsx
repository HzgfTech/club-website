import { ArrowUpRight, Copy, Gamepad2 } from 'lucide-react'
import { copyText, useStudio } from '../lib/store'

const activities = [
  {
    number: '01',
    title: '基础工作坊',
    description: '围绕玩法设计、Godot / Unity 入门、像素美术与 Git 版本管理开展实操练习。',
  },
  {
    number: '02',
    title: '小组原型开发',
    description: '3–5 人跨方向组队，以灰盒先行的方式合作完成可运行的原创小型游戏原型。',
  },
  {
    number: '03',
    title: 'Game Jam 组队',
    description: '组队参与 GodotHub、GMTK、034 等限时游戏创作赛，在实战中快速验证创意。',
  },
  {
    number: '04',
    title: '试玩与复盘',
    description: '举办作品试玩交流会，通过真实玩家反馈调整关卡节奏、操作手感与视觉表现。',
  },
]

export function HomePage({ language = 'zh' }: { language?: 'zh' | 'en' }) {
  const { catalog } = useStudio()
  const data = catalog!
  if (language === 'en') return <EnglishHomePage data={data} />

  const featuredWorks = data.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data.club.qqGroup ?? '1130062117'
  const phone = data.club.phone ?? '19730031977'
  const email = data.club.email

  return <div className="home-page">
    <section className="studio-hero">
      <div className="studio-hero__copy">
        <h1>
          <span>把想法做成</span>
          <span>可玩的游戏</span>
        </h1>
        <p className="studio-hero__english">ZUST Game Development Club · Huanzao Workshop</p>
        <p className="studio-hero__body">
          浙江科技大学幻造工坊游戏开发社团。围绕游戏策划、程序开发、像素美术与音乐音效，先做出可运行的原型，再通过试玩继续打磨。
        </p>
        <div className="studio-hero__actions">
          <a href="/works.html" className="studio-btn studio-btn--primary">浏览作品<ArrowUpRight size={16} /></a>
          <a href="/join.html" className="studio-btn studio-btn--secondary">加入社团<ArrowUpRight size={16} /></a>
        </div>
      </div>

      <aside className="studio-stage">
        <div className="studio-stage__header">
          <span className="studio-tag">以创为乐，向暖生活，心怀美好，手创未来</span>
        </div>
        <div className="studio-tracks-grid">
          <a href="/join.html#game-design" className="studio-track-box">
            <span className="row-number">01</span>
            <strong>游戏策划</strong>
            <small>玩法机制 · 关卡灰盒 · 叙事</small>
          </a>
          <a href="/join.html#programming" className="studio-track-box">
            <span className="row-number">02</span>
            <strong>程序开发</strong>
            <small>Godot 4 · Unity · 状态机</small>
          </a>
          <a href="/join.html#visual-art" className="studio-track-box">
            <span className="row-number">03</span>
            <strong>视觉美术</strong>
            <small>像素动画 · 瓦片场景 · 光影</small>
          </a>
          <a href="/join.html#audio" className="studio-track-box">
            <span className="row-number">04</span>
            <strong>音乐音效</strong>
            <small>循环配乐 · 8-bit 音效合成</small>
          </a>
        </div>
        <div className="studio-stage__contacts">
          <button type="button" className="stage-contact-btn" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
            <span>招新 QQ 群：{qqGroup}</span>
            <Copy size={13} />
          </button>
          <a href={`tel:${phone}`} className="stage-contact-btn">电话：{phone}</a>
          <a href={`mailto:${email}`} className="stage-contact-btn">{email}</a>
        </div>
      </aside>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>精选作品</h2>
        <a href="/works.html" className="studio-text-link">全部作品（{data.works.length}）<ArrowUpRight size={16} /></a>
      </div>
      <div className="selected-works-grid">
        {featuredWorks.map(work => (
          <article key={work.id} className="work-tile">
            <a href={`/work.html?id=${work.id}`} className="work-tile__media">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <Gamepad2 size={40} />}
            </a>
            <div className="work-tile__copy">
              <p className="work-tile__meta">
                {work.category}{work.engine ? ` · ${work.engine}` : ''}{work.status ? ` / ${work.status}` : ''}
              </p>
              <h3><a href={`/work.html?id=${work.id}`}>{work.title}</a></h3>
              <p className="work-tile__desc">{work.summary}</p>
              <div className="work-tile__foot">
                <span>{work.author}</span>
                <a href={`/work.html?id=${work.id}`} className="studio-text-link">查看详情<ArrowUpRight size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="studio-section studio-section--mint">
      <div className="studio-section__head">
        <h2>日常活动</h2>
        <a href="/about.html" className="studio-text-link">了解关于工坊<ArrowUpRight size={16} /></a>
      </div>
      <div className="activities-grid">
        {activities.map(item => (
          <article key={item.number} className="activity-card">
            <span className="row-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>社团板块</h2>
      </div>
      <div className="portal-row-list">
        <a href="/members.html" className="portal-row">
          <span className="row-number">01</span>
          <div>
            <h3>优秀社员</h3>
            <p>浏览 Amiya_desi、就是Helen 等核心创作者的个人简介、代表游戏与开发日志。</p>
          </div>
          <span className="studio-text-link">进入优秀社员<ArrowUpRight size={16} /></span>
        </a>
        <a href="/resources.html" className="portal-row">
          <span className="row-number">02</span>
          <div>
            <h3>资源库</h3>
            <p>由 Amiya_desi 整理的 Godot 入门与进阶视频教程、开发笔记及游戏素材工具导航。</p>
          </div>
          <span className="studio-text-link">进入资源库<ArrowUpRight size={16} /></span>
        </a>
        <a href="/about.html" className="portal-row">
          <span className="row-number">03</span>
          <div>
            <h3>关于工坊</h3>
            <p>查看浙江科技大学幻造工坊的组织分工、学期计划、常见问题与联系方式。</p>
          </div>
          <span className="studio-text-link">进入关于工坊<ArrowUpRight size={16} /></span>
        </a>
      </div>
    </section>

    <section className="contact-band">
      <div>
        <h2>一起做游戏</h2>
        <p>带上你的想法，加入社团交流群或直接联系我们。</p>
      </div>
      <div className="contact-band__actions">
        <a href="/join.html" className="studio-btn studio-btn--primary">加入幻造工坊<ArrowUpRight size={16} /></a>
        <button type="button" className="studio-btn studio-btn--secondary" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
          QQ 群：{qqGroup}<Copy size={14} />
        </button>
        <a href={`tel:${phone}`} className="contact-band__link">电话：{phone}</a>
        <a href={`mailto:${email}`} className="contact-band__link">{email}</a>
      </div>
    </section>
  </div>
}

function EnglishHomePage({ data }: { data: ReturnType<typeof useStudio>['catalog'] }) {
  const works = data!.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data!.club.qqGroup ?? '1130062117'
  const phone = data!.club.phone ?? '19730031977'
  const email = data!.club.email

  return <div className="home-page">
    <section className="studio-hero">
      <div className="studio-hero__copy">
        <h1>
          <span>Turn ideas into</span>
          <span>playable games</span>
        </h1>
        <p className="studio-hero__english">ZUST Game Development Club · Huanzao Workshop</p>
        <p className="studio-hero__body">
          The student game development club at Zhejiang University of Science & Technology. Build playable prototypes first, then refine them through playtesting.
        </p>
        <div className="studio-hero__actions">
          <a href="/works.html" className="studio-btn studio-btn--primary">View Works<ArrowUpRight size={16} /></a>
          <a href="/join.html" className="studio-btn studio-btn--secondary">Join Us<ArrowUpRight size={16} /></a>
        </div>
      </div>

      <aside className="studio-stage">
        <div className="studio-stage__header">
          <span className="studio-tag">Design · Code · Art · Audio</span>
        </div>
        <div className="studio-tracks-grid">
          <a href="/join.html#game-design" className="studio-track-box">
            <span className="row-number">01</span>
            <strong>Game Design</strong>
            <small>Mechanics & Levels</small>
          </a>
          <a href="/join.html#programming" className="studio-track-box">
            <span className="row-number">02</span>
            <strong>Programming</strong>
            <small>Godot 4 & Unity</small>
          </a>
          <a href="/join.html#visual-art" className="studio-track-box">
            <span className="row-number">03</span>
            <strong>Visual Art</strong>
            <small>Pixel Art & Animation</small>
          </a>
          <a href="/join.html#audio" className="studio-track-box">
            <span className="row-number">04</span>
            <strong>Audio</strong>
            <small>BGM & Chiptune SFX</small>
          </a>
        </div>
        <div className="studio-stage__contacts">
          <span className="stage-contact-btn">QQ Group: {qqGroup}</span>
          <a href={`tel:${phone}`} className="stage-contact-btn">Tel: {phone}</a>
          <a href={`mailto:${email}`} className="stage-contact-btn">{email}</a>
        </div>
      </aside>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>Selected Works</h2>
        <a href="/works.html" className="studio-text-link">All Works ({data!.works.length})<ArrowUpRight size={16} /></a>
      </div>
      <div className="selected-works-grid">
        {works.map(work => (
          <article key={work.id} className="work-tile">
            <a href={`/work.html?id=${work.id}`} className="work-tile__media">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <Gamepad2 size={40} />}
            </a>
            <div className="work-tile__copy">
              <p className="work-tile__meta">{work.category}{work.engine ? ` · ${work.engine}` : ''}</p>
              <h3><a href={`/work.html?id=${work.id}`}>{work.title}</a></h3>
              <p className="work-tile__desc">{work.summary}</p>
              <div className="work-tile__foot">
                <span>{work.author}</span>
                <a href={`/work.html?id=${work.id}`} className="studio-text-link">Details<ArrowUpRight size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
}
