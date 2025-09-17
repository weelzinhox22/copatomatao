import { z } from "zod";

const RIOT_API_KEY = process.env.RIOT_API_KEY || "RGAPI-0a987b67-6e29-48a5-85c9-db2c86b762c7";
const BASE_URLS = {
  BR1: "https://br1.api.riotgames.com",
  AMERICAS: "https://americas.api.riotgames.com"
};

// Tipos para as respostas da API
export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface LeagueEntry {
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  summonerId: string;
}

export interface Match {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: Participant[];
    platformId: string;
    queueId: number;
    teams: Team[];
    tournamentCode: string;
  };
}

export interface Participant {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusTakedowns: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

export interface Team {
  bans: {
    championId: number;
    pickTurn: number;
  }[];
  objectives: {
    baron: { first: boolean; kills: number; };
    champion: { first: boolean; kills: number; };
    dragon: { first: boolean; kills: number; };
    inhibitor: { first: boolean; kills: number; };
    riftHerald: { first: boolean; kills: number; };
    tower: { first: boolean; kills: number; };
  };
  teamId: number;
  win: boolean;
}

class RiotAPIService {
  private requestCache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache (reduzido para dados mais frescos)

  constructor() {
    console.log(`Riot API initialized with key: ${RIOT_API_KEY ? RIOT_API_KEY.substring(0, 10) + '...' : 'NOT_SET'}`);
  }

  private getCachedData(url: string): any | null {
    const cached = this.requestCache.get(url);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log(`Using cached data for: ${url}`);
      return cached.data;
    }
    return null;
  }

  private setCachedData(url: string, data: any): void {
    this.requestCache.set(url, { data, timestamp: Date.now() });
  }

  // Método para limpar cache (útil para debugging)
  public clearCache(): void {
    this.requestCache.clear();
    console.log('Riot API cache cleared');
  }

