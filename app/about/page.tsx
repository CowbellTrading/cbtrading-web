import type { Metadata } from 'next'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import {
  ArrowRight,
  TrendingUp,
  Recycle,
  Globe,
  BarChart2,
  Package,
  Tractor,
  Settings,
  Factory,
  Truck,
  HardHat,
  FlaskConical,
  Wheat,
  ShieldCheck,
  CheckCircle,
  Briefcase
} from 'lucide-react'
import { getAboutCompany } from '@/lib/supabase'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

const FALLBACK_VALUES = [
  { title: 'Direct Supplier Sourcing', description: 'Connecting you directly with vetted global manufacturers.' },
  { title: 'Quality Assurance', description: 'Rigorous verification processes to ensure product excellence.' },
  { title: 'Customs Clearance', description: 'Seamless customs management for frictionless trade.' },
  { title: 'End-to-End Logistics', description: 'Comprehensive coordination from port to customer delivery.' },
  { title: 'Sustainable Solutions', description: 'Championing circular economy and eco-friendly alternatives.' },
  { title: 'Reliable Partnerships', description: 'Building long-term, trusted international trading relationships.' },
]

const COMPANY_STATS = [
  { icon: <TrendingUp size={20} strokeWidth={1.5} />, title: 'Industrial Trading', desc: 'Expertise across diverse materials' },
  { icon: <Recycle size={20} strokeWidth={1.5} />, title: 'Sustainable Materials', desc: 'Championing circular economy' },
  { icon: <Globe size={20} strokeWidth={1.5} />, title: 'European Supply Network', desc: 'Connected to global manufacturers' },
  { icon: <BarChart2 size={20} strokeWidth={1.5} />, title: 'Strategic Consulting', desc: 'Optimizing procurement strategies' },
]

const CORE_SERVICES = [
  { slug: 'plastic-raw-materials', title: 'Plastic Raw Materials', desc: 'Virgin and recycled polymers for manufacturing.', icon: <Recycle size={22} strokeWidth={1.5} /> },
  { slug: 'packaging-solutions', title: 'Packaging Solutions', desc: 'Industrial and commercial packaging materials.', icon: <Package size={22} strokeWidth={1.5} /> },
  { slug: 'forklift-leasing', title: 'Forklift Leasing', desc: 'Flexible material handling equipment solutions.', icon: <Tractor size={22} strokeWidth={1.5} /> },
  { slug: 'consulting-services', title: 'Consulting Services', desc: 'Supply chain optimization and market entry.', icon: <BarChart2 size={22} strokeWidth={1.5} /> },
  { slug: 'machinery-representation', title: 'Machinery Representation', desc: 'European industrial machinery sourcing.', icon: <Settings size={22} strokeWidth={1.5} /> },
]

const INDUSTRIES_SERVED = [
  { icon: <Factory size={22} strokeWidth={1.5} />, label: 'Manufacturing' },
  { icon: <Package size={22} strokeWidth={1.5} />, label: 'Packaging' },
  { icon: <Truck size={22} strokeWidth={1.5} />, label: 'Logistics' },
  { icon: <HardHat size={22} strokeWidth={1.5} />, label: 'Construction' },
  { icon: <FlaskConical size={22} strokeWidth={1.5} />, label: 'Consumer Goods' },
  { icon: <Wheat size={22} strokeWidth={1.5} />, label: 'Agriculture' },
]

const TRUST_FACTORS = [
  { title: 'Sustainable Sourcing', desc: 'We prioritize eco-friendly and recycled materials.', icon: <Recycle size={20} strokeWidth={1.5} /> },
  { title: 'European Supplier Network', desc: 'Reliable partners across Ireland, Spain, and the EU.', icon: <Globe size={20} strokeWidth={1.5} /> },
  { title: 'Industrial Expertise', desc: 'Deep technical knowledge of polymers and machinery.', icon: <Briefcase size={20} strokeWidth={1.5} /> },
  { title: 'Long-term Partnerships', desc: 'Committed to mutual growth and transparency.', icon: <ShieldCheck size={20} strokeWidth={1.5} /> },
]

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutCompany()
  return {
    title: data?.meta_title || 'About Us',
    description: data?.meta_description || 'Learn about Cowbell Keystone Trading Ireland Limited — our story, mission, values, and the European B2B trading expertise we bring to Ireland and Spain.',
  }
}

