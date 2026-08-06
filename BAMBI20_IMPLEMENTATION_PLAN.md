# Bambi20 Growth & Polish Implementation Plan

**Production URL:** `https://mymainportfolio-one.vercel.app`  
**Brand:** Bambi20 (Oluwatosin David)  
**Last updated:** August 2026

Track progress phase by phase. Mark items `[x]` when shipped to `main`.

---

## Phase 1 — Brand assets (High)

| # | Task | Files | Status |
|---|------|--------|--------|
| 1.1 | Regenerate OG image (1200×630) with Bambi20 branding | `public/images/og-image.png`, `scripts/generate-marketing-assets.mjs` | [x] |
| 1.2 | Replace hero artwork (remove “DAVID”, use Bambi20 + tagline) | `components/Hero.tsx` (typographic hero, no PNG overlay) | [x] |
| 1.3 | Regenerate hero cutout if used elsewhere | `public/images/hero-brand-cutout.png` | [x] |

**Exit criteria:** Social previews and homepage hero show Bambi20, not David.

---

## Phase 2 — Search Console & indexing (High)

| # | Task | Files | Status |
|---|------|--------|--------|
| 2.1 | Document Google Search Console setup steps | This doc § Phase 2 runbook | [x] |
| 2.2 | Add `google-site-verification` meta support via env | `app/layout.tsx`, `.env.example` | [x] |
| 2.3 | Confirm sitemap URL in robots + submit checklist | `app/robots.ts`, `app/sitemap.ts` | [x] |

**Exit criteria:** Site verifiable in GSC; sitemap submitted by owner.

### Phase 2 runbook (owner actions)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property: `https://mymainportfolio-one.vercel.app`.
3. Verify via HTML tag → set `GOOGLE_SITE_VERIFICATION` in Vercel env → redeploy.
4. Submit sitemap: `https://mymainportfolio-one.vercel.app/sitemap.xml`.
5. Request indexing for `/` and `/contact`.

---

## Phase 3 — Structured data (Medium)

| # | Task | Files | Status |
|---|------|--------|--------|
| 3.1 | `BreadcrumbList` JSON-LD on inner pages | `lib/seo.ts`, `components/Breadcrumbs.tsx`, page layouts | [x] |
| 3.2 | `BlogPosting` author: Oluwatosin David + `alternateName: Bambi20` | `app/blog/[slug]/page.tsx`, `lib/seo.ts` | [x] |
| 3.3 | `LocalBusiness` schema (Nigeria focus) | `lib/seo.ts`, `app/layout.tsx` | [x] |
| 3.4 | LinkedIn in Person `sameAs` when URL provided | `lib/site.ts`, `lib/seo.ts`, `.env.example` | [x] |

**Exit criteria:** Rich results validate in [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## Phase 4 — Conversion & content (Medium)

| # | Task | Files | Status |
|---|------|--------|--------|
| 4.1 | Dedicated `/hire` landing page (or expand `/services`) | `app/hire/page.tsx`, nav | [ ] |
| 4.2 | Rewrite blog post bodies (remove em dashes, human tone) | `lib/blog.ts` | [ ] |
| 4.3 | Rewrite case study copy in plain language | `lib/caseStudies.ts` | [ ] |

**Exit criteria:** Hire path is obvious; blog and case studies read like a person wrote them.

---

## Phase 5 — UX & i18n (Low)

| # | Task | Files | Status |
|---|------|--------|--------|
| 5.1 | Language switcher in navbar | `components/Navbar.tsx`, `LocaleContext` | [ ] |
| 5.2 | Rename package to `bambi20-portfolio` | `package.json`, `package-lock.json` | [ ] |
| 5.3 | Custom 404 with contact CTA | `app/not-found.tsx` | [ ] |

**Exit criteria:** Locale toggle works; 404 is on-brand.

---

## Phase 6 — WordPress-style polish (Optional)

| # | Task | Files | Status |
|---|------|--------|--------|
| 6.1 | Simpler section headings (fewer gradients) | Section components | [ ] |
| 6.2 | Serif body font for blog posts | `app/blog/[slug]/page.tsx`, CSS | [ ] |
| 6.3 | Testimonials as plain quote blocks | `components/Testimonials.tsx` | [ ] |
| 6.4 | “About the author” sidebar on blog posts | `app/blog/[slug]/page.tsx` | [ ] |

**Exit criteria:** Site feels closer to a classic WordPress portfolio than a template.

---

## Implementation order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 (optional)
```

**Current focus:** Phase 4 — conversion and content (`/hire`, blog/case study rewrites)

**Completed:** Phase 3 (Structured data)

---

## Notes

- Testimonial quotes that mention “David” from clients stay unchanged (third-party text).
- Hero PNG background color: `#020a1f` (sampled from artwork corners).
- Repo may live at `github.com/Primar1Ui/Bambi20`.
