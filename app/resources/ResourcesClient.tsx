'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, FileText, Download, BookOpen, BarChart2, Truck } from 'lucide-react'
import type { ResourceRow } from '@/lib/supabase/types'

const CATEGORIES = ['All', 'Technical Datasheets', 'Product Catalogues', 'Material Certifications', 'Sustainability Reports', 'Machinery Brochures', 'Consulting Guides']

const RESOURCES: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Plastic Raw Materials Overview',
    category: 'Technical Datasheets',
    description: 'A comprehensive overview of the raw materials, quality standards, and sourcing best practices.',
    date: '2025-03',
    gated: false,
    fileUrl: '/resources/Plastic Raw Materials Overview.pdf',
    fileSize: 4512
  },
  {
    id: 'r2',
    title: 'Recycled Polymer Guide',
    category: 'Technical Datasheets',
    description: 'Breaking down the latest recycled polymer standards and how they affect procurement decisions.',
    date: '2025-01',
    gated: false,
    fileUrl: '/resources/Recycled Polymer Guide.pdf',
    fileSize: 4621
  },
  {
    id: 'r3',
    title: 'Packaging Solutions Brochure',
    category: 'Product Catalogues',
    description: 'A detailed brochure showcasing our complete line of industrial packaging solutions.',
    date: '2024-11',
    gated: false,
    fileUrl: '/resources/Packaging Solutions Brochure.pdf',
    fileSize: 4588
  },
  {
    id: 'r4',
    title: 'Machinery Representation Overview',
    category: 'Machinery Brochures',
    description: 'Quick-reference guide covering our represented machinery brands and technical capabilities.',
    date: '2024-10',
    gated: false,
    fileUrl: '/resources/Machinery Representation Overview.pdf',
    fileSize: 4501
  },
  {
    id: 'r5',
    title: 'Supply Chain Consulting Guide',
    category: 'Consulting Guides',
    description: 'An analysis of demand trends, logistics, and supply chain consulting services.',
    date: '2025-02',
    gated: true,
    fileUrl: '/resources/Supply Chain Consulting Guide.pdf',
    fileSize: 4650
  },
  {
    id: 'r6',
    title: 'Sustainability Commitment Statement',
    category: 'Sustainability Reports',
    description: 'Our commitment to sustainable practices, reducing carbon footprint, and circular economy.',
    date: '2024-09',
    gated: false,
    fileUrl: '/resources/Sustainability Commitment Statement.pdf',
    fileSize: 4402
  },
]

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Consulting Guides':  return <BookOpen  size={14} strokeWidth={1.5} />
    case 'Material Certifications':      return <FileText  size={14} strokeWidth={1.5} />
    case 'Technical Datasheets':    return <FileText  size={14} strokeWidth={1.5} />
    case 'Sustainability Reports':   return <BarChart2 size={14} strokeWidth={1.5} />
    case 'Machinery Brochures':       return <Truck     size={14} strokeWidth={1.5} />
    case 'Product Catalogues':        return <BookOpen     size={14} strokeWidth={1.5} />
    default:                return <FileText  size={14} strokeWidth={1.5} />
  }
}

function formatDate(ym: string) {
  const [y, m] = ym.split('-')
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })
}

interface ResourceItem {
  id?: string
  _id?: string
  title: string
  category: string
  description: string
  date?: string
  publishedAt?: string
  gated: boolean
  fileUrl?: string
  fileSize?: number
}

function formatBytes(bytes?: number) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

interface Props {
  resources?: ResourceRow[]
}

// Map Supabase DB enum values → UI display strings used by CATEGORIES & getCategoryIcon
const CATEGORY_MAP: Record<string, string> = {
  datasheets:      'Technical Datasheets',
  catalogues:      'Product Catalogues',
  certifications:  'Material Certifications',
  sustainability:  'Sustainability Reports',
  machinery:       'Machinery Brochures',
  consulting:      'Consulting Guides',
}

export default function ResourcesClient({ resources = [] }: Props) {
  const [search, setSearch]     = useState('')
  const [active, setActive]     = useState('All')

  const combinedResources = useMemo(() => {
    if (resources.length > 0) {
      return resources.map(r => ({
        id: r.id,
        title: r.title,
        category: CATEGORY_MAP[r.category] || r.category,
        description: r.description || '',
        date: r.published_at ? r.published_at.substring(0, 7) : '2024-01',
        gated: r.gated,
        fileUrl: r.file_url,
        fileSize: r.file_size ?? undefined,
      }))
    }
    return RESOURCES
  }, [resources])

  const filtered = useMemo(() => {
    return combinedResources.filter(r => {
      const matchCat    = active === 'All' || r.category === active
      const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, active])

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">Resources</span>
          </nav>
          <h1>Resources &amp; Downloads</h1>
          <p className="lead">
            Industry guides, compliance overviews, market reports, and product data to help you
            make informed procurement decisions.
          </p>
        </div>
      </section>

      {/* ── Resources Grid ── */}
      <section className="section">
        <div className="container">

          {/* Controls */}
          <div className="resources-controls">
            <div className="resources-search">
              <span className="search-icon" aria-hidden="true"><Search size={15} /></span>
              <input
                type="search"
                placeholder="Search resources…"
                aria-label="Search resources"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="resources-search"
              />
            </div>
            <div className="resources-filter" role="group" aria-label="Filter by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="resources-grid" aria-live="polite" aria-atomic="true">
            {combinedResources.length === 0 ? (
              <div className="no-results">
                <p>There are currently no resources available. Please check back later.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="no-results">
                <p>No resources match your search. Try a different term or category.</p>
              </div>
            ) : (
              filtered.map(r => (
                <div className="resource-card" key={r.id} id={`resource-${r.id}`}>
                  <span className="resource-category" style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
                    {getCategoryIcon(r.category)} {r.category}
                  </span>
                  <h4 className="resource-card-title">{r.title}</h4>
                  <p>{r.description}</p>
                  <div className="resource-meta">
                    <span className="resource-date">
                      {formatDate(r.date || '2024-01')}
                      {r.fileSize ? ` • ${formatBytes(r.fileSize)}` : ''}
                    </span>
                    {r.gated ? (
                      <Link href="/contact" className="resource-download">
                        Request Access <span aria-hidden="true">→</span>
                      </Link>
                    ) : r.fileUrl ? (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="resource-download">
                        <Download size={13} strokeWidth={2} />
                        Download
                      </a>
                    ) : (
                      <span className="resource-download" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        File Unavailable
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Need something specific?</h2>
          <p className="lead">
            Can&apos;t find what you&apos;re looking for? Our team can provide tailored information,
            datasheets, or a consultation for your specific requirements.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Our Team
          </Link>
        </div>
      </section>
    </>
  )
}
