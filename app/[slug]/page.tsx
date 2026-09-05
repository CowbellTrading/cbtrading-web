import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { getServiceBySlug, getProductsByServiceSlug } from '@/lib/supabase'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'
import {
  Recycle, Package, Tractor, BarChart2, Settings, Download, FileText
} from 'lucide-react'

export const revalidate = 60

/* ─── Fallback data for all 5 services ─── */
const SERVICE_FALLBACKS: Record<string, {
  title: string
  summary: string
  image: string
  overview: string
  pdfCatalogUrl?: string
  features: { title: string; description: string }[]
  catalog?: { name: string; category: string; image?: string; description: string; applications: string[] }[]
  certifications?: { name: string; label: string }[]
  industriesServed: string[]
  whyCowbell: string
  steps: { n: string; title: string; desc: string }[]
  related: { slug: string; title: string; summary: string }[]
}> = {
  'plastic-raw-materials': {
    title: 'Plastic Raw Materials',
    summary: 'High-quality virgin and recycled polymers sourced from vetted European and global manufacturers.',
    image: '/images/plastic_materials.png',
    overview: 'We supply a comprehensive range of plastic raw materials — including polyethylene (PE), polypropylene (PP), polyethylene terephthalate (PET), and polyvinyl chloride (PVC) — to manufacturers across Ireland and Spain. Our established supplier network ensures consistent quality, competitive pricing, and reliable lead times.',
    features: [
      { title: 'Virgin & Recycled Grades', description: 'Full range from food-contact virgin polymers to high-quality post-consumer recycled (PCR) materials.' },
      { title: 'Quality Certification', description: 'All materials supplied with full traceability documentation, certificates of analysis, and compliance records.' },
      { title: 'Custom Volumes', description: 'Flexible order quantities from small trial batches to full container loads, with regular delivery scheduling.' },
      { title: 'Technical Support', description: 'Grade selection advice and application guidance from our materials specialists.' },
    ],
    industriesServed: ['Manufacturing', 'Packaging', 'Construction', 'Agriculture', 'Automotive', 'Consumer Goods'],
    whyCowbell: 'Our deep European supplier network and materials expertise mean you get the right grade at the right price, without the complexity of dealing with multiple manufacturers directly.',
    steps: [
      { n: '01', title: 'Requirement Review', desc: 'Tell us your application, volume, and quality requirements.' },
      { n: '02', title: 'Grade Proposal', desc: 'We identify the best-fit material options with pricing and lead times.' },
      { n: '03', title: 'Sample & Approval', desc: 'Trial quantities available before full order commitment.' },
    ],
    related: [
      { slug: 'packaging-solutions', title: 'Packaging Solutions', summary: 'Industrial and commercial packaging materials.' },
      { slug: 'consulting-services', title: 'Consulting Services', summary: 'Supply chain optimization and strategy.' },
    ],
  },
  'packaging-solutions': {
    title: 'Packaging Solutions',
    summary: 'Manufacturing premium flexible packaging, rotogravure printed laminates, and high-barrier films for global food, beverage, consumer, and industrial brands.',
    image: '/images/packaging_solutions.png',
    pdfCatalogUrl: '/Packaging.pdf',
    overview: 'In commercial partnership with Radiant Packaging Industry L.L.C. (RAK, UAE), Cowbell Keystone supplies high-performance flexible packaging and printed laminates across Ireland, Spain, and European markets. Operating state-of-the-art rotogravure printing presses, precision solventless lamination lines, and automated pouch-making machinery certified to ISO 9001, ISO 22000, BRCGS (A+ Grade), and HACCP standards, we deliver end-to-end packaging solutions engineered for barrier integrity, food safety, and shelf appeal.',
    features: [
      { title: 'Rotogravure Printing & Lamination', description: 'Multi-layer laminates with high-definition rotogravure printing up to 10 colors and solventless lamination for superior bond strength.' },
      { title: 'High-Barrier Substrates & Foil', description: 'Aluminum foil, Met-PET, and EVOH co-extrusions engineered for maximum oxygen, moisture, and light barrier protection.' },
      { title: 'Pre-Formed Pouches & FFS Rollstock', description: 'Stand-up pouches, zipper bags, 3-side seal, side gusset, flat bottom pouches, and high-speed automated FFS rollstock.' },
      { title: 'Certified Quality & Food Safety', description: 'Facility independently certified to BRCGS Grade A+, ISO 22000, ISO 9001, and HACCP compliance standards.' },
    ],
    catalog: [
      { name: 'Printed Laminates & FFS Rollstock', category: 'Flexible Packaging', image: '/images/packaging/catalog_img_15.jpg', description: 'High-definition rotogravure printed multi-layer rollstock engineered for high-speed Form-Fill-Seal (FFS) automated packaging lines.', applications: ['Food & Beverage', 'Coffee', 'Confectionery', 'Snacks'] },
      { name: 'Stand-Up & Zipper Pouches', category: 'Pre-formed Pouches', image: '/images/packaging/catalog_img_10.jpg', description: 'Shelf-ready pouches with resealable press-to-close zippers, tear notches, and ergonomic spouts for premium retail presentation.', applications: ['Dry Foods', 'Pet Food', 'Coffee', 'Spices'] },
      { name: 'High-Barrier Foil & Met-PET Films', category: 'Barrier Films', image: '/images/packaging/catalog_img_11.jpg', description: 'Multi-layer aluminum foil and metallized PET laminates offering near-zero OTR & WVTR for sensitive products.', applications: ['Coffee & Tea', 'Pharmaceutical', 'Chemical', 'Powders'] },
      { name: 'Heavy-Duty Industrial Sacks & FIBC', category: 'Industrial Packaging', image: '/images/packaging/catalog_img_12.jpg', description: 'PE, PP, and multi-wall barrier sacks engineered for heavy-duty raw material transit and bulk cargo handling.', applications: ['Polymers', 'Agriculture', 'Building Materials', 'Industrial'] },
      { name: 'Shrink Covers & Stretch Wrapping', category: 'Transit Protection', image: '/images/packaging/catalog_img_13.jpg', description: 'High-clarity pallet stretch film, heat-shrink hood covers, and protective void fills for secure international transport.', applications: ['Logistics', 'Warehousing', 'Freight', 'Manufacturing'] },
      { name: 'Monomaterial Recyclable Films', category: 'Sustainable Packaging', image: '/images/packaging/catalog_img_14.jpg', description: 'Eco-friendly PE/PE and PP/PP monomaterial barrier laminates designed for 100% circular economy recycling compliance.', applications: ['Eco Retail', 'Sustainable FMCG', 'Organic Foods'] },
    ],
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management' },
      { name: 'ISO 22000', label: 'Food Safety Management' },
      { name: 'BRCGS Grade A+', label: 'Global Packaging Standard' },
      { name: 'HACCP', label: 'Hazard Analysis & Critical Control' },
    ],
    industriesServed: ['Food & Beverage', 'Frozen Foods', 'Coffee & Tea', 'Confectionery', 'Pet Food', 'Pharmaceutical', 'Personal Care', 'Agriculture', 'Industrial'],
    whyCowbell: 'Our strategic partnership with Radiant Packaging combines world-class manufacturing scale (900 MT/month capacity) with direct European customer support, zero customs friction, and dedicated inventory buffer management across Ireland and Spain.',
    steps: [
      { n: '01', title: 'Raw Material Sourcing', desc: 'Certified food-contact films and barrier substrates selected for safety, strength, and barrier performance.' },
      { n: '02', title: 'Printing & Lamination', desc: 'High-definition rotogravure printing combined with precision solventless lamination for flawless finishes.' },
      { n: '03', title: 'Converting & Slitting', desc: 'Precision pouch forming, zipper insertion, and rollstock slitting to exact client specifications.' },
      { n: '04', title: 'Quality Testing & Packing', desc: 'In-house lab testing on every batch for seal strength, print accuracy, and barrier integrity before dispatch.' },
    ],
    related: [
      { slug: 'plastic-raw-materials', title: 'Plastic Raw Materials', summary: 'Virgin and recycled polymers.' },
      { slug: 'consulting-services', title: 'Consulting Services', summary: 'Supply chain optimization.' },
    ],
  },
  'forklift-leasing': {
    title: 'Forklift Leasing',
    summary: 'Flexible material handling equipment solutions for warehouses, construction sites, and industrial operations.',
    // Modern electric forklift in warehouse — material handling equipment
    image: '/images/forklift_leasing.png',
    overview: 'We provide flexible leasing arrangements for forklifts and material handling equipment, giving Irish and Spanish businesses access to the equipment they need without large capital outlay. Whether you need short-term coverage for a project or a long-term operational lease, we structure agreements to match your needs.',
    features: [
      { title: 'Short & Long-Term Leases', description: 'Arrangements from weeks to multi-year contracts, with flexible extension options.' },
      { title: 'Maintenance Included', description: 'Full-service leases available with scheduled servicing and breakdown response.' },
      { title: 'Counterbalance & Reach', description: 'Electric and diesel counterbalance forklifts, reach trucks, pallet trucks, and more.' },
      { title: 'Capacity Planning Support', description: 'Equipment sizing and specification advice based on your site and load requirements.' },
    ],
    industriesServed: ['Logistics', 'Warehousing', 'Manufacturing', 'Construction', 'Food & FMCG', 'Retail'],
    whyCowbell: 'Leasing through Cowbell Keystone means predictable costs, no capital tied up in depreciating assets, and access to modern, well-maintained equipment matched to your specific operational needs.',
    steps: [
      { n: '01', title: 'Site Assessment', desc: 'We review your operational environment, load weights, and usage patterns.' },
      { n: '02', title: 'Equipment Proposal', desc: 'Tailored equipment recommendation with lease pricing and terms.' },
      { n: '03', title: 'Delivery & Handover', desc: 'Equipment delivered, operator briefed, and lease agreement signed.' },
    ],
    related: [
      { slug: 'consulting-services', title: 'Consulting Services', summary: 'Logistics and operational consulting.' },
      { slug: 'machinery-representation', title: 'Machinery Representation', summary: 'European industrial machinery.' },
    ],
  },
  'consulting-services': {
    title: 'Consulting Services',
    summary: 'Strategic supply chain optimization, procurement advisory, and European market entry support.',
    // Procurement strategy meeting / supply chain consulting
    image: '/images/consulting_services.png',
    overview: 'Our consulting practice helps businesses across Ireland and Spain optimize their supply chains, reduce procurement costs, and navigate European market entry. Drawing on our network of manufacturers, logistics partners, and regulatory specialists, we deliver practical, implementable advice — not generic frameworks.',
    features: [
      { title: 'Supply Chain Optimization', description: 'Identify inefficiencies, renegotiate supplier terms, and streamline procurement processes.' },
      { title: 'EU Market Entry', description: 'Support for non-EU manufacturers looking to establish distribution in Ireland or Spain.' },
      { title: 'Cost Reduction Analysis', description: 'Benchmarking your current procurement spend against market rates to identify savings.' },
      { title: 'Compliance & Documentation', description: 'Guidance on EU trade regulations, customs procedures, and certification requirements.' },
    ],
    industriesServed: ['Manufacturing', 'Food & FMCG', 'Pharmaceutical', 'Chemical & Industrial', 'Logistics', 'Retail'],
    whyCowbell: 'Our consulting is grounded in real commercial experience — we\'ve sourced, shipped, and sold across European markets, so our advice is practical rather than theoretical.',
    steps: [
      { n: '01', title: 'Initial Assessment', desc: 'Review of your current supply chain structure and pain points.' },
      { n: '02', title: 'Opportunity Identification', desc: 'Pinpoint specific areas for cost reduction or process improvement.' },
      { n: '03', title: 'Implementation Support', desc: 'Hands-on assistance implementing agreed changes and tracking results.' },
    ],
    related: [
      { slug: 'plastic-raw-materials', title: 'Plastic Raw Materials', summary: 'Polymer sourcing advisory.' },
      { slug: 'packaging-solutions', title: 'Packaging Solutions', summary: 'Packaging procurement optimization.' },
    ],
  },
  'machinery-representation': {
    title: 'Machinery Representation',
    summary: 'Connecting Irish and Spanish buyers with leading European industrial machinery manufacturers.',
    // Industrial machinery / CNC production equipment / manufacturing floor
    image: '/images/machinery_rep.png',
    overview: 'Cowbell Keystone acts as a local commercial representative for European industrial machinery manufacturers, providing Irish and Spanish buyers with direct access to high-quality equipment, technical expertise, and after-sales support — without the complexity and cost of dealing with foreign manufacturers directly.',
    features: [
      { title: 'Local Point of Contact', description: 'Single local representative handling enquiries, quotes, and commercial negotiations.' },
      { title: 'Technical Specification Support', description: 'Equipment selection guidance based on your production requirements and site conditions.' },
      { title: 'After-Sales Coordination', description: 'Warranty management, spare parts sourcing, and service coordination with manufacturers.' },
      { title: 'Installation & Commissioning', description: 'Project management support for equipment delivery, installation, and staff training.' },
    ],
    industriesServed: ['Manufacturing', 'Food & FMCG', 'Pharmaceutical', 'Chemical & Industrial', 'Packaging', 'Agriculture'],
    whyCowbell: 'Buying European machinery directly is complex — language, logistics, warranty and compliance issues create friction. We remove that friction, acting as your trusted local partner throughout the purchase and beyond.',
    steps: [
      { n: '01', title: 'Requirements Briefing', desc: 'Define your production needs, capacity targets, and site specifications.' },
      { n: '02', title: 'Manufacturer Matching', desc: 'We identify the best European manufacturer for your application.' },
      { n: '03', title: 'Commercial Support', desc: 'We manage the purchase process from quote to delivery and commissioning.' },
    ],
    related: [
      { slug: 'forklift-leasing', title: 'Forklift Leasing', summary: 'Material handling equipment.' },
      { slug: 'consulting-services', title: 'Consulting Services', summary: 'Market entry and procurement advisory.' },
    ],
  },
}

