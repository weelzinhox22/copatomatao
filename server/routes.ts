import type { Express } from "express";
import { createServer, type Server } from "http";
import { riotAPI } from "./services/riot-api";

// Mock data para substituir o banco de dados
const mockUsers = [
  {
    id: "1",
    email: "admin@copatomatao.com",
    username: "admin",
    role: "admin" as const,
    fullName: "Administrador",
    createdAt: new Date()
  }
];

const mockTeams = [
  {
    id: 1,
    name: "Kongs do Atlântico",
    captain: "LDates",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time dominante da região nordeste, conhecido por suas jogadas agressivas.",
    logo: "🦍",
    color: "from-blue-500 to-cyan-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z"
  },
  {
    id: 2,
    name: "Os Fimos",
    captain: "Al Death",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time estratégico focado em objetivos e controle de mapa.",
    logo: "⚔️",
    color: "from-red-500 to-pink-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z"
  },
  {
    id: 3,
    name: "Te Fizzguei",
    captain: "Jamal",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time versátil com jogadores experientes em múltiplas posições.",
    logo: "🐟",
    color: "from-green-500 to-teal-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z"
  },
  {
    id: 4,
    name: "Zeca e os Urubus",
    captain: "Theushubu",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time agressivo conhecido por suas jogadas ousadas e criativas.",
    logo: "🦅",
    color: "from-purple-500 to-indigo-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z"
  }
];

