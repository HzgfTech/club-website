const CLUB_EMAIL = 'hzgftech@protonmail.com'
const MAIL_API_URL = 'https://mail.desiakuma.cc.cd/v1/messages'

export async function onRequestPost(context) {
  const apiKey = context.env?.DESIAKUMA_MAIL_KEY
  if (!apiKey) {
    return Response.json(
      { ok: false, error: '在线代发服务尚未配置密钥，请使用本地邮箱或加入 QQ 群联系。' },
      { status: 503 }
    )
  }

  let payload
  try {
    payload = await context.request.json()
  } catch {
    return Response.json({ ok: false, error: '请求格式不正确。' }, { status: 400 })
  }

  const subject = typeof payload?.subject === 'string' ? payload.subject.trim() : ''
  const text = typeof payload?.text === 'string' ? payload.text.trim() : ''

  if (!subject || subject.length > 200 || text.length < 4 || text.length > 6000) {
    return Response.json({ ok: false, error: '请填写完整的标题与内容后再发送。' }, { status: 400 })
  }

  try {
    const upstream = await fetch(MAIL_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: CLUB_EMAIL,
        subject,
        text,
      }),
    })

    if (!upstream.ok) {
      return Response.json(
        { ok: false, error: `发送服务暂时繁忙（${upstream.status}），可复制内容到 QQ 群或使用本地邮箱发送。` },
        { status: upstream.status === 429 ? 429 : 502 }
      )
    }

    return Response.json({ ok: true, status: 'ok' })
  } catch {
    return Response.json(
      { ok: false, error: '网络连接异常，请稍后重试或直接加入社团 QQ 群联系。' },
      { status: 502 }
    )
  }
}
