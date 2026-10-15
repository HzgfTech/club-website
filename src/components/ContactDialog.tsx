import { useState, type FormEvent } from 'react'
import { ArrowLeft, CheckCircle2, Copy, Download, GitPullRequest, RefreshCw, Send, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { publicUrl } from '../lib/catalog'
import { copyText, saveText, useStudio, type SubmissionKind } from '../lib/store'

const titles: Record<SubmissionKind, string> = {
  member: '优秀社员自荐',
  work: '作品投稿',
  join: '加入社团交流',
  contact: '联系我们',
}

const defaultTemplates: Record<SubmissionKind, string> = {
  member: [
    '| 项目 | 内容 |',
    '| --- | --- |',
    '| 个人定位 / 头衔 | 独立游戏开发 / 像素美术 / 游戏编曲 |',
    '| 代表作品（最多2款） | 《作品名》 |',
    '| 核心亮点与经历 | 曾参与 Game Jam / 独立完成某系统或美术制作 |',
    '| 个人简介 | 介绍一下你的开发经历与兴趣方向 |',
  ].join('\n'),
  work: [
    '| 项目 | 内容 |',
    '| --- | --- |',
    '| 作品类别 | 游戏 / 美术画作 / 音乐编曲 |',
    '| 使用引擎或工具 | Godot 4 / Unity 2D / Aseprite / FL Studio |',
    '| 当前状态 | 在线可玩 / 实机演示 / 原创画作 / 原创曲目 |',
    '| 作品介绍 | 玩法说明、美术设定或编曲背景 |',
  ].join('\n'),
  join: '你好！我想加入游戏开发社团交流，我感兴趣的方向和想做的作品是：',
  contact: '',
}

const TRACK_OPTIONS = ['策划', '程序', '美术', '音乐']
const WORK_TYPE_OPTIONS = ['游戏', '美术画作', '音乐编曲']

export function ContactDialog() {
  const { contact, setContact, catalog, online } = useStudio()
  const kind: SubmissionKind = contact ?? 'contact'
  const isPublic = kind === 'work' || kind === 'member'
  const [prepared, setPrepared] = useState<{ subject: string; body: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)
  const [selectedTracks, setSelectedTracks] = useState<string[]>(['程序'])
  const [workType, setWorkType] = useState<string>('游戏')
  const [values, setValues] = useState({
    name: '',
    contactInfo: '',
    email: '',
    title: '',
    url: '',
    summary: '',
  })
  const [urlError, setUrlError] = useState('')

  const clubEmail = catalog?.club.email ?? 'hzgftech@outlook.com'
  const qqGroup = catalog?.club.qqGroup ?? '1130062117'

  const update = (field: keyof typeof values, value: string) => setValues(v => ({ ...v, [field]: value }))

  const switchKind = (next: SubmissionKind) => {
    setContact(next)
    setPrepared(null)
    setSentSuccess(false)
    setUrlError('')
  }

  const toggleTrack = (track: string) => {
    setSelectedTracks(prev =>
      prev.includes(track) ? (prev.length > 1 ? prev.filter(t => t !== track) : prev) : [...prev, track]
    )
  }

  const fillQqEmail = () => {
    const raw = values.email.trim() || values.contactInfo.trim()
    const digits = raw.replace(/\D/g, '')
    if (digits.length >= 5 && digits.length <= 12) {
      update('email', `${digits}@qq.com`)
      toast.success(`已补全为 ${digits}@qq.com`)
    } else {
      toast.info('请先在联系方式或邮箱栏输入你的 QQ 号数字')
    }
  }

  const insertTemplate = () => {
    const tpl = defaultTemplates[kind]
    if (!tpl) return
    update('summary', values.summary.trim() ? `${values.summary}\n\n${tpl}` : tpl)
    toast.success('已插入标准表格模板')
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let finalEmail = values.email.trim()
    if (/^\d{5,12}$/.test(finalEmail)) {
      finalEmail = `${finalEmail}@qq.com`
      update('email', finalEmail)
    }
    const summary = event.currentTarget.elements.namedItem('summary') as HTMLTextAreaElement
    summary.setCustomValidity(values.summary.trim().length < 2 ? '请至少输入两个字。' : '')
    if (!event.currentTarget.reportValidity()) return
    if (isPublic) {
      try { publicUrl(values.url) }
      catch { setUrlError('请输入有效的 HTTPS 链接。'); return }
    }
    setUrlError('')
    const subject = `[社团宣传网站 · ${titles[kind]}] ${values.title.trim() || values.name.trim()}`
    const body = [
      `提交类型：${titles[kind]}`,
      `姓名 / 昵称：${values.name.trim()}`,
      `联系方式（QQ / 微信）：${values.contactInfo.trim()}`,
      `联系邮箱：${finalEmail || '未填写（通过网站在线代发）'}`,
      ...(kind === 'work' ? [`作品类别：${workType}`] : kind !== 'contact' ? [`所属方向：${selectedTracks.join(' / ')}`] : []),
      ...(kind !== 'contact' ? [`${kind === 'work' ? '作品名称' : '角色定位 / 意向'}：${values.title.trim()}`] : []),
      ...(isPublic ? [`作品 / 主页链接：${values.url.trim()}`] : []),
      '',
      values.summary.trim(),
    ].join('\n')
    setPrepared({ subject, body })
  }

  async function sendViaProxy() {
    if (!prepared) return
    setSending(true)
    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: prepared.subject,
          text: prepared.body,
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || '在线代发暂时不可用，请使用本地邮箱或复制发至 QQ 群。')
      }
      setSentSuccess(true)
      toast.success('已通过工坊信使成功发送至社团邮箱！')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '发送失败，请使用本地邮箱发送或加入 QQ 群。')
    } finally {
      setSending(false)
    }
  }

  const close = () => {
    setContact(null)
    setPrepared(null)
    setSentSuccess(false)
    setSending(false)
    setValues({ name: '', contactInfo: '', email: '', title: '', url: '', summary: '' })
    setUrlError('')
  }

  return <Dialog open={contact !== null} onOpenChange={open => { if (!open) close() }}>
    <DialogContent className="contact-dialog sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{sentSuccess ? '发送成功 · 欢迎加入社群' : prepared ? '确认提交内容' : titles[kind]}</DialogTitle>
        <DialogDescription className="sr-only">{titles[kind]}</DialogDescription>
      </DialogHeader>

      {!prepared && !sentSuccess && (
        <div className="dialog-kind-tabs" role="tablist" aria-label="选择提交模板">
          {(['member', 'work', 'join', 'contact'] as SubmissionKind[]).map(item => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={kind === item}
              className={kind === item ? 'active' : ''}
              onClick={() => switchKind(item)}
            >
              {titles[item]}
            </button>
          ))}
        </div>
      )}

      {sentSuccess && prepared ? (
        <div className="mail-success-panel">
          <div className="success-banner">
            <CheckCircle2 size={22} />
            <div>
              <strong>资料已成功代发至社团邮箱（{clubEmail}）</strong>
              <p>我们也强烈推荐你直接加入社团交流 QQ 群，第一时间获取回复与活动通知！</p>
            </div>
          </div>

          <div className="qq-recommend-box">
            <div>
              <span className="work-tile__meta">推荐下一步</span>
              <h3>加入招新交流 QQ 群：{qqGroup}</h3>
              <p>进群后可直接 @管理员 或粘贴下方刚填写的资料表格。</p>
            </div>
            <div className="qq-recommend-actions">
              <button type="button" className="studio-btn studio-btn--primary" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
                <Copy size={15} />复制 QQ 群：{qqGroup}
              </button>
              <button type="button" className="studio-btn studio-btn--secondary" onClick={() => copyText(prepared.body, '所填内容已复制')}>
                <Copy size={15} />复制所填内容
              </button>
            </div>
          </div>

          <div className="dialog-actions">
            <Button variant="outline" onClick={close}>完成并关闭</Button>
          </div>
        </div>
      ) : prepared ? (
        <div className="mail-preview">
          <div className="mail-metadata"><span>收件箱</span><strong>{clubEmail}</strong></div>
          <div className="mail-metadata"><span>主题</span><strong>{prepared.subject}</strong></div>
          <pre>{prepared.body}</pre>

          <div className="qq-inline-tip">
            <span>填写完成后也推荐加入社团 QQ 群：<strong>{qqGroup}</strong></span>
            <button type="button" className="inline-copy-btn" onClick={() => copyText(qqGroup, 'QQ 群号已复制')}>
              复制群号 <Copy size={12} />
            </button>
          </div>

          {!online && <p className="inline-status">当前离线，可先下载草稿或复制内容。</p>}
          <div className="dialog-actions preview-actions">
            <Button variant="ghost" onClick={() => setPrepared(null)} disabled={sending}><ArrowLeft />返回修改</Button>
            <Button variant="outline" onClick={() => { saveText('社团宣传网站-提交资料.md', `# ${prepared.subject}\n\n${prepared.body}`); toast.success('草稿已下载') }}>
              <Download />下载表格
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${clubEmail}?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.body)}`}>
                用本地邮箱发送<ArrowUpRight />
              </a>
            </Button>
            <Button onClick={sendViaProxy} disabled={sending || !online}>
              {sending ? <RefreshCw className="spin" /> : <Send />}
              {sending ? '正在代发…' : '网站直接代发'}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={prepare} className="contact-form">
          <div className="form-grid">
            <label>
              姓名 / 昵称 *
              <Input autoComplete="name" required pattern={'.*\\S.*'} maxLength={60} value={values.name} onChange={e => update('name', e.target.value)} placeholder="你的称呼或公开昵称" />
            </label>
            <label>
              联系方式（QQ / 微信） *
              <Input required pattern={'.*\\S.*'} maxLength={80} value={values.contactInfo} onChange={e => update('contactInfo', e.target.value)} placeholder="如 QQ：123456789" />
            </label>
          </div>

          <div className="email-optional-block">
            <div className="email-label-row">
              <span>联系邮箱（选填 · 不填可由网站直接代发）</span>
              <button type="button" className="qq-email-helper" onClick={fillQqEmail}>
                用 QQ 号一键补全 @qq.com
              </button>
            </div>
            <Input
              type="text"
              autoComplete="email"
              maxLength={254}
              value={values.email}
              onChange={e => update('email', e.target.value)}
              placeholder="选填：如 123456789@qq.com（最通用即 QQ号+@qq.com）"
            />
          </div>

          {kind === 'work' ? (
            <div className="track-selector-row">
              <span className="track-selector-label">作品类别：</span>
              <div className="track-selector-pills">
                {WORK_TYPE_OPTIONS.map(t => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={workType === t}
                    className={workType === t ? 'active' : ''}
                    onClick={() => setWorkType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : kind !== 'contact' && (
            <div className="track-selector-row">
              <span className="track-selector-label">所属方向（可多选）：</span>
              <div className="track-selector-pills">
                {TRACK_OPTIONS.map(t => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={selectedTracks.includes(t)}
                    className={selectedTracks.includes(t) ? 'active' : ''}
                    onClick={() => toggleTrack(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {kind !== 'contact' && (
            <div className={isPublic ? 'form-grid' : ''}>
              <label>
                {kind === 'work' ? '作品名称 *' : '角色定位 / 意向标题 *'}
                <Input required pattern={'.*\\S.*'} maxLength={120} value={values.title} onChange={e => update('title', e.target.value)} placeholder={kind === 'work' ? '游戏、画作或编曲名称（每人最多 2 款）' : '如：Godot 独立开发 · 像素美术'} />
              </label>
              {isPublic && (
                <label>
                  {kind === 'work' ? '作品链接（HTTPS） *' : '个人主页 / B站 / GitHub（HTTPS） *'}
                  <Input type="url" required maxLength={700} value={values.url} aria-invalid={!!urlError} aria-describedby={urlError ? 'url-error' : undefined} onChange={e => { update('url', e.target.value); setUrlError('') }} placeholder="https://" />
                  {urlError && <span id="url-error" className="field-error">{urlError}</span>}
                </label>
              )}
            </div>
          )}

          <label>
            <div className="email-label-row">
              <span>{kind === 'contact' ? '留言内容 *' : kind === 'work' ? '作品简介与说明 *' : '个人简历 / 亮点自荐 *'}</span>
              {(kind === 'member' || kind === 'work') && (
                <button type="button" className="qq-email-helper" onClick={insertTemplate}>
                  + 插入默认邮件表格模板
                </button>
              )}
            </div>
            <Textarea
              name="summary"
              required
              minLength={2}
              maxLength={2400}
              rows={5}
              value={values.summary}
              onChange={e => { e.currentTarget.setCustomValidity(''); update('summary', e.target.value) }}
              placeholder={
                kind === 'work'
                  ? '介绍游戏玩法、美术设定或编曲背景（也可点击右上角“插入默认邮件表格模板”）'
                  : kind === 'member'
                    ? '介绍你的开发方向、代表作（最多 2 款）与创作经历（可点击右上角插入表格模板）'
                    : '写下你的想法'
              }
            />
          </label>

          {isPublic && <label className="consent"><input type="checkbox" required />同意在社团网站公开展示以上资料</label>}

          <div className="dialog-actions">
            <Button variant="outline" asChild>
              <a href="https://github.com/HzgfTech/club-website/pulls" target="_blank" rel="noopener noreferrer">
                <GitPullRequest size={15} />GitHub 提交 PR
              </a>
            </Button>
            <Button type="submit">生成并发送<ArrowUpRight /></Button>
          </div>
        </form>
      )}
    </DialogContent>
  </Dialog>
}
