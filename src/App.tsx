import { useEffect, useState, type ComponentType } from 'react'
import { ArrowUpRight, Boxes, FileText, FolderOpen, Menu, Moon, Search, Sun, Users, WifiOff, X } from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from './components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './components/ui/command'
import { ContactDialog } from './components/ContactDialog'
import { DataState, EmptyState } from './components/shared'
import { useStudio } from './lib/store'
import { HomePage } from './pages/Home'
import { ResourcesPage, ResourceDetailPage } from './pages/Resources'
import { ShowcasePage, MembersPage } from './pages/Community'
import { AboutPage, JoinPage } from './pages/About'

const navigation = [
  { href: '/index.html', title: '首页' },
  { href: '/works.html', title: '作品展' },
  { href: '/members.html', title: '优秀社员' },
  { href: '/resources.html', title: '资源库' },
  { href: '/about.html', title: '关于工坊' },
]
const pages: Record<string, ComponentType> = {
  '/': HomePage, '/index.html': HomePage, '/works.html': ShowcasePage, '/work.html': ShowcasePage,
  '/members.html': MembersPage, '/member.html': MembersPage, '/resources.html': ResourcesPage,
  '/resource.html': ResourceDetailPage, '/about.html': AboutPage, '/join.html': JoinPage,
}
function NotFound() {
  return <EmptyState icon={<FolderOpen />} title="这里还没有内容"><Button asChild><a href="/index.html">返回首页</a></Button></EmptyState>
}
export default function App() {
  const { catalog, online, theme, toggleTheme } = useStudio()
  const isHome = ['/', '/index.html'].includes(location.pathname)
  const [language, setLanguage] = useState<'zh' | 'en'>(() => isHome && localStorage.getItem('club-language') === 'en' ? 'en' : 'zh')
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const Page = pages[location.pathname] ?? NotFound
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
    if (isHome) document.title = language === 'en' ? 'Home · Huanzao Workshop' : '首页 · 幻造工坊'
  }, [isHome, language])
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearch(open => !open) }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [])
  const active = (href: string) => href === '/index.html' ? ['/', '/index.html'].includes(location.pathname) : href === location.pathname || href.replace('s.html', '.html') === location.pathname
  const visibleNavigation = language === 'en'
    ? navigation.map((item, index) => ({ ...item, title: ['Home', 'Showcase', 'Members', 'Resources', 'About'][index] }))
    : navigation
  const toggleLanguage = () => {
    const next = language === 'zh' ? 'en' : 'zh'
    localStorage.setItem('club-language', next)
    setLanguage(next)
  }
  return <div className="club-site">
    <a href="#main-content" className="skip-link">{language === 'en' ? 'Skip to main content' : '跳到主要内容'}</a>
    <header className="site-header">
      <a href="/index.html" className="brand" aria-label="幻造工坊首页"><img src="/favicon.svg" width="36" height="36" alt="" /><span>幻造工坊<small>Huanzao Workshop</small></span></a>
      <nav className="desktop-nav" aria-label={language === 'en' ? 'Main navigation' : '主导航'}>{visibleNavigation.map(item => <a href={item.href} key={item.href} aria-current={active(item.href) ? 'page' : undefined}>{item.title}</a>)}</nav>
      <div className="header-actions">{isHome && <Button variant="ghost" size="sm" aria-label="Switch language" onClick={toggleLanguage}>{language === 'zh' ? 'EN' : '中文'}</Button>}{!online && <span className="offline-indicator" role="status"><WifiOff size={15} /><span>{language === 'en' ? 'Offline' : '离线'}</span></span>}<Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Search site' : '全站搜索'} title={language === 'en' ? 'Search · Ctrl K' : '搜索 · Ctrl K'} onClick={() => setSearch(true)}><Search size={18} /></Button><Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Switch theme' : `切换到${theme === 'light' ? '深' : '浅'}色模式`} onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</Button><a href="/join.html" className="join-link">{language === 'en' ? 'Join us' : '加入我们'}<ArrowUpRight size={15} /></a><Button variant="ghost" size="icon" className="mobile-menu" aria-label={language === 'en' ? 'Open navigation' : '打开导航'} onClick={() => setMenu(true)}><Menu /></Button></div>
    </header>
    <main id="main-content" tabIndex={-1} className="site-main"><DataState>{isHome ? <HomePage language={language} /> : <Page />}</DataState></main>
    <footer className="site-footer"><div className="footer-top"><a href="/index.html" className="footer-brand">幻造工坊<span>{language === 'en' ? 'Game Development Club' : '游戏开发社团'}</span></a><div className="footer-contact"><span>{language === 'en' ? 'Stay in touch' : '保持联系'}</span><a href="mailto:hzgftech@protonmail.com">hzgftech@protonmail.com<ArrowUpRight size={17} /></a></div></div><div className="footer-bottom"><span>© 2026 幻造工坊</span><a href="/resources.html">{language === 'en' ? 'Club resources' : '社团资源库'}<ArrowUpRight size={13} /></a></div></footer>
    <Sheet open={menu} onOpenChange={setMenu}><SheetContent side="right" className="mobile-navigation"><SheetTitle className="sr-only">社团导航</SheetTitle><SheetDescription className="sr-only">选择想访问的页面。</SheetDescription><span className="mobile-brand">幻造工坊</span><nav aria-label="手机导航">{[...navigation, { href: '/join.html', title: '加入我们' }].map(item => <a href={item.href} key={item.href} aria-current={active(item.href) ? 'page' : undefined}>{item.title}<ArrowUpRight size={20} /></a>)}</nav><a href="mailto:hzgftech@protonmail.com" className="mobile-email">hzgftech@protonmail.com</a></SheetContent></Sheet>
    <CommandDialog open={search} onOpenChange={setSearch} title="全站搜索" description="搜索并打开资源、作品、社员或页面。" className="search-dialog" showCloseButton={false}>
      <CommandInput placeholder="搜索资源、作品或社员…" /><CommandList><CommandEmpty>没有找到匹配内容</CommandEmpty><CommandGroup heading="页面">{[...navigation, { href: '/join.html', title: '加入我们' }].map(item => <CommandItem key={item.href} value={`page:${item.title}`} onSelect={() => location.assign(item.href)}><ArrowUpRight /><span>{item.title}</span></CommandItem>)}</CommandGroup>{!!catalog?.resources.length && <><CommandSeparator /><CommandGroup heading="资源">{catalog.resources.map(resource => <CommandItem key={resource.id} value={`resource:${resource.id}`} keywords={[resource.title, resource.description, resource.category]} onSelect={() => location.assign(`/resource.html?id=${resource.id}`)}><FileText /><span>{resource.title}</span><small className="command-format">{resource.format}</small></CommandItem>)}</CommandGroup></>}{!!catalog?.works.length && <CommandGroup heading="作品">{catalog.works.map(work => <CommandItem key={work.id} value={`work:${work.id}`} keywords={[work.title, work.author, work.category]} onSelect={() => location.assign(`/work.html?id=${work.id}`)}><Boxes />{work.title}</CommandItem>)}</CommandGroup>}{!!catalog?.members.length && <CommandGroup heading="社员">{catalog.members.map(member => <CommandItem key={member.id} value={`member:${member.id}`} keywords={[member.name, member.role, ...member.specialties]} onSelect={() => location.assign(`/member.html?id=${member.id}`)}><Users />{member.name}</CommandItem>)}</CommandGroup>}</CommandList><div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd>选择</span><span><kbd>↵</kbd>打开</span><span><kbd>Esc</kbd>关闭</span><Button variant="ghost" size="icon-xs" aria-label="关闭搜索" onClick={() => setSearch(false)}><X /></Button></div>
    </CommandDialog>
    <ContactDialog /><Toaster theme={theme} position="bottom-right" closeButton richColors />
  </div>
}