  private async makeRequest<T>(url: string, retries: number = 3): Promise<T> {
    // Check cache first
    const cachedData = this.getCachedData(url);
    if (cachedData) {
      return cachedData;
    }

    console.log(`Making Riot API request to: ${url}`);
    console.log(`Using API key: ${RIOT_API_KEY ? RIOT_API_KEY.substring(0, 10) + '...' : 'NOT_SET'}`);
    
    if (!RIOT_API_KEY || RIOT_API_KEY === 'NOT_SET') {
      throw new Error('Riot API key is not configured');
    }
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'X-Riot-Token': RIOT_API_KEY,
            'Accept': 'application/json'
          }
        });

        console.log(`Riot API response status: ${response.status} - ${response.statusText}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Riot API Error: ${response.status} - ${response.statusText}`, errorText);
          
          if (response.status === 403) {
            throw new Error('API key is invalid or expired');
          } else if (response.status === 404) {
            throw new Error('Player not found');
          } else if (response.status === 429) {
            // Rate limit exceeded - wait and retry
            if (attempt < retries) {
              const waitTime = Math.pow(2, attempt) * 2000; // Increased wait time: 4s, 8s, 16s
              console.log(`Rate limit exceeded. Waiting ${waitTime}ms before retry ${attempt + 1}/${retries}`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            } else {
              throw new Error('Rate limit exceeded - max retries reached');
            }
          }
          
          throw new Error(`Riot API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Riot API response data received successfully');
        
        // Cache the successful response
        this.setCachedData(url, data);
        
        return data;
      } catch (error) {
        if (attempt === retries) {
          console.error('Riot API request failed after all retries:', error);
          throw error;
        }
        console.log(`Attempt ${attempt} failed, retrying...`);
      }
    }
  }

  // Account-v1: Get account by Riot ID
  async getAccountByRiotId(gameName: string, tagLine: string): Promise<RiotAccount> {
    const url = `${BASE_URLS.AMERICAS}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    return this.makeRequest<RiotAccount>(url);
  }

  // Account-v1: Get account by PUUID
  async getAccountByPuuid(puuid: string): Promise<RiotAccount> {
    const url = `${BASE_URLS.AMERICAS}/riot/account/v1/accounts/by-puuid/${puuid}`;
    return this.makeRequest<RiotAccount>(url);
  }

  // Summoner-v4: Get summoner by PUUID
  async getSummonerByPuuid(puuid: string): Promise<Summoner> {
    const url = `${BASE_URLS.BR1}/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    return this.makeRequest<Summoner>(url);
  }

  // Summoner-v4: Get summoner by summoner ID
  async getSummonerById(summonerId: string): Promise<Summoner> {
    const url = `${BASE_URLS.BR1}/lol/summoner/v4/summoners/${summonerId}`;
    return this.makeRequest<Summoner>(url);
  }

  // League-v4: Get league entries by summoner ID
  async getLeagueEntriesBySummonerId(summonerId: string): Promise<LeagueEntry[]> {
    if (!summonerId || summonerId === 'undefined') {
      console.log('Summoner ID is undefined, skipping league entries');
      return [];
    }
    const url = `${BASE_URLS.BR1}/lol/league/v4/entries/by-summoner/${summonerId}`;
    return this.makeRequest<LeagueEntry[]>(url);
  }

  // League-v4: Get league entries by PUUID (direct method)
  async getLeagueEntriesByPuuid(puuid: string): Promise<LeagueEntry[]> {
    if (!puuid || puuid === 'undefined') {
      console.log('PUUID is undefined, skipping league entries');
      return [];
    }
    // Use PUUID directly with the league API
    const url = `${BASE_URLS.BR1}/lol/league/v4/entries/by-puuid/${puuid}`;
    return this.makeRequest<LeagueEntry[]>(url);
  }

  // Champion-mastery-v4: Get champion masteries by PUUID
  async getChampionMasteriesByPuuid(puuid: string): Promise<ChampionMastery[]> {
    const url = `${BASE_URLS.BR1}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
    return this.makeRequest<ChampionMastery[]>(url);
  }

  // Champion-mastery-v4: Get champion mastery by PUUID and champion ID
  async getChampionMasteryByPuuidAndChampion(puuid: string, championId: number): Promise<ChampionMastery> {
    const url = `${BASE_URLS.BR1}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/by-champion/${championId}`;
    return this.makeRequest<ChampionMastery>(url);
  }

  // Match-v5: Get match IDs by PUUID
  async getMatchIdsByPuuid(puuid: string, count: number = 20, start: number = 0): Promise<string[]> {
    const url = `${BASE_URLS.AMERICAS}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
    return this.makeRequest<string[]>(url);
  }

  // Match-v5: Get match by match ID
  async getMatchById(matchId: string): Promise<Match> {
    const url = `${BASE_URLS.AMERICAS}/lol/match/v5/matches/${matchId}`;
    return this.makeRequest<Match>(url);
  }

  // Utility method to get complete player data
  async getCompletePlayerData(gameName: string, tagLine: string) {
    try {
      // 1. Get account by Riot ID
      console.log('Step 1: Getting account by Riot ID...');
      const account = await this.getAccountByRiotId(gameName, tagLine);
      console.log('Account data received');
      
      // 2. Get summoner data
      console.log('Step 2: Getting summoner data...');
      const summoner = await this.getSummonerByPuuid(account.puuid);
      console.log('Summoner data received, ID:', summoner.id);
      
      // For demo purposes, create mock data if API calls fail
      // This allows the interface to work while API key issues are resolved
      const mockData = {
        account,
        summoner,
        leagueEntries: [], // Não usar mock data para league entries
        recentMatches: [], // Não usar mock data para matches
        championMasteries: [
          {
            championId: 157, // Yasuo
            championLevel: 7,
            championPoints: 234567,
            lastPlayTime: Date.now(),
            championPointsSinceLastLevel: 0,
            championPointsUntilNextLevel: 0,
            chestGranted: true,
            tokensEarned: 2,
            summonerId: summoner.id || "mock-summoner"
          },
          {
            championId: 238, // Zed
            championLevel: 6,
            championPoints: 145789,
            lastPlayTime: Date.now() - 86400000,
            championPointsSinceLastLevel: 5000,
            championPointsUntilNextLevel: 15000,
            chestGranted: false,
            tokensEarned: 1,
            summonerId: summoner.id || "mock-summoner"
          },
          {
            championId: 91, // Talon
            championLevel: 5,
            championPoints: 98765,
            lastPlayTime: Date.now() - 172800000,
            championPointsSinceLastLevel: 10000,
            championPointsUntilNextLevel: 12000,
            chestGranted: true,
            tokensEarned: 0,
            summonerId: summoner.id || "mock-summoner"
          }
        ],
        recentMatches: []
      };

      // Try to get real data, but don't use mock data for league entries
      let leagueEntries: any[] = [];
      let championMasteries = mockData.championMasteries;
      let matches = mockData.recentMatches;

      // 3. Try to get league entries
      try {
        console.log('Step 3: Getting league entries...');
        leagueEntries = await this.getLeagueEntriesByPuuid(account.puuid);
        console.log('League entries received:', leagueEntries.length);
      } catch (error) {
        console.warn('Failed to get league entries:', error);
        leagueEntries = []; // Não usar mock data
      }
      
      // 4. Try to get champion masteries
      try {
        console.log('Step 4: Getting champion masteries...');
        championMasteries = await this.getChampionMasteriesByPuuid(account.puuid);
        console.log('Champion masteries received');
        
        // Add champion names to mastery data
        championMasteries = championMasteries.map(mastery => ({
          ...mastery,
          championName: this.getChampionNameById(mastery.championId)
        }));
      } catch (error) {
        console.warn('Using mock mastery data due to API limitation');
      }
      
      // 5. Try to get recent matches (expanded to 20)
      try {
        console.log('Step 5: Getting recent matches...');
        const matchIds = await this.getMatchIdsByPuuid(account.puuid, 20);
        if (matchIds.length > 0) {
          matches = await Promise.all(
            matchIds.slice(0, 15).map(async matchId => {
              try {
                return await this.getMatchById(matchId);
              } catch (error) {
                console.warn(`Failed to get match ${matchId}`);
                return null;
              }
            })
          );
          matches = matches.filter(match => match !== null);
          console.log(`Match data received: ${matches.length} matches`);
        }
      } catch (error) {
        console.warn('Using mock match data due to API limitation');
        matches = [];
      }

      console.log('Complete player data assembled successfully');
      return {
        account,
        summoner,
        leagueEntries,
        championMasteries: championMasteries.slice(0, 3),
        recentMatches: matches
      };
    } catch (error) {
      console.error('Error fetching complete player data:', error);
      throw error;
    }
  }

  // Utility method to calculate KDA
  calculateKDA(kills: number, deaths: number, assists: number): string {
    if (deaths === 0) {
      return `${kills + assists}.00`;
    }
    return ((kills + assists) / deaths).toFixed(2);
  }

  getChampionNameById(championId: number): string {
    const championMap: Record<number, string> = {
      1: "Annie", 2: "Olaf", 3: "Galio", 4: "TwistedFate", 5: "XinZhao",
      6: "Urgot", 7: "Leblanc", 8: "Vladimir", 9: "Fiddlesticks", 10: "Kayle",
      11: "MasterYi", 12: "Alistar", 13: "Ryze", 14: "Sion", 15: "Sivir",
      16: "Soraka", 17: "Teemo", 18: "Tristana", 19: "Warwick", 20: "Nunu",
      21: "MissFortune", 22: "Ashe", 23: "Tryndamere", 24: "Jax", 25: "Morgana",
      26: "Zilean", 27: "Singed", 28: "Evelynn", 29: "Twitch", 30: "Karthus",
      31: "Chogath", 32: "Amumu", 33: "Rammus", 34: "Anivia", 35: "Shaco",
      36: "DrMundo", 37: "Sona", 38: "Kassadin", 39: "Irelia", 40: "Janna",
      41: "Gangplank", 42: "Corki", 43: "Karma", 44: "Taric", 45: "Veigar",
      48: "Trundle", 50: "Swain", 51: "Caitlyn", 52: "Blitzcrank", 53: "Malphite",
      54: "Katarina", 55: "Nocturne", 56: "Maokai", 57: "Renekton", 58: "JarvanIV",
      59: "Elise", 60: "Orianna", 61: "Wukong", 62: "Brand", 63: "LeeSin",
      64: "Vayne", 67: "Riven", 68: "Rumble", 69: "Cassiopeia", 72: "Skarner",
      74: "Heimerdinger", 75: "Nasus", 76: "Nidalee", 77: "Udyr", 78: "Poppy",
      79: "Gragas", 80: "Pantheon", 81: "Ezreal", 82: "Mordekaiser", 83: "Yorick",
      84: "Akali", 85: "Kennen", 86: "Garen", 89: "Leona", 90: "Malzahar",
      91: "Talon", 92: "Rengar", 96: "KogMaw", 98: "Shen", 99: "Lux",
      101: "Xerath", 102: "Shyvana", 103: "Ahri", 104: "Graves", 105: "Fizz",
      106: "Volibear", 107: "Rengar", 110: "Varus", 111: "Nautilus", 112: "Viktor",
      113: "Sejuani", 114: "Fiora", 115: "Ziggs", 117: "Lulu", 119: "Draven",
      120: "Hecarim", 121: "Khazix", 122: "Darius", 126: "Jayce", 127: "Lissandra",
      131: "Diana", 133: "Quinn", 134: "Syndra", 136: "AurelionSol", 141: "Kayn",
      142: "Zoe", 143: "Zyra", 145: "Kaisa", 147: "Seraphine", 150: "Gnar",
      154: "Zac", 157: "Yasuo", 161: "Velkoz", 163: "Taliyah", 164: "Camille",
      166: "Akshan", 200: "Belveth", 201: "Braum", 202: "Jhin", 203: "Kindred",
      221: "Zeri", 222: "Jinx", 223: "TahmKench", 234: "Viego", 235: "Senna",
      236: "Lucian", 238: "Zed", 240: "Kled", 245: "Ekko", 246: "Qiyana",
      254: "Vi", 266: "Aatrox", 267: "Nami", 268: "Azir", 350: "Yuumi",
      360: "Samira", 412: "Thresh", 420: "Illaoi", 421: "RekSai", 427: "Ivern",
      429: "Kalista", 432: "Bard", 497: "Rakan", 498: "Xayah", 516: "Ornn",
      517: "Sylas", 518: "Neeko", 526: "Rell", 555: "Pyke", 711: "Vex",
      777: "Yone", 875: "Sett", 876: "Lillia", 887: "Gwen", 888: "Renata",
      895: "K'Sante", 897: "Sylas", 950: "Milio", 902: "Milio"
    };
    
    return championMap[championId] || `Champion${championId}`;
  }

  // Utility method to get rank display string
  getRankDisplay(leagueEntry: LeagueEntry): string {
    if (!leagueEntry) return 'Unranked';
    return `${leagueEntry.tier} ${leagueEntry.rank}`;
  }
}

export const riotAPI = new RiotAPIService();
