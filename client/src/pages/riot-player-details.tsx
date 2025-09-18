import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Zap, Crown, Shield, Clock, RefreshCw, Star, Award, Flame, Sword } from "lucide-react";
import { Link } from "wouter";
import { useRiotPlayer, useRiotMatchesExpanded, formatRank, getChampionImageUrl, getProfileIconUrl, getRankImageUrl, formatGameDuration } from "@/hooks/useRiotAPI";
import AdvancedMatchHistory from "@/components/advanced-match-history";

export default function RiotPlayerDetails() {
  const [, params] = useRoute("/riot-player/:gameName/:tagLine");
  const gameName = params?.gameName ? decodeURIComponent(params.gameName) : "";
  const tagLine = params?.tagLine ? decodeURIComponent(params.tagLine) : "";
  
  const [activeTab, setActiveTab] = useState<'championship' | 'ranked'>('championship');

  const { data: playerData, isLoading, error, refetch: refetchPlayer } = useRiotPlayer(gameName, tagLine);
  const { data: matchHistory, isLoading: matchesLoading, refetch: refetchMatches } = useRiotMatchesExpanded(
    playerData?.account?.puuid || "", 
    20
  );

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
    await Promise.all([
      refetchPlayer(),
      refetchMatches()
    ]);
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
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro ao Carregar</h2>
          <p className="text-gray-300 mb-6">
            {error instanceof Error ? error.message : "Não foi possível carregar os dados do jogador."}
          </p>
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

        {/* Champion Masteries - TOPO */}
        <div className="mt-8">
          <Card className="glass-card glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-heading neon-text flex items-center gap-2">
                <Crown className="h-6 w-6" />
                Campeões Principais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {playerData.championMasteries.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {playerData.championMasteries.slice(0, 5).map((mastery, index) => (
                    <div key={mastery.championId} className="glass-card p-4 rounded-lg text-center hover:glow-soft transition-all duration-300">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20">
                        <img
                          src={getChampionImageUrl(mastery.championName || `Champion${mastery.championId}`)}
                          alt={mastery.championName || `Champion ${mastery.championId}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getChampionImageUrl("Aatrox");
                          }}
                        />
                      </div>
                      <div className="font-semibold text-white text-sm mb-1">
                        {mastery.championName || `Campeão ${mastery.championId}`}
                      </div>
                      <div className="text-xs text-gray-400">
                        Level {mastery.championLevel}
                      </div>
                      <div className="text-xs text-primary font-bold">
                        {mastery.championPoints.toLocaleString()} pts
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Nenhuma maestria encontrada
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8">
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('championship')}
              className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'championship' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="h-5 w-5 inline mr-2" />
              Copa Tomatão
            </button>
            <button 
              onClick={() => setActiveTab('ranked')}
              className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'ranked' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="h-5 w-5 inline mr-2" />
              Partidas Ranqueadas
            </button>
          </div>
        </div>

        {/* Copa Tomatão Section - DESTAQUE PRINCIPAL */}
        {activeTab === 'championship' && (
        <div className="mt-8">
          <Card className="glass-card glow-hover border-2 border-yellow-400/30">
            <CardHeader className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-t-xl">
              <CardTitle className="text-3xl font-heading neon-text flex items-center gap-3 text-center justify-center">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <span className="text-glow-medium">COPA TOMATÃO</span>
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
        )}

        {/* Partidas Ranqueadas Section */}
        {activeTab === 'ranked' && (
        <div className="mt-8">
          <Card className="glass-card glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-heading neon-text flex items-center gap-2">
                <Target className="h-6 w-6" />
                Histórico de Partidas Ranqueadas
              </CardTitle>
              <p className="text-gray-400">Partidas recentes do modo ranqueado</p>
            </CardHeader>
            <CardContent>
              <AdvancedMatchHistory 
                matches={matchHistory?.matches || []} 
                isLoading={matchesLoading}
              />
            </CardContent>
          </Card>
        </div>
        )}

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
