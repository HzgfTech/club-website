import { useEffect, useState, type ComponentType } from 'react'
import { ArrowUpRight, Boxes, Copy, FileText, FolderOpen, Menu, Moon, Search, Sun, Users, WifiOff, X } from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from './components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './components/ui/command'
import { ContactDialog } from './components/ContactDialog'
import { DataState, EmptyState } from './components/shared'
import { copyText, useStudio } from './lib/store'
import { normalizePath } from './lib/utils'
import { HomePage } from './pages/Home'
import { ResourcesPage, ResourceDetailPage } from './pages/Resources'
import { ShowcasePage, MembersPage } from './pages/Community'
import { AboutPage, JoinPage } from './pages/About'

const navigation = [
  { href: '/index.html', route: '/', title: '首页' },
  { href: '/works.html', route: '/works', title: '作品展' },
  { href: '/members.html', route: '/members', title: '优秀社员' },
  { href: '/resources.html', route: '/resources', title: '资源库' },
  { href: '/about.html', route: '/about', title: '关于工坊' },
]

const pages: Record<string, ComponentType> = {
  '/': HomePage,
  '/works': ShowcasePage,
  '/work': ShowcasePage,
  '/members': MembersPage,
  '/member': MembersPage,
  '/resources': ResourcesPage,
  '/resource': ResourceDetailPage,
  '/about': AboutPage,
  '/join': JoinPage,
}

function NotFound() {
  return <EmptyState icon={<FolderOpen />} title="页面不存在"><Button asChild><a href="/index.html">返回首页</a></Button></EmptyState>
}

