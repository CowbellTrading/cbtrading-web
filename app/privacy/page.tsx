import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Cowbell Keystone Trading Ireland Limited — how we collect, use, and protect your personal data.',
}

export default function PrivacyPage() {
  const year = new Date().getFullYear()
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: June {year}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, lineHeight: 1.85 }}>

            <h2 style={{ fontSize: '1.375rem', marginBottom: '1rem' }}>1. Who We Are</h2>
            <p>
              Cowbell Keystone Trading Ireland Limited (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a company registered in Ireland.
              Our website is <a href="https://cbtrading.ie" style={{ color: 'var(--green-700)' }}>cbtrading.ie</a> and we can be contacted at{' '}
              <a href="mailto:info@cb-trading.ie" style={{ color: 'var(--green-700)' }}>info@cb-trading.ie</a>.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>2. What Data We Collect</h2>
            <p>We may collect the following types of personal data:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '.5rem' }}><strong>Contact information:</strong> name, email address, phone number, and company name when you submit an enquiry.</li>
              <li style={{ marginBottom: '.5rem' }}><strong>Communication data:</strong> messages you send us through our contact form or by email.</li>
              <li style={{ marginBottom: '.5rem' }}><strong>Technical data:</strong> IP address, browser type, and pages visited (via analytics cookies, only with your consent).</li>
            </ul>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>3. How We Use Your Data</h2>
            <p>We use your personal data to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '.5rem' }}>Respond to your enquiries and provide the services you have requested.</li>
              <li style={{ marginBottom: '.5rem' }}>Send you information relevant to your enquiry (where you have consented).</li>
              <li style={{ marginBottom: '.5rem' }}>Improve our website and understand how it is used (analytics, with consent only).</li>
              <li style={{ marginBottom: '.5rem' }}>Comply with our legal obligations.</li>
            </ul>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>4. Legal Basis</h2>
            <p>
              We process your data on the basis of: (a) your consent, (b) our legitimate interests in responding to business enquiries,
              and (c) compliance with legal obligations where applicable.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>5. Data Sharing</h2>
            <p>
              We do not sell or rent your personal data. We may share data with our email service provider (Resend)
              solely for the purpose of delivering email communications. These providers are bound by data processing agreements.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>6. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to fulfil the purpose for which it was collected,
              or as required by law. Enquiry data is typically retained for up to 3 years.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '.5rem' }}>Access the personal data we hold about you.</li>
              <li style={{ marginBottom: '.5rem' }}>Request correction or deletion of your data.</li>
              <li style={{ marginBottom: '.5rem' }}>Withdraw consent at any time.</li>
              <li style={{ marginBottom: '.5rem' }}>Lodge a complaint with the Data Protection Commission (Ireland).</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:info@cb-trading.ie" style={{ color: 'var(--green-700)' }}>info@cb-trading.ie</a>.</p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>8. Cookies</h2>
            <p>
              We use cookies in accordance with our <Link href="/cookies" style={{ color: 'var(--green-700)' }}>Cookie Policy</Link>.
              You can manage your cookie preferences at any time.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              revision date. Continued use of our website after any changes constitutes acceptance of the revised policy.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>10. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@cb-trading.ie" style={{ color: 'var(--green-700)' }}>info@cb-trading.ie</a>.
            </p>

          </div>
        </div>
      </section>
    </>
  )
}
