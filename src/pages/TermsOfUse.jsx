import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function TermsOfUse() {
  usePageTitle('Terms of Use')
  const { colors } = useTheme()

  const sectionWrap = {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '48px clamp(20px, 5vw, 40px) 80px',
  }

  const h2 = { fontSize: '20px', fontWeight: '700', margin: '36px 0 12px', color: colors.text }
  const p = { fontSize: '14px', color: colors.textSecondary, lineHeight: '1.75', margin: '0 0 14px' }
  const link = { color: colors.accentPrimary, fontWeight: '600' }

  return (
    <div style={sectionWrap}>
      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
        Legal
      </span>
      <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', color: colors.text }}>
        Terms of Use
      </h1>
      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        Last updated: July 2026
      </p>

      <p style={p}>
        Mising Archives is an independent, community-led, non-commercial initiative to
        preserve and share knowledge about Mising language, history, and culture. By
        using this site, you agree to the terms below.
      </p>

      <h2 style={h2}>Nature of the Project</h2>
      <p style={p}>
        We are not a registered nonprofit, government body, or commercial entity —
        just a volunteer-run community archive. Content is maintained on a best-effort
        basis by community contributors.
      </p>

      <h2 style={h2}>Content Licensing</h2>
      <p style={p}>
        Original articles, writing, and site content published by Mising Archives are
        licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" style={link}>
          Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
        </a>, meaning you're free to share and adapt them with attribution, under the
        same license.
      </p>
      <p style={p}>
        Books in the Digital Book Library are made available under their own
        respective copyright permissions, licenses, or public domain status, as
        indicated for each item. We do not claim ownership over archived books — only
        over how we've organized and presented them.
      </p>

      <h2 style={h2}>Copyright &amp; Takedown Requests</h2>
      <p style={p}>
        If you believe a book or piece of content on this site infringes your
        copyright, contact us through our{' '}
        <Link to="/contact" style={link}>contact form</Link> (select "Copyright /
        Takedown Request") with the book title/code and proof of ownership. We take
        these requests seriously and will remove content promptly upon verification.
      </p>

      <h2 style={h2}>User Submissions</h2>
      <p style={p}>
        By submitting a book for archival or an article/writing for publication, you
        confirm that you either hold the rights to that content or have permission
        from the rights holder to share it with us. Submissions are reviewed before
        publication, and we reserve the right to decline or edit submissions for
        clarity, length, or suitability.
      </p>

      <h2 style={h2}>Donations</h2>
      <p style={p}>
        Donations support hosting costs and book archival efforts and are entirely
        voluntary. As we are not a registered nonprofit, donations are not
        tax-deductible. All funds received and spent are logged publicly on our{' '}
        <Link to="/donations" style={link}>Donations</Link> page.
      </p>

      <h2 style={h2}>No Warranty</h2>
      <p style={p}>
        Content on this site — including historical accounts, community writings, and
        archived books — is provided "as is." Much of it reflects community knowledge,
        oral history, or the views of individual contributors, and we don't guarantee
        completeness or absolute historical accuracy.
      </p>

      <h2 style={h2}>Limitation of Liability</h2>
      <p style={p}>
        To the extent permitted by law, Mising Archives and its contributors aren't
        liable for any damages arising from your use of this site or reliance on its
        content.
      </p>

      <h2 style={h2}>Governing Law</h2>
      <p style={p}>
        These terms are governed by the laws of India.
      </p>

      <h2 style={h2}>Changes to These Terms</h2>
      <p style={p}>
        We may update these terms as the project evolves. Continued use of the site
        after changes means you accept the updated terms.
      </p>

      <h2 style={h2}>Contact</h2>
      <p style={p}>
        Questions? Reach us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or via our <Link to="/contact" style={link}>contact form</Link>.
      </p>
    </div>
  )
}