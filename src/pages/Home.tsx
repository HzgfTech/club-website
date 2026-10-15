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

const tickerItems = [
  'GODOT 4 ENGINE',
  'UNITY 2D / 3D',
  'GAME MECHANICS',
  'ARG NARRATIVE',
  'PIXEL ART & ANIMATION',
  'CHIPTUNE & SFX',
  'GAME JAM PROTOTYPING',
  'SHADERS & VFX',
]

export function HomePage({ language = 'zh' }: { language?: 'zh' | 'en' }) {
  const { catalog } = useStudio()
  const data = catalog!
  if (language === 'en') return <EnglishHomePage data={data} />

  const featuredWorks = data.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data.club.qqGroup ?? '1130062117'

  return <div className="home-page">
    <section className="studio-hero">
      <div className="studio-hero__copy">
        <h1>
          <span className="hero-line-1">把想法做成</span>
          <span className="hero-line-2">可玩的游戏</span>
        </h1>
        <p className="studio-hero__english">ZUST Game Development Club · Huanzao Workshop</p>
        <p className="studio-hero__body">
          浙江科技大学幻造工坊游戏开发社团。围绕游戏策划、程序开发、像素美术与音乐音效，先做出可运行的原型，再通过试玩继续打磨。
        </p>
        <div className="studio-hero__actions">
          <a href="/works.html" className="studio-btn studio-btn--primary">浏览作品<ArrowUpRight size={16} /></a>
          <button type="button" className="studio-btn studio-btn--secondary" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
            招新 QQ 群：{qqGroup}<Copy size={14} />
          </button>
        </div>
      </div>

      <aside className="studio-stage">
        <div className="studio-stage__header">
          <span className="studio-tag"><span className="pulse-dot" />以创为乐，向暖生活，心怀美好，手创未来</span>
        </div>
        <div className="studio-tracks-grid">
          <div className="studio-track-box float-card-1">
            <span className="row-number">01</span>
            <strong>游戏策划</strong>
            <small>玩法机制 · 关卡灰盒 · 互动叙事</small>
          </div>
          <div className="studio-track-box float-card-2">
            <span className="row-number">02</span>
            <strong>程序开发</strong>
            <small>Godot 4 · Unity · 状态机架构</small>
          </div>
          <div className="studio-track-box float-card-3">
            <span className="row-number">03</span>
            <strong>视觉美术</strong>
            <small>像素动画 · 瓦片地图 · 2D 光影</small>
          </div>
          <div className="studio-track-box float-card-4">
            <span className="row-number">04</span>
            <strong>音乐音效</strong>
            <small>循环配乐 · 8-bit 音效合成</small>
          </div>
        </div>
      </aside>
    </section>

    <div className="kinetic-ticker" aria-hidden="true">
      <div className="kinetic-ticker__track">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span key={idx} className="kinetic-ticker__item">
            <i>◆</i>{item}
          </span>
        ))}
      </div>
    </div>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>精选作品</h2>
        <a href="/works.html" className="studio-text-link">全部 {data.works.length} 款作品<ArrowUpRight size={16} /></a>
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

    <section className="studio-section studio-section--last">
      <div className="studio-section__head">
        <h2>日常活动</h2>
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
  </div>
}

function EnglishHomePage({ data }: { data: ReturnType<typeof useStudio>['catalog'] }) {
  const works = data!.works.filter(w => w.featured).slice(0, 4)
  const qqGroup = data!.club.qqGroup ?? '1130062117'

  return <div className="home-page">
    <section className="studio-hero">
      <div className="studio-hero__copy">
        <h1>
          <span className="hero-line-1">Turn ideas into</span>
          <span className="hero-line-2">playable games</span>
        </h1>
        <p className="studio-hero__english">ZUST Game Development Club · Huanzao Workshop</p>
        <p className="studio-hero__body">
          The student game development club at Zhejiang University of Science & Technology. Build playable prototypes first, then refine them through playtesting.
        </p>
        <div className="studio-hero__actions">
          <a href="/works.html" className="studio-btn studio-btn--primary">View Works<ArrowUpRight size={16} /></a>
          <button type="button" className="studio-btn studio-btn--secondary" onClick={() => copyText(qqGroup, 'Copied QQ Group')}>
            QQ Group: {qqGroup}<Copy size={14} />
          </button>
        </div>
      </div>

      <aside className="studio-stage">
        <div className="studio-stage__header">
          <span className="studio-tag"><span className="pulse-dot" />Design · Code · Art · Audio</span>
        </div>
        <div className="studio-tracks-grid">
          <div className="studio-track-box float-card-1">
            <span className="row-number">01</span>
            <strong>Game Design</strong>
            <small>Mechanics & Levels</small>
          </div>
          <div className="studio-track-box float-card-2">
            <span className="row-number">02</span>
            <strong>Programming</strong>
            <small>Godot 4 & Unity</small>
          </div>
          <div className="studio-track-box float-card-3">
            <span className="row-number">03</span>
            <strong>Visual Art</strong>
            <small>Pixel Art & Animation</small>
          </div>
          <div className="studio-track-box float-card-4">
            <span className="row-number">04</span>
            <strong>Audio</strong>
            <small>BGM & Chiptune SFX</small>
          </div>
        </div>
      </aside>
    </section>

    <div className="kinetic-ticker" aria-hidden="true">
      <div className="kinetic-ticker__track">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span key={idx} className="kinetic-ticker__item">
            <i>◆</i>{item}
          </span>
        ))}
      </div>
    </div>

    <section className="studio-section studio-section--last">
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
