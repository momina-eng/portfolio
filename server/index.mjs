import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {
  sendContactEmail,
  validateContactPayload,
} from './contactMail.mjs'

const app = express()
const port = Number(process.env.CONTACT_API_PORT || 8787)

/** @type {Map<string, { count: number, resetAt: number }>} */
const rateBucket = new Map()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 15 * 60 * 1000

app.use(
  cors({
    origin: process.env.CONTACT_CORS_ORIGIN?.split(',').map((s) => s.trim()) || true,
  }),
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown'

    if (!allowRequest(ip)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many messages. Please try again later.',
      })
    }

    const parsed = validateContactPayload(req.body)
    if (!parsed.ok) {
      return res.status(parsed.status).json({ ok: false, error: parsed.error })
    }

    // Silent success for honeypot spam
    if (parsed.data.honeypot) {
      return res.status(200).json({ ok: true })
    }

    await sendContactEmail(parsed.data)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('[contact]', error)
    return res.status(500).json({
      ok: false,
      error: 'Unable to send message right now. Please try again later.',
    })
  }
})

function allowRequest(ip) {
  const now = Date.now()
  const current = rateBucket.get(ip)
  if (!current || current.resetAt <= now) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (current.count >= RATE_LIMIT) return false
  current.count += 1
  return true
}

app.listen(port, () => {
  console.log(`[contact-api] listening on http://localhost:${port}`)
})
