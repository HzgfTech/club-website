import { ArrowUpRight, Award, Code2, ExternalLink, Gamepad2, Globe, Search, Sparkles, Users, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { BackLink, EmptyState, NoResults, PageHeading } from '../components/shared'
import { useStudio } from '../lib/store'
import { useFilters } from '../lib/filters'

export function ShowcasePage() {
  const { catalog, setContact } = useStudio()
  const { params, update, clear } = useFilters()
  const id = params.get('id')
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? '全部'
  const works = catalog!.works
  const members = catalog!.members
  const selected = works.find(work => work.id === id)
  const backParams = new URLSearchParams(params); backParams.delete('id')
  const back = '/works.html' + (backParams.size ? `?${backParams}` : '')

  if (location.pathname === '/work.html') {
    if (!selected) {
      return <EmptyState icon={<Gamepad2 />} title="作品不存在"><Button asChild variant="outline"><a href="/works.html">返回作品展</a></Button></EmptyState>
    }
    const creatorMember = members.find(m => selected.author.includes(m.name))
    return <div className="object-detail work-detail-page">
      <BackLink to={back}>返回作品展</BackLink>
      <div className="work-detail-hero">
        <div className="work-detail-media">
          {selected.cover
            ? <img className="work-cover" src={selected.cover} alt={selected.title} />
            : <div className="work-placeholder"><Gamepad2 size={56} strokeWidth={1.2} /></div>}
        </div>
        <div className="work-detail-info">
          <div className="work-detail-badges">
            <span className="object-category">{selected.category}</span>
            {selected.engine && <span className="badge-engine-pill"><Code2 size={13} />{selected.engine}</span>}
            {selected.status && <span className="badge-status-pill"><Sparkles size={13} />{selected.status}</span>}
          </div>
          <h1>{selected.title}</h1>
          <p className="work-detail-author">
            创作者：<strong>{selected.author}</strong>
            {creatorMember && (
              <a href={`/member.html?id=${creatorMember.id}`} className="creator-profile-link">
                查看创作者档案<ArrowUpRight size={14} />
              </a>
            )}
          </p>
          <p className="work-detail-summary">{selected.summary}</p>
          {selected.tags && (
            <div className="specialty-tags">
              {selected.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          )}
          <div className="work-detail-actions">
            <Button size="lg" asChild>
              <a href={selected.url} target="_blank" rel="noopener noreferrer">
                打开作品 / 试玩体验<ArrowUpRight />
              </a>
            </Button>
            {selected.sourceUrl && (
              <Button size="lg" variant="outline" asChild>
                <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {selected.sourceLabel ?? '查看相关来源'}<ExternalLink size={15} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <section className="work-detail-article">
        <span className="section-kicker">作品档案与设计细节</span>
        <h2>关于《{selected.title.split('·')[0].trim()}》</h2>
        <p className="object-description">{selected.detail ?? selected.summary}</p>
      </section>
    </div>
  }

  const filtered = works.filter(work =>
    (category === '全部' || work.category === category) &&
    `${work.title} ${work.summary} ${work.author} ${work.engine ?? ''} ${(work.tags ?? []).join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return <div className="community-page">
    <PageHeading
      title="把灵感的火花，锻造成可运行的互动世界。"
      description="幻造工坊 · 社员原创游戏、Game Jam 获奖作品、开发日志与开源工具展映"
    >
      <Button onClick={() => setContact('work')}>提交游戏作品<ArrowUpRight /></Button>
    </PageHeading>

    <section className="showcase-source-banner" aria-label="作品来源与共创工作室">
      <div>
        <span className="section-kicker">真实创作 · 持续迭代</span>
        <p>本展区收录社员在个人工作室、Game Jam 赛事及 Bilibili 开发日志中公开发布的可玩作品与开源工程。</p>
      </div>
      <div className="source-banner-links">
        <a href="https://studio.sayori.org/" target="_blank" rel="noopener noreferrer" className="source-pill">
          <Globe size={14} />XY-Amiya Studio<ArrowUpRight size={13} />
        </a>
        <a href="https://amiya-desi.itch.io/" target="_blank" rel="noopener noreferrer" className="source-pill">
          <Gamepad2 size={14} />itch.io 在线试玩库<ArrowUpRight size={13} />
        </a>
        <a href="https://space.bilibili.com/269723498" target="_blank" rel="noopener noreferrer" className="source-pill">
          <Sparkles size={14} />就是Helen · B站开发日志<ArrowUpRight size={13} />
        </a>
      </div>
    </section>

    <div className="showcase-toolbar">
      <CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索游戏、引擎或创作者" />
      <div className="filter-tabs" role="group" aria-label="作品分类">
        {['全部', ...new Set(works.map(work => work.category))].map(item => (
          <button
            key={item}
            aria-pressed={category === item}
            className={category === item ? 'active' : ''}
            onClick={() => update('category', item === '全部' ? '' : item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {filtered.length ? (
      <div className="works-grid">
        {filtered.map(work => (
          <a key={work.id} href={`/work.html?id=${work.id}${params.size ? '&' + params : ''}`} className="showcase-card work-item">
            <div className="showcase-card-media work-image">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <Gamepad2 size={44} strokeWidth={1.2} />}
              <div className="showcase-badges">
                {work.engine && <span className="badge-engine">{work.engine}</span>}
                {work.status && <span className="badge-status">{work.status}</span>}
              </div>
            </div>
            <div className="showcase-card-body">
              <div className="showcase-card-meta">
                <span className="showcase-category">{work.category}</span>
                <span className="showcase-author">{work.author}</span>
              </div>
              <div className="work-item-title showcase-card-title">
                <h2>{work.title}</h2>
                <ArrowUpRight size={18} />
              </div>
              <p>{work.summary}</p>
              {work.tags && (
                <div className="showcase-tags">
                  {work.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    ) : (
      <NoResults onClear={clear} />
    )}
  </div>
}

export function MembersPage() {
  const { catalog, setContact } = useStudio()
  const { params, update, clear } = useFilters()
  const id = params.get('id')
  const query = params.get('q') ?? ''
  const members = catalog!.members
  const works = catalog!.works
  const selected = members.find(member => member.id === id)
  const backParams = new URLSearchParams(params); backParams.delete('id')
  const back = '/members.html' + (backParams.size ? `?${backParams}` : '')

  if (location.pathname === '/member.html') {
    if (!selected) {
      return <EmptyState icon={<Users />} title="社员档案不存在"><Button asChild variant="outline"><a href="/members.html">返回优秀社员</a></Button></EmptyState>
    }
    const memberWorks = works.filter(w => w.author.includes(selected.name))

    return <div className="object-detail member-detail">
      <BackLink to={back}>返回优秀社员</BackLink>

      <div className="member-detail-top">
        <div className="member-avatar">
          {selected.avatar ? <img src={selected.avatar} alt={selected.name} /> : selected.name.slice(0, 1)}
        </div>
        <div className="member-detail-meta">
          {selected.badge && <span className="member-badge-pill"><Award size={13} />{selected.badge}</span>}
          <h1>{selected.name}</h1>
          <p>{selected.role}</p>
          <div className="specialty-tags">
            {selected.specialties.map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>

      <div className="member-detail-card">
        <span className="section-kicker">创作者简介与经历</span>
        <p className="object-description">{selected.bio}</p>

        {selected.highlights && selected.highlights.length > 0 && (
          <div className="member-highlights-box">
            <h3>代表成果与创作亮点</h3>
            <ul>
              {selected.highlights.map(item => (
                <li key={item}><Sparkles size={15} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        )}

        {selected.links && selected.links.length > 0 ? (
          <div className="member-links-section">
            <h3>个人站点与作品主页</h3>
            <div className="member-links-grid">
              {selected.links.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="member-ext-card">
                  <div>
                    <strong>{link.label}</strong>
                    <span>{link.url}</span>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
              ))}
            </div>
          </div>
        ) : selected.url && (
          <div className="member-detail-link">
            <div><span>个人网站</span><strong>{selected.url}</strong></div>
            <Button asChild><a href={selected.url} target="_blank" rel="noopener noreferrer">访问个人主页<ArrowUpRight /></a></Button>
          </div>
        )}
      </div>

      {memberWorks.length > 0 && (
        <section className="member-works-section">
          <div className="editorial-heading">
            <div>
              <span className="section-kicker">代表作品与工程</span>
              <h2>{selected.name} 参与创作的作品（{memberWorks.length}）</h2>
            </div>
            <a href="/works.html" className="plain-link">查看全部社团作品<ArrowUpRight size={16} /></a>
          </div>
          <div className="home-works-grid">
            {memberWorks.map(work => (
              <a key={work.id} href={`/work.html?id=${work.id}`} className="showcase-card">
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
                    <span className="showcase-author">{work.author}</span>
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
      )}
    </div>
  }

  const filtered = members.filter(member =>
    `${member.name} ${member.role} ${member.bio} ${member.specialties.join(' ')} ${(member.highlights ?? []).join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return <div className="community-page">
    <PageHeading
      title="每一个可玩的世界背后，都有认真造梦的人。"
      description="幻造工坊 · 优秀社员与核心创作者专页"
    >
      <Button onClick={() => setContact('member')}>申请展示个人档案<ArrowUpRight /></Button>
    </PageHeading>

    <CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索社员昵称、技术方向或代表作品" />

    {filtered.length ? (
      <div className="members-profile-grid">
        {filtered.map(member => {
          const memberWorks = works.filter(w => w.author.includes(member.name))
          return (
            <article key={member.id} className="creator-dossier-card">
              <div className="creator-dossier-head">
                <a href={`/member.html?id=${member.id}${params.size ? '&' + params : ''}`} className="member-avatar">
                  {member.avatar ? <img src={member.avatar} alt={member.name} loading="lazy" /> : member.name.slice(0, 1)}
                </a>
                <div className="creator-dossier-title">
                  <div className="creator-title-row">
                    {member.badge && <span className="member-badge-pill"><Award size={13} />{member.badge}</span>}
                    {member.url && (
                      <a href={member.url} target="_blank" rel="noopener noreferrer" className="member-site-pill">
                        {new URL(member.url).hostname}<ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                  <h2>
                    <a href={`/member.html?id=${member.id}${params.size ? '&' + params : ''}`}>{member.name}</a>
                  </h2>
                  <p className="member-role-text">{member.role}</p>
                </div>
                <a href={`/member.html?id=${member.id}${params.size ? '&' + params : ''}`} className="creator-detail-btn">
                  完整档案<ArrowUpRight size={16} />
                </a>
              </div>

              <p className="member-row-bio">{member.bio}</p>

              {member.highlights && member.highlights.length > 0 && (
                <div className="creator-highlights">
                  <h4>创作成果与里程碑</h4>
                  <ul>
                    {member.highlights.map(item => (
                      <li key={item}><Sparkles size={14} /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="specialty-tags">
                {member.specialties.map(tag => <span key={tag}>{tag}</span>)}
              </div>

              {memberWorks.length > 0 && (
                <div className="creator-works-strip">
                  <span className="strip-label">代表作品：</span>
                  <div className="strip-items">
                    {memberWorks.map(work => (
                      <a key={work.id} href={`/work.html?id=${work.id}`} className="strip-work-chip">
                        <Gamepad2 size={13} />
                        <span>{work.title.split('·')[0].trim()}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {member.links && member.links.length > 0 && (
                <div className="creator-ext-links">
                  {member.links.map(link => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="creator-ext-pill">
                      <span>{link.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    ) : (
      <NoResults onClear={clear} />
    )}

    <section className="member-invitation-banner">
      <div className="member-outline" aria-hidden="true"><Users size={38} strokeWidth={1.4} /></div>
      <div>
        <h3>让你的作品与开发日志成为你的名片。</h3>
        <p>无论你擅长 Godot / Unity 编程、像素绘画、关卡策划、游戏编曲，还是正在 B站 / itch.io 连载开发日常，都欢迎将你的档案加入幻造工坊优秀社员专页。</p>
      </div>
      <div className="member-invitation-actions">
        <Button onClick={() => setContact('member')}>在线提交社员档案<ArrowUpRight /></Button>
        <a href="/resource.html?id=member-profile" className="plain-link">查看展示资料模板<ArrowUpRight size={15} /></a>
      </div>
    </section>
  </div>
}

function CollectionSearch({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) {
  return <div className="search-field collection-search"><Search size={17} /><Input aria-label={label} placeholder={label} value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="清除搜索" onClick={() => setQuery('')}><X size={15} /></button>}</div>
}
