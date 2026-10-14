export type Resource = {
  id: string; title: string; description: string; category: string; format: string
  file: string; updated: string; bytes: number; content: string
}
export type Work = {
  id: string; title: string; summary: string; category: string; author: string; url: string; cover?: string
}
export type Member = {
  id: string; name: string; role: string; bio: string; specialties: string[]; avatar?: string; url?: string
}
export type Catalog = {
  club: { name: string; email: string }; resources: Resource[]; works: Work[]; members: Member[]
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('资料格式不正确。')
  return value as Record<string, unknown>
}
function text(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.length > 20_000) throw new Error('资料缺少有效文字。')
  return value
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
    club: { name: text(club.name), email },
    resources: rows(data.resources, item => {
      const file = text(item.file)
      if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(file)) throw new Error('资源文件路径不正确。')
      if (typeof item.bytes !== 'number' || !Number.isSafeInteger(item.bytes) || item.bytes < 0) throw new Error('资源大小不正确。')
      const updated = text(item.updated)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated))) throw new Error('资源日期不正确。')
      return {
        id: id(item.id), title: text(item.title), description: text(item.description), category: text(item.category),
        format: text(item.format), file, updated, bytes: item.bytes, content: text(item.content),
      }
    }),
    works: rows(data.works, item => ({
      id: id(item.id), title: text(item.title), summary: text(item.summary), category: text(item.category),
      author: text(item.author), url: publicUrl(item.url), cover: imageUrl(item.cover),
    })),
    members: rows(data.members, item => {
      if (!Array.isArray(item.specialties) || item.specialties.some(s => typeof s !== 'string' || !s.trim())) throw new Error('社员创作方向不正确。')
      return {
        id: id(item.id), name: text(item.name), role: text(item.role), bio: text(item.bio),
        specialties: item.specialties.map(text), avatar: imageUrl(item.avatar), url: item.url === undefined ? undefined : publicUrl(item.url),
      }
    }),
  }
}
export function fileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
