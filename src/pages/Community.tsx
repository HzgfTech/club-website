import { Gamepad2, ArrowUpRight, Search, Users, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { LevelScene } from '../components/LevelScene'
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
  const selected = works.find(work => work.id === id)
  const backParams = new URLSearchParams(params); backParams.delete('id')
  const back = '/works.html' + (backParams.size ? `?${backParams}` : '')
  if (location.pathname === '/work.html') return selected ? <div className="object-detail"><BackLink to={back}>返回作品展</BackLink><div className="object-detail-heading"><span className="object-category">{selected.category}</span><h1>{selected.title}</h1><p>创作者 · {selected.author}</p></div>{selected.cover && <img className="work-cover" src={selected.cover} alt={selected.title} />}<p className="object-description">{selected.summary}</p><Button asChild><a href={selected.url} target="_blank" rel="noopener noreferrer">打开游戏<ArrowUpRight /></a></Button></div> : <EmptyState icon={<Gamepad2 />} title="作品不存在"><Button asChild variant="outline"><a href="/works.html">返回作品展</a></Button></EmptyState>
  const filtered = works.filter(work => (category === '全部' || work.category === category) && `${work.title} ${work.summary} ${work.author}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  return <div className="community-page"><PageHeading title="每个想法，都能成为一个世界。" description="幻造工坊 · 社员游戏作品">{!!works.length && <Button onClick={() => setContact('work')}>提交游戏<ArrowUpRight /></Button>}</PageHeading>{works.length ? <><CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索游戏" /><div className="filter-tabs">{['全部', ...new Set(works.map(work => work.category))].map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'active' : ''} onClick={() => update('category', item === '全部' ? '' : item)}>{item}</button>)}</div>{filtered.length ? <div className="works-grid">{filtered.map(work => <a key={work.id} href={`/work.html?id=${work.id}${params.size ? '&' + params : ''}`} className="work-item"><div className="work-image">{work.cover ? <img src={work.cover} alt="" loading="lazy" /> : <Gamepad2 size={44} strokeWidth={1} />}</div><div className="work-item-title"><h2>{work.title}</h2><ArrowUpRight size={18} /></div><p>{work.summary}</p><div className="work-meta"><span>{work.author}</span><span>{work.category}</span></div></a>)}</div> : <NoResults onClear={clear} />}</> : <><LevelScene compact /><div className="collection-empty"><div><h2>第一款公开作品，虚位以待。</h2><p>把原型、试玩版或完整游戏带来。</p></div><div><Button size="lg" onClick={() => setContact('work')}>提交游戏作品<ArrowUpRight /></Button><a href="/resource.html?id=project-submission" className="plain-link">下载投稿模板<ArrowUpRight size={16} /></a></div></div></>}</div>
}
export function MembersPage() {
  const { catalog, setContact } = useStudio()
  const { params, update, clear } = useFilters()
  const id = params.get('id')
  const query = params.get('q') ?? ''
  const members = catalog!.members
  const selected = members.find(member => member.id === id)
  const backParams = new URLSearchParams(params); backParams.delete('id')
  const back = '/members.html' + (backParams.size ? `?${backParams}` : '')
  if (location.pathname === '/member.html') return selected ? <div className="object-detail member-detail"><BackLink to={back}>返回优秀社员</BackLink><div className="member-detail-top"><div className="member-avatar">{selected.avatar ? <img src={selected.avatar} alt="" /> : selected.name.slice(0, 1)}</div><div className="member-detail-meta"><h1>{selected.name}</h1><p>{selected.role}</p><div className="specialty-tags">{selected.specialties.map(tag => <span key={tag}>{tag}</span>)}</div></div></div><div className="member-detail-card"><span className="section-kicker">成果与个人介绍</span><p className="object-description">{selected.bio}</p>{selected.url && <div className="member-detail-link"><div><span>个人网站</span><strong>{selected.url}</strong></div><Button asChild><a href={selected.url} target="_blank" rel="noopener noreferrer">访问个人主页<ArrowUpRight /></a></Button></div>}</div></div> : <EmptyState icon={<Users />} title="社员档案不存在"><Button asChild variant="outline"><a href="/members.html">返回优秀社员</a></Button></EmptyState>
  const filtered = members.filter(member => `${member.name} ${member.role} ${member.bio} ${member.specialties.join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  return <div className="community-page"><PageHeading title="世界背后，有这样一群人。" description="幻造工坊 · 优秀社员">{!!members.length && <Button onClick={() => setContact('member')}>提交社员资料<ArrowUpRight /></Button>}</PageHeading>{members.length ? <><CollectionSearch query={query} setQuery={value => update('q', value)} label="搜索社员" />{filtered.length ? <div className="member-list">{filtered.map(member => <a href={`/member.html?id=${member.id}${params.size ? '&' + params : ''}`} key={member.id} className="member-row"><div className="member-avatar">{member.avatar ? <img src={member.avatar} alt="" loading="lazy" /> : member.name.slice(0, 1)}</div><div className="member-row-info"><div className="member-row-head"><h2>{member.name}</h2><span className="member-role-text">{member.role}</span>{member.url && <span className="member-site-pill">{new URL(member.url).hostname}</span>}</div><p className="member-row-bio">{member.bio}</p><div className="specialty-tags">{member.specialties.map(tag => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight size={20} /></a>)}</div> : <NoResults onClear={clear} />}</> : <section className="members-empty"><div className="member-line-art" aria-hidden="true"><svg viewBox="0 0 560 360" fill="none"><path d="m60 255 220-129 220 129-220 124z" className="portrait-ground"/><g stroke="currentColor" strokeWidth="2"><path d="M125 114V76c0-19 20-30 37-20l48 28c17 10 28 26 28 45v122l-113-65z"/><path d="M238 193v-60c0-29 29-45 54-30l78 45c23 14 38 38 38 65v120l-170-99z"/><path d="M408 247v-83c0-15 16-24 29-17l30 17c13 8 21 22 21 37v99l-80-46z"/></g><g fill="var(--brand-soft)"><path d="M145 87v58l37 22V110z"/><path d="M266 139v93l65 38v-94z"/><path d="M425 177v57l38 22v-57z"/></g><g stroke="var(--brand)" strokeWidth="2"><path d="M166 106v18m-9-14 18 10M295 172v24m-12-19 24 14M442 195v15m-8-12 16 9"/></g><path d="M76 57h25m-12-12v25M441 75h20m-10-10v20" stroke="var(--brand)" strokeWidth="1.5"/></svg></div><div><span className="section-kicker">优秀社员展示</span><h2>让作品，<br />介绍你。</h2><p>分享开发方向、个人故事与代表游戏。</p><Button size="lg" onClick={() => setContact('member')}>提交社员资料<ArrowUpRight /></Button><a href="/resource.html?id=member-profile" className="plain-link">下载展示资料模板<ArrowUpRight size={16} /></a></div></section>}</div>
}
function CollectionSearch({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) {
  return <div className="search-field collection-search"><Search size={17} /><Input aria-label={label} placeholder={label} value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="清除搜索" onClick={() => setQuery('')}><X size={15} /></button>}</div>
}
