-- ============================================
-- ENABLE RLS on all tables
-- ============================================

alter table public.users enable row level security;
alter table public.players enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_players enable row level security;
alter table public.matches enable row level security;
alter table public.leaderboard_config enable row level security;
alter table public.audit_logs enable row level security;

-- ============================================
-- HELPER FUNCTION: check if current user is admin
-- ============================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================
-- USERS policies
-- ============================================

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on public.users for select
  using (public.is_admin());

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

-- ============================================
-- PLAYERS policies (everyone can read, only admin can write)
-- ============================================

create policy "Anyone authenticated can view players"
  on public.players for select
  to authenticated
  using (true);

create policy "Admins can insert players"
  on public.players for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update players"
  on public.players for update
  to authenticated
  using (public.is_admin());

-- ============================================
-- TOURNAMENTS policies
-- ============================================

create policy "Anyone authenticated can view tournaments"
  on public.tournaments for select
  to authenticated
  using (true);

create policy "Admins can insert tournaments"
  on public.tournaments for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update tournaments"
  on public.tournaments for update
  to authenticated
  using (public.is_admin());

-- ============================================
-- TOURNAMENT_PLAYERS policies
-- ============================================

create policy "Anyone authenticated can view tournament players"
  on public.tournament_players for select
  to authenticated
  using (true);

create policy "Admins can manage tournament players"
  on public.tournament_players for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================
-- MATCHES policies
-- ============================================

create policy "Anyone authenticated can view matches"
  on public.matches for select
  to authenticated
  using (true);

create policy "Admins can update matches"
  on public.matches for update
  to authenticated
  using (public.is_admin());

create policy "Admins can insert matches"
  on public.matches for insert
  to authenticated
  with check (public.is_admin());

-- ============================================
-- LEADERBOARD_CONFIG policies
-- ============================================

create policy "Anyone authenticated can view leaderboard config"
  on public.leaderboard_config for select
  to authenticated
  using (true);

create policy "Admins can manage leaderboard config"
  on public.leaderboard_config for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================
-- AUDIT_LOGS policies
-- ============================================

create policy "Admins can view audit logs"
  on public.audit_logs for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert audit logs"
  on public.audit_logs for insert
  to authenticated
  with check (public.is_admin());