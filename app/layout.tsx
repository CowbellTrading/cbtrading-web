import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  metadataBase: new URL('https://cb-trading.ie'),
  title: {
    default: 'Cowbell Keystone Trading Ireland | Plastic Materials, Packaging & Logistics',
    template: '%s | Cowbell Keystone Trading',
  },
  description:
    'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation.',
  keywords: [
    'plastic raw materials Ireland',
    'packaging solutions Ireland',
    'forklift leasing Ireland',
    'supply chain consulting Ireland',
    'industrial trading Ireland',
    'Cowbell Keystone',
    'cb-trading',
  ],
  authors: [{ name: 'Cowbell Keystone Trading Ireland Limited' }],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://cb-trading.ie',
    siteName: 'Cowbell Keystone Trading Ireland',
    title: 'Cowbell Keystone Trading Ireland Limited',
    description:
      'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation. The company sources products globally from Nigeria, Dubai, the Middle East, Southeast Asia, and China while serving customers across Ireland, Spain, and European markets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cowbell Keystone Trading Ireland Limited',
    description:
      'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/logo-white.svg', type: 'image/svg+xml' },
      { url: '/logo-white.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/logo-white.png',
    apple: '/logo-white.png',
  },
  alternates: {
    canonical: 'https://cb-trading.ie/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Corporation",
                "name": "Cowbell Keystone Trading Ireland Limited",
                "url": "https://cb-trading.ie",
                "logo": "https://cb-trading.ie/logo-white.svg",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+353-89-489-8717",
                  "contactType": "customer service",
                  "areaServed": ["IE", "ES", "EU"],
                  "availableLanguage": "en"
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kilmartin Grove",
                  "addressLocality": "Dublin",
                  "postalCode": "D15 AX0H",
                  "addressCountry": "IE"
                },
                "description": "Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation."
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Cowbell Keystone Trading Ireland",
                "url": "https://cb-trading.ie"
              }
            ]),
          }}
        />
      </head>
      <body>
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}

