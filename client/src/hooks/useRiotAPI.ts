import { useQuery } from "@tanstack/react-query";

interface RiotPlayerData {
  account: {
    puuid: string;
    gameName: string;
    tagLine: string;
  };
  summoner: {
    id: string;
    summonerLevel: number;
    profileIconId: number;
  };
  rank: {
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  } | null;
  championMasteries: Array<{
    championId: number;
    championLevel: number;
    championPoints: number;
  }>;
  recentStats: {
    totalGames: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
    winRate: string;
  };
}

interface RiotMatch {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  gameType: string;
  mapId: number;
  queueId: number;
  participant: {
    // Basic stats
    championName: string;
    championId: number;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
    teamPosition: string;
    teamId: number;
    summonerLevel: number;
    
    // Detailed performance
    kda: string;
    goldEarned: number;
    totalMinionsKilled: number;
    neutralMinionsKilled: number;
    totalDamageDealtToChampions: number;
    visionScore: number;
    wardsPlaced: number;
    wardsKilled: number;
    
    // Items (build)
    items: number[];
    
    // Summoner spells
    summoner1Id: number;
    summoner2Id: number;
    
    // Team performance context
    rankInTeam: number;
    teamWin: boolean;
    
    // Advanced stats
    doubleKills: number;
    tripleKills: number;
    quadraKills: number;
    pentaKills: number;
    largestKillingSpree: number;
    firstBloodKill: boolean;
    
    // Damage breakdown
    physicalDamageDealtToChampions: number;
    magicDamageDealtToChampions: number;
    trueDamageDealtToChampions: number;
    totalDamageTaken: number;
  } | null;
  
  // All participants for comparison
  allParticipants: Array<{
    puuid: string;
    summonerName: string;
    championName: string;
    teamId: number;
    teamPosition: string;
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
    goldEarned: number;
    totalDamageDealtToChampions: number;
    totalMinionsKilled: number;
    visionScore: number;
  }>;
}

interface RiotMatchHistory {
  matchIds: string[];
  totalMatches: number;
  matches: RiotMatch[];
}

export function useRiotPlayer(gameName: string, tagLine: string) {
  return useQuery<RiotPlayerData>({
    queryKey: ["riot", "player", gameName, tagLine],
    queryFn: async () => {
      const response = await fetch(`/api/riot/player/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: !!(gameName && tagLine),
    staleTime: 2 * 60 * 1000, // 2 minutes cache to reduce API calls
    retry: (failureCount, error) => {
      // Don't retry on 404 (player not found) or 403 (forbidden)
      if (error.message.includes("404") || error.message.includes("403")) {
        return false;
      }
      // Don't retry on rate limit - let the backend handle it
      if (error.message.includes("Rate limit")) {
        return false;
      }
      return failureCount < 2; // Reduce retries to avoid rate limiting
    }
  });
}

export function useRiotMatches(puuid: string, count: number = 10, start: number = 0) {
  return useQuery<RiotMatchHistory>({
    queryKey: ["riot", "matches", puuid, count, start],
    queryFn: async () => {
      const response = await fetch(`/api/riot/matches/${puuid}?count=${count}&start=${start}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match history");
      }
      return response.json();
    },
    enabled: !!puuid,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2
  });
}

export function useRiotMatchesExpanded(puuid: string, count: number = 20, start: number = 0) {
  return useQuery<RiotMatchHistory>({
    queryKey: ["riot", "matches-expanded", puuid, count, start],
    queryFn: async () => {
      const response = await fetch(`/api/riot/matches/${puuid}?count=${count}&start=${start}`);
      if (!response.ok) {
        throw new Error("Failed to fetch expanded match history");
      }
      return response.json();
    },
    enabled: !!puuid,
    staleTime: 3 * 60 * 1000, // 3 minutes cache to reduce API calls
    retry: (failureCount, error) => {
      // Don't retry on rate limit - let the backend handle it
      if (error.message.includes("Rate limit")) {
        return false;
      }
      return failureCount < 2; // Reduce retries to avoid rate limiting
    }
  });
}

// Utility functions for displaying data
export function formatRank(rank: RiotPlayerData['rank']): string {
  if (!rank) return "Unranked";
  return `${rank.tier} ${rank.rank} (${rank.leaguePoints} LP)`;
}

export function formatWinRate(wins: number, losses: number): string {
  const total = wins + losses;
  if (total === 0) return "0%";
  return `${Math.round((wins / total) * 100)}%`;
}

