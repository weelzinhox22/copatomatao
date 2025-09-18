import type { Express } from "express";
import { createServer, type Server } from "http";
import { riotAPI } from "./services/riot-api";

// Mock data para substituir o banco de dados
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

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      message: "Copa Tomatão API funcionando sem banco de dados!"
    });
  });

  // Teams API
  app.get("/api/teams", (req, res) => {
    res.json(mockTeams);
  });

  app.get("/api/teams/:id", (req, res) => {
    const teamId = parseInt(req.params.id);
    const team = mockTeams.find(t => t.id === teamId);
    
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    res.json(team);
  });

  // News API
  app.get("/api/news", (req, res) => {
    res.json(mockNews);
  });

  app.get("/api/news/:id", (req, res) => {
    const newsId = req.params.id;
    const news = mockNews.find(n => n.id === newsId);
    
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    
    res.json(news);
  });

  // Riot API Routes
  app.get("/api/riot/player/:gameName/:tagLine", async (req, res) => {
    try {
      const { gameName, tagLine } = req.params;
      console.log(`[RENDER] Fetching player data for: ${gameName}#${tagLine}`);
      console.log(`[RENDER] Environment check - RIOT_API_KEY exists: ${!!process.env.RIOT_API_KEY}`);
      console.log(`[RENDER] Environment check - NODE_ENV: ${process.env.NODE_ENV}`);
      
      // Se a API key não estiver configurada, usar mock data
      if (!process.env.RIOT_API_KEY) {
        console.log(`[RENDER] Using mock data for ${gameName}#${tagLine} due to API key issues`);
        
        const mockPlayerData = {
          account: {
            puuid: `mock-puuid-${gameName}-${tagLine}`,
            gameName: gameName,
            tagLine: tagLine
          },
          summoner: {
            id: `mock-summoner-id-${gameName}`,
            accountId: `mock-account-id-${gameName}`,
            puuid: `mock-puuid-${gameName}-${tagLine}`,
            name: gameName,
            profileIconId: 1,
            revisionDate: Date.now(),
            summonerLevel: 100
          },
          leagueEntries: [{
            leagueId: 'mock-league-id',
            queueType: 'RANKED_SOLO_5x5',
            tier: 'PLATINUM',
            rank: 'IV',
            puuid: `mock-puuid-${gameName}-${tagLine}`,
            leaguePoints: 50,
            wins: 30,
            losses: 25,
            veteran: false,
            inactive: false,
            freshBlood: true,
            hotStreak: false
          }],
          championMasteries: [
            { championId: 1, championLevel: 7, championPoints: 50000, lastPlayTime: Date.now() },
            { championId: 2, championLevel: 6, championPoints: 40000, lastPlayTime: Date.now() },
            { championId: 3, championLevel: 5, championPoints: 30000, lastPlayTime: Date.now() }
          ],
          matches: []
        };
        
        res.json(mockPlayerData);
        return;
      }
      
      const playerData = await riotAPI.getCompletePlayerData(gameName, tagLine);
      console.log(`[RENDER] Successfully fetched player data for: ${gameName}#${tagLine}`);
      res.json(playerData);
    } catch (error: any) {
      console.error(`[RENDER] Error fetching player data for ${req.params.gameName}#${req.params.tagLine}:`, error);
      
      // Se for erro 401, usar mock data
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        console.log(`[RENDER] Using mock data due to 401 error for ${req.params.gameName}#${req.params.tagLine}`);
        
        const mockPlayerData = {
          account: {
            puuid: `mock-puuid-${req.params.gameName}-${req.params.tagLine}`,
            gameName: req.params.gameName,
            tagLine: req.params.tagLine
          },
          summoner: {
            id: `mock-summoner-id-${req.params.gameName}`,
            accountId: `mock-account-id-${req.params.gameName}`,
            puuid: `mock-puuid-${req.params.gameName}-${req.params.tagLine}`,
            name: req.params.gameName,
            profileIconId: 1,
            revisionDate: Date.now(),
            summonerLevel: 100
          },
          leagueEntries: [{
            leagueId: 'mock-league-id',
            queueType: 'RANKED_SOLO_5x5',
            tier: 'PLATINUM',
            rank: 'IV',
            puuid: `mock-puuid-${req.params.gameName}-${req.params.tagLine}`,
            leaguePoints: 50,
            wins: 30,
            losses: 25,
            veteran: false,
            inactive: false,
            freshBlood: true,
            hotStreak: false
          }],
          championMasteries: [
            { championId: 1, championLevel: 7, championPoints: 50000, lastPlayTime: Date.now() },
            { championId: 2, championLevel: 6, championPoints: 40000, lastPlayTime: Date.now() },
            { championId: 3, championLevel: 5, championPoints: 30000, lastPlayTime: Date.now() }
          ],
          matches: []
        };
        
        res.json(mockPlayerData);
        return;
      }
      
      console.error(`[RENDER] Error stack:`, error.stack);
      res.status(500).json({ 
        error: "Failed to fetch player data from Riot API",
        message: error.message,
        details: error.stack
      });
    }
  });

  app.get("/api/riot/matches/:puuid", async (req, res) => {
    try {
      const { puuid } = req.params;
      const { start = 0, count = 5 } = req.query;
      
      console.log(`Fetching matches for PUUID: ${puuid}`);
      
      const matchIds = await riotAPI.getMatchIdsByPuuid(puuid, parseInt(start as string), parseInt(count as string));
      
      if (matchIds.length === 0) {
        return res.json([]);
      }
      
      const matches = await Promise.all(
        matchIds.map(async matchId => {
          try {
            return await riotAPI.getMatchById(matchId);
          } catch (error) {
            console.error(`Error fetching match ${matchId}:`, error);
            return null;
          }
        })
      );
      
      const validMatches = matches.filter(match => match !== null);
      res.json(validMatches);
    } catch (error: any) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ 
        error: "Failed to fetch matches from Riot API",
        message: error.message 
      });
    }
  });

  app.post("/api/riot/clear-cache", (req, res) => {
    try {
      riotAPI.clearCache();
      res.json({ success: true, message: "Riot API cache cleared successfully" });
    } catch (error: any) {
      console.error("Error clearing cache:", error);
      res.status(500).json({ 
        error: "Failed to clear cache",
        message: error.message 
      });
    }
  });

  return server;
}
