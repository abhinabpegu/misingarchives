import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function CopyrightPolicy() {
  usePageTitle('Copyright Policy')
  const { colors } = useTheme()

  const sectionWrap = {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '48px clamp(20px, 5vw, 40px) 80px',
  }

  const h2 = { fontSize: '20px', fontWeight: '700', margin: '36px 0 12px', color: colors.text }
  const p = { fontSize: '14px', color: colors.textSecondary, lineHeight: '1.75', margin: '0 0 14px' }
  const li = { fontSize: '14px', color: colors.textSecondary, lineHeight: '1.75', marginBottom: '8px' }
  const link = { color: colors.accentPrimary, fontWeight: '600' }

  return (
    <div style={sectionWrap}>
      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
        Legal
      </span>
      <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', color: colors.text }}>
        Copyright Policy
      </h1>
      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        Last updated: 24 July 2026
      </p>

      <p style={p}>
        Mising Archives hosts two different kinds of content, covered by two
        different sets of rules: original writing published by the project and
        its contributors, and books in the{' '}
        <Link to="/digital-book-library" style={link}>Digital Book Library</Link>{' '}
        that were written and published by others. This page explains how
        copyright works for each, and what to do if you're a rights holder with
        a concern.
      </p>

      <h2 style={h2}>Original Site Content — CC BY-SA 4.0</h2>
      <p style={p}>
        Articles, poetry, and other community writings published on this site —
        along with the website's own text and documentation — are original
        content created by Mising Archives and its contributors. This content is
        licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" style={link}>
          Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
        </a>.
      </p>
      <p style={p}>In short, you're free to:</p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}><strong>Share</strong> — copy and redistribute it in any format.</li>
        <li style={li}><strong>Adapt</strong> — remix, translate, and build on it, even commercially.</li>
      </ul>
      <p style={p}>As long as you:</p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}>Give appropriate credit — the author's name as shown on the piece, and a link back to the original page on misingarchives.co.in.</li>
        <li style={li}>License anything you adapt from it under those same CC BY-SA 4.0 terms.</li>
      </ul>

      <h2 style={h2}>The Digital Book Library</h2>
      <p style={p}>
        Books in the Digital Book Library are <strong>not</strong> covered by the
        CC BY-SA license above — they're works written and published by other
        authors, and each carries its own copyright status:
      </p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}>Works that are already in the public domain.</li>
        <li style={li}>Works made available through partner archives under their own terms — credited as "Archived By" on each book (Internet Archive, Pahar.in, Public.Resource.Org).</li>
        <li style={li}>Works hosted with direct permission from the author or rights holder.</li>
      </ul>
      <p style={p}>
        Each book's detail page credits its source under "Archived By," so you
        can see which of these applies to any given title.
      </p>
      <p style={p}>
        When we host a book with direct permission from its author or rights
        holder, that permission is kept deliberately simple: it's{' '}
        <strong>non-exclusive</strong> — the rights holder keeps full ownership
        and is free to share the work elsewhere too — it applies only to that
        specific title, and it can be <strong>revoked at any time</strong>: if a
        rights holder asks us to take a book down, we will. Hosting a book here
        doesn't place it under an open license, so please don't redistribute or
        republish anything from the library elsewhere without separately
        checking with its rights holder — downloading a copy to read is exactly
        what the library is here for.
      </p>

      <h2 style={h2}>How We Get Permission to Archive a Book</h2>
      <p style={p}>
        Authors and rights holders can grant permission for a book to be
        archived through our book archival form (linked from the{' '}
        <Link to="/digital-book-library" style={link}>Digital Book Library</Link>{' '}
        page) or by emailing us directly, and we keep a record of that
        permission on file. Beyond that, we only add books that are already
        public domain or that come from a partner archive that has already
        cleared the rights.
      </p>

      <h2 style={h2}>Takedown Requests</h2>
      <p style={p}>
        If you're a copyright holder and want a book or piece of content
        removed, contact us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or through our <Link to="/contact" style={link}>contact form</Link>{' '}
        (select "Copyright / Takedown Request"), including the book's title or
        code — or a link to the article — and confirmation that you hold the
        rights. As a small volunteer-run project we can't promise instant
        turnaround, but we take these requests seriously and act on verified
        ones promptly.
      </p>

      <h2 style={h2}>Third-Party Sources</h2>
      <p style={p}>
        Some books in the library were sourced from, or are also hosted by,
        other archives — each governed by its own copyright policy:
      </p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}><a href="https://archive.org" target="_blank" rel="noopener noreferrer" style={link}>Internet Archive</a></li>
        <li style={li}><a href="https://pahar.in" target="_blank" rel="noopener noreferrer" style={link}>Pahar.in</a></li>
        <li style={li}><a href="https://public.resource.org" target="_blank" rel="noopener noreferrer" style={link}>Public.Resource.Org</a></li>
      </ul>

      <h2 style={h2}>Questions</h2>
      <p style={p}>
        Anything here unclear? Reach us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or via our <Link to="/contact" style={link}>contact form</Link>. For the
        rest of our legal terms, see our{' '}
        <Link to="/privacy-policy" style={link}>Privacy Policy</Link> and{' '}
        <Link to="/terms-of-use" style={link}>Terms of Use</Link>.
      </p>
    </div>
  )
}