const mockNews = [
  {
    id: "1",
    title: "Copa Tomatão 2025: Inscrições abertas para o maior torneio da comunidade!",
    excerpt: "O aguardado Copa Tomatão está de volta! Venha participar do campeonato mais divertido e competitivo entre amigos. Inscrições abertas até o fim do mês.",
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-15T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Torneio",
    featured: true,
    slug: "copa-tomatao-2025-inscricoes-abertas"
  },
  {
    id: "2",
    title: "Sorteio de Jogadores: Como Funciona o Sistema de Draft",
    excerpt: "Entenda como funciona o sistema de sorteio de jogadores para os times da Copa Tomatão. Cada capitão escolhe uma lane e o sistema sorteia automaticamente.",
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-14T15:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    category: "Regras",
    featured: false,
    slug: "sorteio-jogadores-sistema-draft"
  },
  {
    id: "3",
    title: "Transmissões ao Vivo: Acompanhe Todos os Jogos",
    excerpt: "Todos os jogos da Copa Tomatão serão transmitidos ao vivo no YouTube e Twitch. Não perca nenhum momento da ação!",
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-13T09:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    category: "Transmissão",
    featured: false,
    slug: "transmissoes-ao-vivo-jogos"
  }
];

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role: "captain" | "player" | "admin";
        fullName?: string;
        preferredLane?: "top" | "jungle" | "mid" | "adc" | "support";
        riotId?: string;
        createdAt: Date;
      };
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "fallback-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    })
  );

  // Auth middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  };

  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, username: user.username, role: user.role });
    } catch (error) {
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    const { password, ...user } = req.user as any;
    res.json(user);
  });

  // Teams routes
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  app.post("/api/teams", requireAuth, async (req, res) => {
    try {
      if (!req.user || req.user.role !== "captain") {
        return res.status(403).json({ message: "Only captains can create teams" });
      }

      const teamData = insertTeamSchema.parse({
        ...req.body,
        captainId: req.user!.id,
      });

      const team = await storage.createTeam(teamData);
      res.json(team);
    } catch (error) {
      res.status(400).json({ message: "Failed to create team" });
    }
  });

  app.get("/api/teams/:id/members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers(req.params.id);
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post("/api/teams/:id/members", requireAuth, async (req, res) => {
    try {
      const team = await storage.getTeam(req.params.id);
      if (!team || !req.user || team.captainId !== req.user.id) {
        return res.status(403).json({ message: "Only team captain can add members" });
      }

      const member = await storage.addTeamMember({
        teamId: req.params.id,
        playerId: req.body.playerId,
        lane: req.body.lane,
      });
      res.json(member);
    } catch (error) {
      res.status(400).json({ message: "Failed to add team member" });
    }
  });

  // Matches routes
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  app.get("/api/matches/phase/:phase", async (req, res) => {
    try {
      const matches = await storage.getMatchesByPhase(req.params.phase);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        username: users.username,
        role: users.role,
        fullName: users.fullName,
        preferredLane: users.preferredLane,
        riotId: users.riotId,
        createdAt: users.createdAt,
      }).from(users);
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/featured", async (req, res) => {
    try {
      const news = await storage.getFeaturedNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured news" });
    }
  });

  app.post("/api/news", requireAuth, requireAdmin, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse({
        ...req.body,
        authorId: req.user!.id,
      });

      const news = await storage.createNews(newsData);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: "Failed to create news" });
    }
  });

  app.put("/api/news/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const news = await storage.updateNews(req.params.id, req.body);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: "Failed to update news" });
    }
  });

  // Simple test route
  app.get("/api/riot/simple-test", (req, res) => {
    res.json({ message: "Riot routes are working!" });
  });

  // Riot API test route
  app.get("/api/riot/test", async (req, res) => {
    try {
      console.log("Testing Riot API endpoint called");
      // Test with a known player (Faker)
      const testData = await riotAPI.getAccountByRiotId("Hide on bush", "KR1");
      res.json({ success: true, data: testData });
    } catch (error: any) {
      console.error("Riot API test error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: "API key might be invalid or expired"
      });
    }
  });

  // Clear Riot API cache
  app.post("/api/riot/clear-cache", async (req, res) => {
    try {
      riotAPI.clearCache();
      res.json({ success: true, message: "Cache cleared successfully" });
    } catch (error: any) {
      console.error("Failed to clear cache:", error);
      res.json({ success: false, error: error.message });
    }
  });

  // Riot API routes
  app.get("/api/riot/player/:gameName/:tagLine", async (req, res) => {
    try {
      const { gameName, tagLine } = req.params;
      console.log(`Fetching player data for: ${gameName}#${tagLine}`);
      
      // Verificar se os parâmetros são válidos
      if (!gameName || !tagLine) {
        return res.status(400).json({ error: "Game name and tag line are required" });
      }
      
      const playerData = await riotAPI.getCompletePlayerData(gameName, tagLine);
      
      // Calcular estatísticas dos matches recentes
      const recentStats = {
        totalGames: playerData.recentMatches.length,
        wins: 0,
        kills: 0,
        deaths: 0,
        assists: 0
      };

      playerData.recentMatches.forEach(match => {
        const participant = match.info.participants.find(p => p.puuid === playerData.account.puuid);
        if (participant) {
          if (participant.win) recentStats.wins++;
          recentStats.kills += participant.kills;
          recentStats.deaths += participant.deaths;
          recentStats.assists += participant.assists;
        }
      });

      const kda = riotAPI.calculateKDA(recentStats.kills, recentStats.deaths, recentStats.assists);
      
      // Get rank data (use real data if available, otherwise use mock)
      const rankData = playerData.leagueEntries.find(entry => entry.queueType === "RANKED_SOLO_5x5") || null;
      
      // If we have real match data, use it to calculate wins/losses
      let finalRankData = rankData;
      if (rankData && playerData.recentMatches.length > 0) {
        // Update rank data with real statistics from recent matches
        finalRankData = {
          ...rankData,
          wins: recentStats.wins,
          losses: recentStats.totalGames - recentStats.wins
        };
      }
      
      const response = {
        account: playerData.account,
        summoner: playerData.summoner,
        rank: finalRankData,
        championMasteries: playerData.championMasteries,
        recentStats: {
          ...recentStats,
          kda,
          winRate: recentStats.totalGames > 0 ? ((recentStats.wins / recentStats.totalGames) * 100).toFixed(1) : "0"
        }
      };
      
      console.log("Successfully fetched player data");
      res.json(response);
    } catch (error: any) {
      console.error("Error fetching player data:", error);
      
      // Determine the appropriate error message and status code
      let statusCode = 500;
      let errorMessage = "Failed to fetch player data from Riot API";
      
      if (error.message.includes("404")) {
        statusCode = 404;
        errorMessage = "Player not found. Please check the game name and tag.";
      } else if (error.message.includes("403")) {
        statusCode = 403;
        errorMessage = "API access forbidden. Please check API key.";
      } else if (error.message.includes("429")) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded. Please try again later.";
      }
      
      res.status(statusCode).json({ error: errorMessage });
    }
  });

  app.get("/api/riot/matches/:puuid", async (req, res) => {
    try {
      const { puuid } = req.params;
      const count = parseInt(req.query.count as string || "20");
      const start = parseInt(req.query.start as string || "0");
      
      const matchIds = await riotAPI.getMatchIdsByPuuid(puuid, count, start);
      
      // Buscar detalhes de até 15 matches
      const matches = await Promise.all(
        matchIds.slice(start, start + Math.min(15, matchIds.length)).map(async (matchId) => {
          try {
            return await riotAPI.getMatchById(matchId);
          } catch (error) {
            console.error(`Error fetching match ${matchId}:`, error);
            return null;
          }
        })
      );

      const validMatches = matches.filter(match => match !== null);
      
      res.json({
        matchIds,
        totalMatches: matchIds.length,
        matches: validMatches.map(match => {
          const participant = match.info.participants.find(p => p.puuid === puuid);
          const playerTeamId = participant?.teamId;
          const playerTeam = match.info.teams.find(team => team.teamId === playerTeamId);
          
          // Calcular posição no time (rank por KDA ou damage)
          const teamParticipants = match.info.participants.filter(p => p.teamId === playerTeamId);
          const playerRankInTeam = teamParticipants
            .sort((a, b) => {
              const aKda = riotAPI.calculateKDA(a.kills, a.deaths, a.assists);
              const bKda = riotAPI.calculateKDA(b.kills, b.deaths, b.assists);
              return parseFloat(bKda) - parseFloat(aKda);
            })
            .findIndex(p => p.puuid === puuid) + 1;

          return {
            matchId: match.metadata.matchId,
            gameCreation: match.info.gameCreation,
            gameDuration: match.info.gameDuration,
            gameMode: match.info.gameMode,
            gameType: match.info.gameType,
            mapId: match.info.mapId,
            queueId: match.info.queueId,
            participant: participant ? {
              // Basic stats
              championName: participant.championName,
              championId: participant.championId,
              kills: participant.kills,
              deaths: participant.deaths,
              assists: participant.assists,
              win: participant.win,
              teamPosition: participant.teamPosition,
              teamId: participant.teamId,
              summonerLevel: participant.summonerLevel,
              
              // Detailed performance
              kda: riotAPI.calculateKDA(participant.kills, participant.deaths, participant.assists),
              goldEarned: participant.goldEarned,
              totalMinionsKilled: participant.totalMinionsKilled,
              neutralMinionsKilled: participant.neutralMinionsKilled,
              totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
              visionScore: participant.visionScore,
              wardsPlaced: participant.wardsPlaced,
              wardsKilled: participant.wardsKilled,
              
              // Items (build)
              items: [
                participant.item0, participant.item1, participant.item2,
                participant.item3, participant.item4, participant.item5, participant.item6
              ].filter(item => item !== 0),
              
              // Summoner spells
              summoner1Id: participant.summoner1Id,
              summoner2Id: participant.summoner2Id,
              
              // Team performance context
              rankInTeam: playerRankInTeam,
              teamWin: playerTeam?.win || false,
              
              // Advanced stats
              doubleKills: participant.doubleKills,
              tripleKills: participant.tripleKills,
              quadraKills: participant.quadraKills,
              pentaKills: participant.pentaKills,
              largestKillingSpree: participant.largestKillingSpree,
              firstBloodKill: participant.firstBloodKill,
              
              // Damage breakdown
              physicalDamageDealtToChampions: participant.physicalDamageDealtToChampions,
              magicDamageDealtToChampions: participant.magicDamageDealtToChampions,
              trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
              totalDamageTaken: participant.totalDamageTaken,
              
              // Farm stats
              totalMinionsKilled: participant.totalMinionsKilled,
              neutralMinionsKilled: participant.neutralMinionsKilled
            } : null,
            
            // All participants for comparison
            allParticipants: match.info.participants.map(p => ({
              puuid: p.puuid,
              summonerName: p.riotIdName || p.summonerName,
              championName: p.championName,
              teamId: p.teamId,
              teamPosition: p.teamPosition,
              kills: p.kills,
              deaths: p.deaths,
              assists: p.assists,
              kda: riotAPI.calculateKDA(p.kills, p.deaths, p.assists),
              goldEarned: p.goldEarned,
              totalDamageDealtToChampions: p.totalDamageDealtToChampions,
              totalMinionsKilled: p.totalMinionsKilled + p.neutralMinionsKilled,
              visionScore: p.visionScore
            }))
          };
        })
      });
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ error: "Failed to fetch match data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
