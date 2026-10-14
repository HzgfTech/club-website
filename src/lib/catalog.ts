export type Resource = {
  id: string; title: string; description: string; category: string; format: string
  file: string; updated: string; bytes: number; content: string
  provider?: string; externalUrl?: string
}
export type Work = {
  id: string; title: string; summary: string; category: string; author: string; url: string; cover?: string
  engine?: string; status?: string; featured?: boolean; tags?: string[]; detail?: string
  sourceUrl?: string; sourceLabel?: string
}
export type MemberLink = {
  label: string; url: string
}
export type Member = {
  id: string; name: string; role: string; bio: string; specialties: string[]; avatar?: string; url?: string
  badge?: string; highlights?: string[]; links?: MemberLink[]
}
export type ClubInfo = {
  name: string; email: string; phone?: string; qqGroup?: string
  fullName?: string; category?: string; motto?: string; university?: string
}
export type Catalog = {
  club: ClubInfo; resources: Resource[]; works: Work[]; members: Member[]
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('资料格式不正确。')
  return value as Record<string, unknown>
}
function text(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.length > 20_000) throw new Error('资料缺少有效文字。')
  return value
}
function optionalText(value: unknown): string | undefined {
  if (value === undefined) return undefined
  return text(value)
}
function id(value: unknown) {
  const result = text(value)
  if (!/^[a-z0-9][a-z0-9-]{0,70}$/.test(result)) throw new Error('资料编号不正确。')
  return result
}
export function publicUrl(value: unknown): string {
  const result = text(value)
  let url: URL
  try { url = new URL(result) }
  catch { throw new Error('请使用有效的 HTTPS 链接。') }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('请使用有效的 HTTPS 链接。')
  return result
}
function imageUrl(value: unknown): string | undefined {
  if (value === undefined) return undefined
  const result = text(value)
  return /^\/(?!\/)[a-zA-Z0-9/_.,%-]+$/.test(result) ? result : publicUrl(result)
}
function stringList(value: unknown, errorMessage: string): string[] {
  if (!Array.isArray(value) || value.some(s => typeof s !== 'string' || !s.trim())) throw new Error(errorMessage)
  return value.map(text)
}
function rows<T>(value: unknown, parse: (item: Record<string, unknown>) => T & { id: string }): T[] {
  if (!Array.isArray(value)) throw new Error('资料列表不正确。')
  const result = value.map(item => parse(record(item)))
  if (new Set(result.map(item => item.id)).size !== result.length) throw new Error('资料编号重复。')
  return result
}
export function parseCatalog(value: unknown): Catalog {
  const data = record(value)
  const club = record(data.club)
  const email = text(club.email)
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error('社团邮箱格式不正确。')
  return {
    club: {
      name: text(club.name),
      email,
      phone: optionalText(club.phone),
      qqGroup: optionalText(club.qqGroup),
      fullName: optionalText(club.fullName),
      category: optionalText(club.category),
      motto: optionalText(club.motto),
      university: optionalText(club.university),
    },
    resources: rows(data.resources, item => {
      const file = text(item.file)
      if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(file)) throw new Error('资源文件路径不正确。')
      if (typeof item.bytes !== 'number' || !Number.isSafeInteger(item.bytes) || item.bytes < 0) throw new Error('资源大小不正确。')
      const updated = text(item.updated)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated))) throw new Error('资源日期不正确。')
      return {
        id: id(item.id), title: text(item.title), description: text(item.description), category: text(item.category),
        format: text(item.format), file, updated, bytes: item.bytes, content: text(item.content),
        provider: optionalText(item.provider),
        externalUrl: item.externalUrl === undefined ? undefined : publicUrl(item.externalUrl),
      }
    }),
    works: rows(data.works, item => ({
      id: id(item.id), title: text(item.title), summary: text(item.summary), category: text(item.category),
      author: text(item.author), url: publicUrl(item.url), cover: imageUrl(item.cover),
      engine: optionalText(item.engine),
      status: optionalText(item.status),
      featured: typeof item.featured === 'boolean' ? item.featured : undefined,
      tags: item.tags === undefined ? undefined : stringList(item.tags, '作品标签格式不正确。'),
      detail: optionalText(item.detail),
      sourceUrl: item.sourceUrl === undefined ? undefined : publicUrl(item.sourceUrl),
      sourceLabel: optionalText(item.sourceLabel),
    })),
    members: rows(data.members, item => {
      const specialties = stringList(item.specialties, '社员创作方向不正确。')
      const links = item.links === undefined ? undefined : (
        Array.isArray(item.links)
          ? item.links.map(entry => {
              const r = record(entry)
              return { label: text(r.label), url: publicUrl(r.url) }
            })
          : (() => { throw new Error('社员外链格式不正确。') })()
      )
      return {
        id: id(item.id), name: text(item.name), role: text(item.role), bio: text(item.bio),
        specialties, avatar: imageUrl(item.avatar), url: item.url === undefined ? undefined : publicUrl(item.url),
        badge: optionalText(item.badge),
        highlights: item.highlights === undefined ? undefined : stringList(item.highlights, '社员亮点格式不正确。'),
        links,
      }
    }),
  }
}
export function fileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
