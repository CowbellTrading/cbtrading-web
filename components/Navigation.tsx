'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Recycle, Package, Tractor, BarChart2, Settings,
  ChevronDown, Menu, X,
  MapPin, Globe, Container, ShieldCheck, Leaf,
} from 'lucide-react'

const TRUST_H = 40   // keep in sync with CSS .trust-bar height

const NAV_SERVICES = [
  { label: 'Plastic Raw Materials',    href: '/plastic-raw-materials',    icon: <Recycle   size={15} strokeWidth={1.5} /> },
  { label: 'Packaging Solutions',      href: '/packaging-solutions',      icon: <Package   size={15} strokeWidth={1.5} /> },
  { label: 'Forklift Leasing',         href: '/forklift-leasing',         icon: <Tractor   size={15} strokeWidth={1.5} /> },
  { label: 'Consulting Services',      href: '/consulting-services',      icon: <BarChart2 size={15} strokeWidth={1.5} /> },
  { label: 'Machinery Representation', href: '/machinery-representation', icon: <Settings  size={15} strokeWidth={1.5} /> },
]

const TRUST_ITEMS = [
  { icon: <MapPin      size={11} strokeWidth={1.5} />, label: 'Ireland Based' },
  { icon: <Globe       size={11} strokeWidth={1.5} />, label: 'Ireland & Spain' },
  { icon: <Container   size={11} strokeWidth={1.5} />, label: 'Global Supplier Network' },
  { icon: <Leaf        size={11} strokeWidth={1.5} />, label: 'Sustainable Solutions' },
  { icon: <ShieldCheck size={11} strokeWidth={1.5} />, label: 'Customs & Logistics Expertise' },
]

