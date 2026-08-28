export const mockTournaments = [
  {
    id: "t1",
    name: "August Week 3 Tournament",
    date: "2026-08-24",
    startTime: "12:00 PM",
    playerCount: 16,
    format: "Best of 3",
    status: "REGISTRATION",
  },
  {
    id: "t2",
    name: "August Week 4 Tournament",
    date: "2026-08-31",
    startTime: "12:00 PM",
    playerCount: 16,
    format: "Best of 3",
    status: "DRAFT",
  },
  {
    id: "t3",
    name: "September Week 1 Tournament",
    date: "2026-09-07",
    startTime: "12:00 PM",
    playerCount: 16,
    format: "Best of 5",
    status: "DRAFT",
  },
];

export const mockLiveTournament = {
  id: "live1",
  name: "August Week 2 Tournament",
  currentRound: "Semi-Finals",
  liveMatchCount: 2,
};

export const mockPlayers = [
  { id: "p1", name: "Ali Raza" },
  { id: "p2", name: "Usman Khan" },
  { id: "p3", name: "Hamza Shah" },
  { id: "p4", name: "Bilal Ahmed" },
  { id: "p5", name: "M. Ahmed" },
  { id: "p6", name: "Fahad Ali" },
  { id: "p7", name: "Zohaib Khan" },
  { id: "p8", name: "Adnan Javed" },
];

export const mockBracket = {
  tournamentName: "August Week 2 Tournament",
  rounds: [
    { id: "qf", label: "Quarter-Finals" },
    { id: "sf", label: "Semi-Finals" },
    { id: "final", label: "Final" },
  ],
  matchesByRound: {
    qf: [
      {
        id: "m1",
        seed1: 1,
        player1Name: "Ali Raza",
        player1Score: 3,
        seed2: 8,
        player2Name: "Usman Khan",
        player2Score: 1,
        status: "completed" as const,
        winnerSlot: 1 as const,
      },
      {
        id: "m2",
        seed1: 4,
        player1Name: "Hamza Shah",
        player1Score: 3,
        seed2: 5,
        player2Name: "Bilal Ahmed",
        player2Score: 2,
        status: "completed" as const,
        winnerSlot: 1 as const,
      },
      {
        id: "m3",
        seed1: 2,
        player1Name: "M. Ahmed",
        player1Score: 3,
        seed2: 7,
        player2Name: "Fahad Ali",
        player2Score: 0,
        status: "completed" as const,
        winnerSlot: 1 as const,
      },
      {
        id: "m4",
        seed1: 3,
        player1Name: "Zohaib Khan",
        player1Score: 2,
        seed2: 6,
        player2Name: "Adnan Javed",
        player2Score: 3,
        status: "completed" as const,
        winnerSlot: 2 as const,
      },
    ],
    sf: [
      {
        id: "m5",
        seed1: 1,
        player1Name: "Ali Raza",
        player1Score: 3,
        seed2: 4,
        player2Name: "Hamza Shah",
        player2Score: 1,
        status: "completed" as const,
        winnerSlot: 1 as const,
      },
      {
        id: "m6",
        seed1: 2,
        player1Name: "M. Ahmed",
        player1Score: 3,
        seed2: 6,
        player2Name: "Adnan Javed",
        player2Score: 2,
        status: "completed" as const,
        winnerSlot: 1 as const,
      },
    ],
    final: [
      {
        id: "m7",
        player1Name: null,
        seed1: undefined,
        player2Name: null,
        seed2: undefined,
        status: "upcoming" as const,
      },
    ],
  },
};

export const mockPodium = [
  { rank: 1 as const, playerName: "Ali Raza", tournamentsWon: 12, points: 1850 },
  { rank: 2 as const, playerName: "M. Ahmed", tournamentsWon: 8, points: 1450 },
  { rank: 3 as const, playerName: "Hamza Shah", tournamentsWon: 7, points: 1320 },
];

export const mockLeaderboardList = [
  { rank: 4, playerName: "Adnan Javed", tournamentsWon: 6, points: 1180 },
  { rank: 5, playerName: "Zohaib Khan", tournamentsWon: 5, points: 1040 },
  { rank: 6, playerName: "Usman Khan", tournamentsWon: 4, points: 980 },
  { rank: 7, playerName: "Bilal Ahmed", tournamentsWon: 4, points: 860 },
  { rank: 8, playerName: "Fahad Ali", tournamentsWon: 3, points: 720 },
];

export const mockHistory = [
  {
    id: "h1",
    name: "August Week 2 Tournament",
    date: "2026-08-17",
    winner: "Ali Raza",
    playerCount: 16,
    format: "Best of 5",
  },
  {
    id: "h2",
    name: "August Week 1 Tournament",
    date: "2026-08-10",
    winner: "M. Ahmed",
    playerCount: 16,
    format: "Best of 3",
  },
  {
    id: "h3",
    name: "July Week 4 Tournament",
    date: "2026-08-03",
    winner: "Hamza Shah",
    playerCount: 16,
    format: "Best of 3",
  },
  {
    id: "h4",
    name: "July Week 3 Tournament",
    date: "2026-07-27",
    winner: "Ali Raza",
    playerCount: 16,
    format: "Best of 3",
  },
];