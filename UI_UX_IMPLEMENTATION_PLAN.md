# UI/UX Implementation Plan

**Production URL:** `https://mymainportfolio-one.vercel.app`  
**Brand:** David  
**Last updated:** August 2026

---

## Phase 1 — Foundation (brand, SEO, assets, testimonials)

| # | Task | Files |
|---|------|--------|
| 1.1 | Centralize `SITE_URL` in `lib/site.ts` | `lib/site.ts`, sitemap, robots, feed, layout, blog |
| 1.2 | Rebrand bambi20 → David (manifest, nav, RSS) | `manifest.json`, `Navbar.tsx`, `layout.tsx` |
| 1.3 | Fix profile image path (`profile.svg`) | `Hero.tsx` |
| 1.4 | Hide Download CV until `public/cv.pdf` exists | `Hero.tsx` |
| 1.5 | Remove illustrative testimonials; keep verified only | `lib/testimonials.ts`, `Testimonials.tsx` |

**Exit criteria:** One brand, one URL, no placeholder reviews, no broken profile/CV UX.

---

## Phase 2 — Navigation & wayfinding

| # | Task | Files |
|---|------|--------|
| 2.1 | Nav order matches intended site map | `Navbar.tsx`, `messages/*.json` |
| 2.2 | Scroll-spy / `aria-current` for hash sections (home) | `Navbar.tsx`, hook `useActiveSection.ts` |
| 2.3 | Hash links as `<a href="#id">` where appropriate | `Navbar.tsx` |
| 2.4 | Mobile menu touch targets ≥ 44px | `Navbar.tsx` |
| 2.5 | `id="main-content"` on all `<main>` layouts | blog, case-studies, new routes |

**Exit criteria:** Nav reflects page structure; active section visible while scrolling on home.

---

## Phase 3 — Multi-page architecture (not one long homepage)

| Route | Content |
|-------|---------|
| `/` | Hero, Stats, Featured project, brief CTA strip |
| `/about` | About, Current Work, Skills |
| `/projects` | Full Projects grid + search/filters |
| `/automation` | Automation showcase |
| `/services` | Services list |
| `/testimonials` | Client quotes + Fiverr screenshots |
| `/contact` | Contact form + Newsletter |
| `/case-studies`, `/blog` | unchanged |

| # | Task | Files |
|---|------|--------|
| 3.1 | Create route pages with shared layout shell | `app/about/page.tsx`, etc. |
| 3.2 | Slim `app/page.tsx` to landing only | `app/page.tsx` |
| 3.3 | Update Navbar to route links (not hashes) | `Navbar.tsx` |
| 3.4 | Footer links to Blog, Case Studies, main pages | `Footer.tsx` |
| 3.5 | Redirect old hash bookmarks via home anchors optional | `app/page.tsx` |

**Exit criteria:** Homepage ~4 sections; deep content on dedicated URLs.

---

## Phase 4 — Mobile UX friction

| # | Task | Files |
|---|------|--------|
| 4.1 | Collapsible project filters on mobile | `Projects.tsx` |
| 4.2 | Footer contact chips: stack + truncate email | `Footer.tsx` |
| 4.3 | Remove `background-attachment: fixed` on mobile | `globals.css` |
| 4.4 | Reduce duplicate WhatsApp CTAs on project cards (one primary) | `Projects.tsx` |
| 4.5 | HireMeBanner dismiss persistence + layout | `HireMeBanner.tsx` |

---

## Phase 5 — Accessibility

| # | Task | Files |
|---|------|--------|
| 5.1 | Skill bars: `role="progressbar"`, `aria-valuenow` | `Skills.tsx` |
| 5.2 | Filter buttons: `aria-pressed` | `Projects.tsx`, `BlogList.tsx` |
| 5.3 | Hero typewriter: `aria-live="polite"` | `Hero.tsx` |
| 5.4 | Dynamic import skeletons inside section wrappers | `app/page.tsx`, route pages |
| 5.5 | Contact form inline validation messages | `Contact.tsx` |

---

## Phase 6 — Low-impact polish

| # | Task | Files |
|---|------|--------|
| 6.1 | Fix `github: "#"` on Refined Man | `lib/data.ts` |
| 6.2 | Hero typewriter roles aligned with stack | `Hero.tsx` |
| 6.3 | Projects empty search state | `Projects.tsx` |
| 6.4 | Distinct icons for Live vs Code | `Projects.tsx` |
| 6.5 | Newsletter copy when disabled (visitor-friendly) | `Newsletter.tsx` |
| 6.6 | Theme toggle labels simplified | `ThemeToggle.tsx` |
| 6.7 | Latest blog post teaser on home | `app/page.tsx` |
| 6.8 | `print.css` domain fix | `app/print.css` |

---

## Execution order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
```

Each phase is committed separately for review and Vercel deploy.

**Current status:** Phase 1 in progress.
