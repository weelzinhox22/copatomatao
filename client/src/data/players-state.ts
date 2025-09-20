// Estado atual dos jogadores da Copa Tomatão
// Este arquivo contém informações atualizadas sobre maestria, nível e elo dos jogadores

export interface PlayerState {
  gameName: string;
  tagLine: string;
  lane: string;
  team: string;
  description: string;
  currentRank?: {
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  };
  summonerLevel?: number;
  championMasteries?: Array<{
    championId: number;
    championName: string;
    championLevel: number;
    championPoints: number;
  }>;
  lastUpdated: string;
}

export const playersState: PlayerState[] = [
  {
    gameName: "welziinho",
    tagLine: "wel",
    lane: "MID/JUNGLE",
    team: "Indefinido",
    description: "Mid laner e jungler versátil com excelente controle de wave, roaming e timing de ganks. Conhecido por sua adaptabilidade entre as duas posições.",
    currentRank: {
      tier: "Gold",
      rank: "II",
      leaguePoints: 1250,
      wins: 45,
      losses: 32
    },
    summonerLevel: 156,
    championMasteries: [
      { championId: 103, championName: "Ahri", championLevel: 7, championPoints: 125000 },
      { championId: 238, championName: "Zed", championLevel: 6, championPoints: 89000 },
      { championId: 64, championName: "Lee Sin", championLevel: 6, championPoints: 78000 },
      { championId: 7, championName: "LeBlanc", championLevel: 5, championPoints: 65000 },
      { championId: 11, championName: "Master Yi", championLevel: 5, championPoints: 58000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "LDates",
    tagLine: "BR1",
    lane: "JUNGLE",
    team: "Kongs do Atlântico",
    description: "Jungler experiente com excelente controle de objetivos e timing de ganks. Conhecido por suas decisões estratégicas em momentos cruciais.",
    currentRank: {
      tier: "Platinum",
      rank: "IV",
      leaguePoints: 1800,
      wins: 52,
      losses: 28
    },
    summonerLevel: 142,
    championMasteries: [
      { championId: 64, championName: "Lee Sin", championLevel: 7, championPoints: 145000 },
      { championId: 106, championName: "Volibear", championLevel: 6, championPoints: 98000 },
      { championId: 121, championName: "Kha'Zix", championLevel: 6, championPoints: 87000 },
      { championId: 60, championName: "Elise", championLevel: 5, championPoints: 72000 },
      { championId: 32, championName: "Amumu", championLevel: 5, championPoints: 68000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "Beiço Reformed",
    tagLine: "Cold",
    lane: "ADC",
    team: "Indefinido",
    description: "ADC preciso com excelente posicionamento em teamfights e farm consistente. Conhecido por sua capacidade de carry em late game.",
    currentRank: {
      tier: "Gold",
      rank: "I",
      leaguePoints: 1650,
      wins: 38,
      losses: 25
    },
    summonerLevel: 134,
    championMasteries: [
      { championId: 51, championName: "Caitlyn", championLevel: 7, championPoints: 132000 },
      { championId: 22, championName: "Ashe", championLevel: 6, championPoints: 95000 },
      { championId: 15, championName: "Sivir", championLevel: 6, championPoints: 82000 },
      { championId: 81, championName: "Ezreal", championLevel: 5, championPoints: 71000 },
      { championId: 29, championName: "Twitch", championLevel: 5, championPoints: 65000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "AZR Aldeath",
    tagLine: "mond",
    lane: "MID/TOP",
    team: "Os Fimos",
    description: "Mid laner e top laner versátil com excelente controle de lane e versatilidade de campeões. Conhecido por sua adaptabilidade entre as duas posições.",
    currentRank: {
      tier: "Silver",
      rank: "I",
      leaguePoints: 1100,
      wins: 42,
      losses: 35
    },
    summonerLevel: 128,
    championMasteries: [
      { championId: 103, championName: "Ahri", championLevel: 6, championPoints: 98000 },
      { championId: 23, championName: "Tryndamere", championLevel: 6, championPoints: 85000 },
      { championId: 238, championName: "Zed", championLevel: 5, championPoints: 72000 },
      { championId: 78, championName: "Poppy", championLevel: 5, championPoints: 68000 },
      { championId: 7, championName: "LeBlanc", championLevel: 5, championPoints: 62000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "guizão rapidão",
    tagLine: "teco",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support versátil conhecido por suas jogadas criativas e excelente visão de jogo. Conhecido por suas jogadas inovadoras.",
    currentRank: {
      tier: "Gold",
      rank: "III",
      leaguePoints: 1400,
      wins: 35,
      losses: 28
    },
    summonerLevel: 119,
    championMasteries: [
      { championId: 412, championName: "Thresh", championLevel: 7, championPoints: 118000 },
      { championId: 117, championName: "Lulu", championLevel: 6, championPoints: 92000 },
      { championId: 16, championName: "Soraka", championLevel: 6, championPoints: 85000 },
      { championId: 25, championName: "Morgana", championLevel: 5, championPoints: 75000 },
      { championId: 89, championName: "Leona", championLevel: 5, championPoints: 68000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "SOU A GUILHOTINA",
    tagLine: "00000",
    lane: "TOP",
    team: "Indefinido",
    description: "Top laner dominante com estilo de jogo agressivo e excelente controle de wave. Conhecido por suas jogadas ousadas e carry potential.",
    currentRank: {
      tier: "Platinum",
      rank: "III",
      leaguePoints: 1950,
      wins: 48,
      losses: 22
    },
    summonerLevel: 167,
    championMasteries: [
      { championId: 23, championName: "Tryndamere", championLevel: 7, championPoints: 156000 },
      { championId: 78, championName: "Poppy", championLevel: 6, championPoints: 102000 },
      { championId: 58, championName: "Renekton", championLevel: 6, championPoints: 89000 },
      { championId: 126, championName: "Jayce", championLevel: 5, championPoints: 78000 },
      { championId: 91, championName: "Talon", championLevel: 5, championPoints: 72000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "BLT Reformed",
    tagLine: "BLT",
    lane: "JUNGLE/SUPPORT",
    team: "Indefinido",
    description: "Jungler e support versátil com grande versatilidade de campeões e excelente controle de objetivos. Conhecido por sua adaptabilidade.",
    currentRank: {
      tier: "Gold",
      rank: "IV",
      leaguePoints: 1350,
      wins: 40,
      losses: 30
    },
    summonerLevel: 145,
    championMasteries: [
      { championId: 64, championName: "Lee Sin", championLevel: 6, championPoints: 95000 },
      { championId: 412, championName: "Thresh", championLevel: 6, championPoints: 88000 },
      { championId: 106, championName: "Volibear", championLevel: 5, championPoints: 75000 },
      { championId: 117, championName: "Lulu", championLevel: 5, championPoints: 68000 },
      { championId: 121, championName: "Kha'Zix", championLevel: 5, championPoints: 62000 }
    ],
    lastUpdated: "2024-01-20"
  },
  {
    gameName: "Theushubu",
    tagLine: "ZoioO",
    lane: "TOP/JUNGLE",
    team: "Zeca e os Urubus",
    description: "Top laner e jungler versátil com excelente farm, posicionamento e timing de ganks. Conhecido por sua versatilidade entre as duas posições.",
    currentRank: {
      tier: "Silver",
      rank: "II",
      leaguePoints: 1200,
      wins: 44,
      losses: 38
    },
    summonerLevel: 138,
    championMasteries: [
      { championId: 78, championName: "Poppy", championLevel: 6, championPoints: 98000 },
      { championId: 64, championName: "Lee Sin", championLevel: 6, championPoints: 92000 },
      { championId: 23, championName: "Tryndamere", championLevel: 5, championPoints: 78000 },
      { championId: 106, championName: "Volibear", championLevel: 5, championPoints: 72000 },
      { championId: 58, championName: "Renekton", championLevel: 5, championPoints: 68000 }
    ],
    lastUpdated: "2024-01-20"
  }
];

// Função para buscar dados de um jogador específico
export function getPlayerState(gameName: string, tagLine: string): PlayerState | undefined {
  return playersState.find(
    player => player.gameName.toLowerCase() === gameName.toLowerCase() && 
    player.tagLine.toLowerCase() === tagLine.toLowerCase()
  );
}

// Função para obter estatísticas gerais dos jogadores
export function getPlayersStats() {
  const totalPlayers = playersState.length;
  const totalMasteryPoints = playersState.reduce((sum, player) => 
    sum + (player.championMasteries?.reduce((masterySum, mastery) => masterySum + mastery.championPoints, 0) || 0), 0
  );
  const averageLevel = playersState.reduce((sum, player) => sum + (player.summonerLevel || 0), 0) / totalPlayers;
  
  const rankDistribution = playersState.reduce((acc, player) => {
    const tier = player.currentRank?.tier || 'Unranked';
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalPlayers,
    totalMasteryPoints,
    averageLevel: Math.round(averageLevel),
    rankDistribution
  };
}
