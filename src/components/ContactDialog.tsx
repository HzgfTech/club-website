import { useState, type FormEvent } from 'react'
import { ArrowLeft, Download, Mail, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { publicUrl } from '../lib/catalog'
import { saveText, useStudio } from '../lib/store'

const titles = { contact: '联系工坊', work: '提交游戏作品', member: '社员展示申请', join: '加入幻造工坊' }
export function ContactDialog() {
  const { contact, setContact, catalog, online } = useStudio()
  const kind = contact ?? 'contact'
  const isPublic = kind === 'work' || kind === 'member'
  const [prepared, setPrepared] = useState<{ subject: string; body: string } | null>(null)
  const [values, setValues] = useState({ name: '', email: '', title: '', url: '', summary: '' })
  const [urlError, setUrlError] = useState('')
  const email = catalog?.club.email ?? 'hzgftech@protonmail.com'
  const update = (field: keyof typeof values, value: string) => setValues(v => ({ ...v, [field]: value }))
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const summary = event.currentTarget.elements.namedItem('summary') as HTMLTextAreaElement
    summary.setCustomValidity(values.summary.trim().length < 2 ? '请写下至少两个字。' : '')
    if (!event.currentTarget.reportValidity()) return
    if (isPublic) {
      try { publicUrl(values.url) }
      catch { setUrlError('请输入完整的 HTTPS 链接。'); return }
    }
    setUrlError('')
    const subject = `[幻造工坊 · ${titles[kind]}] ${values.title.trim() || values.name.trim()}`
    const body = [
      `姓名 / 昵称：${values.name.trim()}`, `联系邮箱：${values.email.trim()}`,
      ...(kind !== 'contact' ? [`${kind === 'work' ? '游戏名称' : '开发方向'}：${values.title.trim()}`] : []),
      ...(isPublic ? [`作品 / 主页链接：${values.url.trim()}`] : []),
      '', values.summary.trim(),
      ...(isPublic ? ['', '我同意公开以上展示资料，并确认拥有相关作品的展示权。'] : []),
    ].join('\n')
    setPrepared({ subject, body })
  }
  const close = () => { setContact(null); setPrepared(null); setValues({ name: '', email: '', title: '', url: '', summary: '' }); setUrlError('') }
  return <Dialog open={contact !== null} onOpenChange={open => { if (!open) close() }}>
    <DialogContent className="contact-dialog sm:max-w-[570px]">
      <DialogHeader>
        <div className="dialog-symbol"><Mail size={21} /></div>
        <DialogTitle>{prepared ? '预览邮件草稿' : titles[kind]}</DialogTitle>
        <DialogDescription className="sr-only">填写资料，预览并打开邮件草稿。</DialogDescription>
      </DialogHeader>
      {prepared ? <div className="mail-preview">
        <div className="mail-metadata"><span>收件人</span><strong>{email}</strong></div>
        <div className="mail-metadata"><span>主题</span><strong>{prepared.subject}</strong></div>
        <pre>{prepared.body}</pre>
        {!online && <p className="inline-status">当前离线，可先下载草稿。</p>}
        <div className="dialog-actions">
          <Button variant="ghost" onClick={() => setPrepared(null)}><ArrowLeft />修改</Button>
          <Button variant="outline" onClick={() => { saveText('幻造工坊-邮件草稿.txt', `收件人：${email}\n主题：${prepared.subject}\n\n${prepared.body}`); toast.success('草稿已下载') }}><Download />下载草稿</Button>
          <Button asChild><a href={`mailto:${email}?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.body)}`} onClick={() => toast.info('已请求打开邮件应用，请在应用中发送。')}>打开邮件草稿<ArrowUpRight /></a></Button>
        </div>
      </div> : <form onSubmit={prepare} className="contact-form">
        <div className="form-grid">
          <label>姓名 / 昵称<Input autoComplete="name" required pattern={'.*\\S.*'} maxLength={60} value={values.name} onChange={e => update('name', e.target.value)} placeholder="怎么称呼你" /></label>
          <label>联系邮箱<Input type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" /></label>
        </div>
        {kind !== 'contact' && <>
          <label>{kind === 'work' ? '游戏名称' : '开发方向'}<Input required pattern={'.*\\S.*'} maxLength={120} value={values.title} onChange={e => update('title', e.target.value)} placeholder={kind === 'work' ? '给游戏一个名字' : '设计、程序、美术或音频'} /></label>
          {isPublic && <label>作品 / 主页链接<Input type="url" required maxLength={700} value={values.url} aria-invalid={!!urlError} aria-describedby={urlError ? 'url-error' : undefined} onChange={e => { update('url', e.target.value); setUrlError('') }} placeholder="https://" />{urlError && <span id="url-error" className="field-error">{urlError}</span>}</label>}
        </>}
        <label>{kind === 'contact' ? '想聊些什么' : kind === 'work' ? '游戏简介' : '个人简介'}<Textarea name="summary" required minLength={2} maxLength={1800} rows={4} value={values.summary} onChange={e => { e.currentTarget.setCustomValidity(''); update('summary', e.target.value) }} placeholder={kind === 'work' ? '游戏的玩法、亮点与当前进度' : kind === 'contact' ? '写下你的想法' : '介绍一下你，以及想做的游戏'} /></label>
        {isPublic && <label className="consent"><input type="checkbox" required />同意公开以上展示资料</label>}
        <div className="dialog-actions"><Button type="submit">预览草稿<ArrowUpRight /></Button></div>
      </form>}
    </DialogContent>
  </Dialog>
}
