import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { MapPin, Mail, Globe, ExternalLink, Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Cowbell Keystone Trading Ireland Limited. Request a quote, ask about our services, or discuss your supply chain needs.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const address = settings?.address1 && settings?.city 
    ? `${settings.address1}${settings.address2 ? `, ${settings.address2}` : ''}, ${settings.city}${settings.country ? `, ${settings.country}` : ''}`
    : 'Kilmartin Grove, Republic of Ireland, D15 AX0H'
  
  const phone = settings?.phone || '+353 89 489 8717'
  const email = settings?.email || 'info@cb-trading.ie'

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1>Get in Touch</h1>
          <p className="lead">
            Whether you have a specific sourcing requirement or just want to explore how we can help,
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Layout ── */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">

            {/* ── Left: Details ── */}
            <div>
              <span className="section-label">Contact Details</span>
              <h2 style={{ marginBottom: '2.5rem' }}>How to Reach Us</h2>

              <div className="contact-detail-item">
                <div className="contact-icon" aria-hidden="true">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-label">Location</p>
                  <p className="contact-value">{address}</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon" aria-hidden="true">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon" aria-hidden="true">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon" aria-hidden="true">
                  <Globe size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-label">Markets Served</p>
                  <p className="contact-value">Ireland, Spain &amp; Europe</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon" aria-hidden="true">
                  <ExternalLink size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-label">Website</p>
                  <p className="contact-value">
                    <a href="https://cbtrading.ie" target="_blank" rel="noopener noreferrer">
                      cbtrading.ie
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'var(--green-050)', borderRadius: 'var(--r-md)', border: '1px solid var(--green-100)' }}>
                <h4 style={{ color: 'var(--green-800)', marginBottom: '.625rem' }}>Response Time</h4>
                <p style={{ margin: 0, fontSize: '.9375rem' }}>
                  We aim to respond to all enquiries within one business day. For urgent matters,
                  email us directly at{' '}
                  <a href={`mailto:${email}`} style={{ color: 'var(--green-700)', fontWeight: 600 }}>
                    {email}
                  </a>.
                </p>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div>
              <ContactForm title="Send an Enquiry" />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
