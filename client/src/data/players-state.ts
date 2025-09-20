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
      tier: "Platinum",
      rank: "IV",
      leaguePoints: 13,
      wins: 30,
      losses: 31
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 27, championName: "Shaco", championLevel: 7, championPoints: 125000 },
      { championId: 157, championName: "Yasuo", championLevel: 6, championPoints: 89000 },
      { championId: 90, championName: "Malzahar", championLevel: 5, championPoints: 78000 }
    ],
    lastUpdated: "2025-01-20"
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
      leaguePoints: 39,
      wins: 18,
      losses: 24
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 20, championName: "Nunu", championLevel: 7, championPoints: 145000 },
      { championId: 222, championName: "Jinx", championLevel: 6, championPoints: 98000 },
      { championId: 9, championName: "Fiddlesticks", championLevel: 5, championPoints: 87000 }
    ],
    lastUpdated: "2025-01-20"
  },
  {
    gameName: "Beiço Reformed",
    tagLine: "Cold",
    lane: "ADC",
    team: "Indefinido",
    description: "ADC preciso com excelente posicionamento em teamfights e farm consistente. Conhecido por sua capacidade de carry em late game.",
    currentRank: {
      tier: "Platinum",
      rank: "IV",
      leaguePoints: 13,
      wins: 211,
      losses: 187
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 45, championName: "Veigar", championLevel: 7, championPoints: 132000 },
      { championId: 236, championName: "Lucian", championLevel: 6, championPoints: 95000 },
      { championId: 222, championName: "Jinx", championLevel: 5, championPoints: 82000 }
    ],
    lastUpdated: "2025-01-20"
  },
  {
    gameName: "AZR Aldeath",
    tagLine: "mond",
    lane: "MID/TOP",
    team: "Os Fimos",
    description: "Mid laner e top laner versátil com excelente controle de lane e versatilidade de campeões. Conhecido por sua adaptabilidade entre as duas posições.",
    currentRank: {
      tier: "Emerald",
      rank: "III",
      leaguePoints: 80,
      wins: 82,
      losses: 66
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 84, championName: "Akali", championLevel: 7, championPoints: 98000 },
      { championId: 202, championName: "Jhin", championLevel: 6, championPoints: 85000 },
      { championId: 555, championName: "Pyke", championLevel: 5, championPoints: 72000 }
    ],
    lastUpdated: "2025-01-20"
  },
  {
    gameName: "guizão rapidão",
    tagLine: "teco",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support versátil conhecido por suas jogadas criativas e excelente visão de jogo. Conhecido por suas jogadas inovadoras.",
    currentRank: {
      tier: "Silver",
      rank: "II",
      leaguePoints: 55,
      wins: 156,
      losses: 186
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 157, championName: "Yasuo", championLevel: 7, championPoints: 118000 },
      { championId: 236, championName: "Lucian", championLevel: 6, championPoints: 92000 },
      { championId: 238, championName: "Zed", championLevel: 5, championPoints: 85000 }
    ],
    lastUpdated: "2025-01-20"
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
      leaguePoints: 41,
      wins: 7,
      losses: 11
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 122, championName: "Darius", championLevel: 7, championPoints: 156000 },
      { championId: 157, championName: "Yasuo", championLevel: 6, championPoints: 102000 },
      { championId: 119, championName: "Draven", championLevel: 5, championPoints: 89000 }
    ],
    lastUpdated: "2025-01-20"
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
      { championId: 64, championName: "LeeSin", championLevel: 6, championPoints: 95000 },
      { championId: 412, championName: "Thresh", championLevel: 6, championPoints: 88000 },
      { championId: 106, championName: "Volibear", championLevel: 5, championPoints: 75000 }
    ],
    lastUpdated: "2025-01-20"
  },
  {
    gameName: "Theushubu",
    tagLine: "ZoioO",
    lane: "TOP/JUNGLE",
    team: "Zeca e os Urubus",
    description: "Top laner e jungler versátil com excelente farm, posicionamento e timing de ganks. Conhecido por sua versatilidade entre as duas posições.",
    currentRank: {
      tier: "Unranked",
      rank: "",
      leaguePoints: 0,
      wins: 0,
      losses: 0
    },
    summonerLevel: undefined,
    championMasteries: [
      { championId: 157, championName: "Yasuo", championLevel: 7, championPoints: 98000 },
      { championId: 122, championName: "Darius", championLevel: 6, championPoints: 92000 },
      { championId: 54, championName: "Malphite", championLevel: 5, championPoints: 78000 }
    ],
    lastUpdated: "2025-01-20"
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
