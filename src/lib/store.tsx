import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { parseCatalog, type Catalog } from './catalog'

export type SubmissionKind = 'contact' | 'work' | 'member' | 'join'
type Store = {
  catalog: Catalog | null; status: 'loading' | 'ready' | 'error'; error: string | null; reload: () => void
  online: boolean; favorites: string[]; toggleFavorite: (id: string) => void
  theme: 'light' | 'dark'; toggleTheme: () => void
  contact: SubmissionKind | null; setContact: (kind: SubmissionKind | null) => void
}
const Context = createContext<Store | null>(null)

export function StudioProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [status, setStatus] = useState<Store['status']>('loading')
  const [error, setError] = useState<string | null>(null)
  const [revision, setRevision] = useState(0)
  const [online, setOnline] = useState(navigator.onLine)
  const [favorites, setFavorites] = useState<string[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [contact, setContact] = useState<SubmissionKind | null>(null)

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('hzgftech-theme')
      if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme)
      const saved = localStorage.getItem('hzgftech-favorites')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (!Array.isArray(parsed) || parsed.some(item => typeof item !== 'string')) throw new Error('收藏资料损坏')
        setFavorites(parsed)
      }
    } catch {
      toast.error('无法读取本地偏好，本次设置将在当前页面生效。')
    }
    const update = () => setOnline(navigator.onLine)
    addEventListener('online', update)
    addEventListener('offline', update)
    return () => { removeEventListener('online', update); removeEventListener('offline', update) }
  }, [])

  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError(null)
    fetch('/data/catalog.json', { signal: controller.signal, cache: 'no-cache' })
      .then(response => { if (!response.ok) throw new Error(`资料暂时无法加载（${response.status}）。`); return response.json() })
      .then(data => { setCatalog(parseCatalog(data)); setStatus('ready') })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        setError(reason instanceof Error && !(reason instanceof TypeError) ? reason.message : '无法连接，请检查网络后重试。')
        setStatus('error')
      })
    return () => controller.abort()
  }, [revision])

  const save = (key: string, value: string) => {
    try { localStorage.setItem(key, value) }
    catch { toast.error('浏览器未允许保存，本次设置仅在当前页面生效。') }
  }
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(previous => {
      const next = previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]
      save('hzgftech-favorites', JSON.stringify(next))
      return next
    })
  }, [])
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    save('hzgftech-theme', next)
    setTheme(next)
  }
  return <Context.Provider value={{ catalog, status, error, reload: () => setRevision(v => v + 1), online, favorites, toggleFavorite, theme, toggleTheme, contact, setContact }}>{children}</Context.Provider>
}
export function useStudio() {
  const context = useContext(Context)
  if (!context) throw new Error('StudioProvider 未挂载。')
  return context
}
export async function copyText(text: string, message = '已复制') {
  try { await navigator.clipboard.writeText(text); toast.success(message) }
  catch { toast.error('复制失败，请选中文字后手动复制。') }
}
export function saveText(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url; link.download = filename; link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
