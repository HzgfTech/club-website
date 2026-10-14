import { ArrowUpRight, Copy, Mail, Code2, Paintbrush, Music2, Puzzle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { PageHeading } from '../components/shared'
import { copyText, useStudio } from '../lib/store'

export function AboutPage() {
  const { catalog, setContact } = useStudio()
  return <div className="about-page">
    <PageHeading title="为游戏里的世界，留一个位置。" description="幻造工坊 · 游戏开发社团" />
    <section className="about-intro"><div className="about-mark"><img src="/favicon.svg" alt="" /></div><div><h2>{catalog!.club.name}</h2><p>我们是游戏开发社团。<br />设计玩法，写下代码，赋予世界画面与声音。</p><div className="about-links"><a href="/works.html">社员作品<ArrowUpRight size={17} /></a><a href="/members.html">优秀社员<ArrowUpRight size={17} /></a><a href="/join.html">加入我们<ArrowUpRight size={17} /></a></div></div></section>
    <section className="contact-section"><div className="contact-section-heading"><Mail size={24} /><h2>从一封邮件开始。</h2></div><p>加入社团、作品投稿、交流合作。</p><div className="email-line"><a href={`mailto:${catalog!.club.email}`}>{catalog!.club.email}</a><Button size="icon" variant="ghost" aria-label="复制社团邮箱" title="复制邮箱" onClick={() => copyText(catalog!.club.email, '邮箱已复制')}><Copy /></Button></div><div className="about-contact-actions"><Button onClick={() => setContact('contact')}>写信给工坊<ArrowUpRight /></Button><Button variant="outline" asChild><a href="/resource.html?id=club-contact">保存联系卡</a></Button></div></section>
  </div>
}
const directions = [
  { id: 'game-design', title: '游戏设计', brief: '玩法、关卡、叙事', text: '想一套好玩的规则，搭一段有意思的关卡，让每次选择都有回应。', icon: Puzzle },
  { id: 'programming', title: '程序开发', brief: '机制、系统、工具', text: '把想法变成可以运行的游戏，让角色移动，让世界响应玩家。', icon: Code2 },
  { id: 'visual-art', title: '视觉创作', brief: '角色、场景、动画', text: '从像素到三维，从一张草图到一个世界，找到属于游戏的视觉语言。', icon: Paintbrush },
  { id: 'audio', title: '声音创作', brief: '音乐、音效、氛围', text: '写一段旋律，做一个让操作有质感的音效，让游戏听起来也有生命。', icon: Music2 },
]
export function JoinPage() {
  const { setContact, catalog } = useStudio()
  return <div className="join-page">
    <section className="join-intro"><div><p className="intro-label">加入幻造工坊</p><h1>不只玩游戏。<br />来创造一个。</h1></div><div><p>带上一个想法，或一份好奇。<br />我们想听听，你想做怎样的游戏。</p><Button size="lg" onClick={() => setContact('join')}>介绍一下你<ArrowUpRight /></Button></div></section>
    <section id="directions" className="directions-section"><div className="editorial-heading"><div><span className="section-kicker">从你喜欢的地方开始</span><h2>一个游戏，<br />不止一种创作。</h2></div><p>找到你想投入的方向。</p></div><div className="direction-list">{directions.map(({ id, title, brief, text, icon: Icon }, i) => <details id={id} key={title} open={i === 0 || location.hash === '#' + id}><summary><Icon size={23} strokeWidth={1.5} /><h3>{title}</h3><span>{brief}</span><span className="detail-toggle">+</span></summary><p>{text}</p></details>)}</div></section>
    <section className="join-next"><h2>你的想法，<br />从这里出发。</h2><div><p>告诉我们你喜欢的开发方向，以及想做的游戏。</p><Button size="lg" onClick={() => setContact('join')}>准备加入邮件<ArrowUpRight /></Button><a className="plain-link" href={`mailto:${catalog!.club.email}`}>{catalog!.club.email}<ArrowUpRight size={16} /></a></div></section>
  </div>
}