export function formatGameDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getChampionImageUrl(championName: string): string {
  // Riot's Data Dragon CDN for champion images
  return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championName}.png`;
}

export function getProfileIconUrl(iconId: number): string {
  // Riot's Data Dragon CDN for profile icons
  return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${iconId}.png`;
}

export function getRankImageUrl(tier: string): string {
  if (!tier || tier === "UNRANKED") return "";
  
  const tierLower = tier.toLowerCase();
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-emblem/emblem-${tierLower}.png`;
}

export function getItemImageUrl(itemId: number): string {
  if (!itemId || itemId === 0) return "";
  return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${itemId}.png`;
}

export function getSummonerSpellImageUrl(spellId: number): string {
  const spellMap: Record<number, string> = {
    1: "SummonerBoost", // Cleanse
    3: "SummonerExhaust", // Exhaust
    4: "SummonerFlash", // Flash
    6: "SummonerHaste", // Ghost
    7: "SummonerHeal", // Heal
    11: "SummonerSmite", // Smite
    12: "SummonerTeleport", // Teleport
    13: "SummonerMana", // Clarity
    14: "SummonerDot", // Ignite
    21: "SummonerBarrier", // Barrier
    30: "SummonerPoroRecall", // To the King!
    31: "SummonerPoroThrow", // Poro Toss
    32: "SummonerSnowball", // Mark/Dash
    39: "SummonerSnowURFSnowball_Mark", // Mark
    54: "Summoner_UltBookPlaceholder", // Placeholder
    55: "Summoner_UltBookSmitePlaceholder" // Placeholder
  };
  
  const spellName = spellMap[spellId] || "SummonerFlash";
  return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spellName}.png`;
}

export function getQueueName(queueId: number): string {
  const queueMap: Record<number, string> = {
    400: "Normal Draft",
    420: "Ranked Solo/Duo",
    440: "Ranked Flex",
    450: "ARAM",
    700: "Clash",
    830: "Co-op vs. AI Intro",
    840: "Co-op vs. AI Beginner",
    850: "Co-op vs. AI Intermediate",
    900: "URF",
    1020: "One for All",
    1200: "Nexus Blitz",
    1300: "Nexus Blitz",
    1400: "Ultimate Spellbook"
  };
  
  return queueMap[queueId] || "Custom Game";
}

export function formatGold(gold: number): string {
  if (gold >= 1000) {
    return `${(gold / 1000).toFixed(1)}k`;
  }
  return gold.toString();
}

export function formatDamage(damage: number): string {
  if (damage >= 1000000) {
    return `${(damage / 1000000).toFixed(1)}M`;
  }
  if (damage >= 1000) {
    return `${(damage / 1000).toFixed(1)}k`;
  }
  return damage.toString();
}

// Performance Score System
export interface PerformanceScore {
  score: number;
  title: string;
  icon: string;
  color: string;
  description: string;
}

export function calculatePerformanceScore(participant: any, allParticipants: any[]): PerformanceScore {
  const kills = participant.kills || 0;
  const deaths = participant.deaths || 0;
  const assists = participant.assists || 0;
  const kda = parseFloat(participant.kda || "0");
  const damage = participant.totalDamageDealtToChampions || 0;
  const gold = participant.goldEarned || 0;
  const visionScore = participant.visionScore || 0;
  const cs = (participant.totalMinionsKilled || 0) + (participant.neutralMinionsKilled || 0);
  const gameDuration = participant.gameDuration || 1800; // Use actual game duration or default to 30 minutes
  
  // Calculate various metrics
  const csPerMin = cs / (gameDuration / 60);
  const damagePerMin = damage / (gameDuration / 60);
  const goldPerMin = gold / (gameDuration / 60);
  const visionPerMin = visionScore / (gameDuration / 60);
  
  // Get team participants for comparison
  const teamParticipants = allParticipants.filter(p => p.teamId === participant.teamId);
  const teamDamage = teamParticipants.reduce((sum, p) => sum + (p.totalDamageDealtToChampions || 0), 0);
  const teamGold = teamParticipants.reduce((sum, p) => sum + (p.goldEarned || 0), 0);
  const teamKills = teamParticipants.reduce((sum, p) => sum + (p.kills || 0), 0);
  
  // Calculate percentages
  const damageShare = teamDamage > 0 ? (damage / teamDamage) * 100 : 0;
  const goldShare = teamGold > 0 ? (gold / teamGold) * 100 : 0;
  const killShare = teamKills > 0 ? (kills / teamKills) * 100 : 0;
  
  // Calculate base score (0-100) - more realistic scoring
  let score = 0;
  
  // KDA contribution (35%) - most important factor
  if (kda >= 8) score += 35;
  else if (kda >= 5) score += 30;
  else if (kda >= 3) score += 25;
  else if (kda >= 2) score += 20;
  else if (kda >= 1.5) score += 15;
  else if (kda >= 1) score += 10;
  else if (kda >= 0.5) score += 5;
  
  // Damage contribution (25%)
  if (damageShare >= 35) score += 25;
  else if (damageShare >= 30) score += 20;
  else if (damageShare >= 25) score += 15;
  else if (damageShare >= 20) score += 10;
  else if (damageShare >= 15) score += 5;
  
  // Gold efficiency (20%)
  if (goldPerMin >= 350) score += 20;
  else if (goldPerMin >= 300) score += 15;
  else if (goldPerMin >= 250) score += 10;
  else if (goldPerMin >= 200) score += 5;
  
  // Vision contribution (15%)
  if (visionPerMin >= 2.5) score += 15;
  else if (visionPerMin >= 2) score += 12;
  else if (visionPerMin >= 1.5) score += 8;
  else if (visionPerMin >= 1) score += 5;
  else if (visionPerMin >= 0.5) score += 2;
  
  // CS efficiency (5%) - less important for overall score
  if (csPerMin >= 8) score += 5;
  else if (csPerMin >= 7) score += 4;
  else if (csPerMin >= 6) score += 3;
  else if (csPerMin >= 5) score += 2;
  else if (csPerMin >= 4) score += 1;
  
  // Bonus for exceptional performance
  if (kills >= 15 && deaths <= 2) score += 5; // High kill, low death
  if (assists >= 15) score += 3; // High assist count
  if (damageShare >= 40) score += 3; // Exceptional damage share
  
  // Penalty for poor performance
  if (deaths >= 10) score -= 5; // Too many deaths
  if (kda < 0.5) score -= 10; // Very poor KDA
  
  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));
  
  // Determine title and styling based on realistic thresholds
  if (score >= 85 && kda >= 5) {
    return {
      score: Math.round(score),
      title: "MVP",
      icon: "🏆",
      color: "text-yellow-400",
      description: `MVP da partida! KDA: ${kda}, Dano: ${damageShare.toFixed(1)}%, Ouro/min: ${goldPerMin.toFixed(0)}. Performance excepcional em todos os aspectos.`
    };
  } else if (score >= 75 && kda >= 3) {
    return {
      score: Math.round(score),
      title: "ACE",
      icon: "⭐",
      color: "text-blue-400",
      description: `Desempenho excepcional! KDA: ${kda}, Dano: ${damageShare.toFixed(1)}%, Visão/min: ${visionPerMin.toFixed(1)}. Destaque em múltiplas áreas.`
    };
  } else if (score >= 65 && kda >= 2) {
    return {
      score: Math.round(score),
      title: "IMPARÁVEL",
      icon: "🔥",
      color: "text-red-400",
      description: `Dominou a partida! KDA: ${kda}, CS/min: ${csPerMin.toFixed(1)}, Dano: ${damageShare.toFixed(1)}%. Controle total do jogo.`
    };
  } else if (score >= 55 && kda >= 1.5) {
    return {
      score: Math.round(score),
      title: "DESTACADO",
      icon: "⚡",
      color: "text-green-400",
      description: `Boa performance! KDA: ${kda}, Ouro/min: ${goldPerMin.toFixed(0)}, Visão/min: ${visionPerMin.toFixed(1)}. Contribuição sólida.`
    };
  } else if (score >= 45) {
    return {
      score: Math.round(score),
      title: "SOLIDÁRIO",
      icon: "🛡️",
      color: "text-purple-400",
      description: `Contribuiu para o time! KDA: ${kda}, CS/min: ${csPerMin.toFixed(1)}, Dano: ${damageShare.toFixed(1)}%. Performance equilibrada.`
    };
  } else if (score >= 35) {
    return {
      score: Math.round(score),
      title: "EM DESENVOLVIMENTO",
      icon: "🌱",
      color: "text-orange-400",
      description: `Pode melhorar! KDA: ${kda}, CS/min: ${csPerMin.toFixed(1)}, Visão/min: ${visionPerMin.toFixed(1)}. Foque em farm e posicionamento.`
    };
  } else {
    return {
      score: Math.round(score),
      title: "DIFÍCIL",
      icon: "💪",
      color: "text-gray-400",
      description: `Partida desafiadora! KDA: ${kda}, CS/min: ${csPerMin.toFixed(1)}, Dano: ${damageShare.toFixed(1)}%. Continue praticando!`
    };
  }
}
