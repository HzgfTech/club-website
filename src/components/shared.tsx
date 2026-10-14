import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Download, FileText, Image, ContactRound, Star, RefreshCw, Search, ArrowLeft, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { fileSize, type Resource } from '../lib/catalog'
import { useStudio } from '../lib/store'

export function ResourceIcon({ resource }: { resource: Resource }) {
  const Icon = resource.format === 'SVG' ? Image : resource.format === 'VCF' ? ContactRound : FileText
  return <span className={`resource-icon type-${resource.format.toLowerCase()}`}><Icon size={20} strokeWidth={1.7} /></span>
}
export function DownloadButton({ resource, compact = false }: { resource: Resource; compact?: boolean }) {
  const [busy, setBusy] = useState(false)
  async function download() {
    setBusy(true)
    try {
      const response = await fetch(`/downloads/${encodeURIComponent(resource.file)}`)
      if (!response.ok) throw new Error('下载失败，请联网后重试。')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url; link.download = resource.file; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      toast.success('资源已下载')
    } catch { toast.error('下载失败，请检查网络后重试。') }
    finally { setBusy(false) }
  }
  return <Button variant={compact ? 'ghost' : 'default'} size={compact ? 'icon' : 'default'} disabled={busy} onClick={download} aria-label={`下载${resource.title}`} title={compact ? `下载${resource.title}` : undefined}>{busy ? <RefreshCw className="spin" /> : <Download />}{!compact && (busy ? '正在下载' : '下载资源')}</Button>
}
export function FavoriteButton({ resource }: { resource: Resource }) {
  const { favorites, toggleFavorite } = useStudio()
  const selected = favorites.includes(resource.id)
  return <Button variant="ghost" size="icon" aria-label={`${selected ? '取消收藏' : '收藏'}${resource.title}`} aria-pressed={selected} title={selected ? '取消收藏' : '收藏'} onClick={() => toggleFavorite(resource.id)} className={selected ? 'is-favorite' : ''}><Star size={17} fill={selected ? 'currentColor' : 'none'} /></Button>
}
export function ResourceRow({ resource, active, query = '' }: { resource: Resource; active?: boolean; query?: string }) {
  return <div className={`resource-row ${active ? 'selected' : ''}`}>
    <a href={`/resource.html?id=${resource.id}${query ? '&' + query.replace(/^\?/, '') : ''}`} className="resource-row-main">
      <ResourceIcon resource={resource} />
      <div className="resource-text"><strong>{resource.title}</strong><span>{resource.description}</span></div>
      <span className="file-format">{resource.format}<small>{fileSize(resource.bytes)}</small></span>
    </a>
    <div className="resource-row-actions"><FavoriteButton resource={resource} /><DownloadButton resource={resource} compact /></div>
  </div>
}
export function SectionHeading({ title, children, to }: { title: string; children?: ReactNode; to?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{to ? <a href={to} className="text-link">{children ?? '查看全部'}<ArrowUpRight size={15} /></a> : children}</div>
}
export function EmptyState({ icon, title, description, children, compact = false }: { icon: ReactNode; title: string; description?: string; children?: ReactNode; compact?: boolean }) {
  return <div className={`empty-state ${compact ? 'compact' : ''}`}><div className="empty-icon">{icon}</div><h3>{title}</h3>{description && <p>{description}</p>}{children && <div className="empty-actions">{children}</div>}</div>
}
export function DataState({ children }: { children: ReactNode }) {
  const { catalog, status, error, reload, online } = useStudio()
  if (status === 'loading' && !catalog) return <div className="loading-state" role="status" aria-label="正在加载资料"><div className="skeleton skeleton-heading" /><div className="skeleton skeleton-hero" /><div className="skeleton skeleton-row" /><div className="skeleton skeleton-row" /><span className="sr-only">正在加载资料</span></div>
  if (!catalog) return <EmptyState icon={<TriangleAlert />} title={online ? '资料暂时无法加载' : '当前离线'} description={online ? error ?? '请稍后重试。' : '连接网络后再试。'}><Button onClick={reload}><RefreshCw />重新加载</Button></EmptyState>
  return <>{status === 'error' && <div className="error-banner" role="alert"><TriangleAlert size={16} /><span>{error}</span><Button size="sm" variant="ghost" onClick={reload}>重试</Button></div>}{children}</>
}
export function PageHeading({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <div className="page-heading"><div><h1>{title}</h1><p>{description}</p></div>{children}</div>
}
export function BackLink({ to, children = '返回' }: { to: string; children?: ReactNode }) {
  return <a href={to} className="back-link"><ArrowLeft size={16} />{children}</a>
}
export function NoResults({ onClear }: { onClear: () => void }) {
  return <EmptyState icon={<Search />} title="没有找到匹配内容" description="试试其他关键词。"><Button variant="outline" onClick={onClear}>清除筛选</Button></EmptyState>
}
