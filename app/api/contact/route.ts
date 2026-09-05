import { NextResponse } from 'next/server'

interface ContactBody {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
  _hp: string
}

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

// In-memory rate limiting (resets on cold start — sufficient for serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT_MAX) return false
    entry.count++
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  }
  return true
}

function buildInternalEmail(data: Omit<ContactBody, '_hp'>): string {
  const { name, company, email, phone, service, message } = data
  const submitted = new Date().toLocaleString('en-IE', {
    timeZone: 'Europe/Dublin',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-weight:600;color:#374151;width:140px;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
          <td style="padding:10px 16px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
        </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:640px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#0D3B2E;padding:28px 32px;display:flex;align-items:center;gap:16px;">
      <div>
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);">Cowbell Keystone Trading Ireland</p>
        <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;font-weight:600;">New Website Enquiry</h1>
      </div>
    </div>

    <!-- Alert strip -->
    <div style="background:#16B583;padding:10px 32px;">
      <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff;">
        Action required — please respond within 1 business day
      </p>
    </div>

    <!-- Enquiry details -->
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:14px;">
        ${row('Name', name)}
        ${row('Company', company || '—')}
        ${row('Email', `<a href="mailto:${email}" style="color:#16B583;">${email}</a>`)}
        ${row('Phone', phone || '—')}
        ${row('Subject', service || 'General Enquiry')}
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#374151;width:140px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Message</td>
          <td style="padding:10px 16px;color:#111827;white-space:pre-line;border-bottom:1px solid #f3f4f6;">${message}</td>
        </tr>
        ${row('Submitted', submitted)}
        ${row('Website', '<a href="https://www.cb-trading.ie" style="color:#16B583;">https://www.cb-trading.ie</a>')}
      </table>

      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your enquiry — Cowbell Keystone Trading"
           style="display:inline-block;padding:12px 28px;background:#0D3B2E;color:#ffffff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:600;">
          Reply to ${name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        This notification was sent from the contact form at
        <a href="https://www.cb-trading.ie" style="color:#16B583;">www.cb-trading.ie</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildAutoResponseEmail(name: string, service: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Thank you for contacting Cowbell Keystone Trading Ireland</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:'Inter',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <div style="max-width:600px;margin:40px auto 60px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.10);">

    <!-- Header -->
    <div style="background:#0D3B2E;padding:36px 40px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td>
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);">
              Cowbell Keystone Trading Ireland Limited
            </p>
            <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;line-height:1.3;">
              Thank you for your enquiry
            </h1>
          </td>
          <td style="text-align:right;vertical-align:middle;width:48px;">
            <div style="width:44px;height:44px;background:rgba(22,181,131,.2);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">
              <span style="font-size:22px;">✉</span>
            </div>
          </td>
        </tr>
      </table>
      <!-- Green accent line -->
      <div style="margin-top:24px;height:2px;background:rgba(22,181,131,.4);border-radius:2px;"></div>
    </div>

    <!-- Body -->
    <div style="padding:40px 40px 32px;">

      <p style="margin:0 0 20px;font-size:16px;color:#111827;line-height:1.6;">
        Dear <strong>${name}</strong>,
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;">
        Thank you for contacting <strong>Cowbell Keystone Trading Ireland</strong>.
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;">
        We have successfully received your enquiry${service ? ` regarding <strong>${service}</strong>` : ''} and appreciate your interest in our products and services.
      </p>

      <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.75;">
        Our team is reviewing your message and will respond as soon as possible — typically within one business day.
      </p>

      <!-- Info box -->
      <div style="background:#f0faf6;border:1px solid #d1fae5;border-left:3px solid #16B583;border-radius:0 6px 6px 0;padding:16px 20px;margin-bottom:32px;">
        <p style="margin:0;font-size:13px;color:#065f46;line-height:1.6;">
          <strong>Need an urgent response?</strong><br>
          Reply directly to this email or contact us at
          <a href="mailto:info@cb-trading.ie" style="color:#16B583;font-weight:600;">info@cb-trading.ie</a>
        </p>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:#e5e7eb;margin:0 0 28px;"></div>

      <!-- Sign-off -->
      <p style="margin:0 0 6px;font-size:15px;color:#374151;line-height:1.6;">
        We look forward to assisting you.
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;">Kind regards,</p>

      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0D3B2E;">
        Cowbell Keystone Trading Ireland
      </p>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.7;">
        Kilmartin Grove, Dublin, D15 AX0H, Ireland<br>
        <a href="tel:+353894898717" style="color:#6b7280;text-decoration:none;">+353 89 489 8717</a><br>
        <a href="mailto:info@cb-trading.ie" style="color:#16B583;">info@cb-trading.ie</a> &nbsp;·&nbsp;
        <a href="https://www.cb-trading.ie" style="color:#16B583;">www.cb-trading.ie</a>
      </p>
    </div>

    <!-- Footer bar -->
    <div style="background:#0D3B2E;padding:20px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);">
        Cowbell Keystone Trading Ireland Limited
      </p>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,.25);">
        Registered in Ireland · VAT IE · cb-trading.ie
      </p>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08);">
        <p style="margin:0;font-size:10px;color:rgba(255,255,255,.2);line-height:1.6;">
          This email was sent in response to a contact form submission at www.cb-trading.ie.<br>
          Please do not reply to this email if you did not submit a contact form.
        </p>
      </div>
    </div>

  </div>

</body>
</html>`
}

export async function POST(req: Request) {
  // ── Rate limiting ─────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
  }

  // ── Parse body ────────────────────────────────────────────────
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, company, email, phone, service, message, _hp } = body

  // ── Honeypot ──────────────────────────────────────────────────
  if (_hp && _hp.trim() !== '') {
    return NextResponse.json({ ok: true }) // silently discard spam
  }

  // ── Server-side validation ────────────────────────────────────
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 422 })
  if (!email?.trim()) return NextResponse.json({ error: 'Email is required' }, { status: 422 })
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 422 })
  if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 422 })
  if (message.length > 2000) return NextResponse.json({ error: 'Message too long' }, { status: 422 })
  if (phone && phone.length > 50) return NextResponse.json({ error: 'Phone too long' }, { status: 422 })

  // ── Send emails via Resend ────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY
  // Single production destination — only info@cb-trading.ie
  const TO_EMAIL = 'info@cb-trading.ie'

  if (resendKey && resendKey !== 'your_resend_api_key_here') {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      // 1. Internal notification → business inbox
      await resend.emails.send({
        from: 'Website Enquiry <noreply@cb-trading.ie>',
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New Enquiry: ${service || 'General'} — ${name}`,
        html: buildInternalEmail({ name, company, email, phone, service, message }),
      })

      // 2. Auto-response confirmation → customer
      await resend.emails.send({
        from: 'Cowbell Keystone Trading Ireland <info@cb-trading.ie>',
        to: [email],
        replyTo: TO_EMAIL,
        subject: 'Thank you for contacting Cowbell Keystone Trading Ireland',
        html: buildAutoResponseEmail(name, service),
      })

    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Contact] Resend error:', err)
      } else {
        console.error('[Contact] Email sending failed')
      }
      return NextResponse.json(
        { error: "We couldn't send your enquiry at the moment. Please try again shortly." },
        { status: 500 }
      )
    }
  } else {
    // Dev fallback — log to console, don't fail the request
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact] RESEND_API_KEY not set — would have sent to:', TO_EMAIL)
      console.log({ name, company, email, phone, service, message })
    }
  }

  return NextResponse.json({ ok: true })
}