export default async function AboutPage() {
  const data = await getAboutCompany()

  const heading = data?.heading || 'Our Story'
  const leadText = data?.lead_text || 'A specialist B2B trading partner connecting European industrial suppliers with businesses across Ireland and Spain.'
  const introHeading = data?.intro_heading || 'Bridging European Supply Chains'
  const introBody = data?.intro_body
  const introImage = data?.intro_image_url || '/images/about_company.png'
  const missionHeading = data?.mission_heading || 'Making European Trade Simpler'
  const missionBody = data?.mission_body || 'We exist to remove friction from B2B trade. Whether that means sourcing the right polymer grade, managing customs documentation, or identifying a more cost-effective packaging format — our mission is to help your business operate more efficiently and profitably across European markets.'
  const values = data?.values?.length ? data.values : FALLBACK_VALUES

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">About Us</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>{heading}</h1>
          <p className="lead" style={{ fontSize: '1.125rem', lineHeight: 1.85, maxWidth: '650px', color: 'rgba(255,255,255,0.85)' }}>{leadText}</p>
        </div>
      </section>

      {/* ── Section 2: Who We Are ── */}
      <section className="section">
        <div className="container">
          <div className="split" style={{ minHeight: 'auto', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span className="section-label">Who We Are</span>
              <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.15 }}>{introHeading}</h2>
              
              {introBody ? (
                <div style={{ fontSize: '1.0625rem', color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                  {Array.isArray(introBody)
                    ? <PortableText value={introBody} />
                    : <p>{introBody as string}</p>
                  }
                </div>
              ) : (
                <>
                  <p className="about-intro" style={{ fontSize: '1.0625rem', color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                    Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation.
                  </p>
                  <p style={{ fontSize: '1.0625rem', color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                    The company sources products globally from Nigeria, Dubai, the Middle East, Southeast Asia, and China while serving customers across Ireland, Spain, and European markets.
                  </p>
                </>
              )}

              <Link href="/contact" className="btn btn-primary">
                Start a Conversation
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
            <div style={{ position: 'relative', height: '600px', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              {introImage && (
                <SafeImage
                  src={introImage}
                  alt="European container terminal — international trade and procurement"
                  quality={100}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Company Overview (Stats Band) ── */}
      <section className="trust-cards-section">
        <div className="trust-cards-grid">
          {COMPANY_STATS.map((stat, i) => (
            <div className="trust-card" key={i}>
              <div className="trust-card-icon">{stat.icon}</div>
              <h4>{stat.title}</h4>
              <p>{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Mission & Values ── */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header section-header-center" style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-label">Our Mission</span>
            <h2 style={{ marginBottom: '1.5rem' }}>{missionHeading}</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', lineHeight: 1.85 }}>
              {missionBody}
            </p>
            <div className="rule rule-center" style={{ marginTop: '2.5rem' }} />
          </div>
          
          <div className="values-grid">
            {values.map((v: { title: string; description: string }, i: number) => (
              <div className="value-card" key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <div className="value-card-icon" style={{ marginBottom: '1.25rem', width: '48px', height: '48px', borderRadius: 'var(--r-md)' }}>
                  <CheckCircle size={22} strokeWidth={1.5} color="currentColor" />
                </div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>{v.title}</h4>
                <p style={{ flex: 1, color: 'var(--gray-500)', lineHeight: 1.7, margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Core Services ── */}
      <section className="service-strip" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span className="section-label">Expertise</span>
          <h2>Our Core Capabilities</h2>
          <div className="rule rule-center" />
        </div>
        <div className="service-strip-inner">
          {CORE_SERVICES.map((s) => (
            <Link href={`/${s.slug}`} key={s.slug} className="service-card">
              <span className="service-card-icon">{s.icon}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <span className="service-card-link">
                Learn More
                <ArrowRight size={14} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 6: Industries Served ── */}
      <section className="section section-gray">
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
          <div className="industries-grid" style={{ justifyContent: 'center' }}>
            {INDUSTRIES_SERVED.map(({ icon, label }) => (
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

      {/* ── Section 7: Why Choose Us (Trust Section) ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header-center">
            <span className="section-label">Why Choose Us</span>
            <h2>Your Trusted Supply Partner</h2>
            <div className="rule rule-center" />
          </div>
          <div className="related-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {TRUST_FACTORS.map((factor, i) => (
              <div className="related-card" key={i} style={{ cursor: 'default' }}>
                <span className="related-card-icon" style={{ width: '48px', height: '48px' }}>{factor.icon}</span>
                <h4>{factor.title}</h4>
                <p style={{ marginBottom: 0 }}>{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to work together?</h2>
          <p className="lead">
            Tell us about your sourcing challenges and we&apos;ll find the right solution for your business.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Get in Touch
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  )
}
