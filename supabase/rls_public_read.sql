-- ============================================
-- Allow public (anonymous) read access to
-- players, tournaments, matches, tournament_players
-- since Home/Draws/Leaderboard/History are public pages
-- ============================================

drop policy if exists "Anyone authenticated can view players" on public.players;
create policy "Public can view players"
  on public.players for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone authenticated can view tournaments" on public.tournaments;
create policy "Public can view tournaments"
  on public.tournaments for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone authenticated can view tournament players" on public.tournament_players;
create policy "Public can view tournament players"
  on public.tournament_players for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone authenticated can view matches" on public.matches;
create policy "Public can view matches"
  on public.matches for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone authenticated can view leaderboard config" on public.leaderboard_config;
create policy "Public can view leaderboard config"
  on public.leaderboard_config for select
  to anon, authenticated
  using (true);