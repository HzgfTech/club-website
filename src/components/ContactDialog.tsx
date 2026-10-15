import { useState, type FormEvent } from 'react'
import { ArrowLeft, Download, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { publicUrl } from '../lib/catalog'
import { saveText, useStudio } from '../lib/store'

const titles = { contact: '联系工坊', work: '提交游戏作品', member: '提交社员资料', join: '加入幻造工坊' }

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
    summary.setCustomValidity(values.summary.trim().length < 2 ? '请至少输入两个字。' : '')
    if (!event.currentTarget.reportValidity()) return
    if (isPublic) {
      try { publicUrl(values.url) }
      catch { setUrlError('请输入有效的 HTTPS 链接。'); return }
    }
    setUrlError('')
    const subject = `[幻造工坊 · ${titles[kind]}] ${values.title.trim() || values.name.trim()}`
    const body = [
      `姓名 / 昵称：${values.name.trim()}`,
      `联系邮箱：${values.email.trim()}`,
      ...(kind !== 'contact' ? [`${kind === 'work' ? '游戏名称' : '开发方向'}：${values.title.trim()}`] : []),
      ...(isPublic ? [`链接：${values.url.trim()}`] : []),
      '',
      values.summary.trim(),
    ].join('\n')
    setPrepared({ subject, body })
  }

  const close = () => {
    setContact(null)
    setPrepared(null)
    setValues({ name: '', email: '', title: '', url: '', summary: '' })
    setUrlError('')
  }

  return <Dialog open={contact !== null} onOpenChange={open => { if (!open) close() }}>
    <DialogContent className="contact-dialog sm:max-w-[540px]">
      <DialogHeader>
        <DialogTitle>{prepared ? '确认邮件内容' : titles[kind]}</DialogTitle>
        <DialogDescription className="sr-only">{titles[kind]}</DialogDescription>
      </DialogHeader>

      {prepared ? <div className="mail-preview">
        <div className="mail-metadata"><span>收件人</span><strong>{email}</strong></div>
        <div className="mail-metadata"><span>主题</span><strong>{prepared.subject}</strong></div>
        <pre>{prepared.body}</pre>
        {!online && <p className="inline-status">当前离线，可先下载草稿。</p>}
        <div className="dialog-actions">
          <Button variant="ghost" onClick={() => setPrepared(null)}><ArrowLeft />返回修改</Button>
          <Button variant="outline" onClick={() => { saveText('幻造工坊-邮件草稿.txt', `收件人：${email}\n主题：${prepared.subject}\n\n${prepared.body}`); toast.success('草稿已下载') }}><Download />下载草稿</Button>
          <Button asChild><a href={`mailto:${email}?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.body)}`}>打开邮件发送<ArrowUpRight /></a></Button>
        </div>
      </div> : <form onSubmit={prepare} className="contact-form">
        <div className="form-grid">
          <label>姓名 / 昵称<Input autoComplete="name" required pattern={'.*\\S.*'} maxLength={60} value={values.name} onChange={e => update('name', e.target.value)} placeholder="你的称呼" /></label>
          <label>联系邮箱<Input type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" /></label>
        </div>
        {kind !== 'contact' && <>
          <label>{kind === 'work' ? '游戏名称' : '开发方向'}<Input required pattern={'.*\\S.*'} maxLength={120} value={values.title} onChange={e => update('title', e.target.value)} placeholder={kind === 'work' ? '作品名称' : '策划 / 程序 / 美术 / 音效'} /></label>
          {isPublic && (
            <label>
              {kind === 'work' ? '游玩或演示链接' : '个人主页或作品链接'}
              <Input type="url" required maxLength={700} value={values.url} aria-invalid={!!urlError} aria-describedby={urlError ? 'url-error' : undefined} onChange={e => { update('url', e.target.value); setUrlError('') }} placeholder="https://" />
              {urlError && <span id="url-error" className="field-error">{urlError}</span>}
            </label>
          )}
        </>}
        <label>
          {kind === 'contact' ? '留言内容' : kind === 'work' ? '作品简介' : '个人介绍'}
          <Textarea name="summary" required minLength={2} maxLength={1800} rows={4} value={values.summary} onChange={e => { e.currentTarget.setCustomValidity(''); update('summary', e.target.value) }} placeholder={kind === 'work' ? '核心玩法、使用引擎与当前进度' : '写下你的想法'} />
        </label>
        {isPublic && <label className="consent"><input type="checkbox" required />同意在社团网站公开展示以上信息</label>}
        <div className="dialog-actions"><Button type="submit">下一步<ArrowUpRight /></Button></div>
      </form>}
    </DialogContent>
  </Dialog>
}
