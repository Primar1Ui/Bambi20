# Portfolio Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

Run this command in your terminal:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

These same two variables power **both** the contact form and the newsletter signup.

### 3. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project.
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates the
   `contacts` and `newsletter_subscribers` tables **and** enables Row Level
   Security with insert-only policies.
3. Copy your **Project URL** and **anon public** key from
   **Project Settings → API**.
4. Add them to your `.env.local` file (and to Vercel — see Deployment below).

> **Why RLS matters:** the app connects with the public `anon` key, which ships
> to the browser. The policies in `schema.sql` allow visitors to *insert*
> messages/emails but **not read** them, so your submissions and subscriber
> list stay private. Never expose the `service_role` key in the frontend.

### 4. Add Your Profile Picture

1. Create a folder: `public/images/`
2. Add your profile picture as `profile.jpg` (or update the path in `components/Hero.tsx`)
3. Recommended size: 512x512px or larger (square image works best)

### 5. Update Social Links

Edit `components/Footer.tsx` and replace the placeholder GitHub and LinkedIn URLs with your actual profiles.

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📁 Project Structure

```
/app
  /layout.tsx          # Root layout with SEO metadata
  /page.tsx            # Main page
  /globals.css         # Global styles
  /api/contact/route.ts # Contact form API

/components
  Navbar.tsx           # Navigation bar
  Hero.tsx             # Hero section with profile picture
  About.tsx            # About section
  Skills.tsx           # Skills showcase
  Projects.tsx         # Projects grid
  Services.tsx         # Services list
  Contact.tsx          # Contact form
  Footer.tsx           # Footer

/lib
  data.ts              # Skills, projects, services data
  supabaseClient.ts    # Supabase client configuration

/public
  /favicon.svg         # Favicon
  /images              # Your images (create this folder)
    /profile.jpg       # Your profile picture
```

## 🎨 Customization

### Update Content

Edit `/lib/data.ts` to customize:
- Skills
- Projects
- Services

### Update Colors

Edit `tailwind.config.ts` to change the color scheme.

### Update SEO

Edit `app/layout.tsx` to update metadata, title, and description.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Vercel

In your Vercel project: **Settings → Environment Variables**, add the following
for **Production, Preview, and Development**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |

Then **redeploy** (Deployments → ⋯ → Redeploy) so the new variables take
effect. Because the variables are `NEXT_PUBLIC_*`, a fresh build is required —
they are inlined at build time, not read at runtime.

After redeploy, the newsletter form flips from "activates once Supabase is
configured" to a live signup form automatically.

### Email notifications (Resend)

Contact and newsletter submissions are stored in Supabase. To also get an
email ping when someone submits:

1. Create a free account at [resend.com](https://resend.com).
2. Go to **API Keys → Create API Key**, copy the key (starts with `re_`).
3. In Vercel → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | your `re_…` key |
| `NOTIFY_EMAIL` | `davidtosin306@gmail.com` (or whichever inbox should get alerts) |
| `RESEND_FROM_EMAIL` | `Portfolio <onboarding@resend.dev>` |

4. Redeploy.

> With Resend’s free onboarding sender (`onboarding@resend.dev`), you can only
> send **to the email address you used to sign up for Resend**. Make sure
> `NOTIFY_EMAIL` matches that address. To send from your own domain later,
> verify a domain in Resend and update `RESEND_FROM_EMAIL`.

Notifications are best-effort: if Resend fails or is missing, the form still
saves to Supabase successfully.

## ✅ Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Set up Supabase project and run `supabase/schema.sql` (tables + RLS)
- [ ] Add environment variables to `.env.local`
- [ ] Add the same variables in Vercel (Production/Preview/Development) and redeploy
- [ ] Add profile picture to `public/images/profile.jpg`
- [ ] Update social links in Footer
- [ ] Customize content in `lib/data.ts`
- [ ] Test contact form and newsletter signup on the live site
- [ ] Confirm rows appear in Supabase (Table Editor → `contacts` / `newsletter_subscribers`)
- [ ] (Optional) Add Resend env vars and confirm you receive notification emails

## 🐛 Troubleshooting

### Contact form not working?
- Check Supabase table is created correctly
- Verify environment variables are set
- Check browser console for errors

### Profile picture not showing?
- Ensure image is in `public/images/profile.jpg`
- Check file name matches exactly (case-sensitive)
- Try a different image format (JPG, PNG, WebP)

### Build errors?
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check TypeScript errors with `npm run build`

