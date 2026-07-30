'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const CONTACT_EMAIL = 'info@cb-trading.ie'

const SERVICE_OPTIONS = [
  'Plastic Raw Materials',
  'Packaging Solutions',
  'Forklift Leasing',
  'Consulting Services',
  'Machinery Representation',
  'General Enquiry',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface Props {
  title?: string
}

export default function ContactForm({ title = 'Send an Enquiry' }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [savedData, setSavedData] = useState<Record<string, string> | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {}
    if (!String(data.get('name') ?? '').trim())    errs.name    = 'Full name is required'
    const email = String(data.get('email') ?? '').trim()
    if (!email)                                     errs.email   = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address'
    const msg = String(data.get('message') ?? '').trim()
    if (!msg)                                       errs.message = 'Please include a message'
    else if (msg.length > 2000)                     errs.message = 'Message must be under 2000 characters'
    const phone = String(data.get('phone') ?? '').trim()
    if (phone && !/^[+\d\s\-().]{0,50}$/.test(phone)) errs.phone = 'Enter a valid phone number'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Scroll to first error
      const firstErr = e.currentTarget.querySelector('.error')
      ;(firstErr as HTMLElement)?.focus()
      return
    }
    setErrors({})
    setState('submitting')

    const payload = {
      name:    String(data.get('name')    ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      email:   String(data.get('email')   ?? '').trim(),
      phone:   String(data.get('phone')   ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      _hp:     String(data.get('_hp')     ?? ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSavedData(null)
        setState('success')
        formRef.current?.reset()
      } else {
        // Preserve form data so user doesn't lose their input
        setSavedData(payload)
        setState('error')
      }
    } catch {
      setSavedData(payload)
      setState('error')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="form-wrap" id="contact-form-success" role="status" aria-live="polite">
        <div className="form-success show">
          <div style={{
            width: 56, height: 56, background: 'var(--green-100)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 1.25rem',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="var(--green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 style={{ color: 'var(--green-800)', marginBottom: '.625rem' }}>
            ✓ Thank you.
          </h3>
          <p style={{ marginBottom: '.5rem', fontSize: '1rem', color: 'var(--gray-700)' }}>
            Your enquiry has been successfully submitted.
          </p>
          <p style={{ fontSize: '.875rem', color: 'var(--gray-500)' }}>
            We have also sent a confirmation email to your inbox.
            Our team will respond within one business day.
          </p>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="form-wrap" id="contact-form-wrap">
      <p className="form-title">{title}</p>

      {/* Error banner — preserves entered data */}
      {state === 'error' && (
        <div
          role="alert"
          style={{
            padding: '.875rem 1rem',
            background: '#fff5f5',
            border: '1px solid #fed7d7',
            borderLeft: '3px solid #c53030',
            borderRadius: 'var(--r-sm)',
            marginBottom: '1.25rem',
          }}
        >
          <p style={{ margin: 0, fontSize: '.875rem', color: '#c53030', fontWeight: 600 }}>
            We couldn&apos;t send your enquiry at the moment.
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '.8125rem', color: '#742a2a' }}>
            Please try again shortly or email us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#c53030', fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
            {'. '}Your message has been preserved below.
          </p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact enquiry form">

        {/* Honeypot — hidden from humans, catches bots */}
        <input
          className="honeypot"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-name">
              Full Name <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              className={`form-control${errors.name ? ' error' : ''}`}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'cf-name-err' : undefined}
              defaultValue={savedData?.name}
            />
            {errors.name && (
              <span id="cf-name-err" className="field-error" role="alert">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-company">Company</label>
            <input
              id="cf-company"
              name="company"
              type="text"
              className="form-control"
              autoComplete="organization"
              defaultValue={savedData?.company}
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-email">
              Email <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              className={`form-control${errors.email ? ' error' : ''}`}
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'cf-email-err' : undefined}
              defaultValue={savedData?.email}
            />
            {errors.email && (
              <span id="cf-email-err" className="field-error" role="alert">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-phone">
              Phone
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              className={`form-control${errors.phone ? ' error' : ''}`}
              autoComplete="tel"
              aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
              defaultValue={savedData?.phone}
            />
            {errors.phone && (
              <span id="cf-phone-err" className="field-error" role="alert">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-service">Subject / Service of Interest</label>
          <select id="cf-service" name="service" className="form-control" defaultValue={savedData?.service}>
            <option value="">Select a subject…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-message">
            Message <span className="form-required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            className={`form-control${errors.message ? ' error' : ''}`}
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'cf-message-err' : undefined}
            defaultValue={savedData?.message}
            maxLength={2000}
          />
          {errors.message && (
            <span id="cf-message-err" className="field-error" role="alert">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          id="cf-submit"
          className="form-submit"
          disabled={state === 'submitting'}
          aria-live="polite"
          aria-busy={state === 'submitting'}
        >
          {state === 'submitting' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '.625rem', justifyContent: 'center' }}>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                style={{ animation: 'cf-spin 0.8s linear infinite' }}
                aria-hidden="true"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Sending…
            </span>
          ) : (
            'Send Enquiry →'
          )}
        </button>

        <style>{`
          @keyframes cf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>

        <p className="form-privacy">
          Your information is processed in accordance with our{' '}
          <Link href="/privacy">Privacy Policy</Link>. We will not share your details with third parties.
        </p>
      </form>
    </div>
  )
}
