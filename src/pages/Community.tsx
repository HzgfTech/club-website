import { ArrowUpRight, ExternalLink, Gamepad2, Search, Users, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { BackLink, EmptyState, NoResults, PageHeading } from '../components/shared'
import { useStudio } from '../lib/store'
import { useFilters } from '../lib/filters'
import { normalizePath } from '../lib/utils'

export function ShowcasePage() {
  const { catalog, setContact } = useStudio()
  const { params, update, clear } = useFilters()
  const id = params.get('id')
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? '全部'
  const works = catalog!.works
  const selected = works.find(work => work.id === id)
  const backParams = new URLSearchParams(params); backParams.delete('id')
  const back = '/works.html' + (backParams.size ? `?${backParams}` : '')
  const route = normalizePath(location.pathname)

  if (route === '/work' || id) {
    if (!selected) {
      return <EmptyState icon={<Gamepad2 />} title="作品不存在"><Button asChild variant="outline"><a href="/works.html">返回作品展</a></Button></EmptyState>
    }
    return <div className="inner-page">
      <BackLink to={back}>返回作品展</BackLink>
      <div className="work-detail">
        <div className="work-detail__media">
          {selected.cover
            ? <img src={selected.cover} alt={selected.title} />
            : <div className="work-placeholder"><Gamepad2 size={52} /></div>}
        </div>
        <div className="work-detail__copy">
          <p className="work-tile__meta">
            {selected.category}{selected.engine ? ` · ${selected.engine}` : ''}{selected.status ? ` / ${selected.status}` : ''}
          </p>
          <h1>{selected.title}</h1>
          <p className="work-detail__author">创作者：{selected.author}</p>
          <p className="detail-intro">{selected.summary}</p>
          {selected.tags && (
            <div className="studio-tags">
              {selected.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          )}
          <div className="studio-hero__actions">
            <a href={selected.url} target="_blank" rel="noopener noreferrer" className="studio-btn studio-btn--primary">
              打开作品<ArrowUpRight size={16} />
            </a>
            {selected.sourceUrl && (
              <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" className="studio-btn studio-btn--secondary">
                {selected.sourceLabel ?? '查看来源'}<ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="detail-body">
        <h2>作品介绍</h2>
        <p className="record-content">{selected.detail ?? selected.summary}</p>
      </div>
    </div>
  }

  const filtered = works.filter(work =>
    (category === '全部' || work.category === category) &&
    `${work.title} ${work.summary} ${work.author} ${work.engine ?? ''} ${(work.tags ?? []).join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return <div className="inner-page">
    <PageHeading title="作品展" description="社团成员制作的独立游戏、民俗解谜 ARG、Game Jam 作品与开源工具。">
      <button type="button" className="studio-btn studio-btn--primary" onClick={() => setContact('work')}>
        提交作品<ArrowUpRight size={16} />
      </button>
    </PageHeading>

    <div className="work-tools">
      <div className="filter-tabs" role="group" aria-label="作品分类">
        {['全部', ...new Set(works.map(work => work.category))].map(item => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={category === item ? 'active' : ''}
            onClick={() => update('category', item === '全部' ? '' : item)}
          >
            {item}
          </button>
        ))}
      </div>
      <CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索作品" />
    </div>

    {filtered.length ? (
      <div className="work-library">
        {filtered.map(work => (
          <article key={work.id} className="work-library__row">
            <a href={`/work.html?id=${work.id}${params.size ? '&' + params : ''}`} className="work-tile__media">
              {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <Gamepad2 size={44} />}
            </a>
            <div className="work-tile__copy">
              <p className="work-tile__meta">
                {work.category}{work.engine ? ` · ${work.engine}` : ''}{work.status ? ` / ${work.status}` : ''}
              </p>
              <h2>
                <a href={`/work.html?id=${work.id}${params.size ? '&' + params : ''}`}>{work.title}</a>
              </h2>
              <p className="work-tile__desc">{work.summary}</p>
              {work.tags && (
                <div className="studio-tags">
                  {work.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              )}
              <div className="work-tile__foot">
                <span>创作者：{work.author}</span>
                <a href={`/work.html?id=${work.id}${params.size ? '&' + params : ''}`} className="studio-text-link">查看详情<ArrowUpRight size={15} /></a>
              </div>
            </div>
          </article>
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
  const route = normalizePath(location.pathname)

  if (route === '/member' || id) {
    if (!selected) {
      return <EmptyState icon={<Users />} title="社员档案不存在"><Button asChild variant="outline"><a href="/members.html">返回优秀社员</a></Button></EmptyState>
    }
    const memberWorks = works.filter(w => w.author.includes(selected.name))

    return <div className="inner-page">
      <BackLink to={back}>返回优秀社员</BackLink>

      <div className="member-detail-header">
        <div className="member-avatar">
          {selected.avatar ? <img src={selected.avatar} alt={selected.name} /> : selected.name.slice(0, 1)}
        </div>
        <div className="member-detail-meta">
          {selected.badge && <p className="work-tile__meta">{selected.badge}</p>}
          <h1>{selected.name}</h1>
          <p className="member-role">{selected.role}</p>
          <div className="studio-tags">
            {selected.specialties.map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>

      <div className="detail-body">
        <h2>个人简介</h2>
        <p className="record-content">{selected.bio}</p>

        {selected.highlights && selected.highlights.length > 0 && (
          <div className="member-section-block">
            <h3>代表成果</h3>
            <ul className="studio-bullet-list">
              {selected.highlights.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}

        {selected.links && selected.links.length > 0 && (
          <div className="member-section-block">
            <h3>外部主页</h3>
            <div className="member-links-grid">
              {selected.links.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="member-link-box">
                  <strong>{link.label}</strong>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {memberWorks.length > 0 && (
        <section className="studio-section studio-section--last">
          <div className="studio-section__head">
            <h2>参与作品</h2>
          </div>
          <div className="selected-works-grid">
            {memberWorks.map(work => (
              <article key={work.id} className="work-tile">
                <a href={`/work.html?id=${work.id}`} className="work-tile__media">
                  {work.cover ? <img src={work.cover} alt={work.title} loading="lazy" /> : <Gamepad2 size={40} />}
                </a>
                <div className="work-tile__copy">
                  <p className="work-tile__meta">{work.category}{work.engine ? ` · ${work.engine}` : ''}</p>
                  <h3><a href={`/work.html?id=${work.id}`}>{work.title}</a></h3>
                  <p className="work-tile__desc">{work.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  }

  const filtered = members.filter(member =>
    `${member.name} ${member.role} ${member.bio} ${member.specialties.join(' ')} ${(member.highlights ?? []).join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return <div className="inner-page">
    <PageHeading title="优秀社员" description="社团核心独立游戏制作人、程序、叙事与美术创作者档案。">
      <button type="button" className="studio-btn studio-btn--primary" onClick={() => setContact('member')}>
        提交社员资料<ArrowUpRight size={16} />
      </button>
    </PageHeading>

    <div className="work-tools">
      <CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索社员" />
    </div>

    {filtered.length ? (
      <div className="member-library">
        {filtered.map(member => (
          <article key={member.id} className="member-card">
            <div className="member-card__top">
              <a href={`/member.html?id=${member.id}`} className="member-avatar">
                {member.avatar ? <img src={member.avatar} alt={member.name} loading="lazy" /> : member.name.slice(0, 1)}
              </a>
              <div className="member-card__heading">
                {member.badge && <p className="work-tile__meta">{member.badge}</p>}
                <h2><a href={`/member.html?id=${member.id}`}>{member.name}</a></h2>
                <p className="member-role">{member.role}</p>
              </div>
              <a href={`/member.html?id=${member.id}`} className="studio-btn studio-btn--secondary">
                查看档案<ArrowUpRight size={15} />
              </a>
            </div>

            <p className="member-bio">{member.bio}</p>

            <div className="studio-tags">
              {member.specialties.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    ) : (
      <NoResults onClear={clear} />
    )}
  </div>
}

function CollectionSearch({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) {
  return <div className="search-field collection-search">
    <Search size={17} />
    <Input aria-label={label} placeholder={label} value={query} onChange={e => setQuery(e.target.value)} />
    {query && <button type="button" aria-label="清除搜索" onClick={() => setQuery('')}><X size={15} /></button>}
  </div>
}
