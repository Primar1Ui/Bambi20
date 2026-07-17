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

-- -------------------------------------------------------------
-- AI Customer Support Automation (n8n) logs
-- -------------------------------------------------------------
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_id text unique not null,
  customer_name text,
  customer_email text not null,
  subject text,
  category text not null check (category in ('Billing','Technical Support','Sales','Refund','General Inquiry')),
  confidence numeric(5,2) not null,
  status text not null default 'received' check (status in ('received','classified','auto_replied','pending_approval','approved','replied','closed','error')),
  channel text not null default 'email' check (channel in ('email','webhook','manual')),
  airtable_record_id text,
  slack_thread_ts text,
  ai_summary text,
  ai_response text,
  human_approved boolean default false,
  final_response text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.support_execution_logs (
  id uuid primary key default gen_random_uuid(),
  ticket_id text,
  workflow_name text not null,
  execution_id text,
  event_type text not null,
  level text not null default 'info' check (level in ('debug','info','warn','error')),
  message text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_support_tickets_email on public.support_tickets (customer_email);
create index if not exists idx_support_tickets_status on public.support_tickets (status);
create index if not exists idx_support_logs_ticket on public.support_execution_logs (ticket_id);

alter table public.support_tickets enable row level security;
alter table public.support_execution_logs enable row level security;

-- =============================================================
-- Done. Verify in Dashboard > Table Editor that both tables
-- exist and RLS is enabled (shield icon).
-- =============================================================
