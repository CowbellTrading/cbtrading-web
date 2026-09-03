import SafeImage from '@/components/SafeImage'
import { ExternalLink } from 'lucide-react'

const PARTNERS = [
    {
        name: 'Radiant Packaging UAE',
        logo: '/PHOTO 1.webp',
        url: 'https://www.radiantpackaginguae.com/',
        description: 'Regional industrial & flexible packaging partner specializing in high-performance packaging solutions.',
        category: 'Packaging Supplier',
    },
    {
        name: 'Prime Pak Group',
        logo: '/PHOTO 2.png',
        url: 'https://primepakgroup.com/',
        description: 'Global sustainable packaging & materials supplier delivering eco-friendly packaging technologies.',
        category: 'Global Partner',
    },
]

export default function IndustryPartners() {
    return (
        <section className="partners-section">
            <div className="container">
                <div className="section-header section-header-center">
                    <span className="section-label">Strategic Alliances</span>
                    <h2>Our Partners</h2>
                    <div className="rule rule-center" />
                    <p>
                        We collaborate with leading regional and global suppliers to ensure reliable, high-quality packaging and material supply solutions.
                    </p>
                </div>

                <div className="partners-grid">
                    {PARTNERS.map((partner) => (
                        <a
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-card"
                        >
                            <div className="partner-logo-container">
                                <SafeImage
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    width={220}
                                    height={90}
                                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </div>

                            <div className="partner-card-body">
                                <div className="partner-card-header">
                                    <span className="partner-category">{partner.category}</span>
                                    <ExternalLink size={18} strokeWidth={2} className="partner-card-icon" />
                                </div>
                                <h5>{partner.name}</h5>
                                <p>{partner.description}</p>
                                <span className="partner-visit-link">
                                    Visit Website <ExternalLink size={14} strokeWidth={2} />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