function getServiceIcon(slug: string) {
  const props = { size: 24, strokeWidth: 1.5 }
  switch (slug) {
    case 'plastic-raw-materials': return <Recycle   {...props} />
    case 'packaging-solutions': return <Package   {...props} />
    case 'forklift-leasing': return <Tractor   {...props} />
    case 'consulting-services': return <BarChart2 {...props} />
    case 'machinery-representation': return <Settings  {...props} />
    default: return <Package   {...props} />
  }
}

/* ─── Static params ─── */
export async function generateStaticParams() {
  return Object.keys(SERVICE_FALLBACKS).map(slug => ({ slug }))
}

const SERVICE_SEO_TITLES: Record<string, string> = {
  'plastic-raw-materials': 'Plastic Raw Materials Sourcing Ireland | Cowbell Keystone',
  'packaging-solutions': 'Packaging Solutions Ireland | Cowbell Keystone',
  'forklift-leasing': 'Forklift Leasing Ireland | Cowbell Keystone',
  'consulting-services': 'Supply Chain Consulting Ireland | Cowbell Keystone',
  'machinery-representation': 'Machinery Representation Ireland | Cowbell Keystone',
}

const SERVICE_SECTION_HEADINGS: Record<string, string> = {
  'plastic-raw-materials': 'Polymer Grades & Raw Material Sourcing Solutions',
  'packaging-solutions': 'Flexible Packaging & Industrial Barrier Solutions',
  'forklift-leasing': 'Material Handling & Forklift Fleet Solutions',
  'consulting-services': 'Supply Chain Advisory & EU Market Entry Solutions',
  'machinery-representation': 'Industrial Machinery Sourcing & Representation Solutions',
}