export default function App() {
  const { catalog, online, theme, toggleTheme } = useStudio()
  const currentRoute = normalizePath(location.pathname)
  const isHome = currentRoute === '/'
  const [language, setLanguage] = useState<'zh' | 'en'>(() => isHome && localStorage.getItem('club-language') === 'en' ? 'en' : 'zh')
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const Page = pages[currentRoute] ?? NotFound

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
    if (isHome) document.title = language === 'en' ? 'Home · Huanzao Workshop' : '幻造工坊 · 浙江科技大学游戏开发社团'
  }, [isHome, language])

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearch(open => !open)
      }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [])

  const active = (route: string) => {
    if (route === '/') return currentRoute === '/'
    if (route === '/works') return currentRoute === '/works' || currentRoute === '/work'
    if (route === '/members') return currentRoute === '/members' || currentRoute === '/member'
    if (route === '/resources') return currentRoute === '/resources' || currentRoute === '/resource'
    return currentRoute === route
  }

  const visibleNavigation = language === 'en'
    ? navigation.map((item, index) => ({ ...item, title: ['Home', 'Works', 'Members', 'Resources', 'About'][index] }))
    : navigation

  const toggleLanguage = () => {
    const next = language === 'zh' ? 'en' : 'zh'
    localStorage.setItem('club-language', next)
    setLanguage(next)
  }

  const email = catalog?.club.email ?? 'hzgftech@protonmail.com'
  const qqGroup = catalog?.club.qqGroup ?? '1130062117'
  const phone = catalog?.club.phone ?? '19730031977'

  return <div className="club-site">
    <a href="#main-content" className="skip-link">{language === 'en' ? 'Skip to content' : '跳到主要内容'}</a>
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/index.html" className="brand" aria-label="幻造工坊首页">
          <span className="brand__mark" aria-hidden="true">HZ</span>
          <span className="brand__text">
            <strong>幻造工坊</strong>
            <small>{language === 'en' ? 'ZUST Game Dev Club' : '浙江科技大学游戏开发社团'}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={language === 'en' ? 'Main navigation' : '主导航'}>
          {visibleNavigation.map(item => (
            <a href={item.href} key={item.href} aria-current={active(item.route) ? 'page' : undefined}>{item.title}</a>
          ))}
        </nav>

        <div className="header-actions">
          {isHome && (
            <button type="button" className="studio-icon-btn lang-btn" aria-label="Switch language" onClick={toggleLanguage}>
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          )}
          {!online && (
            <span className="offline-indicator" role="status">
              <WifiOff size={14} /><span>{language === 'en' ? 'Offline' : '离线'}</span>
            </span>
          )}
          <Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Search site' : '全站搜索'} title="Ctrl + K" onClick={() => setSearch(true)}>
            <Search size={18} />
          </Button>
          <Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Switch theme' : `切换到${theme === 'light' ? '深' : '浅'}色模式`} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <a href="/join.html" className="join-link">{language === 'en' ? 'Join Us' : '加入社团'}<ArrowUpRight size={15} /></a>
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label={language === 'en' ? 'Open navigation' : '打开导航'} onClick={() => setMenu(true)}>
            <Menu />
          </Button>
        </div>
      </div>
    </header>

    <main id="main-content" tabIndex={-1} className="site-main">
      <DataState>{isHome ? <HomePage language={language} /> : <Page />}</DataState>
    </main>

    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-left">
          <strong>浙江科技大学幻造工坊游戏开发社团</strong>
          <div className="footer-contacts">
            <button type="button" className="footer-contact-pill" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
              QQ 群：{qqGroup} <Copy size={12} />
            </button>
            <a href={`tel:${phone}`} className="footer-contact-pill">电话：{phone}</a>
            <a href={`mailto:${email}`} className="footer-contact-pill">{email}</a>
          </div>
        </div>

        <nav className="footer-links" aria-label="外部链接">
          <a href="https://studio.sayori.org/" target="_blank" rel="noopener noreferrer">XY-Amiya Studio<ArrowUpRight size={13} /></a>
          <a href="https://blog.sayori.org/" target="_blank" rel="noopener noreferrer">Amiya的书桌<ArrowUpRight size={13} /></a>
          <a href="https://nav.sayori.org/" target="_blank" rel="noopener noreferrer">资源导航<ArrowUpRight size={13} /></a>
          <a href="https://space.bilibili.com/269723498" target="_blank" rel="noopener noreferrer">就是Helen · B站<ArrowUpRight size={13} /></a>
        </nav>

        <p className="footer-copy">© 2026 幻造工坊</p>
      </div>
    </footer>

    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetContent side="right" className="mobile-navigation">
        <SheetTitle className="sr-only">社团导航</SheetTitle>
        <SheetDescription className="sr-only">选择页面</SheetDescription>
        <span className="mobile-brand">幻造工坊</span>
        <nav aria-label="手机导航">
          {[...navigation, { href: '/join.html', route: '/join', title: '加入社团' }].map(item => (
            <a href={item.href} key={item.href} aria-current={active(item.route) ? 'page' : undefined}>
              {item.title}<ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
        <div className="mobile-contact-box">
          <span>QQ 群：{qqGroup}</span>
          <a href={`tel:${phone}`}>电话：{phone}</a>
          <a href={`mailto:${email}`} className="mobile-email">{email}</a>
        </div>
      </SheetContent>
    </Sheet>

    <CommandDialog open={search} onOpenChange={setSearch} title="全站搜索" description="搜索作品、社员、资源或页面" className="search-dialog" showCloseButton={false}>
      <CommandInput placeholder="搜索作品、社员或资源…" />
      <CommandList>
        <CommandEmpty>未找到匹配项</CommandEmpty>
        <CommandGroup heading="页面">
          {[...navigation, { href: '/join.html', route: '/join', title: '加入社团' }].map(item => (
            <CommandItem key={item.href} value={`page:${item.title}`} onSelect={() => location.assign(item.href)}>
              <ArrowUpRight /><span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {!!catalog?.works.length && <>
          <CommandSeparator />
          <CommandGroup heading="作品">
            {catalog.works.map(work => (
              <CommandItem key={work.id} value={`work:${work.id}`} keywords={[work.title, work.author, work.category, work.engine ?? '']} onSelect={() => location.assign(`/work.html?id=${work.id}`)}>
                <Boxes /><span>{work.title}</span><small className="command-format">{work.author}</small>
              </CommandItem>
            ))}
          </CommandGroup>
        </>}
        {!!catalog?.members.length && <>
          <CommandSeparator />
          <CommandGroup heading="优秀社员">
            {catalog.members.map(member => (
              <CommandItem key={member.id} value={`member:${member.id}`} keywords={[member.name, member.role, ...member.specialties]} onSelect={() => location.assign(`/member.html?id=${member.id}`)}>
                <Users /><span>{member.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </>}
        {!!catalog?.resources.length && <>
          <CommandSeparator />
          <CommandGroup heading="资源">
            {catalog.resources.map(resource => (
              <CommandItem key={resource.id} value={`resource:${resource.id}`} keywords={[resource.title, resource.description, resource.category]} onSelect={() => location.assign(`/resource.html?id=${resource.id}`)}>
                <FileText /><span>{resource.title}</span><small className="command-format">{resource.format}</small>
              </CommandItem>
            ))}
          </CommandGroup>
        </>}
      </CommandList>
      <div className="command-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd>选择</span>
        <span><kbd>↵</kbd>打开</span>
        <span><kbd>Esc</kbd>关闭</span>
        <Button variant="ghost" size="icon-xs" aria-label="关闭搜索" onClick={() => setSearch(false)}><X /></Button>
      </div>
    </CommandDialog>
    <ContactDialog />
    <Toaster theme={theme} position="bottom-right" closeButton richColors />
  </div>
}
