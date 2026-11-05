import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy')

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
        Privacy Policy
      </h1>
      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        Last updated: 6 November 2026
      </p>

      <p style={p}>
        Mising Archives ("we," "us," "the project") is an independent, community-led,
        non-commercial initiative to preserve and share Mising language, history, and
        culture. This page explains what personal information we collect through{' '}
        <a href="https://misingarchives.co.in" style={link}>misingarchives.co.in</a>,
        why we collect it, and what rights you have over it.
      </p>

      <h2 style={h2}>Information We Collect</h2>
      <p style={p}>We collect the following, and nothing beyond it:</p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}>
          <strong>Contact form.</strong> When you use our{' '}
          <Link to="/contact" style={link}>contact form</Link>, we collect your name,
          email address, optional phone number, selected topic, and message. This is
          processed by our form provider, Web3Forms, which forwards it directly to our
          project inbox. We don't otherwise store or use this data.
        </li>
        <li style={li}>
          <strong>Donations page.</strong> If you donate and choose to be named, your
          name, donation amount, date, and any note you provide are published publicly
          on our <Link to="/donations" style={link}>Donations</Link> transparency page.
          Choosing "anonymous" hides your name from public view — we still keep an
          internal record for our own accounting.
        </li>
        <li style={li}>
          <strong>Payments.</strong> Donations are processed directly by Razorpay. We
          do not receive or store your card, UPI, or bank details — only the donor
          name/amount you choose to share with us separately, if any.
        </li>
        <li style={li}>
          <strong>Book and article submissions.</strong> Requests to archive a book or
          submit an article are collected via Google Forms, which is governed by{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={link}>
            Google's own privacy policy
          </a>.
        </li>
        <li style={li}>
          <strong>Artisan profiles (the shop).</strong> If you are an artisan listed in
          our <Link to="/shop" style={link}>Shop</Link>, we hold the details you or we
          enter for you: your name, business name, village/town, district and state,
          photo, biography, languages, the crafts you make, delivery information, and
          the contact details you choose to give (phone, WhatsApp, email, Instagram,
          Facebook, website), plus the product listings and photos you add. Your
          profile and listings, <strong>including the contact details you provide</strong>,
          are shown publicly on the shop pages, with your agreement. Leave a field blank
          if you don't want it shown.
        </li>
        <li style={li}>
          <strong>Artisan and staff logins.</strong> Artisans sign in with a username and
          password; project staff sign in with an email address and password. Passwords
          are handled by our authentication provider, Supabase, which stores them in a
          form we cannot read. We cannot see your password and can only set a new one.
        </li>
        <li style={li}>
          <strong>Shop visitors.</strong> You don't need an account to browse the shop.
          When you tap WhatsApp, Call, Email or Instagram on an artisan's page, your device
          opens that app or service and any conversation is between you and the artisan.
          We do not see, receive or store those messages. Each service handles your data
          under its own privacy policy.
        </li>
        <li style={li}>
          <strong>Analytics.</strong> We use Google Analytics to understand how the
          site is used — pages visited, approximate location, device/browser type, and
          similar usage patterns. Google Analytics uses cookies to do this. See{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={link}>
            Google's Privacy Policy
          </a>{' '}
          for how Google handles this data.
        </li>
        <li style={li}>
          <strong>Local browser storage.</strong> We use your browser's session
          storage to remember if you've dismissed the donation banner. This stays on
          your device and isn't sent to us. If you sign in as an artisan or staff member,
          our authentication provider also keeps a login session token in your browser's
          local storage so you stay signed in until you sign out.
        </li>
      </ul>

      <h2 style={h2}>Why We Collect It</h2>
      <p style={p}>
        To respond to your messages, process book/article contributions, maintain
        public accountability for donated funds, run the artisan shop and let buyers
        reach artisans, keep artisan accounts secure, and understand how people use the
        site so we can improve it. We don't sell personal data, and we don't use it
        for advertising.
      </p>

      <h2 style={h2}>Third Parties We Rely On</h2>
      <p style={p}>
        As a small community project, we rely on the following services to
        operate. Each processes data under its own privacy policy:
      </p>
      <ul style={{ paddingLeft: '22px', margin: '0 0 14px' }}>
        <li style={li}>Web3Forms — contact form delivery</li>
        <li style={li}>Razorpay — donation payment processing</li>
        <li style={li}>Google Forms — book/article submission intake</li>
        <li style={li}>Google Analytics — site usage analytics</li>
        <li style={li}>Supabase — database and login for the artisan shop and admin tools</li>
        <li style={li}>Cloudinary — image hosting for the website and shop photos</li>
        <li style={li}>Vercel — website hosting</li>
        <li style={li}>Cloudflare — domain name resolution (DNS)</li>
      </ul>
      <p style={p}>
        Some of these providers may store or process data on servers outside India.
      </p>

      <h2 style={h2}>How Long We Keep Data</h2>
      <p style={p}>
        Contact form messages are kept only as long as needed to respond to your
        query. Donation records are kept indefinitely as part of our public financial
        transparency log, unless you request removal (see below). Artisan profiles,
        listings and logins are kept while the artisan is part of the shop. When an
        artisan is removed, their profile, product listings and login are deleted from
        our database. Copies of photos on our image host may take longer to disappear,
        and anything already copied or cached elsewhere is outside our control.
      </p>

      <h2 style={h2}>Your Rights</h2>
      <p style={p}>
        Under India's Digital Personal Data Protection Act, 2023, you have the right
        to access, correct, or request erasure of personal data we hold about you, and
        to withdraw consent where applicable (for example, asking us to remove your
        name from the public donations log and list you as anonymous instead, or asking
        us to hide or delete your artisan profile or any contact detail shown in the
        shop). Artisans can also edit their own profile and listings after signing in.
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or through our <Link to="/contact" style={link}>contact form</Link>. We'll
        respond as promptly as a small volunteer-run project reasonably can.
      </p>

      <h2 style={h2}>Children's Privacy</h2>
      <p style={p}>
        This site is not directed at children, and we don't knowingly collect personal
        data from anyone we believe to be under 18 without appropriate consent.
      </p>

      <h2 style={h2}>Changes to This Policy</h2>
      <p style={p}>
        We may update this policy as the project grows. Material changes will be
        reflected by updating the "Last updated" date above.
      </p>

      <h2 style={h2}>Contact</h2>
      <p style={p}>
        Questions about this policy? Reach us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or via our <Link to="/contact" style={link}>contact form</Link>.
      </p>
    </div>
  )
}