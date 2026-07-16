# Portfolio Improvement Roadmap

**Last synced with codebase:** March 2026

This document tracks what is **done in the repo** versus **optional follow-ups**. Detailed future ideas live in [`future-improvements/`](./future-improvements/).

---

## ✅ Phase 1: Portfolio Content & CTAs (COMPLETED)

- Removed Google Sites iframe from Hero; primary CTA scrolls to `#projects`
- Projects data model: `role`, `results`, `github`, `live`; GitHub / “Discuss a Similar Project” UX
- Clear funnel: Hero → Projects → Contact

**Optional (not blocking):** Hero “Get In Touch” could scroll to `#contact` instead of WhatsApp (WhatsApp remains in social links).

---

## ✅ Phase 2: UX, Accessibility & Performance Polish

### 2.1 Accessibility — **DONE**

- [x] Global `focus-visible` outlines in `app/globals.css`; stronger blue on `.light`
- [x] Per-control `focus-visible:ring-*` on key interactive components (e.g. Hero, Navbar, Contact)
- [x] `usePrefersReducedMotion` + usage in Hero, Navbar, Skills, Services (typing/cursor off when reduced motion)
- [x] Hero image: `onError` + React fallback with `role="img"` / `aria-label`
- [x] Skip link → `#main-content` on `<main>` (`app/layout.tsx`, `app/page.tsx`)
- [x] Hero profile uses `next/image` with descriptive `alt`
- [x] Single `h1` on home (Hero); inner sections use `h2` / `h3`; blog/case-studies pages have their own `h1`

### 2.2 Animation & performance — **MOSTLY DONE**

- [x] Profile image via Next.js `Image` with `priority`
- [x] `Projects` / `Testimonials` dynamically imported with skeleton loading (`app/page.tsx`)
- [x] Skills/Services: instant layout when `prefers-reduced-motion` (no stagger / bar animation)
- [ ] Optional: further trim `whileInView` on other sections or audit bundle (Framer alternatives)
- [ ] Optional: lazy `loading` for any new below-the-fold images

### 2.3 Small UX — **DONE**

- [x] `BackToTop`
- [x] Async loading UI for dynamic sections
- [x] Mobile menu: backdrop click closes (`Navbar`)

**Skipped unless needed:** smooth-scroll polyfill for very old browsers.

---

## ✅ Phase 3: SEO & Authority

### 3.1 Social preview & metadata — **DONE (verify asset)**

- [x] `metadata.openGraph` / `twitter` / `metadataBase` in `app/layout.tsx`
- [x] Canonical `<link>` in layout
- [ ] **Action:** Ensure `public/images/og-image.png` exists (1200×630). Layout references `/images/og-image.png`; add the file before deploy if missing from the repo.

### 3.2 Structured data — **DONE**

- [x] JSON-LD `Person` + `WebSite` in `app/layout.tsx`

### 3.3 Case studies & blog — **DONE**

- [x] `/case-studies`, `/blog`, `CaseStudyCard`, `lib/caseStudies.ts`, `lib/blog.ts`; nav links

---

## ✅ Phase 4: Backend & trust

### 4.1 Contact form — **DONE**

- [x] Honeypot (`website` field) in `Contact.tsx` + silent reject in `app/api/contact/route.ts`
- [x] In-memory rate limit (5/hour/IP) with `errorType: 'rate_limit'`
- [x] Config / network / validation errors with copy pointing to WhatsApp/email

**Optional:** persist rate limits (Redis / Supabase) for multi-instance deploys.

### 4.2 Trust signals — **DONE (except optional logos)**

- [x] Testimonials + `lib/testimonials.ts`
- [x] CV download in Hero → `public/cv.pdf`
- [x] Contact: “reply within 24 hours” note
- [ ] Optional: client logo strip if you have assets

### 4.3 Analytics — **PARTIAL**

- [x] Vercel Analytics (`@vercel/analytics`) in `app/layout.tsx`
- [x] Funnel helpers in `lib/analytics.ts`
- [ ] Optional: Sentry / LogRocket; deeper submission monitoring

---

## ▶️ What to do next

1. **Commit `public/images/og-image.png`** (or change metadata to an existing image) so social previews work.
2. **Optional polish:** ESLint config (non-interactive `pnpm lint`), expand `sameAs` in JSON-LD if you add LinkedIn, Phase 5+ items in [`future-improvements/README.md`](./future-improvements/README.md).

---

## 🎯 Success metrics (current)

| Goal                         | Status                                      |
|-----------------------------|---------------------------------------------|
| Accessible keyboard / focus | Strong baseline; keep checking new UI       |
| SEO + structured data       | Good; verify OG file                         |
| Performance                 | Dynamic imports + image optimization        |
| Contact hardening           | Honeypot + rate limit + clear errors        |
| Trust & conversion          | Testimonials, CV, CTAs, funnel tracking     |

---

## 📝 Notes

- Update `live` URLs in `lib/data.ts` as projects ship.
- Refresh testimonials and project copy over time.
- Rate limiting is in-process; scale-out may need a shared store.
