import nodemailer from 'nodemailer'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME = 120
const MAX_EMAIL = 200
const MAX_MESSAGE = 5000

/**
 * @param {unknown} body
 * @returns {{ ok: true, data: { name: string, email: string, message: string } } | { ok: false, error: string, status: number }}
 */
export function validateContactPayload(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.', status: 400 }
  }

  const payload = /** @type {Record<string, unknown>} */ (body)

  // Honeypot — bots fill hidden fields; humans leave this empty.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return { ok: true, data: { name: '', email: '', message: '', honeypot: true } }
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''

  if (!name) return { ok: false, error: 'Name is required.', status: 400 }
  if (!email) return { ok: false, error: 'Email is required.', status: 400 }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'Enter a valid email address.', status: 400 }
  }
  if (!message) return { ok: false, error: 'Message is required.', status: 400 }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Message is too long.', status: 400 }
  }

  return { ok: true, data: { name, email, message, honeypot: false } }
}

function requireEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function createTransport() {
  const user = requireEnv('SMTP_USER')
  const pass = requireEnv('SMTP_PASS')
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const secure =
    process.env.SMTP_SECURE === 'false' ? false : port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

/**
 * @param {{ name: string, email: string, message: string }} data
 */
export async function sendContactEmail(data) {
  const user = requireEnv('SMTP_USER')
  const to = process.env.CONTACT_TO?.trim() || user
  const transport = createTransport()

  const subject = `Portfolio message from ${data.name}`
  const text = [
    'New message from the portfolio contact form.',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    '',
    'Message:',
    data.message,
  ].join('\n')

  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#111">
      <p><strong>New portfolio contact message</strong></p>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `

  await transport.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  })
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
