import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout'
import { Button, SectionHeading } from '@/components/ui'
import { contact } from '@/content'
import { sectionItem, sectionStagger, viewportOnce } from '@/motion'
import { ContactGlobeCanvas } from '@/scenes/contact'
import './Contact.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormState = {
  name: string
  email: string
  message: string
  website: string
}

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const contactChannels = [
  {
    id: 'linkedin',
    label: contact.linkedin.label,
    href: contact.linkedin.href,
  },
  {
    id: 'github',
    label: contact.github.label,
    href: contact.github.href,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${contact.email}`,
  },
]

export function Contact() {
  const reduceMotion = !!useReducedMotion()
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : sectionItem
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : sectionStagger

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_REGEX.test(values.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      })

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean
        error?: string
      } | null

      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.error || 'Unable to send message right now. Please try again later.',
        )
      }

      setStatus('success')
      setStatusMessage('Message sent. Thank you — I will get back to you soon.')
      setForm({ name: '', email: '', message: '', website: '' })
      setTouched(false)
      setErrors({})
    } catch (error) {
      setStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now. Please try again later.',
      )
    }
  }

  const sending = status === 'sending'

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact__atmosphere" aria-hidden="true" />

      <Container>
        <motion.div
          className="contact__layout"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="contact__form-col" variants={item}>
            <SectionHeading id="contact-heading">Contact.</SectionHeading>
            <p className="contact__lede">
              Open to opportunities, collaborations, and conversations about
              full-stack development, applied AI, and practical software
              delivery.
            </p>

            <form className="contact__form" onSubmit={onSubmit} noValidate>
              {/* Honeypot — leave empty */}
              <label className="contact__honeypot" aria-hidden="true">
                <span>Website</span>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, website: event.target.value }))
                  }
                />
              </label>

              <label className="contact__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  disabled={sending}
                  onChange={(event) => {
                    const name = event.target.value
                    setForm((prev) => ({ ...prev, name }))
                    if (touched) setErrors(validate({ ...form, name }))
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name ? (
                  <span id="contact-name-error" className="contact__error">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label className="contact__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  disabled={sending}
                  onChange={(event) => {
                    const email = event.target.value
                    setForm((prev) => ({ ...prev, email }))
                    if (touched) setErrors(validate({ ...form, email }))
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                />
                {errors.email ? (
                  <span id="contact-email-error" className="contact__error">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label className="contact__field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Share a project idea, role, or collaboration opportunity..."
                  value={form.message}
                  disabled={sending}
                  onChange={(event) => {
                    const message = event.target.value
                    setForm((prev) => ({ ...prev, message }))
                    if (touched) setErrors(validate({ ...form, message }))
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                />
                {errors.message ? (
                  <span id="contact-message-error" className="contact__error">
                    {errors.message}
                  </span>
                ) : null}
              </label>

              <Button
                type="submit"
                className="contact__submit"
                disabled={sending}
              >
                {sending ? 'Sending…' : 'Send Message'}
                {!sending ? (
                  <span className="contact__submit-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </Button>

              {statusMessage ? (
                <p
                  className={[
                    'contact__status',
                    status === 'success' ? 'contact__status--success' : '',
                    status === 'error' ? 'contact__status--error' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="status"
                  aria-live="polite"
                >
                  {statusMessage}
                </p>
              ) : null}
            </form>

            <ul className="contact__channels">
              {contactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    className="contact__channel"
                    href={channel.href}
                    {...(channel.id !== 'email'
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="contact__visual" variants={item}>
            <ContactGlobeCanvas />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