export default function Navigation() {
  const [hasShadow,  setHasShadow]  = useState(false)  // shows when trust bar has scrolled off
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen,   setDropOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > TRUST_H)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const close = () => { setMobileOpen(false); setDropOpen(false) }

  return (
    <>
      {/* ────────────────────────────────────────────────
          TRUST BAR — position: relative (natural flow)
          Scrolls away normally; no fixed/absolute tricks
      ──────────────────────────────────────────────── */}
      <div className="trust-bar" role="banner" aria-label="Company credentials">
        <div className="trust-bar-inner">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <div className="trust-item">
                <span className="trust-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </div>
              {i < TRUST_ITEMS.length - 1 && (
                <div className="trust-sep" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          MAIN NAV — position: sticky top:0
          Stays visible as trust bar scrolls off.
          Always solid background — no transparency games.
      ──────────────────────────────────────────────── */}
      <header
        id="navbar"
        className={`site-nav ${hasShadow ? 'nav-scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">

          {/* ── Logo ── */}
          <Link href="/" onClick={close} className="nav-logo" aria-label="Cowbell Keystone — home">
            <Image
              src="/logo.svg"
              alt="Cowbell Keystone Logo"
              width={38}
              height={40}
              priority
              className="nav-logo-img"
            />
            <div className="nav-logo-text">
              <span className="nav-logo-name">Cowbell Keystone</span>
              <span className="nav-logo-sub">Trading Ireland Limited</span>
            </div>
          </Link>

          {/* ── Desktop navigation ── */}
          <nav className="desktop-nav" aria-label="Primary links">
            <Link href="/about"     className="nav-link">About</Link>

            {/* Services dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                className="nav-link nav-dropdown-btn"
                aria-haspopup="true"
                aria-expanded={dropOpen}
              >
                Services
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  aria-hidden="true"
                  style={{
                    transition: 'transform 200ms ease',
                    transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className={`nav-dropdown-menu ${dropOpen ? 'open' : ''}`}
                role="menu"
              >
                {NAV_SERVICES.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setDropOpen(false)}
                  >
                    <span className="nav-dropdown-icon" aria-hidden="true">{s.icon}</span>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/resources" className="nav-link">Resources</Link>

            <Link href="/contact" className="btn btn-primary btn-sm nav-cta">
              Get a Quote
            </Link>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
      >
        <nav aria-label="Mobile navigation">
          {[
            { label: 'Home',      href: '/' },
            { label: 'About',     href: '/about' },
            { label: 'Resources', href: '/resources' },
            { label: 'Contact',   href: '/contact' },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={close} className="mobile-nav-link">
              {l.label}
            </Link>
          ))}

          <div className="mobile-services-section">
            <p className="mobile-services-label">Services</p>
            {NAV_SERVICES.map(s => (
              <Link key={s.href} href={s.href} onClick={close} className="mobile-service-link">
                <span className="mobile-service-icon" aria-hidden="true">{s.icon}</span>
                {s.label}
              </Link>
            ))}
          </div>

          <Link href="/contact" onClick={close} className="btn btn-primary mobile-cta">
            Get a Quote
          </Link>
        </nav>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════
           TRUST BAR
        ═══════════════════════════════════════════ */
        .trust-bar {
          position: relative;
          background: #04130D;
          border-bottom: 1px solid rgba(255,255,255,.05);
          z-index: 1001;
        }
        .trust-bar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: .4rem;
          padding: 0 1.125rem;
          font-size: .6875rem;
          font-weight: 500;
          color: rgba(255,255,255,.5);
          letter-spacing: .02em;
          white-space: nowrap;
        }
        .trust-icon { display: flex; align-items: center; color: #16B583; }
        .trust-sep  { width: 1px; height: 11px; background: rgba(255,255,255,.1); flex-shrink: 0; }

        /* ═══════════════════════════════════════════
           MAIN NAVIGATION — STICKY
        ═══════════════════════════════════════════ */
        .site-nav {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 80px;
          background: #0D3B2E;
          border-bottom: 1px solid rgba(255,255,255,.07);
          transition: box-shadow 300ms ease;
        }
        /* Elevate nav when trust bar has scrolled away */
        .nav-scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,.25), 0 1px 0 rgba(255,255,255,.06);
        }

        /* ═══════════════════════════════════════════
           NAV INNER LAYOUT
        ═══════════════════════════════════════════ */
        .nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
        }

        /* ═══════════════════════════════════════════
           LOGO
        ═══════════════════════════════════════════ */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: .875rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-img {
          height: 40px;
          width: auto;
          flex-shrink: 0;
          object-fit: contain;
          transition: height 200ms ease;
        }
        .nav-logo-text { line-height: 1.25; }
        .nav-logo-name {
          display: block;
          font-size: .8125rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: .07em;
          font-family: 'Inter', sans-serif;
        }
        .nav-logo-sub {
          display: block;
          font-size: .625rem;
          color: rgba(255,255,255,.5);
          letter-spacing: .04em;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
          margin-top: 1px;
        }

        /* ═══════════════════════════════════════════
           DESKTOP NAV LINKS
        ═══════════════════════════════════════════ */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: .125rem;
          flex: 1;
          justify-content: flex-end;
        }
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: .3rem;
          padding: .5rem 1.125rem;
          font-size: .875rem;
          font-weight: 500;
          color: rgba(255,255,255,.75);
          border-radius: 4px;
          transition: background 150ms ease, color 150ms ease;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: .01em;
          text-decoration: none;
          height: 36px;
        }
        .nav-link:hover { background: rgba(255,255,255,.08); color: #fff; }
        .nav-dropdown-btn { /* inherits .nav-link */ }
        .nav-cta { margin-left: 1rem; }

        /* ═══════════════════════════════════════════
           SERVICES DROPDOWN
        ═══════════════════════════════════════════ */
        .nav-dropdown { position: relative; }
        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 280px;
          background: #0D3B2E;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 8px;
          padding: .5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.35), 0 2px 8px rgba(0,0,0,.2);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;
          pointer-events: none;
        }
        .nav-dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-dropdown-item {
          display: flex;
          align-items: center;
          gap: .875rem;
          padding: .625rem .875rem;
          font-size: .875rem;
          color: rgba(255,255,255,.78);
          border-radius: 5px;
          transition: background 150ms ease, color 150ms ease;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }
        .nav-dropdown-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .nav-dropdown-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          background: rgba(22,181,131,.15);
          border-radius: 4px;
          color: #16B583;
          flex-shrink: 0;
        }

        /* ═══════════════════════════════════════════
           HAMBURGER
        ═══════════════════════════════════════════ */
        .hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          color: rgba(255,255,255,.85);
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 150ms ease;
        }
        .hamburger-btn:hover { background: rgba(255,255,255,.13); }

        /* ═══════════════════════════════════════════
           MOBILE DRAWER
           Top = nav height (80px) since trust bar
           scrolls away and nav sticks at 0
        ═══════════════════════════════════════════ */
        .mobile-drawer {
          position: fixed;
          inset: 0;
          top: 80px;
          background: #0D3B2E;
          z-index: 999;
          padding: 1.75rem 1.5rem 2.5rem;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 320ms cubic-bezier(.4,0,.2,1);
          border-top: 1px solid rgba(255,255,255,.07);
        }
        .mobile-drawer.open { transform: translateX(0); }
        .mobile-nav-link {
          display: block;
          padding: 1rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,.82);
          border-bottom: 1px solid rgba(255,255,255,.07);
          text-decoration: none;
          transition: color 150ms ease;
          font-family: 'Inter', sans-serif;
        }
        .mobile-nav-link:hover { color: #fff; }
        .mobile-services-section { padding: 1.5rem 0 .5rem; }
        .mobile-services-label {
          font-size: .6875rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-bottom: .875rem;
          font-family: 'Inter', sans-serif;
        }
        .mobile-service-link {
          display: flex;
          align-items: center;
          gap: .875rem;
          padding: .875rem 0;
          font-size: .9375rem;
          color: rgba(255,255,255,.72);
          border-bottom: 1px solid rgba(255,255,255,.05);
          text-decoration: none;
          transition: color 150ms ease;
          font-family: 'Inter', sans-serif;
        }
        .mobile-service-link:hover { color: #fff; }
        .mobile-service-icon { display: flex; align-items: center; color: #16B583; }
        .mobile-cta {
          display: flex !important;
          justify-content: center;
          margin-top: 2rem;
          width: 100%;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .nav-logo-img   { height: 36px; }
          .desktop-nav    { display: none !important; }
          .hamburger-btn  { display: flex !important; }
          .trust-bar      { display: none; }
          .site-nav       { height: 72px; }
          .nav-inner      { padding: 0 1.25rem; gap: 1rem; }
          .mobile-drawer  { top: 72px; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .trust-bar-inner { padding: 0 2rem; }
          .nav-inner { padding: 0 2rem; }
        }
        @media (min-width: 1440px) {
          .trust-bar-inner { padding: 0 4rem; }
          .nav-inner { padding: 0 4rem; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
        @media (max-width: 480px) {
          .nav-logo-img { height: 34px; }
          .nav-logo-sub { display: none; }
        }
      `}</style>
    </>
  )
}
