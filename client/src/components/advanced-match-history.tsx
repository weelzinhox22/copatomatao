import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Sword, 
  Shield, 
  Eye, 
  Coins, 
  Clock, 
  Target,
  ChevronDown,
  ChevronUp,
  Star,
  Zap
} from "lucide-react";
import { 
  getChampionImageUrl, 
  getItemImageUrl, 
  getSummonerSpellImageUrl,
  getQueueName,
  formatGameDuration,
  formatGold,
  formatDamage,
  calculatePerformanceScore
} from "@/hooks/useRiotAPI";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AdvancedMatchHistoryProps {
  matches: any[];
  isLoading?: boolean;
}

export default function AdvancedMatchHistory({ matches, isLoading }: AdvancedMatchHistoryProps) {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("recent");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-heading neon-text">Histórico de Partidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando histórico de partidas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!matches.length) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-heading neon-text">Histórico de Partidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhuma partida encontrada</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const toggleMatchDetails = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  const getPerformanceColor = (rankInTeam: number) => {
    switch (rankInTeam) {
      case 1: return "text-yellow-400"; // MVP
      case 2: return "text-green-400";
      case 3: return "text-blue-400";
      case 4: return "text-orange-400";
      case 5: return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getPerformanceIcon = (rankInTeam: number) => {
    switch (rankInTeam) {
      case 1: return <Trophy className="w-4 h-4" />;
      case 2: return <Star className="w-4 h-4" />;
      case 3: return <Target className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="glass-card glow-hover">
      <CardHeader>
        <CardTitle className="text-2xl font-heading neon-text text-glow-soft flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Histórico de Partidas
        </CardTitle>
        <p className="text-gray-400">
          {matches.length} partidas recentes • Análise detalhada de performance
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="ranked">Ranqueadas</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            {matches.map((match, index) => {
              const participant = match.participant;
              if (!participant) return null;
              
              const isExpanded = expandedMatch === match.matchId;
              const csPerMin = ((participant.totalMinionsKilled || 0) + (participant.neutralMinionsKilled || 0)) / (match.gameDuration / 60);
              const csPerMinFormatted = csPerMin.toFixed(1);
              
              return (
                <div key={match.matchId} className="glass-card rounded-lg overflow-hidden glow-hover">
                  {/* Match Summary */}
                  <div 
                    className={`p-4 cursor-pointer transition-all ${
                      participant.win 
                        ? 'border-l-4 border-green-400 bg-green-400/5' 
                        : 'border-l-4 border-red-400 bg-red-400/5'
                    }`}
                    onClick={() => {
                      setSelectedMatch(match);
                      toggleMatchDetails(match.matchId);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Champion Icon */}
                        <div className="relative">
                          <img
                            src={getChampionImageUrl(participant.championName)}
                            alt={participant.championName}
                            className="w-12 h-12 rounded-full border-2 border-white/20"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs px-1 rounded">
                            {participant.summonerLevel}
                          </div>
                        </div>

                        {/* Summoner Spells */}
                        <div className="flex flex-col gap-1">
                          <img
                            src={getSummonerSpellImageUrl(participant.summoner1Id)}
                            alt="Summoner Spell"
                            className="w-6 h-6 rounded"
                          />
                          <img
                            src={getSummonerSpellImageUrl(participant.summoner2Id)}
                            alt="Summoner Spell"
                            className="w-6 h-6 rounded"
                          />
                        </div>

                        {/* Items */}
                        <div className="flex items-center gap-1">
                          {(participant.items || []).slice(0, 6).map((itemId, idx) => (
                            <img
                              key={idx}
                              src={getItemImageUrl(itemId)}
                              alt="Item"
                              className="w-8 h-8 rounded border border-white/20"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1001.png"; // Default item
                              }}
                            />
                          ))}
                          {/* Ward/Trinket slot */}
                          <div className="w-8 h-8 rounded border border-white/20 bg-gray-800/50 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-purple-400" />
                          </div>
                          {(participant.items || []).length < 6 && (
                            <>
                              {Array.from({ length: 6 - (participant.items || []).length }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="w-8 h-8 rounded border border-white/20 bg-gray-800/50" />
                              ))}
                            </>
                          )}
                        </div>

                        {/* KDA */}
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {participant.kills}/{participant.deaths}/{participant.assists}
                          </div>
                          <div className={`text-sm font-semibold ${
                            parseFloat(participant.kda) >= 3 ? 'text-green-400' :
                            parseFloat(participant.kda) >= 2 ? 'text-yellow-400' :
                            parseFloat(participant.kda) >= 1 ? 'text-blue-400' : 'text-red-400'
                          }`}>
                            {participant.kda} KDA
                          </div>
                        </div>

                        {/* Performance Score */}
                        {(() => {
                          const performanceScore = calculatePerformanceScore(participant, match.allParticipants || []);
                          return (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className={`text-center ${performanceScore.color} cursor-help hover:scale-105 transition-transform`}>
                                    <div className="text-lg font-bold">
                                      {performanceScore.icon} {performanceScore.score}
                                    </div>
                                    <div className="text-xs font-medium">
                                      {performanceScore.title}
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <div className="text-sm">
                                    <div className="font-bold mb-1">{performanceScore.title}</div>
                                    <div className="text-gray-300">{performanceScore.description}</div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })()}

                        {/* Performance Rank */}
                        <div className={`text-center ${getPerformanceColor(participant.rankInTeam)}`}>
                          <div className="flex items-center justify-center gap-1">
                            {getPerformanceIcon(participant.rankInTeam)}
                            <span className="text-sm font-semibold">#{participant.rankInTeam}</span>
                          </div>
                          <div className="text-xs">no time</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={participant.win ? "default" : "destructive"}>
                            {participant.win ? "Vitória" : "Derrota"}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {getQueueName(match.queueId)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatGameDuration(match.gameDuration)} • {csPerMinFormatted} CS/min
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(match.gameCreation).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      <div className="ml-4">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 bg-black/20">
                      {/* Detailed Stats */}
                      <div className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="glass-card p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Coins className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-gray-400">Gold</span>
                            </div>
                            <div className="text-lg font-bold text-yellow-400">
                              {formatGold(participant.goldEarned || 0)}
                            </div>
                          </div>

                          <div className="glass-card p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Sword className="w-4 h-4 text-red-400" />
                              <span className="text-sm text-gray-400">Damage</span>
                            </div>
                            <div className="text-lg font-bold text-red-400">
                              {formatDamage(participant.totalDamageDealtToChampions || 0)}
                            </div>
                          </div>

                          <div className="glass-card p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Eye className="w-4 h-4 text-purple-400" />
                              <span className="text-sm text-gray-400">Vision</span>
                            </div>
                            <div className="text-lg font-bold text-purple-400">
                              {participant.visionScore || 0}
                            </div>
                          </div>

                          <div className="glass-card p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-gray-400">Farm</span>
                            </div>
                            <div className="text-lg font-bold text-green-400">
                              {(participant.totalMinionsKilled || 0) + (participant.neutralMinionsKilled || 0)}
                            </div>
                          </div>
                        </div>

                        {/* Wards Section */}
                        <div className="glass-card p-4 rounded-lg mb-4">
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-purple-400" />
                            Controle de Visão
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">
                                {participant.visionScore || 0}
                              </div>
                              <div className="text-sm text-gray-400">Vision Score</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-400">
                                {participant.wardsPlaced || 0}
                              </div>
                              <div className="text-sm text-gray-400">Wards Placed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400">
                                {participant.wardsKilled || 0}
                              </div>
                              <div className="text-sm text-gray-400">Wards Killed</div>
                            </div>
                          </div>
                        </div>

                        {/* Team Comparison */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white neon-text">Comparação da Partida</h4>
                          
                          {/* Team 1 */}
                          <div className="glass-card p-4 rounded-lg">
                            <h5 className="text-sm font-semibold text-blue-400 mb-3">
                              {match.allParticipants.filter((p: any) => p.teamId === 100)[0]?.teamId === participant.teamId ? 'Seu Time' : 'Time Inimigo'}
                              {match.allParticipants.some((p: any) => p.teamId === 100 && p.puuid === participant.puuid && participant.win) && ' (Vitória)'}
                              {match.allParticipants.some((p: any) => p.teamId === 100 && p.puuid === participant.puuid && !participant.win) && ' (Derrota)'}
                            </h5>
                            <div className="space-y-2">
                              {match.allParticipants
                                .filter((p: any) => p.teamId === 100)
                                .map((p: any, idx: number) => (
                                  <div key={idx} className={`flex items-center justify-between text-sm p-2 rounded ${
                                    p.puuid === participant.puuid ? 'bg-primary/20 border border-primary/50' : 'bg-white/5'
                                  }`}>
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={getChampionImageUrl(p.championName)}
                                        alt={p.championName}
                                        className="w-8 h-8 rounded-full"
                                      />
                                      <span className="text-white font-medium">
                                        {p.summonerName || 'Unknown'}
                                      </span>
                                      <span className="text-gray-400 text-xs">
                                        {p.teamPosition}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                      <span className="text-white">
                                        {p.kills}/{p.deaths}/{p.assists}
                                      </span>
                                      <span className="text-yellow-400">
                                        {formatGold(p.goldEarned || 0)}
                                      </span>
                                      <span className="text-red-400">
                                        {formatDamage(p.totalDamageDealtToChampions || 0)}
                                      </span>
                                      <span className="text-green-400">
                                        {p.totalMinionsKilled || 0} CS
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Team 2 */}
                          <div className="glass-card p-4 rounded-lg">
                            <h5 className="text-sm font-semibold text-red-400 mb-3">
                              {match.allParticipants.filter((p: any) => p.teamId === 200)[0]?.teamId === participant.teamId ? 'Seu Time' : 'Time Inimigo'}
                              {match.allParticipants.some((p: any) => p.teamId === 200 && p.puuid === participant.puuid && participant.win) && ' (Vitória)'}
                              {match.allParticipants.some((p: any) => p.teamId === 200 && p.puuid === participant.puuid && !participant.win) && ' (Derrota)'}
                            </h5>
                            <div className="space-y-2">
                              {match.allParticipants
                                .filter((p: any) => p.teamId === 200)
                                .map((p: any, idx: number) => (
                                  <div key={idx} className={`flex items-center justify-between text-sm p-2 rounded ${
                                    p.puuid === participant.puuid ? 'bg-primary/20 border border-primary/50' : 'bg-white/5'
                                  }`}>
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={getChampionImageUrl(p.championName)}
                                        alt={p.championName}
                                        className="w-8 h-8 rounded-full"
                                      />
                                      <span className="text-white font-medium">
                                        {p.summonerName || 'Unknown'}
                                      </span>
                                      <span className="text-gray-400 text-xs">
                                        {p.teamPosition}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                      <span className="text-white">
                                        {p.kills}/{p.deaths}/{p.assists}
                                      </span>
                                      <span className="text-yellow-400">
                                        {formatGold(p.goldEarned || 0)}
                                      </span>
                                      <span className="text-red-400">
                                        {formatDamage(p.totalDamageDealtToChampions || 0)}
                                      </span>
                                      <span className="text-green-400">
                                        {p.totalMinionsKilled || 0} CS
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </TabsContent>
          
          <TabsContent value="ranked" className="space-y-4">
            <div className="text-center py-8">
              <p className="text-gray-400">Filtro de partidas ranqueadas em desenvolvimento...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <div className="text-center py-8">
              <p className="text-gray-400">Estatísticas detalhadas em desenvolvimento...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Detalhes da Partida
                </h3>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {selectedMatch.participant && (
                <div className="space-y-6">
                  {/* Player Performance */}
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Sua Performance</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{selectedMatch.participant.kda}</div>
                        <div className="text-sm text-gray-400">KDA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{formatGold(selectedMatch.participant.goldEarned || 0)}</div>
                        <div className="text-sm text-gray-400">Ouro</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{formatDamage(selectedMatch.participant.totalDamageDealtToChampions || 0)}</div>
                        <div className="text-sm text-gray-400">Dano</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedMatch.participant.visionScore || 0}</div>
                        <div className="text-sm text-gray-400">Visão</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* All Participants */}
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Todos os Jogadores</h4>
                    
                    {/* Team 1 (Blue) */}
                    <div className="mb-6">
                      <h5 className="text-md font-semibold text-blue-400 mb-3">Equipe Azul</h5>
                      <div className="space-y-2">
                        {selectedMatch.allParticipants
                          ?.filter((p: any) => p.teamId === 100)
                          .map((p: any, index: number) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded ${
                              p.puuid === selectedMatch.participant?.puuid ? 'bg-primary/20 border border-primary/50' : 'bg-white/5'
                            }`}>
                              <div className="flex items-center gap-3">
                                <img
                                  src={getChampionImageUrl(p.championName)}
                                  alt={p.championName}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <div className="text-white font-medium">{p.summonerName}</div>
                                  <div className="text-gray-400 text-sm">{p.championName} • {p.teamPosition}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 text-sm">
                                <div className="text-center">
                                  <div className="text-white font-bold">{p.kills}/{p.deaths}/{p.assists}</div>
                                  <div className="text-gray-400 text-xs">KDA</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 font-bold">{formatGold(p.goldEarned || 0)}</div>
                                  <div className="text-gray-400 text-xs">Gold</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-red-400 font-bold">{formatDamage(p.totalDamageDealtToChampions || 0)}</div>
                                  <div className="text-gray-400 text-xs">Damage</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-green-400 font-bold">{p.totalMinionsKilled || 0}</div>
                                  <div className="text-gray-400 text-xs">CS</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-purple-400 font-bold">{p.visionScore || 0}</div>
                                  <div className="text-gray-400 text-xs">Vision</div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Team 2 (Red) */}
                    <div>
                      <h5 className="text-md font-semibold text-red-400 mb-3">Equipe Vermelha</h5>
                      <div className="space-y-2">
                        {selectedMatch.allParticipants
                          ?.filter((p: any) => p.teamId === 200)
                          .map((p: any, index: number) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded ${
                              p.puuid === selectedMatch.participant?.puuid ? 'bg-primary/20 border border-primary/50' : 'bg-white/5'
                            }`}>
                              <div className="flex items-center gap-3">
                                <img
                                  src={getChampionImageUrl(p.championName)}
                                  alt={p.championName}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <div className="text-white font-medium">{p.summonerName}</div>
                                  <div className="text-gray-400 text-sm">{p.championName} • {p.teamPosition}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 text-sm">
                                <div className="text-center">
                                  <div className="text-white font-bold">{p.kills}/{p.deaths}/{p.assists}</div>
                                  <div className="text-gray-400 text-xs">KDA</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 font-bold">{formatGold(p.goldEarned || 0)}</div>
                                  <div className="text-gray-400 text-xs">Gold</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-red-400 font-bold">{formatDamage(p.totalDamageDealtToChampions || 0)}</div>
                                  <div className="text-gray-400 text-xs">Damage</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-green-400 font-bold">{p.totalMinionsKilled || 0}</div>
                                  <div className="text-gray-400 text-xs">CS</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-purple-400 font-bold">{p.visionScore || 0}</div>
                                  <div className="text-gray-400 text-xs">Vision</div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
