import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Cowbell Keystone Trading Ireland Limited — how we use cookies and how to manage your preferences.',
}

export default function CookiesPage() {
  const year = new Date().getFullYear()
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">Cookie Policy</span>
          </nav>
          <h1>Cookie Policy</h1>
          <p className="lead">Last updated: June {year}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, lineHeight: 1.85 }}>

            <h2 style={{ fontSize: '1.375rem', marginBottom: '1rem' }}>What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They are widely
              used to make websites work more efficiently and to provide information to the site owner.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>How We Use Cookies</h2>
            <p>
              Cowbell Keystone Trading Ireland Limited uses cookies on <a href="https://cbtrading.ie" style={{ color: 'var(--green-700)' }}>cbtrading.ie</a>{' '}
              for the following purposes:
            </p>

            <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md)', border: '1px solid var(--gray-200)', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9375rem' }}>
                <thead>
                  <tr>
                    <th style={{ background: 'var(--green-800)', color: '#fff', padding: '.875rem 1.25rem', textAlign: 'left', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Type</th>
                    <th style={{ background: 'var(--green-800)', color: '#fff', padding: '.875rem 1.25rem', textAlign: 'left', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Purpose</th>
                    <th style={{ background: 'var(--green-800)', color: '#fff', padding: '.875rem 1.25rem', textAlign: 'left', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Required?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.875rem 1.25rem', fontWeight: 600, color: 'var(--gray-800)' }}>Strictly Necessary</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--gray-600)' }}>Enable core site functionality such as security, form submissions, and page navigation.</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--green-700)', fontWeight: 600 }}>Yes</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.875rem 1.25rem', fontWeight: 600, color: 'var(--gray-800)' }}>Cookie Consent</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--gray-600)' }}>Stores your cookie preference to avoid repeatedly showing the consent banner.</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--green-700)', fontWeight: 600 }}>Yes</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '.875rem 1.25rem', fontWeight: 600, color: 'var(--gray-800)' }}>Analytics</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--gray-600)' }}>Help us understand how visitors use our site so we can improve it. Only set with your consent.</td>
                    <td style={{ padding: '.875rem 1.25rem', color: 'var(--gray-500)' }}>Optional</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>Managing Cookies</h2>
            <p>
              You can manage or delete cookies through your browser settings. Note that disabling certain cookies
              may affect the functionality of our website. Most browsers allow you to:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '.5rem' }}>View cookies stored on your device.</li>
              <li style={{ marginBottom: '.5rem' }}>Delete all or specific cookies.</li>
              <li style={{ marginBottom: '.5rem' }}>Block cookies from specific or all websites.</li>
            </ul>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>Third-Party Cookies</h2>
            <p>
              We do not currently use third-party advertising or tracking cookies. If this changes, this policy
              will be updated accordingly.
            </p>

            <h2 style={{ fontSize: '1.375rem', margin: '2rem 0 1rem' }}>Contact</h2>
            <p>
              If you have questions about our use of cookies, contact us at{' '}
              <a href="mailto:info@cb-trading.ie" style={{ color: 'var(--green-700)' }}>info@cb-trading.ie</a> or
              see our <Link href="/privacy" style={{ color: 'var(--green-700)' }}>Privacy Policy</Link>.
            </p>

          </div>
        </div>
      </section>
    </>
  )
}
