-- Initialisation complète du schéma public pour l'onboarding (profiles, addresses)
-- Inclut: contraintes, index, triggers updated_at, RLS propriétaire

-- Extensions nécessaires
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Schéma public (déjà présent par défaut, par sécurité)
create schema if not exists public;

-- Table profiles: 1-1 avec auth.users
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name  text not null,
  birth_year int  not null check (birth_year between 1900 and extract(year from now())::int),
  is_adult   boolean not null default false,
  phone      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table addresses: N-1 avec auth.users
create table if not exists public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  label       text,
  line1       text not null,
  line2       text,
  postal_code text not null,
  city        text not null,
  country     text not null default 'FR',
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint addresses_postal_code_fr check (postal_code ~ '^[0-9]{5}$')
);

-- Index utiles
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_addresses_user_id on public.addresses(user_id);
create index if not exists idx_addresses_city on public.addresses(city);

-- Fonction utilitaire et triggers updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end; $$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'trg_profiles_updated_at') then
    create trigger trg_profiles_updated_at
      before update on public.profiles
      for each row execute procedure public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'trg_addresses_updated_at') then
    create trigger trg_addresses_updated_at
      before update on public.addresses
      for each row execute procedure public.set_updated_at();
  end if;
end $$;

-- Activer la RLS
alter table public.profiles  enable row level security;
alter table public.addresses enable row level security;

-- Policies: propriétaire uniquement (drop si existent puis create)
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "addresses_select_own" on public.addresses;
create policy "addresses_select_own"
  on public.addresses for select
  using (auth.uid() = user_id);

drop policy if exists "addresses_insert_own" on public.addresses;
create policy "addresses_insert_own"
  on public.addresses for insert
  with check (auth.uid() = user_id);

drop policy if exists "addresses_update_own" on public.addresses;
create policy "addresses_update_own"
  on public.addresses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "addresses_delete_own" on public.addresses;
create policy "addresses_delete_own"
  on public.addresses for delete
  using (auth.uid() = user_id);

-- GRANTS: le rôle 'authenticated' doit avoir les privilèges d'accès (RLS filtrera ensuite)
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.profiles  to authenticated;
grant select, insert, update, delete on table public.addresses to authenticated;

