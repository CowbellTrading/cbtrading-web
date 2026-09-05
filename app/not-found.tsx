import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Phone, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Page Not Found | Cowbell Keystone Trading Ireland',
    description: 'The page you are looking for could not be found. Return to Cowbell Keystone Trading Ireland homepage or explore our services.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <>
            <section className="page-hero" style={{ minHeight: '420px', display: 'flex', alignItems: 'center' }}>
                <div className="page-hero-inner container" style={{ textAlign: 'center', maxWidth: '720px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, background: 'rgba(22,181,131,.15)', borderRadius: '50%', color: 'var(--green-400)', marginBottom: '1.5rem' }}>
                        <HelpCircle size={32} strokeWidth={1.5} />
                    </div>
                    <span className="section-label" style={{ color: 'var(--green-400)', display: 'block', marginBottom: '.5rem' }}>
                        404 — Error
                    </span>
                    <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>Page Not Found</h1>
                    <p className="lead" style={{ margin: '0 auto 2rem', color: 'rgba(255,255,255,.8)' }}>
                        We couldn&apos;t find the page you were looking for. It may have been moved, updated, or no longer exists.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" className="btn btn-primary">
                            <Home size={16} strokeWidth={2} style={{ marginRight: '.5rem' }} />
                            Back to Home
                        </Link>
                        <Link href="/contact" className="btn btn-outline-dark" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>
                            <Phone size={16} strokeWidth={2} style={{ marginRight: '.5rem' }} />
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-gray">
                <div className="container" style={{ maxWidth: '960px' }}>
                    <div className="section-header section-header-center">
                        <span className="section-label">Navigation</span>
                        <h2>Explore Core Services</h2>
                        <div className="rule rule-center" />
                    </div>

                    <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { label: 'Plastic Raw Materials', href: '/plastic-raw-materials', desc: 'Virgin and recycled polymer grades for European manufacturing.' },
                            { label: 'Packaging Solutions', href: '/packaging-solutions', desc: 'Flexible industrial packaging films and flexible logistics packaging.' },
                            { label: 'Forklift Leasing', href: '/forklift-leasing', desc: 'Flexible fleet leasing for material handling equipment.' },
                            { label: 'Consulting Services', href: '/consulting-services', desc: 'Strategic supply chain optimization and international trade advisory.' },
                            { label: 'Machinery Representation', href: '/machinery-representation', desc: 'European industrial manufacturing machinery representation.' },
                        ].map(s => (
                            <Link key={s.href} href={s.href} className="service-card" style={{ textDecoration: 'none' }}>
                                <h4 style={{ color: 'var(--gray-900)', fontSize: '1.125rem', marginBottom: '.5rem' }}>{s.label}</h4>
                                <p style={{ color: 'var(--gray-600)', fontSize: '.875rem', lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                                <span className="service-card-link" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '.375rem' }}>
                                    View Service <ArrowRight size={14} strokeWidth={2} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
