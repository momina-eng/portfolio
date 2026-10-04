import {
  sendContactEmail,
  validateContactPayload,
} from '../server/contactMail.mjs'

/**
 * Vercel serverless entry — POST /api/contact
 * Set SMTP_USER, SMTP_PASS, and optional CONTACT_TO in project env vars.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  try {
    const parsed = validateContactPayload(req.body)
    if (!parsed.ok) {
      return res.status(parsed.status).json({ ok: false, error: parsed.error })
    }

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
}
