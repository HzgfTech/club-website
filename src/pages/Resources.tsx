import { ArrowUpRight, Copy, FolderOpen, Search, Star, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { BackLink, EmptyState, FavoriteButton, DownloadButton, NoResults, PageHeading, ResourceIcon, ResourceRow } from '../components/shared'
import { fileSize } from '../lib/catalog'
import { copyText, useStudio } from '../lib/store'
import { useFilters } from '../lib/filters'

export function ResourcesPage() {
  const { catalog, favorites } = useStudio()
  const { params, update, clear } = useFilters()
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? '全部'
  const onlyFavorites = params.get('saved') === '1'
  const data = catalog!
  const categories = ['全部', ...new Set(data.resources.map(resource => resource.category))]
  const resources = data.resources.filter(resource => (!onlyFavorites || favorites.includes(resource.id)) && (category === '全部' || resource.category === category) && `${resource.title} ${resource.description} ${resource.category} ${resource.format}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  return <div className="resources-page">
    <PageHeading title="创作需要的，放在手边。" description="投稿模板、工坊资料与公开素材。"><span className="subtle-count">{data.resources.length} 份资源</span></PageHeading>
    <section className="resource-browser" aria-label="资源列表">
      <div className="resource-tools"><div className="search-field"><Search size={18} /><Input aria-label="搜索资源" placeholder="搜索名称、格式…" value={query} onChange={e => update('q', e.target.value)} />{query && <button aria-label="清除搜索" onClick={() => update('q', '')}><X size={15} /></button>}</div><Button variant={onlyFavorites ? 'secondary' : 'outline'} aria-label="只看收藏" aria-pressed={onlyFavorites} onClick={() => update('saved', onlyFavorites ? '' : '1')}><Star size={16} fill={onlyFavorites ? 'currentColor' : 'none'} />我的收藏</Button></div>
      <div className="filter-tabs" aria-label="资源分类">{categories.map(item => <button key={item} onClick={() => update('category', item === '全部' ? '' : item)} aria-pressed={category === item} className={category === item ? 'active' : ''}>{item}</button>)}</div>
      <div className="list-column-head"><span>资源名称</span><span>格式 / 大小</span></div>
      <div className="resource-list">{resources.length ? resources.map(resource => <ResourceRow key={resource.id} resource={resource} query={params.toString()} />) : data.resources.length ? <NoResults onClear={clear} /> : <EmptyState compact icon={<FolderOpen />} title="资源正在整理" />}</div>
      <div className="resource-list-footer"><span>{resources.length} 份资源</span></div>
    </section>
  </div>
}
export function ResourceDetailPage() {
  const { catalog, setContact } = useStudio()
  const params = new URLSearchParams(location.search)
  const selected = catalog!.resources.find(resource => resource.id === params.get('id'))
  params.delete('id')
  const back = '/resources.html' + (params.size ? `?${params}` : '')
  if (!selected) return <EmptyState icon={<FolderOpen />} title="资源不存在" description="这份资源可能已移除。"><Button asChild variant="outline"><a href="/resources.html">返回资源库</a></Button></EmptyState>
  return <div className="resource-detail-page"><BackLink to={back}>返回资源库</BackLink><div className="resource-detail-layout"><section className="resource-detail-main"><div className="detail-icon-row"><ResourceIcon resource={selected} /><FavoriteButton resource={selected} /></div><span className="detail-category">{selected.category}</span><h1>{selected.title}</h1><p className="detail-description">{selected.description}</p>{selected.format === 'SVG' && <div className="svg-preview"><img src={`/downloads/${selected.file}`} alt="幻造工坊视觉标识提案" /></div>}<div className="resource-description"><h2>内容简介</h2><p>{selected.content}</p></div></section><aside className="resource-download-panel"><dl className="detail-metadata"><div><dt>文件格式</dt><dd>{selected.format}</dd></div><div><dt>文件大小</dt><dd>{fileSize(selected.bytes)}</dd></div><div><dt>更新日期</dt><dd>{selected.updated}</dd></div></dl><div className="detail-actions"><DownloadButton resource={selected} /><Button variant="outline" size="icon" aria-label="复制资源链接" title="复制资源链接" onClick={() => copyText(location.href, '资源链接已复制')}><Copy /></Button></div>{selected.category === '投稿模板' && <button className="detail-submit" onClick={() => setContact(selected.id === 'member-profile' ? 'member' : 'work')}>在线填写资料<ArrowUpRight size={15} /></button>}</aside></div></div>
}
