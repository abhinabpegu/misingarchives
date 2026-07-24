import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function TermsOfUse() {
  usePageTitle('Terms of Use')
  const { colors } = useTheme()

  const sectionWrap = {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '48px clamp(20px, 5vw, 40px) 80px',
  }

  const h2 = { fontSize: '20px', fontWeight: '700', margin: '40px 0 12px', color: colors.text }
  const h3 = { fontSize: '15px', fontWeight: '700', margin: '22px 0 10px', color: colors.text }
  const p = { fontSize: '14px', color: colors.textSecondary, lineHeight: '1.75', margin: '0 0 14px' }
  const li = { fontSize: '14px', color: colors.textSecondary, lineHeight: '1.75', marginBottom: '8px' }
  const link = { color: colors.accentPrimary, fontWeight: '600' }
  const numbered = { paddingLeft: '22px', margin: '0 0 14px' }

  const noteBox = {
    padding: '16px 18px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgTertiary,
    fontSize: '13px',
    color: colors.textSecondary,
    lineHeight: '1.7',
    margin: '0 0 14px'
  }

  return (
    <div style={sectionWrap}>
      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
        Legal
      </span>
      <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', color: colors.text }}>
        Terms of Use
      </h1>
      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        Last updated: 24 July 2026
      </p>

      <p style={p}>
        These Terms of Use ("Terms") are a legal agreement between you ("you," "user")
        and Mising Archives ("we," "us," "the Project," "the Website"), an
        independent, volunteer-run, non-commercial community initiative operating the
        website at misingarchives.co.in, based in Jorhat, Assam, India. These Terms are
        an electronic record under the Information Technology Act, 2000 and the rules
        made thereunder, and constitute a legally binding agreement between you and
        Mising Archives under the Indian Contract Act, 1872. By accessing or using this
        Website in any way, you agree to be bound by these Terms. If you do not agree,
        please discontinue use of the Website.
      </p>

      <h2 style={h2}>1. About Mising Archives</h2>
      <p style={p}>
        Mising Archives is not a registered company, society, trust, or any other
        incorporated legal entity. It is an informal, community-led project maintained
        by volunteers to document and share Mising language, history, and culture,
        funded through voluntary community donations. Because it is not incorporated,
        it does not have separate legal personality distinct from the individuals who
        run it; references in these Terms to "Mising Archives" mean the project as
        operated by its volunteer maintainers from time to time.
      </p>
      <p style={p}>
        The Website is provided free of charge, for informational, educational, and
        cultural-preservation purposes. It is not operated as a commercial venture, and
        nothing on it should be understood as a commercial offer of goods or services
        in the sense used by the Consumer Protection Act, 2019 or the rules made under
        it — the Digital Book Library and the Community Writings section are provided
        without charge, and donations made through the Website are voluntary
        contributions, not payment for any product or service.
      </p>

      <h2 style={h2}>2. Acceptance of Terms &amp; Eligibility</h2>
      <p style={p}>
        By browsing, downloading from, submitting content to, or otherwise using this
        Website, you confirm that:
      </p>
      <ol style={numbered}>
        <li style={li}>You are at least 18 years of age, or are accessing the Website under the supervision of a parent or legal guardian who accepts these Terms on your behalf;</li>
        <li style={li}>You have the legal capacity to enter into a binding agreement under the Indian Contract Act, 1872;</li>
        <li style={li}>You will use the Website in compliance with these Terms and all applicable laws of India; and</li>
        <li style={li}>Any information you provide to us (for example, through the contact form or a submission form) is accurate and not misleading.</li>
      </ol>

      <h2 style={h2}>3. Nature of Content — No Warranty of Accuracy</h2>
      <p style={p}>
        The Website hosts historical accounts, oral tradition, community writings,
        opinion pieces, and digitised books contributed or reviewed by volunteers. This
        content:
      </p>
      <ul style={numbered}>
        <li style={li}>Is provided for general informational and cultural purposes only;</li>
        <li style={li}>Does <strong>not</strong> constitute academic, legal, medical, financial, or any other professional advice of any kind;</li>
        <li style={li}>May reflect the personal views, memory, or interpretation of individual community members or authors, and does not necessarily represent a single, verified, or official account of any historical or cultural matter;</li>
        <li style={li}>Is provided "as is" and "as available," without any representation or warranty — express, implied, or statutory — as to its accuracy, completeness, timeliness, or reliability.</li>
      </ul>
      <p style={p}>
        You are solely responsible for independently verifying any information from
        this Website before relying on it for any purpose, including academic
        citation, research, publication, or decision-making.
      </p>

      <h2 style={h2}>4. Digital Book Library</h2>
      <p style={p}>
        Books made available through the Digital Book Library are provided under
        public domain status, permission from their respective rights holders, or
        arrangements with partner archives, as described for each title and in our{' '}
        <Link to="/copyright-policy" style={link}>Copyright Policy</Link>. We make
        reasonable efforts to verify the copyright status of each book before
        publishing it, but we do not guarantee that every book is free of third-party
        rights, and we disclaim liability for any error in that assessment to the
        fullest extent permitted by law. If you believe a book infringes your rights,
        see Section 15 (Grievance Redressal) below.
      </p>
      <p style={p}>
        Books are made available for personal, non-commercial reading and research use
        only. You may not redistribute, republish, sell, or commercially exploit any
        book obtained through this Website without independently securing the
        necessary rights from its actual copyright holder.
      </p>

      <h2 style={h2}>5. User-Submitted Content</h2>
      <p style={p}>
        The Website accepts submissions from the community, including but not limited
        to: article and writing submissions, book archival requests and permissions,
        and messages sent through the contact form (collectively, "User Content").
        Where you submit User Content to us, you represent and warrant that:
      </p>
      <ol style={numbered}>
        <li style={li}>You either own the rights to the User Content, or have obtained all necessary permissions from the rights holder to submit it to us and permit its publication;</li>
        <li style={li}>The User Content does not infringe any third party's intellectual property, privacy, or other legal rights;</li>
        <li style={li}>The User Content is not unlawful, defamatory, obscene, threatening, hateful, or otherwise objectionable, and does not violate any provision of the Information Technology Act, 2000, the Indian Penal Code, 1860 / Bharatiya Nyaya Sanhita, 2023, or any other applicable Indian law; and</li>
        <li style={li}>The User Content, if factual or historical in nature, is submitted in good faith to the best of your knowledge.</li>
      </ol>
      <p style={p}>
        By submitting User Content, you grant Mising Archives a worldwide,
        royalty-free, non-exclusive licence to host, reproduce, edit for clarity or
        length, and publish that content on the Website and its associated social
        media channels, consistent with the licensing terms described in our{' '}
        <Link to="/copyright-policy" style={link}>Copyright Policy</Link>. All
        submissions are reviewed before publication, and we reserve the sole
        discretion to accept, reject, edit, or later remove any submission, without
        being obliged to give reasons.
      </p>
      <p style={p}>
        You remain solely responsible for the User Content you submit. We do not
        pre-screen all User Content before it reaches us, and we act only as an
        intermediary in receiving it, within the meaning of Section 2(1)(w) of the
        Information Technology Act, 2000 — see Section 14 below.
      </p>

      <h2 style={h2}>6. Prohibited Uses</h2>
      <p style={p}>You agree not to use the Website to:</p>
      <ul style={numbered}>
        <li style={li}>Upload, submit, or transmit any content that is unlawful, harassing, defamatory, obscene, or infringing of any third party's rights;</li>
        <li style={li}>Misrepresent your identity or affiliation, or impersonate any person or entity;</li>
        <li style={li}>Attempt to gain unauthorised access to any part of the Website, its underlying code repository, or any system or network connected to it;</li>
        <li style={li}>Introduce viruses, malware, or any other code intended to disrupt, damage, or gain unauthorised access to the Website;</li>
        <li style={li}>Scrape, harvest, or systematically extract data from the Website for a competing or commercial archive without our prior written permission;</li>
        <li style={li}>Use the Website in any manner that could disable, overburden, or impair its functioning, or interfere with any other person's use of it;</li>
        <li style={li}>Use the donation mechanism for any fraudulent purpose, including payment fraud or money laundering.</li>
      </ul>

      <h2 style={h2}>7. Intellectual Property</h2>
      <p style={p}>
        Ownership, licensing, and permitted use of content on this Website — both
        original site content and third-party books in the library — is set out in
        full in our dedicated{' '}
        <Link to="/copyright-policy" style={link}>Copyright Policy</Link>, which forms
        part of these Terms by reference. In summary: original articles and writing
        published by Mising Archives are licensed under CC BY-SA 4.0; books in the
        library carry their own individual copyright status as indicated on each
        title; and the Mising Archives name, logo, and website design remain the
        property of the Project and may not be used to imply endorsement without
        permission.
      </p>

      <h2 style={h2}>8. Third-Party Services</h2>
      <p style={p}>
        The Website relies on the following third-party services to operate, each
        governed by its own terms and privacy policy, over which we have no control:
      </p>
      <ul style={numbered}>
        <li style={li}><strong>Vercel</strong> — website hosting and deployment;</li>
        <li style={li}><strong>Cloudflare</strong> — domain name resolution (DNS);</li>
        <li style={li}><strong>Web3Forms</strong> — contact form delivery;</li>
        <li style={li}><strong>Google Forms</strong> — book archival and article submission intake;</li>
        <li style={li}><strong>Razorpay</strong> — donation payment processing;</li>
        <li style={li}><strong>Google Analytics</strong> — site usage analytics.</li>
      </ul>
      <p style={p}>
        We are not responsible or liable for the availability, security, content, or
        practices of these third-party services, or for any loss or damage arising
        from your interaction with them. Payment transactions are processed entirely
        by Razorpay and its underlying payment network/banking partners; we do not
        receive, process, or store your card, UPI, or banking credentials at any
        point, and any dispute regarding a failed, delayed, or unauthorised transaction
        should be raised with Razorpay and/or your bank in the first instance.
      </p>

      <h2 style={h2}>9. Donations</h2>
      <p style={p}>
        Donations made through the Website are voluntary contributions to support
        hosting, domain, and archival costs. Because Mising Archives is not a
        registered charitable trust, society, or Section 8 company, donations are{' '}
        <strong>not eligible for any tax deduction</strong> under Section 80G of the
        Income Tax Act, 1961 or any other provision of Indian tax law, and we do not
        issue tax-exemption certificates. Donations are generally non-refundable
        except where a transaction was erroneous, duplicated, or unauthorised — in
        which case, contact us promptly at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>contact@misingarchives.co.in</a>{' '}
        and we will make reasonable efforts to assist, though any refund is ultimately
        subject to Razorpay's and the relevant bank's processes and timelines. A public
        record of funds received and spent is maintained on our{' '}
        <Link to="/donations" style={link}>Donations</Link> page.
      </p>

      <h2 style={h2}>10. Availability &amp; Changes to the Website</h2>
      <p style={p}>
        We do not guarantee that the Website will be available at all times, free of
        interruptions, or free of errors. As a volunteer-run project with no
        commercial revenue, we are under no obligation to maintain, update, or
        continue operating the Website, and may suspend, restrict, or permanently
        discontinue all or part of it at any time, with or without notice, without
        liability to you.
      </p>

      <h2 style={h2}>11. Disclaimer of Warranties</h2>
      <div style={noteBox}>
        To the fullest extent permitted under applicable Indian law, the Website and
        all content, features, and services on it are provided <strong>"as is" and
        "as available,"</strong> without warranties of any kind, whether express,
        implied, or statutory, including but not limited to implied warranties of
        merchantability, fitness for a particular purpose, non-infringement, accuracy,
        or that the Website will be uninterrupted, timely, secure, or error-free. We
        make no warranty regarding the results that may be obtained from using the
        Website, or the accuracy, reliability, or currency of any historical, cultural,
        or factual information contained in it.
      </div>

      <h2 style={h2}>12. Limitation of Liability</h2>
      <p style={p}>
        To the maximum extent permitted by applicable law, Mising Archives, its
        volunteer maintainers, contributors, and affiliated community members shall
        not be liable for any indirect, incidental, special, consequential, exemplary,
        or punitive damages, or for any loss of data, revenue, profits, goodwill, or
        other intangible losses, arising out of or in connection with:
      </p>
      <ol style={numbered}>
        <li style={li}>Your access to, use of, or inability to use the Website;</li>
        <li style={li}>Any content obtained from the Website, including any error, inaccuracy, or omission in it;</li>
        <li style={li}>Any unauthorised access to or alteration of your submissions or data;</li>
        <li style={li}>Any conduct or content of any third party using the Website, including any User Content;</li>
        <li style={li}>Any transaction conducted through, or facilitated by, any third-party service linked from the Website; or</li>
        <li style={li}>Any other matter relating to the Website,</li>
      </ol>
      <p style={p}>
        whether based on warranty, contract, tort (including negligence), statute, or
        any other legal theory, and whether or not we have been advised of the
        possibility of such damages. Where any liability cannot be excluded under
        applicable law, our aggregate liability for any claim arising from your use of
        the Website is limited to the total amount, if any, that you have paid to us
        as a voluntary donation in the twelve (12) months preceding the event giving
        rise to the claim, or ₹1,000 (Indian Rupees One Thousand), whichever is lower.
      </p>
      <p style={p}>
        Nothing in these Terms is intended to exclude or limit any liability that
        cannot lawfully be excluded or limited under the laws of India.
      </p>

      <h2 style={h2}>13. Indemnification</h2>
      <p style={p}>
        You agree to indemnify, defend, and hold harmless Mising Archives, its
        volunteer maintainers, and contributors from and against any claims,
        liabilities, damages, losses, and expenses, including reasonable legal fees,
        arising out of or in any way connected with: (a) your access to or use of the
        Website; (b) your violation of these Terms; (c) User Content you submit; or
        (d) your violation of any third party's rights, including intellectual
        property or privacy rights.
      </p>

      <h2 style={h2}>14. Intermediary Status</h2>
      <p style={p}>
        To the extent the Website hosts, stores, or transmits User Content or
        third-party information (such as submissions through our contact and
        submission forms), Mising Archives functions as an "intermediary" as defined
        under Section 2(1)(w) of the Information Technology Act, 2000, and is entitled
        to the safe-harbour protections available to intermediaries under Section 79
        of that Act and the Information Technology (Intermediary Guidelines and
        Digital Media Ethics Code) Rules, 2021 ("IT Rules, 2021"), subject to
        compliance with the due diligence requirements set out in those Rules,
        including this grievance redressal mechanism.
      </p>

      <h2 style={h2}>15. Grievance Redressal Mechanism</h2>
      <p style={p}>
        In accordance with Rule 3(2) of the IT Rules, 2021, we have appointed a
        Grievance Officer to address complaints regarding content on the Website,
        including complaints relating to copyright infringement, defamation, or any
        content that violates these Terms or applicable law.
      </p>
      <div style={noteBox}>
        <strong>Grievance Officer</strong><br />
        Email: <a href="mailto:contact@misingarchives.co.in" style={link}>contact@misingarchives.co.in</a><br />
        We will acknowledge a complaint within 24 hours of receipt and endeavour to
        resolve it within 15 days, in line with the timelines prescribed under the IT
        Rules, 2021. Copyright and takedown requests specifically should follow the
        process described in Section 4 above and our{' '}
        <Link to="/copyright-policy" style={link}>Copyright Policy</Link>.
      </div>

      <h2 style={h2}>16. Data Protection</h2>
      <p style={p}>
        Our collection and use of personal data is governed by our{' '}
        <Link to="/privacy-policy" style={link}>Privacy Policy</Link>, which is
        incorporated into these Terms by reference and reflects our obligations under
        the Digital Personal Data Protection Act, 2023 and the Digital Personal Data
        Protection Rules, 2025 as they come into force. By using the Website, you
        consent to the collection and processing of your personal data as described
        in that Policy.
      </p>

      <h2 style={h2}>17. Termination</h2>
      <p style={p}>
        We reserve the right, at our sole discretion, to restrict, suspend, or
        terminate your access to the Website — or any feature of it, such as the
        ability to submit content or make donations — at any time, without notice, if
        we believe you have violated these Terms or engaged in conduct that is
        unlawful or harmful to the Project or other users.
      </p>

      <h2 style={h2}>18. Force Majeure</h2>
      <p style={p}>
        We shall not be liable for any failure or delay in operating the Website
        resulting from causes beyond our reasonable control, including but not limited
        to acts of God, natural disaster, internet or power outages, failures of
        third-party hosting or payment infrastructure, governmental action, or any
        other event of force majeure.
      </p>

      <h2 style={h2}>19. Governing Law &amp; Jurisdiction</h2>
      <p style={p}>
        These Terms are governed by and construed in accordance with the laws of
        India. Subject to Section 20 (Dispute Resolution) below, any dispute arising
        out of or relating to these Terms or your use of the Website shall be subject
        to the exclusive jurisdiction of the courts at Jorhat, Assam, India.
      </p>

      <h2 style={h2}>20. Dispute Resolution</h2>
      <p style={p}>
        If any dispute arises out of or in connection with these Terms, the parties
        shall first attempt to resolve it amicably through good-faith negotiation by
        contacting us at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>contact@misingarchives.co.in</a>.
        If a dispute is not resolved through such negotiation within thirty (30) days,
        either party may refer it to arbitration under the Arbitration and
        Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement of
        the parties. The seat and venue of arbitration shall be Jorhat, Assam, India,
        and the proceedings shall be conducted in English. Nothing in this clause
        prevents either party from seeking urgent interim relief from a court of
        competent jurisdiction.
      </p>

      <h2 style={h2}>21. Severability</h2>
      <p style={p}>
        If any provision of these Terms is held to be invalid, illegal, or
        unenforceable by a court or authority of competent jurisdiction, that
        provision shall be limited or eliminated to the minimum extent necessary, and
        the remaining provisions of these Terms shall continue in full force and
        effect.
      </p>

      <h2 style={h2}>22. Waiver</h2>
      <p style={p}>
        No failure or delay by Mising Archives in exercising any right under these
        Terms shall operate as a waiver of that right, nor shall any single or partial
        exercise of a right preclude any other or further exercise of it.
      </p>

      <h2 style={h2}>23. Entire Agreement</h2>
      <p style={p}>
        These Terms, together with our{' '}
        <Link to="/privacy-policy" style={link}>Privacy Policy</Link> and{' '}
        <Link to="/copyright-policy" style={link}>Copyright Policy</Link>, constitute
        the entire agreement between you and Mising Archives regarding your use of the
        Website, and supersede any prior agreements or understandings, whether written
        or oral, on the subject.
      </p>

      <h2 style={h2}>24. Changes to These Terms</h2>
      <p style={p}>
        We may revise these Terms from time to time as the Project evolves or as
        applicable law changes. Material changes will be reflected by updating the
        "Last updated" date at the top of this page. Your continued use of the
        Website after any change constitutes your acceptance of the revised Terms. We
        encourage you to review this page periodically.
      </p>

      <h2 style={h2}>25. Contact</h2>
      <p style={p}>
        Questions about these Terms, or requests relating to grievance redressal, can
        be sent to{' '}
        <a href="mailto:contact@misingarchives.co.in" style={link}>
          contact@misingarchives.co.in
        </a>{' '}
        or via our <Link to="/contact" style={link}>contact form</Link>. Mising
        Archives operates from Jorhat, Assam, India.
      </p>
    </div>
  )
}