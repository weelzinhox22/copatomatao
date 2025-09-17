import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trophy, Target, Zap, ExternalLink } from "lucide-react";
import { useRiotPlayer, formatRank, getChampionImageUrl, getProfileIconUrl, getRankImageUrl } from "@/hooks/useRiotAPI";
import { useLocation } from "wouter";

export default function RiotPlayerCard() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const { data: playerData, isLoading, error } = useRiotPlayer(
    searchSubmitted ? gameName : "",
    searchSubmitted ? tagLine : ""
  );

  // Redirect to detailed page when player data is successfully loaded
  useEffect(() => {
    if (playerData && searchSubmitted) {
      const encodedGameName = encodeURIComponent(gameName);
      const encodedTagLine = encodeURIComponent(tagLine);
      setLocation(`/riot-player/${encodedGameName}/${encodedTagLine}`);
    }
  }, [playerData, searchSubmitted, gameName, tagLine, setLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName.trim() && tagLine.trim()) {
      setSearchSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-heading font-bold text-white mb-4 text-center neon-text">
            Buscar Jogador da Riot
          </h3>
          <div className="flex gap-4">
            <Input
              placeholder="Nome do jogo (ex: Hide on bush)"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400"
            />
            <Input
              placeholder="Tag (ex: KR1)"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400 w-32"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
              disabled={!gameName.trim() || !tagLine.trim()}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card p-8 rounded-xl text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Buscando dados do jogador...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="glass-card p-6 rounded-xl border-red-500/50">
          <p className="text-red-400 text-center">
            {error instanceof Error ? error.message : "Erro ao buscar jogador. Verifique o nome e tag e tente novamente."}
          </p>
          <div className="mt-4 text-center">
            <Button 
              onClick={() => {
                setSearchSubmitted(false);
                setGameName("");
                setTagLine("");
              }}
              variant="outline"
              className="text-red-400 border-red-400 hover:bg-red-400/10"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      )}

      {/* Player Data */}
      {playerData && (
        <div className="space-y-6">
          {/* Player Header */}
          <div className="glass-card p-6 rounded-xl glow-hover">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={getProfileIconUrl(playerData.summoner.profileIconId)}
                  alt="Profile Icon"
                  className="w-20 h-20 rounded-full border-2 border-primary"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {playerData.summoner.summonerLevel}
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-white neon-text">
                  {playerData.account.gameName}#{playerData.account.tagLine}
                </h2>
                <p className="text-gray-300 mb-2">
                  Level {playerData.summoner.summonerLevel}
                </p>
                
                {playerData.rank && (
                  <div className="flex items-center gap-2">
                    <img
                      src={getRankImageUrl(playerData.rank.tier)}
                      alt={playerData.rank.tier}
                      className="w-8 h-8"
                    />
                    <span className="text-yellow-400 font-semibold">
                      {formatRank(playerData.rank)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl text-center glow-hover">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white neon-text">
                {playerData.recentStats.winRate}
              </div>
              <div className="text-gray-400 text-sm">Taxa de Vitória</div>
            </div>

            <div className="glass-card p-4 rounded-xl text-center glow-hover">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white neon-text">
                {playerData.recentStats.kda}
              </div>
              <div className="text-gray-400 text-sm">KDA Médio</div>
            </div>

            <div className="glass-card p-4 rounded-xl text-center glow-hover">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white neon-text">
                {playerData.recentStats.totalGames}
              </div>
              <div className="text-gray-400 text-sm">Partidas Recentes</div>
            </div>
          </div>

          {/* Champion Masteries */}
          {playerData.championMasteries.length > 0 && (
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 neon-text">
                Campeões Principais
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {playerData.championMasteries.slice(0, 3).map((mastery, index) => (
                  <div key={mastery.championId} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Champion${mastery.championId}.png`}
                        alt={`Champion ${mastery.championId}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback se a imagem não carregar
                          (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Aatrox.png";
                        }}
                      />
                    </div>
                    <div className="text-white font-semibold text-sm">
                      Level {mastery.championLevel}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {mastery.championPoints.toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ranked Stats */}
          {playerData.rank && (
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 neon-text">
                Estatísticas Ranqueadas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {playerData.rank.wins}
                  </div>
                  <div className="text-gray-400 text-sm">Vitórias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {playerData.rank.losses}
                  </div>
                  <div className="text-gray-400 text-sm">Derrotas</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