const SERVICE_IMAGE_ALTS: Record<string, string> = {
  'plastic-raw-materials': 'Industrial plastic raw material polymer granules and raw materials sourcing',
  'packaging-solutions': 'Industrial flexible packaging films and commercial packaging solutions',
  'forklift-leasing': 'Industrial logistics warehouse forklift truck fleet for material handling',
  'consulting-services': 'Supply chain management and logistics consulting consultation meeting',
  'machinery-representation': 'Heavy industrial manufacturing machinery and equipment representation',
}

/* ─── Metadata ─── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const fb = SERVICE_FALLBACKS[slug]
  if (!fb) return {}
  const data = await getServiceBySlug(slug)
  const title = data?.meta_title || SERVICE_SEO_TITLES[slug] || `${fb.title} | Cowbell Keystone`
  const description = data?.meta_description || fb.summary
  const url = `https://cb-trading.ie/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cowbell Keystone Trading Ireland',
      locale: 'en_IE',
      type: 'website',
    },
  }
}

/* ─── Page ─── */
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fb = SERVICE_FALLBACKS[slug]
  if (!fb) notFound()

  // Supabase queries — return null/[] gracefully on error
  const serviceData = await getServiceBySlug(slug)
  const productsData = await getProductsByServiceSlug(slug)

  const title = serviceData?.title || fb.title
  const summary = serviceData?.summary || fb.summary
  const heroImageUrl = serviceData?.hero_image_url || fb.image
  const overview = serviceData?.overview
  const features = (serviceData?.features?.length ? serviceData.features : fb.features)
  const industries = (serviceData?.industries_served?.length ? serviceData.industries_served : fb.industriesServed)
  const whyCowbell = serviceData?.why_cowbell || fb.whyCowbell

  const canonicalUrl = `https://cb-trading.ie/${slug}`
  const heroAltText = SERVICE_IMAGE_ALTS[slug] || `${title} service banner image`
  const sectionHeading = SERVICE_SECTION_HEADINGS[slug] || 'What We Offer'

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": title,
              "serviceType": title,
              "provider": {
                "@type": "Corporation",
                "name": "Cowbell Keystone Trading Ireland Limited",
                "url": "https://cb-trading.ie"
              },
              "areaServed": ["Ireland", "Spain", "Europe"],
              "description": summary,
              "url": canonicalUrl
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://cb-trading.ie"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://cb-trading.ie/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": title,
                  "item": canonicalUrl
                }
              ]
            }
          ]),
        }}
      />

      {/* ── Page Hero ── */}
      <section className="page-hero" style={{ minHeight: 380 }}>
        <div className="page-hero-photo">
          <SafeImage src={heroImageUrl} alt={heroAltText} fill priority sizes="100vw" quality={100} style={{ objectFit: 'cover', opacity: 1 }} />
        </div>
        <div className="page-hero-inner container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <Link href="/#services">Services</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ width: 52, height: 52, background: 'rgba(22,181,131,.2)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-400)' }}>
              {getServiceIcon(slug)}
            </div>
            <span className="section-label" style={{ color: 'rgba(255,255,255,.5)', margin: 0 }}>Service</span>
          </div>
          <h1>{title}</h1>
          <p className="lead">{summary}</p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Request a Quote
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section">
        <div className="container">
          <div className="service-layout">

            {/* ── Left: Content ── */}
            <div>
              {/* Overview */}
              <span className="section-label">Overview</span>
              <h2 style={{ marginBottom: '1.5rem' }}>{sectionHeading}</h2>
              {overview ? (
                <div style={{ color: 'var(--gray-600)', lineHeight: 1.85, fontSize: '1.0625rem', marginBottom: '3rem' }}>
                  {Array.isArray(overview)
                    ? <PortableText value={overview} />
                    : <p>{overview as string}</p>
                  }
                </div>
              ) : (
                <p style={{ fontSize: '1.0625rem', marginBottom: '3rem', lineHeight: 1.85 }}>{fb.overview}</p>
              )}

              {/* Features */}
              <h3 style={{ marginBottom: '1.5rem' }}>Key Features</h3>
              <div className="feature-list" style={{ marginBottom: '3rem' }}>
                {features.map((f: { title: string; description: string }, i: number) => (
                  <div className="feature-item" key={i}>
                    <div className="feature-check">
                      <CheckCircle size={13} strokeWidth={2} />
                    </div>
                    <div>
                      <strong>{f.title}</strong>
                      <span>{f.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Catalog & Formats (from Supabase or Radiant Packaging fallback catalog) */}
              {(productsData.length > 0 || (fb.catalog && fb.catalog.length > 0)) && (
                <>
                  <h3 style={{ marginBottom: '1.5rem' }}>Product Catalog & Packaging Formats</h3>
                  <div className="products-grid" style={{ marginBottom: '3rem' }}>
                    {productsData.length > 0 ? (
                      productsData.map((p) => (
                        <div className="product-card" key={p.id}>
                          <h4>{p.name}</h4>
                          {p.grade && <span className="product-grade">{p.grade}</span>}
                          <p>{p.description}</p>
                          {(p.applications?.length ?? 0) > 0 && (
                            <div className="product-tags">
                              {p.applications!.map((a: string) => (
                                <span className="product-tag" key={a}>{a}</span>
                              ))}
                            </div>
                          )}
                          {p.datasheet_url && (
                            <a href={p.datasheet_url} target="_blank" rel="noopener noreferrer" className="product-datasheet">
                              Download Datasheet <ArrowRight size={12} />
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      fb.catalog?.map((cat, i) => (
                        <div className="product-card" key={i}>
                          <span className="product-grade">{cat.category}</span>
                          <h4 style={{ marginTop: '.5rem' }}>{cat.name}</h4>
                          <p>{cat.description}</p>
                          <div className="product-tags">
                            {cat.applications.map((a: string) => (
                              <span className="product-tag" key={a}>{a}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* ── PDF Catalog Download Banner ── */}
                  {fb.pdfCatalogUrl && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '1.75rem 2rem', background: '#0F172A', color: 'var(--white)', borderRadius: 'var(--r-lg)', marginBottom: '3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: 'rgba(32, 143, 112, 0.2)', color: 'var(--cta-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FileText size={24} strokeWidth={1.75} />
                        </div>
                        <div>
                          <h4 style={{ color: 'var(--white)', margin: '0 0 .25rem', fontSize: '1.125rem' }}>Download Official Product Catalog PDF</h4>
                          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)', fontSize: '.875rem' }}>
                            Access comprehensive technical specifications, material structures, and packaging specs in our official brochure.
                          </p>
                        </div>
                      </div>
                      <a
                        href={fb.pdfCatalogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Packaging-Solutions-Catalog.pdf"
                        className="btn btn-primary"
                        style={{ background: 'var(--cta-green)', color: 'var(--white)', flexShrink: 0, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}
                      >
                        <Download size={16} strokeWidth={2} />
                        Download PDF Catalog
                      </a>
                    </div>
                  )}
                </>
              )}

              {/* Quality & Food Safety Certifications */}
              {fb.certifications && fb.certifications.length > 0 && (
                <>
                  <h3 style={{ marginBottom: '1.25rem' }}>Quality & Food Safety Certifications</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                    {fb.certifications.map((c, i) => (
                      <div key={i} style={{ padding: '1.25rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--r-md)' }}>
                        <span style={{ display: 'inline-block', fontSize: '.6875rem', fontWeight: 700, color: 'var(--cta-green)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '.25rem' }}>
                          Independently Certified
                        </span>
                        <h4 style={{ margin: '0 0 .25rem', fontSize: '1.0625rem', color: '#0F172A' }}>{c.name}</h4>
                        <p style={{ margin: 0, fontSize: '.8125rem', color: 'var(--gray-600)' }}>{c.label}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* How It Works */}
              <h3 style={{ marginBottom: '1.5rem' }}>How It Works</h3>
              <div className="steps" style={{ marginBottom: '3rem' }}>
                {fb.steps.map(s => (
                  <div className="step" key={s.n}>
                    <span className="step-number">{s.n}</span>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Industries Served */}
              <h3 style={{ marginBottom: '1.25rem' }}>Industries Served</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem', marginBottom: '3rem' }}>
                {industries.map((ind: string) => (
                  <span key={ind} style={{ padding: '.375rem .875rem', background: 'var(--green-050)', color: 'var(--green-800)', borderRadius: 'var(--r-sm)', fontSize: '.8125rem', fontWeight: 600, border: '1px solid var(--green-100)' }}>
                    {ind}
                  </span>
                ))}
              </div>

              {/* Why Cowbell */}
              <div style={{ padding: '2rem', background: 'var(--gray-50)', borderRadius: 'var(--r-md)', borderLeft: '3px solid var(--green-500)', marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--green-800)', marginBottom: '.75rem' }}>Why Cowbell Keystone?</h4>
                <p style={{ margin: 0 }}>{whyCowbell}</p>
              </div>
            </div>

            {/* ── Right: Sidebar ── */}
            <aside className="service-sidebar">
              <ContactForm title={`Enquire About ${title}`} />

              {/* Related Services */}
              {fb.related.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '.6875rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '1.25rem' }}>
                    Related Services
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                    {fb.related.map(r => (
                      <Link
                        key={r.slug}
                        href={`/${r.slug}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--r-md)', background: 'var(--white)', transition: 'border-color var(--t-base)', textDecoration: 'none', gap: '.75rem' }}
                      >
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '.9375rem', color: 'var(--green-800)', margin: '0 0 .25rem' }}>{r.title}</p>
                          <p style={{ fontSize: '.8125rem', color: 'var(--gray-500)', margin: 0 }}>{r.summary}</p>
                        </div>
                        <ArrowRight size={14} strokeWidth={2} color="var(--green-500)" style={{ flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}
