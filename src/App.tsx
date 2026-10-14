import { useEffect, useState, type ComponentType } from 'react'
import { ArrowUpRight, Boxes, Copy, FileText, FolderOpen, Mail, Menu, MessageSquare, Moon, Phone, Search, Sun, Users, WifiOff, X } from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from './components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './components/ui/command'
import { ContactDialog } from './components/ContactDialog'
import { DataState, EmptyState } from './components/shared'
import { copyText, useStudio } from './lib/store'
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
    if (isHome) document.title = language === 'en' ? 'Home · Huanzao Workshop' : '幻造工坊 · 浙江科技大学游戏开发社团'
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
  const email = catalog?.club.email ?? 'hzgftech@protonmail.com'
  const qqGroup = catalog?.club.qqGroup ?? '1130062117'
  const phone = catalog?.club.phone ?? '19730031977'

  return <div className="club-site">
    <a href="#main-content" className="skip-link">{language === 'en' ? 'Skip to main content' : '跳到主要内容'}</a>
    <header className="site-header">
      <a href="/index.html" className="brand" aria-label="幻造工坊首页">
        <img src="/favicon.svg" width="38" height="38" alt="" />
        <span>
          幻造工坊
          <small>{language === 'en' ? 'ZUST Game Dev Workshop' : '浙江科技大学 · 游戏开发社团'}</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label={language === 'en' ? 'Main navigation' : '主导航'}>
        {visibleNavigation.map(item => (
          <a href={item.href} key={item.href} aria-current={active(item.href) ? 'page' : undefined}>{item.title}</a>
        ))}
      </nav>
      <div className="header-actions">
        {isHome && <Button variant="ghost" size="sm" aria-label="Switch language" onClick={toggleLanguage}>{language === 'zh' ? 'EN' : '中文'}</Button>}
        {!online && <span className="offline-indicator" role="status"><WifiOff size={15} /><span>{language === 'en' ? 'Offline' : '离线'}</span></span>}
        <Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Search site' : '全站搜索'} title={language === 'en' ? 'Search · Ctrl K' : '搜索 · Ctrl K'} onClick={() => setSearch(true)}><Search size={18} /></Button>
        <Button variant="ghost" size="icon" aria-label={language === 'en' ? 'Switch theme' : `切换到${theme === 'light' ? '深' : '浅'}色模式`} onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</Button>
        <a href="/join.html" className="join-link">{language === 'en' ? 'Join us' : '加入社团'}<ArrowUpRight size={15} /></a>
        <Button variant="ghost" size="icon" className="mobile-menu" aria-label={language === 'en' ? 'Open navigation' : '打开导航'} onClick={() => setMenu(true)}><Menu /></Button>
      </div>
    </header>

    <main id="main-content" tabIndex={-1} className="site-main">
      <DataState>{isHome ? <HomePage language={language} /> : <Page />}</DataState>
    </main>

    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <a href="/index.html" className="footer-brand">
              <img src="/favicon.svg" width="34" height="34" alt="" />
              <div>
                <strong>幻造工坊</strong>
                <span>{language === 'en' ? 'Zhejiang University of Science & Technology · Game Development Club' : '浙江科技大学幻造工坊游戏开发社团 · 学术科技类'}</span>
              </div>
            </a>
            <p className="footer-motto">
              {language === 'en'
                ? '“Joy in creation, warmth in life — craft playable worlds with heart and hands.”'
                : '“以创为乐，向暖生活，心怀美好，手创未来。”——立足理论，联系实际，将知识学习、项目实践与游戏创作紧密结合。'}
            </p>
            <div className="footer-contact-chips">
              <button type="button" className="footer-chip" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
                <MessageSquare size={14} />
                <span>QQ 群：{qqGroup}</span>
                <Copy size={12} />
              </button>
              <a href={`tel:${phone}`} className="footer-chip">
                <Phone size={14} />
                <span>电话：{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="footer-chip">
                <Mail size={14} />
                <span>{email}</span>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>{language === 'en' ? 'Navigation' : '社团板块'}</h4>
            <ul>
              <li><a href="/index.html">{language === 'en' ? 'Home' : '社团首页'}</a></li>
              <li><a href="/works.html">{language === 'en' ? 'Game Showcase' : '作品展映'}</a></li>
              <li><a href="/members.html">{language === 'en' ? 'Featured Members' : '优秀社员'}</a></li>
              <li><a href="/resources.html">{language === 'en' ? 'Resource Hub' : '教程与资源库'}</a></li>
              <li><a href="/about.html">{language === 'en' ? 'About & Charter' : '关于工坊与章程'}</a></li>
              <li><a href="/join.html">{language === 'en' ? 'Join Workshop' : '招新与加入'}</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{language === 'en' ? 'Community & Partners' : '共创站点与专栏'}</h4>
            <ul>
              <li><a href="https://studio.sayori.org/" target="_blank" rel="noopener noreferrer">XY-Amiya Studio<ArrowUpRight size={13} /></a></li>
              <li><a href="https://blog.sayori.org/" target="_blank" rel="noopener noreferrer">Amiya的书桌 · 开发博客<ArrowUpRight size={13} /></a></li>
              <li><a href="https://nav.sayori.org/" target="_blank" rel="noopener noreferrer">Amiya的游戏开发资源导航<ArrowUpRight size={13} /></a></li>
              <li><a href="https://space.bilibili.com/269723498" target="_blank" rel="noopener noreferrer">就是Helen · B站开发日志<ArrowUpRight size={13} /></a></li>
              <li><a href="https://amiya-desi.itch.io/" target="_blank" rel="noopener noreferrer">itch.io · 在线试玩库<ArrowUpRight size={13} /></a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 浙江科技大学幻造工坊游戏开发社团 · Huanzao Workshop</span>
          <span>零会费 · 零基础友好 · 作品著作权归创作者所有</span>
          <a href="/resources.html">{language === 'en' ? 'Club resources' : '社团资源库'}<ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>

    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetContent side="right" className="mobile-navigation">
        <SheetTitle className="sr-only">社团导航</SheetTitle>
        <SheetDescription className="sr-only">选择想访问的页面。</SheetDescription>
        <span className="mobile-brand">幻造工坊 · ZUST</span>
        <nav aria-label="手机导航">
          {[...navigation, { href: '/join.html', title: '加入我们' }].map(item => (
            <a href={item.href} key={item.href} aria-current={active(item.href) ? 'page' : undefined}>
              {item.title}<ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
        <div className="mobile-contact-box">
          <p>招新交流 QQ 群：<strong>{qqGroup}</strong></p>
          <p>联系电话：<a href={`tel:${phone}`}>{phone}</a></p>
          <a href={`mailto:${email}`} className="mobile-email">{email}</a>
        </div>
      </SheetContent>
    </Sheet>

    <CommandDialog open={search} onOpenChange={setSearch} title="全站搜索" description="搜索并打开资源、作品、社员或页面。" className="search-dialog" showCloseButton={false}>
      <CommandInput placeholder="搜索作品、优秀社员、教程或社团资料…" />
      <CommandList>
        <CommandEmpty>没有找到匹配内容</CommandEmpty>
        <CommandGroup heading="页面">
          {[...navigation, { href: '/join.html', title: '加入我们' }].map(item => (
            <CommandItem key={item.href} value={`page:${item.title}`} onSelect={() => location.assign(item.href)}>
              <ArrowUpRight /><span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {!!catalog?.works.length && <>
          <CommandSeparator />
          <CommandGroup heading="社团作品">
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
          <CommandGroup heading="资源与文档">
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
