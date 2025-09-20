import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Zap, Crown, Shield, Clock, RefreshCw, Star, Award, Flame, Sword, Users, TrendingUp, Activity, Gamepad2, Medal, Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useRiotPlayer, formatRank, getChampionImageUrl, getProfileIconUrl, getRankImageUrl } from "@/hooks/useRiotAPI";
import { getPlayerState } from "@/data/players-state";

// Jogadores oficiais do campeonato Copa Tomatão
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

export default function RiotPlayerDetails() {
  const [, params] = useRoute("/riot-player/:gameName/:tagLine");
  const gameName = params?.gameName ? decodeURIComponent(params.gameName) : "";
  const tagLine = params?.tagLine ? decodeURIComponent(params.tagLine) : "";
  

  // Buscar dados do jogador na lista oficial
  const officialPlayerData = officialPlayers.find(
    player => player.gameName.toLowerCase() === gameName.toLowerCase() && 
    player.tagLine.toLowerCase() === tagLine.toLowerCase()
  );

  // Buscar dados estáticos do jogador
  const staticPlayerData = getPlayerState(gameName, tagLine);

  const { data: playerData, isLoading, error, refetch: refetchPlayer } = useRiotPlayer(gameName, tagLine);

  // Processar dados da API
  const soloQueueEntry = playerData?.leagueEntries?.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
  const rank = soloQueueEntry ? {
    tier: soloQueueEntry.tier,
    rank: soloQueueEntry.rank,
    leaguePoints: soloQueueEntry.leaguePoints,
    wins: soloQueueEntry.wins,
    losses: soloQueueEntry.losses
  } : null;
  
  const recentStats = playerData?.recentMatches?.length ? {
    totalGames: playerData.recentMatches.length,
    wins: playerData.recentMatches.filter((match: any) => match.info?.participants?.find((p: any) => p.puuid === playerData.account.puuid)?.win).length,
    kills: 0, // Será calculado das partidas
    deaths: 0, // Será calculado das partidas
    assists: 0, // Será calculado das partidas
    kda: "0.00",
    winRate: playerData.recentMatches.length > 0 ? 
      `${Math.round((playerData.recentMatches.filter((match: any) => match.info?.participants?.find((p: any) => p.puuid === playerData.account.puuid)?.win).length / playerData.recentMatches.length) * 100)}%` : 
      "0%"
  } : {
    totalGames: 0,
    wins: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: "0.00",
    winRate: "0%"
  };

  const handleRefresh = async () => {
    // Force refresh by invalidating cache
    await refetchPlayer();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Carregando dados do jogador...</h2>
          <p className="text-gray-400">Buscando informações da Riot Games</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-background via-gray-900 to-background">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/players">
              <Button variant="ghost" className="group hover:bg-white/10 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Voltar aos Jogadores
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Dados Offline</span>
              </div>
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Conectar
              </Button>
            </div>
          </div>

          {/* Hero Section - Player Profile */}
          <div className="mb-12">
            <div className="glass-card p-8 rounded-3xl glow-hover border border-white/10 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary to-transparent rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Player Avatar & Basic Info */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-5xl font-bold text-white">
                          {gameName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        OFICIAL
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-left">
                      <h1 className="text-5xl font-heading font-bold text-white mb-2">
                        <span className="neon-text text-glow-soft">{gameName}</span>
                      </h1>
                      <p className="text-2xl text-gray-300 mb-4">#{tagLine}</p>
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-lg">
                          {officialPlayerData?.lane || 'JOGADOR'}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30 px-4 py-2 text-lg">
                          {officialPlayerData?.team || 'COPA TOMATÃO'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Player Stats Grid */}
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="glass-card p-6 rounded-2xl text-center border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-400 mb-1">
                          {staticPlayerData?.currentRank ? `${staticPlayerData.currentRank.tier} ${staticPlayerData.currentRank.rank}` : 'Unranked'}
                        </div>
                        <div className="text-sm text-gray-400">Rank Atual</div>
                      </div>

                      <div className="glass-card p-6 rounded-2xl text-center border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {staticPlayerData?.summonerLevel || '?'}
                        </div>
                        <div className="text-sm text-gray-400">Nível</div>
                      </div>

                      <div className="glass-card p-6 rounded-2xl text-center border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          {staticPlayerData?.currentRank?.leaguePoints || 0}
                        </div>
                        <div className="text-sm text-gray-400">League Points</div>
                      </div>

                      <div className="glass-card p-6 rounded-2xl text-center border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {staticPlayerData?.currentRank ? `${staticPlayerData.currentRank.wins}W / ${staticPlayerData.currentRank.losses}L` : '0W / 0L'}
                        </div>
                        <div className="text-sm text-gray-400">Recorde</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Champion Masteries */}
            <div className="lg:col-span-2 space-y-8">
              {/* Champion Masteries */}
              {staticPlayerData?.championMasteries && (
                <Card className="glass-card glow-hover border border-white/10">
                  <CardHeader className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-t-xl">
                    <CardTitle className="text-3xl font-heading neon-text flex items-center justify-center gap-3">
                      <Crown className="h-8 w-8 text-yellow-400" />
                      Campeões Principais
                      <Crown className="h-8 w-8 text-yellow-400" />
                    </CardTitle>
                    <p className="text-center text-gray-300 text-lg">
                      Os campeões que este jogador mais domina
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex justify-center">
                      <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
                        {staticPlayerData.championMasteries.slice(0, 5).map((mastery, index) => (
                          <div key={mastery.championId} className="glass-card p-6 rounded-2xl text-center hover:glow-soft transition-all duration-300 group min-w-[180px] border border-white/10 hover:border-primary/30">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 shadow-lg group-hover:border-primary/50 transition-all duration-300">
                              <img
                                src={getChampionImageUrl(mastery.championName)}
                                alt={mastery.championName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = getChampionImageUrl("Aatrox");
                                }}
                              />
                            </div>
                            <div className="font-bold text-white text-lg mb-2">
                              {mastery.championName}
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                              Level {mastery.championLevel}
                            </div>
                            <div className="text-sm text-primary font-bold">
                              {mastery.championPoints.toLocaleString()} pts
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Player Information */}
              {officialPlayerData && (
                <Card className="glass-card glow-hover border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading neon-text flex items-center gap-3">
                      <Users className="h-6 w-6 text-blue-400" />
                      Informações do Jogador
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-card p-4 rounded-xl border border-blue-400/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                              <Gamepad2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white">Posição</span>
                          </div>
                          <p className="text-blue-400 text-lg font-bold">{officialPlayerData.lane}</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl border border-green-400/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white">Time</span>
                          </div>
                          <p className="text-green-400 text-lg font-bold">{officialPlayerData.team}</p>
                        </div>
                      </div>
                      <div className="glass-card p-6 rounded-xl border border-purple-400/20">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h5 className="text-lg font-bold text-white mb-2">Descrição</h5>
                            <p className="text-gray-300 text-lg leading-relaxed">{officialPlayerData.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Championship Info */}
            <div className="space-y-8">
              {/* Copa Tomatão Status */}
              <Card className="glass-card glow-hover border-2 border-yellow-400/30">
                <CardHeader className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-t-xl">
                  <CardTitle className="text-2xl font-heading neon-text flex items-center gap-3 text-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                    Copa Tomatão
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </CardTitle>
                  <p className="text-center text-gray-300">
                    Participante Oficial
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Medal className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white mb-2">{gameName}</div>
                      <div className="text-gray-300 mb-4">Jogador Oficial</div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30 px-4 py-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Participante Ativo
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Championship Stats */}
              <Card className="glass-card glow-hover border border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    Estatísticas do Campeonato
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="glass-card p-4 rounded-xl text-center border border-yellow-400/20">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">-</div>
                      <div className="text-sm text-gray-400">Partidas</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center border border-green-400/20">
                      <div className="text-3xl font-bold text-green-400 mb-1">-</div>
                      <div className="text-sm text-gray-400">Win Rate</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center border border-blue-400/20">
                      <div className="text-3xl font-bold text-blue-400 mb-1">-</div>
                      <div className="text-sm text-gray-400">Kills</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center border border-purple-400/20">
                      <div className="text-3xl font-bold text-purple-400 mb-1">-</div>
                      <div className="text-sm text-gray-400">Assists</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Championship Info */}
              <Card className="glass-card glow-hover border border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    Sobre o Campeonato
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Star className="w-3 h-3 text-black" />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Este jogador é um participante oficial da Copa Tomatão. 
                        Acompanhe seu desempenho nas partidas oficiais do campeonato.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        O campeonato está prestes a começar. 
                        Fique ligado para mais informações!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Jogador não encontrado</h2>
          <Link href="/players">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Jogadores
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Link href="/players">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar aos Jogadores
                </Button>
              </Link>
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Atualizar Dados
              </Button>
            </div>

          {/* Player Header Card */}
          <div className="glass-card p-8 rounded-xl glow-soft">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={getProfileIconUrl(playerData.summoner.profileIconId)}
                    alt="Profile Icon"
                    className="w-24 h-24 rounded-full border-4 border-primary glow-soft"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    {playerData.summoner.summonerLevel}
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    <span className="neon-text text-glow-soft">{playerData.account.gameName}</span>
                    <span className="text-gray-400">#{playerData.account.tagLine}</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-4">
                    Level {playerData.summoner.summonerLevel}
                  </p>
                  
                  {rank && (
                    <div className="flex items-center gap-3">
                      <img
                        src={getRankImageUrl(rank.tier)}
                        alt={rank.tier}
                        className="w-12 h-12"
                      />
                      <div>
                        <div className="text-yellow-400 font-bold text-lg">
                          {formatRank(rank)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {rank.wins}V / {rank.losses}D
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400">{recentStats.winRate}</div>
                <div className="text-sm text-gray-400">Taxa de Vitória</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{recentStats.kda}</div>
                <div className="text-sm text-gray-400">KDA Médio</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">{recentStats.totalGames}</div>
                <div className="text-sm text-gray-400">Partidas Recentes</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent">
                  {rank ? rank.leaguePoints : 0}
                </div>
                <div className="text-sm text-gray-400">League Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Champion Masteries - CENTRALIZADO */}
        <div className="mt-8">
          <Card className="glass-card glow-hover">
            <CardHeader>
              <CardTitle className="text-3xl font-heading neon-text flex items-center justify-center gap-3">
                <Crown className="h-8 w-8 text-yellow-400" />
                Campeões Principais
                <Crown className="h-8 w-8 text-yellow-400" />
              </CardTitle>
              <p className="text-center text-gray-300 text-lg">
                Os campeões que este jogador mais domina
              </p>
            </CardHeader>
            <CardContent>
              {playerData.championMasteries.length > 0 ? (
                <div className="flex justify-center">
                  <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
                    {playerData.championMasteries.slice(0, 5).map((mastery, index) => (
                      <div key={mastery.championId} className="glass-card p-6 rounded-xl text-center hover:glow-soft transition-all duration-300 group min-w-[200px]">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 shadow-lg group-hover:border-primary/50 transition-all duration-300">
                          <img
                            src={getChampionImageUrl(mastery.championName || `Champion${mastery.championId}`)}
                            alt={mastery.championName || `Champion ${mastery.championId}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getChampionImageUrl("Aatrox");
                            }}
                          />
                        </div>
                        <div className="font-bold text-white text-lg mb-2">
                          {mastery.championName || `Campeão ${mastery.championId}`}
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                          Level {mastery.championLevel}
                        </div>
                        <div className="text-sm text-primary font-bold">
                          {mastery.championPoints.toLocaleString()} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg">
                    Nenhuma maestria encontrada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>


        {/* Copa Tomatão Section - DESTAQUE PRINCIPAL */}
        <div className="mt-8">
          <Card className="glass-card glow-hover border-2 border-yellow-400/30">
            <CardHeader className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-t-xl">
              <CardTitle className="text-3xl font-heading neon-text flex items-center gap-3 text-center justify-center">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <span className="text-white font-bold">Copa Tomatão</span>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </CardTitle>
              <p className="text-center text-gray-300 text-lg">
                Histórico Oficial do Campeonato
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Championship Stats - Destaque */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center glass-card p-6 rounded-xl border border-yellow-400/30">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      0
                    </div>
                    <div className="text-lg text-gray-300 font-semibold">Partidas</div>
                    <div className="text-sm text-gray-400">no Campeonato</div>
                  </div>
                  <div className="text-center glass-card p-6 rounded-xl border border-green-400/30">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      0%
                    </div>
                    <div className="text-lg text-gray-300 font-semibold">Win Rate</div>
                    <div className="text-sm text-gray-400">Copa Tomatão</div>
                  </div>
                  <div className="text-center glass-card p-6 rounded-xl border border-blue-400/30">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      0
                    </div>
                    <div className="text-lg text-gray-300 font-semibold">Kills</div>
                    <div className="text-sm text-gray-400">Total</div>
                  </div>
                  <div className="text-center glass-card p-6 rounded-xl border border-purple-400/30">
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      0
                    </div>
                    <div className="text-lg text-gray-300 font-semibold">Assists</div>
                    <div className="text-sm text-gray-400">Total</div>
                  </div>
                </div>

                {/* Championship Matches - Destaque */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white mb-6 text-center">Partidas do Campeonato</h4>
                  
                  {/* Campeonato em breve */}
                  <div className="glass-card p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white mb-2">Copa Tomatão</div>
                        <div className="text-lg text-gray-300 mb-2">Campeonato em breve</div>
                        <div className="text-sm text-gray-400">As partidas serão anunciadas em breve</div>
                      </div>
                      <div className="mt-4">
                        <div className="text-lg text-yellow-400 font-bold">Aguardando início</div>
                        <div className="text-sm text-gray-400">Fique ligado para mais informações</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Championship Info - Destaque */}
                <div className="mt-8 p-6 glass-card rounded-xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-white mb-2">Sobre o Campeonato</h5>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        A Copa Tomatão está prestes a começar! O histórico completo das partidas do jogador 
                        será exibido aqui conforme o campeonato for sendo disputado. Esta é a seção principal 
                        do perfil, onde você acompanhará todo o desempenho no campeonato oficial.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Sidebar - Estatísticas Gerais */}
        <div className="mt-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Estatísticas Ranqueadas */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Estatísticas Ranqueadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rank ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={getRankImageUrl(rank.tier)}
                        alt={rank.tier}
                        className="w-16 h-16"
                      />
                      <div>
                        <div className="text-yellow-400 font-bold text-xl">
                          {formatRank(rank)}
                        </div>
                        <div className="text-gray-400">
                          {rank.wins}V / {rank.losses}D
                        </div>
                        <div className="text-sm text-gray-500">
                          {rank.leaguePoints} LP
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    Dados de rank não disponíveis
                  </p>
                )}
              </CardContent>
            </Card>

            {/* General Stats */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">KDA Médio:</span>
                    <span className="text-primary font-semibold">
                      {recentStats.kda}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxa de Vitória:</span>
                    <span className="text-green-400 font-semibold">
                      {recentStats.winRate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Partidas Analisadas:</span>
                    <span className="text-white font-semibold">
                      {recentStats.totalGames}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kills Médias:</span>
                    <span className="text-white font-semibold">
                      {recentStats.totalGames > 0 
                        ? (recentStats.kills / recentStats.totalGames).toFixed(1)
                        : "0"
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
