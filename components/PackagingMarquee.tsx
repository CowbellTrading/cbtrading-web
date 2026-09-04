import SafeImage from '@/components/SafeImage'

interface PackagingItem {
    id: string
    title: string
    category: string
    image: string
    alt: string
}

const TOP_ROW: PackagingItem[] = [
    {
        id: 'stretch-film',
        title: 'Stretch & Shrink Film',
        category: 'Industrial Packaging',
        image: '/images/packaging/stretch-film.svg',
        alt: 'High-clarity machine stretch film rolls for industrial pallet wrapping',
    },
    {
        id: 'pe-sacks',
        title: 'Heavy-Duty PE Sacks',
        category: 'Bulk Packaging',
        image: '/images/packaging/pe-sacks.svg',
        alt: 'Heavy-duty polyethylene sacks for bulk granular and chemical materials',
    },
    {
        id: 'pp-woven-bags',
        title: 'PP Woven Sacks',
        category: 'Agri & Industrial',
        image: '/images/packaging/pp-woven-bags.svg',
        alt: 'Polypropylene woven bags for agricultural grains and industrial commodities',
    },
    {
        id: 'pallet-wrap',
        title: 'Pallet Protection & Wrap',
        category: 'Transit Packaging',
        image: '/images/packaging/pallet-wrap.svg',
        alt: 'Pallet protection covers and edge stabilizers for secure logistics transit',
    },
    {
        id: 'edge-protectors',
        title: 'Edge & Corner Protectors',
        category: 'Load Stabilization',
        image: '/images/packaging/edge-protectors.svg',
        alt: 'Corrugated cardboard edge and corner protectors for freight stabilization',
    },
    {
        id: 'shrink-covers',
        title: 'Thermal Shrink Covers',
        category: 'Machinery Packaging',
        image: '/images/packaging/shrink-covers.svg',
        alt: 'Heavy-gauge thermal shrink covers for outdoor machinery and pallet protection',
    },
]

const BOTTOM_ROW: PackagingItem[] = [
    {
        id: 'barrier-film',
        title: 'Food-Grade Barrier Film',
        category: 'Flexible Packaging',
        image: '/images/packaging/barrier-film.svg',
        alt: 'Multi-layer food-grade barrier film for perishable commercial packaging',
    },
    {
        id: 'eco-mailers',
        title: 'Biodegradable Mailers',
        category: 'Sustainable Packaging',
        image: '/images/packaging/eco-mailers.svg',
        alt: 'Compostable and biodegradable courier transit mailers for eco-friendly logistics',
    },
    {
        id: 'vci-bags',
        title: 'VCI Anti-Corrosion Bags',
        category: 'Protective Packaging',
        image: '/images/packaging/vci-bags.svg',
        alt: 'Vapor Corrosion Inhibitor (VCI) poly bags for metal parts rust prevention',
    },
    {
        id: 'fibc-bags',
        title: 'FIBC Jumbo Bulk Bags',
        category: 'Chemical & Bulk',
        image: '/images/packaging/fibc-bags.svg',
        alt: 'Flexible Intermediate Bulk Container (FIBC) jumbo sacks for mining and chemicals',
    },
    {
        id: 'cushioning-rolls',
        title: 'Bubble & Cushioning Rolls',
        category: 'Surface Protection',
        image: '/images/packaging/cushioning-rolls.svg',
        alt: 'Shock-absorbing bubble wrap and air cushioning rolls for fragile transit',
    },
    {
        id: 'custom-poly-bags',
        title: 'Custom Printed Poly Bags',
        category: 'Commercial Packaging',
        image: '/images/packaging/custom-poly-bags.svg',
        alt: 'Custom printed poly bags with brand logo for retail and wholesale distribution',
    },
]

interface PackagingMarqueeProps {
    showHeader?: boolean
    sectionId?: string
    className?: string
}

// Server component — pure CSS marquee & hover-pause
export default function PackagingMarquee({
    showHeader = true,
    sectionId = 'packaging-solutions',
    className = '',
}: PackagingMarqueeProps) {
    // Duplicate arrays for seamless infinite looping
    const duplicatedTop = [...TOP_ROW, ...TOP_ROW]
    const duplicatedBottom = [...BOTTOM_ROW, ...BOTTOM_ROW]

    const marqueeContent = (
        <div className="marquee-container" aria-label="Packaging product showcase carousel">
            {/* Top Row: Scrolls RIGHT */}
            <div className="marquee-row">
                <div className="marquee-track marquee-track-right">
                    {duplicatedTop.map((item, idx) => (
                        <div key={`${item.id}-top-${idx}`} className="packaging-card">
                            <div className="packaging-card-image">
                                <SafeImage
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    sizes="280px"
                                    unoptimized
                                />
                            </div>
                            <div className="packaging-card-content">
                                <span className="packaging-card-category">{item.category}</span>
                                <h4 className="packaging-card-title">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Scrolls LEFT */}
            <div className="marquee-row">
                <div className="marquee-track marquee-track-left">
                    {duplicatedBottom.map((item, idx) => (
                        <div key={`${item.id}-bot-${idx}`} className="packaging-card">
                            <div className="packaging-card-image">
                                <SafeImage
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    sizes="280px"
                                    unoptimized
                                />
                            </div>
                            <div className="packaging-card-content">
                                <span className="packaging-card-category">{item.category}</span>
                                <h4 className="packaging-card-title">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    if (!showHeader) {
        return (
            <div className={`packaging-marquee-wrapper ${className}`} style={{ marginBottom: '3rem', width: '100%', overflow: 'hidden' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Products Showcase</h3>
                {marqueeContent}
            </div>
        )
    }

    return (
        <section className={`section section-white ${className}`} id={sectionId}>
            <div className="container">
                <div className="section-header section-header-center">
                    <span className="section-label">Products &amp; Sourcing</span>
                    <h2>Packaging Solutions</h2>
                    <div className="rule rule-center" />
                    <p>
                        Industrial, commercial, and protective packaging materials engineered for
                        European supply chain durability and sustainability.
                    </p>
                </div>
            </div>

            {marqueeContent}
        </section>
    )
}
