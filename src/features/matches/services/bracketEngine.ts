export interface BracketPlayer {
  id: string;
  name: string;
}

export interface GeneratedMatch {
  round: string;
  matchNumber: number;
  player1Id: string | null;
  player2Id: string | null;
  nextMatchIndex: number | null; // index into the overall generated matches array
}

/**
 * Returns round names in order for a given player count.
 * e.g. 8 -> ["quarter_final", "semi_final", "final"]
 */
export function getRoundSequence(playerCount: 8 | 16 | 32): string[] {
  switch (playerCount) {
    case 8:
      return ["quarter_final", "semi_final", "final"];
    case 16:
      return ["round_of_16", "quarter_final", "semi_final", "final"];
    case 32:
      return ["round_of_32", "round_of_16", "quarter_final", "semi_final", "final"];
  }
}

/**
 * Fisher-Yates shuffle - unbiased randomization.
 */
export function shufflePlayers<T>(players: T[]): T[] {
  const arr = [...players];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface DbMatchInsert {
  id: string;
  tournament_id: string;
  round: string;
  match_number: number;
  player1_id: string | null;
  player2_id: string | null;
  next_match_id: string | null;
  status: "upcoming" | "live" | "completed";
}

/**
 * Generates the full match tree for a tournament and returns rows
 * ready to insert into the `matches` table in one batch.
 *
 * Round 1 gets real player1_id/player2_id (from shuffled players).
 * Later rounds start empty (null/null), status 'upcoming', linked via next_match_id.
 */
export function generateMatchTree(
  tournamentId: string,
  players: BracketPlayer[],
  playerCount: 8 | 16 | 32
): DbMatchInsert[] {
  if (players.length !== playerCount) {
    throw new Error(
      `Expected ${playerCount} players, got ${players.length}`
    );
  }

  const rounds = getRoundSequence(playerCount);
  const shuffled = shufflePlayers(players);

  // matchesByRound[roundIndex] = array of match ids (in match_number order)
  const matchesByRound: string[][] = [];
  const rows: DbMatchInsert[] = [];

  rounds.forEach((roundName, roundIndex) => {
    const matchesInRound = playerCount / Math.pow(2, roundIndex + 1);
    const roundMatchIds: string[] = [];

    for (let i = 0; i < matchesInRound; i++) {
      const id = crypto.randomUUID();
      roundMatchIds.push(id);

      let player1Id: string | null = null;
      let player2Id: string | null = null;

      if (roundIndex === 0) {
        player1Id = shuffled[i * 2].id;
        player2Id = shuffled[i * 2 + 1].id;
      }

      rows.push({
        id,
        tournament_id: tournamentId,
        round: roundName,
        match_number: i + 1,
        player1_id: player1Id,
        player2_id: player2Id,
        next_match_id: null, // filled in below once next round's ids exist
        status: "upcoming",
      });
    }

    matchesByRound.push(roundMatchIds);
  });

  // Link each match to its next_match_id (the match in the following round it feeds into)
  for (let roundIndex = 0; roundIndex < matchesByRound.length - 1; roundIndex++) {
    const currentRoundIds = matchesByRound[roundIndex];
    const nextRoundIds = matchesByRound[roundIndex + 1];

    currentRoundIds.forEach((matchId, i) => {
      const nextMatchId = nextRoundIds[Math.floor(i / 2)];
      const row = rows.find((r) => r.id === matchId)!;
      row.next_match_id = nextMatchId;
    });
  }

  return rows;
}

export type MatchFormat = "best_of_3" | "best_of_5";

/**
 * Validates a match score against the tournament format.
 * Best of 3: valid winning scores are 2-0, 2-1
 * Best of 5: valid winning scores are 3-0, 3-1, 3-2
 */
export function isValidMatchScore(
  player1Score: number,
  player2Score: number,
  format: MatchFormat
): boolean {
  if (
    !Number.isInteger(player1Score) ||
    !Number.isInteger(player2Score) ||
    player1Score < 0 ||
    player2Score < 0
  ) {
    return false;
  }

  const winningScore = format === "best_of_3" ? 2 : 3;
  const higher = Math.max(player1Score, player2Score);
  const lower = Math.min(player1Score, player2Score);

  if (higher !== winningScore) return false;
  if (lower >= winningScore) return false;

  return true;
}

/**
 * Returns the winner's player id given a validated score, or null if invalid.
 */
export function getMatchWinnerId(
  player1Id: string,
  player2Id: string,
  player1Score: number,
  player2Score: number
): string | null {
  if (player1Score === player2Score) return null;
  return player1Score > player2Score ? player1Id : player2Id;
}

export interface AdvanceWinnerParams {
  nextMatchId: string;
  winnerId: string;
  /** true if the completed match was the "upper" of the pair feeding into nextMatch (i.e. match_number is odd relative to its pair) */
  isPlayer1Slot: boolean;
}

/**
 * Given a completed match's match_number within its round, determines
 * whether its winner goes into player1 or player2 slot of the next match.
 * Two consecutive matches (0-indexed i, i+1) feed the same next match:
 * even index -> player1 slot, odd index -> player2 slot.
 */
export function getNextMatchSlot(matchIndexInRound: number): "player1_id" | "player2_id" {
  return matchIndexInRound % 2 === 0 ? "player1_id" : "player2_id";
}

/**
 * Determines the DB update payload to place a winner into the next match,
 * and whether that next match becomes 'live'-ready (both slots filled).
 */
export function buildAdvancementUpdate(
  slot: "player1_id" | "player2_id",
  winnerId: string,
  existingPlayer1Id: string | null,
  existingPlayer2Id: string | null
): {
  player1_id?: string;
  player2_id?: string;
  status?: "upcoming";
} {
  const update: { player1_id?: string; player2_id?: string; status?: "upcoming" } = {};

  if (slot === "player1_id") {
    update.player1_id = winnerId;
  } else {
    update.player2_id = winnerId;
  }

  const otherSlotFilled =
    slot === "player1_id" ? existingPlayer2Id !== null : existingPlayer1Id !== null;

  if (otherSlotFilled) {
    update.status = "live"; // both players known, ready to be played (still 'upcoming' until admin starts it as 'live')
  }

  return update;
}