-- ============================================
-- ENUMS
-- ============================================

create type user_role as enum ('member', 'admin');
create type player_status as enum ('active', 'inactive');
create type match_format as enum ('best_of_3', 'best_of_5');
create type tournament_status as enum (
  'draft',
  'registration',
  'draw_generated',
  'in_progress',
  'final',
  'completed',
  'archived'
);
create type match_status as enum ('upcoming', 'live', 'completed');

-- ============================================
-- USERS (extends Supabase auth.users)
-- ============================================

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  role user_role not null default 'member',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- PLAYERS
-- ============================================

create table public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  phone text,
  status player_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- TOURNAMENTS
-- ============================================

create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  date date not null,
  start_time time not null,
  player_count integer not null check (player_count in (8, 16, 32)),
  format match_format not null,
  status tournament_status not null default 'draft',
  winner_id uuid references public.players(id),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- TOURNAMENT_PLAYERS (join table)
-- ============================================

create table public.tournament_players (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  seed integer,
  created_at timestamptz not null default now(),
  unique (tournament_id, player_id)
);

-- ============================================
-- MATCHES
-- ============================================

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  round text not null,
  match_number integer not null,
  player1_id uuid references public.players(id),
  player2_id uuid references public.players(id),
  player1_score integer,
  player2_score integer,
  winner_id uuid references public.players(id),
  status match_status not null default 'upcoming',
  next_match_id uuid references public.matches(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (player1_id is null or player2_id is null or player1_id <> player2_id)
);

-- ============================================
-- LEADERBOARD CONFIG (points system - Section 37)
-- ============================================

create table public.leaderboard_config (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  points integer not null,
  created_at timestamptz not null default now()
);

-- ============================================
-- AUDIT LOG (Section 56)
-- ============================================

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  previous_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

-- ============================================
-- INDEXES
-- ============================================

create index idx_tournament_players_tournament on public.tournament_players(tournament_id);
create index idx_matches_tournament on public.matches(tournament_id);
create index idx_matches_next_match on public.matches(next_match_id);
create index idx_tournaments_status on public.tournaments(status);