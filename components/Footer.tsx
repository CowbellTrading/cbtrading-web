import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Globe, ExternalLink } from 'lucide-react'

const SERVICES = [
  { label: 'Plastic Raw Materials', href: '/plastic-raw-materials' },
  { label: 'Packaging Solutions', href: '/packaging-solutions' },
  { label: 'Forklift Leasing', href: '/forklift-leasing' },
  { label: 'Consulting Services', href: '/consulting-services' },
  { label: 'Machinery Representation', href: '/machinery-representation' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo" id="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* ── Brand ── */}
          <div className="footer-brand">
            <Link href="/" aria-label="Cowbell Keystone — Home" className="footer-logo">
              <Image
                src="/logo-white.svg"
                alt="Cowbell Keystone Trading Ireland Limited Logo"
                width={52}
                height={58}
                style={{ height: 58, width: 'auto' }}
                className="footer-logo-img"
              />
              <div className="footer-logo-text">
                <span className="footer-logo-name">Cowbell Keystone</span>
                <span className="footer-logo-sub">Trading Ireland Limited</span>
              </div>
            </Link>
            <p>
              Specialist trading company connecting European manufacturers and global suppliers
              with businesses across Ireland and Spain.
            </p>
            <div className="footer-social">
              <a
                href="https://linkedin.com/company/cowbell-keystone"
                className="social-btn"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                in
              </a>
              <a
                href="https://x.com/cowbellkeystone"
                className="social-btn"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* ── Services ── */}
          <nav className="footer-col" aria-label="Services">
            <h5>Services</h5>
            <ul>
              {SERVICES.map(s => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Company ── */}
          <nav className="footer-col" aria-label="Company">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/resources">Resources &amp; Downloads</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
            </ul>
          </nav>

          {/* ── Contact ── */}
          <address className="footer-col" style={{ fontStyle: 'normal' }}>
            <h5>Contact</h5>
            <div className="footer-contact-item">
              <span className="footer-contact-icon" aria-hidden="true">
                <MapPin size={15} strokeWidth={1.5} />
              </span>
              <span>Kilmartin Grove, Republic of Ireland, D15 AX0H</span>
            </div>
            <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
              <span className="footer-contact-icon" aria-hidden="true">
                {/* Phone icon from lucide-react if available, but I'll use text or add phone icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              <a href="tel:+353894898717">+353 89 489 8717</a>
            </div>
            <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
              <span className="footer-contact-icon" aria-hidden="true">
                <Mail size={15} strokeWidth={1.5} />
              </span>
              <a href="mailto:info@cb-trading.ie">info@cb-trading.ie</a>
            </div>
            <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
              <span className="footer-contact-icon" aria-hidden="true">
                <Globe size={15} strokeWidth={1.5} />
              </span>
              <span>Serving Ireland, Spain &amp; Europe</span>
            </div>
            <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
              <span className="footer-contact-icon" aria-hidden="true">
                <ExternalLink size={15} strokeWidth={1.5} />
              </span>
              <a href="https://cbtrading.ie" target="_blank" rel="noopener noreferrer">
                cbtrading.ie
              </a>
            </div>
          </address>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <div>
            <p className="footer-copy">
              &copy; {year} Cowbell Keystone Trading Ireland Limited. All rights reserved.
            </p>
            <p className="footer-reg">Registered in Ireland &middot; cbtrading.ie</p>
          </div>
          <nav className="footer-links" aria-label="Legal links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
