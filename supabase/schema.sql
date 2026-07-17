-- =============================================================
-- Portfolio Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Safe to re-run: uses IF NOT EXISTS / idempotent policy drops.
-- =============================================================

-- -------------------------------------------------------------
-- Contact form submissions
-- -------------------------------------------------------------
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default timezone('utc', now())
);

-- -------------------------------------------------------------
-- Newsletter subscribers
-- -------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz not null default timezone('utc', now())
);

-- =============================================================
-- Row Level Security (RLS)
-- The app authenticates with the PUBLIC anon key, so we must:
--   * ENABLE RLS on both tables
--   * ALLOW anonymous INSERT (so the forms work)
--   * NOT allow anonymous SELECT (so submissions & emails stay
--     private and are only readable via the dashboard / service role)
-- =============================================================

alter table public.contacts enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Contacts: allow anyone (anon + authenticated) to insert only.
drop policy if exists "Allow public contact inserts" on public.contacts;
create policy "Allow public contact inserts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

-- Newsletter: allow anyone (anon + authenticated) to insert only.
drop policy if exists "Allow public newsletter inserts" on public.newsletter_subscribers;
create policy "Allow public newsletter inserts"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

-- =============================================================
-- Done. Verify in Dashboard > Table Editor that both tables
-- exist and RLS is enabled (shield icon).
-- =============================================================
