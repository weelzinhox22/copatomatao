import React from "react";
import { Button } from "@/components/ui/button";
import { User, Search, ExternalLink, Trophy, Crown, Star, Target, Zap, Shield, Flame, Award, TrendingUp, Share2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import AnimatedInfographic from "@/components/animated-infographic";
// import RiotPlayerCard from "@/components/riot-player-card";
import { useRiotPlayer } from "@/hooks/useRiotAPI";
import { getPlayerState } from "@/data/players-state";
import ShareCardGenerator from "@/components/share-card-generator";
import { useShareCard, createPlayerCard } from "@/hooks/useShareCard";


// Jogadores oficiais do campeonato Copa Tomatão (apenas os que existem)
const officialPlayers = [
  {
    gameName: "welziinho",
    tagLine: "wel",
    lane: "MID/JUNGLE",
    team: "Indefinido",
    description: "Mid laner e jungler versátil com excelente controle de wave, roaming e timing de ganks. Conhecido por sua adaptabilidade entre as duas posições."
  },
  {
    gameName: "LDates",
    tagLine: "BR1", 
    lane: "JUNGLE",
    team: "Kongs do Atlântico",
    description: "Jungler experiente com excelente controle de objetivos e timing de ganks. Conhecido por suas decisões estratégicas em momentos cruciais."
  },
  {
    gameName: "Beiço Reformed",
    tagLine: "Cold",
    lane: "ADC",
    team: "Indefinido", 
    description: "ADC preciso com excelente posicionamento em teamfights e farm consistente. Conhecido por sua capacidade de carry em late game."
  },
  {
    gameName: "AZR Aldeath",
    tagLine: "mond",
    lane: "MID/TOP",
    team: "Os Fimos",
    description: "Mid laner e top laner versátil com excelente controle de lane e versatilidade de campeões. Conhecido por sua adaptabilidade entre as duas posições."
  },
  {
    gameName: "guizão rapidão",
    tagLine: "teco",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support versátil conhecido por suas jogadas criativas e excelente visão de jogo. Conhecido por suas jogadas inovadoras."
  },
  {
    gameName: "SOU A GUILHOTINA",
    tagLine: "00000",
    lane: "TOP",
    team: "Indefinido",
    description: "Top laner dominante com estilo de jogo agressivo e excelente controle de wave. Conhecido por suas jogadas ousadas e carry potential."
  },
  {
    gameName: "BLT Reformed",
    tagLine: "BLT",
    lane: "JUNGLE/SUPPORT",
    team: "Indefinido",
    description: "Jungler e support versátil com grande versatilidade de campeões e excelente controle de objetivos. Conhecido por sua adaptabilidade."
  },
  {
    gameName: "Theushubu",
    tagLine: "ZoioO",
    lane: "TOP/JUNGLE",
    team: "Zeca e os Urubus",
    description: "Top laner e jungler versátil com excelente farm, posicionamento e timing de ganks. Conhecido por sua versatilidade entre as duas posições."
  }
];


// Componente para exibir jogador oficial - VERSÃO MELHORADA
function OfficialPlayerCard({ player }: { player: typeof officialPlayers[0] }) {
  const { data: playerData, isLoading, error } = useRiotPlayer(player.gameName, player.tagLine);
  const staticPlayerData = getPlayerState(player.gameName, player.tagLine);

  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-2xl glow-hover animate-pulse relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-700 rounded-full w-16"></div>
              <div className="h-6 bg-gray-700 rounded-full w-20"></div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 space-y-2 mb-6">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
        
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
          <div className="h-16 bg-gray-700 rounded-xl"></div>
          <div className="h-16 bg-gray-700 rounded-xl"></div>
        </div>
        
        <div className="relative z-10 flex gap-2 mb-6">
          <div className="h-8 bg-gray-700 rounded-lg w-20"></div>
          <div className="h-8 bg-gray-700 rounded-lg w-16"></div>
          <div className="h-8 bg-gray-700 rounded-lg w-18"></div>
        </div>
        
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  // Usar dados estáticos quando API estiver offline
  const displayData = error ? staticPlayerData : null;
  const rank = displayData?.currentRank || (playerData?.leagueEntries?.find(entry => entry.queueType === 'RANKED_SOLO_5x5') ? {
    tier: playerData.leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')?.tier,
    rank: playerData.leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')?.rank,
    leaguePoints: playerData.leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')?.leaguePoints,
    wins: playerData.leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')?.wins,
    losses: playerData.leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')?.losses
  } : null);

  const summonerLevel = displayData?.summonerLevel || (playerData as any)?.summonerLevel;
  const championMasteries = displayData?.championMasteries || playerData?.championMasteries || [];

  return (
    <Link href={`/riot-player/${player.gameName}/${player.tagLine}`}>
      <div className="glass-card p-8 rounded-2xl glow-hover hover:glow-medium transition-all duration-500 group cursor-pointer border border-white/10 hover:border-primary/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header do Card */}
        <div className="relative z-10 flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl border-4 border-white/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-2xl font-bold text-white">
                {player.gameName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <Trophy className="w-3 h-3" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white truncate mb-1 group-hover:text-primary transition-colors">
              {player.gameName}
            </h3>
            <p className="text-lg text-gray-300 mb-2">#{player.tagLine}</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold border border-primary/30">
                {player.lane}
              </div>
              <div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-semibold border border-secondary/30">
                {player.team}
              </div>
            </div>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity group-hover:scale-110 transition-transform">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Descrição */}
        <div className="relative z-10 mb-6">
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {player.description}
          </p>
        </div>

        {/* Estatísticas Principais */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card p-4 rounded-xl text-center border border-white/10 hover:border-primary/30 transition-all group-hover:scale-105">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-400">Rank</span>
            </div>
            <div className="text-xl font-bold text-primary">
              {rank ? `${rank.tier} ${rank.rank}` : 'Unranked'}
            </div>
            {rank && (
              <div className="text-xs text-gray-500">{rank.leaguePoints} LP</div>
            )}
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center border border-white/10 hover:border-blue-400/30 transition-all group-hover:scale-105">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-gray-400">Nível</span>
            </div>
            <div className="text-xl font-bold text-blue-400">
              {summonerLevel || '?'}
            </div>
          </div>
        </div>

        {/* Campeões Principais */}
        {championMasteries.length > 0 && (
          <div className="relative z-10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-gray-400">Campeões Principais</span>
            </div>
            <div className="flex gap-2">
              {championMasteries.slice(0, 3).map((mastery, index) => (
                <div key={mastery.championId} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all group-hover:scale-105">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {mastery.championLevel}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {mastery.championName}
                  </span>
                </div>
              ))}
              {championMasteries.length > 3 && (
                <div className="flex items-center justify-center bg-white/5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
                  <span className="text-xs font-semibold text-gray-400">
                    +{championMasteries.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Estatísticas Adicionais */}
        {rank && (
          <div className="relative z-10 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 rounded-lg text-center border border-white/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-gray-400">Wins</span>
                </div>
                <div className="text-lg font-bold text-green-400">{rank.wins}</div>
              </div>
              <div className="glass-card p-3 rounded-lg text-center border border-white/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-gray-400">Losses</span>
                </div>
                <div className="text-lg font-bold text-red-400">{rank.losses}</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Participante Oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Copa Tomatão</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Players() {
  const { data: user } = useAuth();
  const { isOpen, cardData, openShareCard, closeShareCard } = useShareCard();

  const handleSharePlayer = (player: typeof officialPlayers[0]) => {
    const playerCardData = createPlayerCard({
      gameName: player.gameName,
      tagLine: player.tagLine,
      team: player.team,
      lane: player.lane,
      rank: "Unranked", // Poderia vir da API
      level: 100 // Poderia vir da API
    });
    openShareCard(playerCardData);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Simplificado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 neon-text text-glow-soft">
            Jogadores da Copa Tomatão
          </h1>
                    </div>


        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white neon-text mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Jogadores Oficiais ({officialPlayers.length})
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Os jogadores oficiais do campeonato com dados atualizados da API da Riot Games
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
            {officialPlayers.map((player, index) => (
              <OfficialPlayerCard key={`${player.gameName}-${player.tagLine}`} player={player} />
            ))}
          </div>
        </div>

        {/* Estatísticas do Campeonato */}
        <div className="mb-16">
          <AnimatedInfographic />
        </div>

        {/* Call to Action */}
        {user && (user as any)?.role !== "player" && (
          <div className="mt-16 text-center">
            <div className="glass-card max-w-2xl mx-auto p-8 rounded-xl glow-hover">
              <h3 className="text-2xl font-heading font-bold mb-4 neon-text" data-testid="text-join-players-title">
                Junte-se aos Jogadores
                </h3>
              <p className="text-gray-300 mb-6">
                Cadastre-se como jogador e participe do maior campeonato de League of Legends da comunidade.
                </p>
                <Link href="/register" data-testid="link-join-players">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 glow-soft">
                    <User className="mr-2 h-5 w-5" />
                    Cadastrar como Jogador
                  </Button>
                </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Share Card Generator Modal */}
      {isOpen && cardData && (
        <ShareCardGenerator 
          data={cardData} 
          onClose={closeShareCard}
        />
      )}
    </div>
  );
}
