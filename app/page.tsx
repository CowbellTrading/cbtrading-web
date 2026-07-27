import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { client } from '@/sanity/lib/client'
import { homepageQuery, allServicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import {
  Recycle, Package, Tractor, BarChart2, Settings,
  Factory, Truck, HardHat, FlaskConical, Wheat,
  MapPin, Globe, Container, ShieldCheck, ArrowRight
} from 'lucide-react'

export const revalidate = 60

/* ─────────────── Fallback data ─────────────── */
const FALLBACK = {
  hero: {
    headline: 'Sustainable Industrial Trading &\nMaterial Supply Solutions',
    subtext: 'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation.',
    // Wind Turbines Sunset Field (Uploaded Asset — 2026-07-28)
    image: '/images/hero-wind-turbines.jpg',
    cta1: 'Explore Our Services',
    cta2: 'Request a Quote',
  },
  about: {
    heading: 'Bridging the Gap in European Supply Chains',
    body: 'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation. The company sources products globally from Nigeria, Dubai, the Middle East, Southeast Asia, and China while serving customers across Ireland, Spain, and European markets.',
    // Warehouse interior — Unsplash 3840px
    // Container terminal aerial — European trade, international sourcing, procurement
    image: '/images/about_company.png',
  },
  sustainability: {
    heading: 'Committed to a Sustainable Future',
    body: 'We actively source eco-friendly alternatives, including recycled plastics and biodegradable packaging, while optimizing logistics routes to reduce carbon footprints across our supply chain.',
    // Green industrial — Unsplash 3840px
    // Recycled plastic granules / circular economy — communicates sustainable materials
    image: '/images/sustainability_banner.png',
  },
  services: [
    { slug: 'plastic-raw-materials',    title: 'Plastic Raw Materials',    summary: 'High-quality virgin and recycled polymers for manufacturing.' },
    { slug: 'packaging-solutions',      title: 'Packaging Solutions',      summary: 'Industrial and commercial packaging materials.' },
    { slug: 'forklift-leasing',         title: 'Forklift Leasing',         summary: 'Flexible material handling equipment solutions.' },
    { slug: 'consulting-services',      title: 'Consulting Services',      summary: 'Supply chain optimization and market entry strategy.' },
    { slug: 'machinery-representation', title: 'Machinery Representation', summary: 'European industrial machinery sourcing.' },
  ],
}

/* ─────────────── Icon maps ─────────────── */
function getServiceIcon(slug: string) {
  const props = { size: 22, strokeWidth: 1.5 }
  switch (slug) {
    case 'plastic-raw-materials':    return <Recycle   {...props} />
    case 'packaging-solutions':      return <Package   {...props} />
    case 'forklift-leasing':         return <Tractor   {...props} />
    case 'consulting-services':      return <BarChart2 {...props} />
    case 'machinery-representation': return <Settings  {...props} />
    default:                         return <Package   {...props} />
  }
}

const INDUSTRY_ICONS = [
  { icon: <Factory     size={22} strokeWidth={1.5} />, label: 'Manufacturing' },
  { icon: <Package     size={22} strokeWidth={1.5} />, label: 'Packaging' },
  { icon: <Truck       size={22} strokeWidth={1.5} />, label: 'Logistics' },
  { icon: <HardHat     size={22} strokeWidth={1.5} />, label: 'Construction' },
  { icon: <FlaskConical size={22} strokeWidth={1.5} />, label: 'Consumer Goods' },
  { icon: <Wheat       size={22} strokeWidth={1.5} />, label: 'Agriculture' },
]

/* Trust cards data — no unverified statistics */
const TRUST_CARDS = [
  {
    icon: <MapPin     size={20} strokeWidth={1.5} />,
    title: 'Ireland Based',
    desc: 'Headquartered in Ireland with deep local knowledge and established business relationships.',
  },
  {
    icon: <Globe      size={20} strokeWidth={1.5} />,
    title: 'European Market Focus',
    desc: 'Primary focus on Ireland and Spain, with a growing pan-European supplier and client network.',
  },
  {
    icon: <Container  size={20} strokeWidth={1.5} />,
    title: 'Global Supplier Network',
    desc: 'Connected to international manufacturers delivering consistent quality and supply security.',
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    title: 'End-to-End Logistics',
    desc: 'Full customs handling, documentation support, and last-mile delivery coordination.',
  },
]

/* ─────────────── Page ─────────────── */
export default async function Home() {
  let homeData = null
  let servicesData = null

  try {
    homeData    = await client.fetch(homepageQuery)
    servicesData = await client.fetch(allServicesQuery)
  } catch (e) {
    console.error('Sanity fetch failed, using fallback data', e)
  }

  const heroHeadline  = FALLBACK.hero.headline
  const heroSubtext   = FALLBACK.hero.subtext
  const heroImageUrl  = homeData?.heroImage ? urlFor(homeData.heroImage).url() : '/images/hero-wind-turbines.jpg'
  const cta1          = homeData?.heroCta1Label || FALLBACK.hero.cta1
  const cta2          = homeData?.heroCta2Label || FALLBACK.hero.cta2

  const aboutHeading  = homeData?.aboutHeading  || FALLBACK.about.heading
  const aboutBody     = homeData?.aboutBody
  const aboutImageUrl = homeData?.aboutImage    ? urlFor(homeData.aboutImage).url() : FALLBACK.about.image

  const sustainHeading  = homeData?.sustainHeading  || FALLBACK.sustainability.heading
  const sustainBody     = homeData?.sustainBody     || FALLBACK.sustainability.body
  const sustainImageUrl = homeData?.sustainImage    ? urlFor(homeData.sustainImage).url() : '/images/sustainability_hero.png'

  const services = (servicesData?.length ? servicesData : FALLBACK.services).slice(0, 5)

  return (
    <>
      {/* ═══════════════════════════════════
          1. HERO
      ═══════════════════════════════════ */}
      <section className="hero">
        <div className="hero-photo">
          <SafeImage
            src={heroImageUrl}
            alt="Wind turbines silhouetted against a golden sunset over an open field — sustainable industrial trading"
            fill
            priority
            sizes="100vw"
            quality={92}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-eyebrow">COWBELL KEYSTONE TRADING IRELAND LIMITED</span>
          <h1>{heroHeadline}</h1>
          <p className="lead">{heroSubtext}</p>
          <div className="hero-ctas">
            <Link href="#services" className="btn btn-primary">
              {cta1}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/contact" className="btn btn-outline-white">{cta2}</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. SERVICE CARDS
      ═══════════════════════════════════ */}
      <section id="services" className="service-strip">
        <div className="service-strip-inner">
          {services.map((s: { slug: { current: string } | string; title: string; summary: string }) => {
            const slugValue = typeof s.slug === 'string' ? s.slug : s.slug?.current
            return (
              <Link href={`/${slugValue}`} key={slugValue} className="service-card">
                <span className="service-card-icon">{getServiceIcon(slugValue)}</span>
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
                <span className="service-card-link">
                  Learn More
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. ABOUT SPLIT
      ═══════════════════════════════════ */}
      <section className="split section-gray">
        <div className="split-content">
          <span className="section-label">About Cowbell Keystone</span>
          <h2>{aboutHeading}</h2>
          {aboutBody ? (
            <div style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: '2rem' }}>
              <PortableText value={aboutBody} />
            </div>
          ) : (
            <p style={{ marginBottom: '2rem' }}>{FALLBACK.about.body}</p>
          )}
          <Link href="/about" className="btn btn-outline-dark">Read Our Story</Link>
        </div>
        <div className="split-photo">
          <SafeImage src={aboutImageUrl} alt="About Cowbell Keystone" fill sizes="50vw" quality={100} style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. TRUST CARDS (replaces stats)
      ═══════════════════════════════════ */}
      <section className="trust-cards-section">
        <div className="trust-cards-grid">
          {TRUST_CARDS.map((card, i) => (
            <div className="trust-card" key={i}>
              <div className="trust-card-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. INDUSTRIES SERVED
      ═══════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="section-label">Markets</span>
            <h2>Industries We Serve</h2>
            <div className="rule rule-center" />
            <p>
              Providing specialized materials and solutions tailored to the unique regulatory
              and operational demands of key European industries.
            </p>
          </div>
          <div className="industries-grid">
            {INDUSTRY_ICONS.map(({ icon, label }) => (
              <div className="industry-cell" key={label}>
                <div className="industry-content-group">
                  <span className="industry-cell-icon">{icon}</span>
                  <span className="industry-cell-label">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. SUSTAINABILITY
      ═══════════════════════════════════ */}
      <section className="sustain">
        <div className="sustain-photo">
          <SafeImage src={sustainImageUrl} fallbackSrc="/images/sustainability_hero.png" alt="Sustainability initiatives" fill sizes="100vw" quality={100} style={{ objectFit: 'cover' }} />
          <div className="sustain-overlay" />
        </div>
        <div className="sustain-inner container">
          <div style={{ maxWidth: 640 }}>
            <span className="section-label">Sustainability</span>
            <h2 style={{ color: 'white', marginBottom: '1.25rem' }}>{sustainHeading}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
              {sustainBody}
            </p>
            <div className="sustain-features">
              <div className="sustain-feature">
                <h4>Recycled Polymers</h4>
                <p>Sourcing high-grade post-consumer recycled materials.</p>
              </div>
              <div className="sustain-feature">
                <h4>Eco-Packaging</h4>
                <p>Biodegradable and easily recyclable solutions.</p>
              </div>
              <div className="sustain-feature">
                <h4>Optimized Routes</h4>
                <p>Reducing transport emissions across the EU.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          7. CTA STRIP
      ═══════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to optimize your supply chain?</h2>
          <p className="lead">
            Partner with Cowbell Keystone for reliable sourcing, European compliance,
            and competitive pricing across Ireland and Spain.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Request a Quote
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  )
}
