import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Clock, Users, Play, Star, Target, Zap, Shield, Crown, Award, TrendingUp } from "lucide-react";

// Dados dos times com logos
const teams = [
  {
    id: 1,
    name: "Zeca e os Urubus",
    logo: "/src/assets/logo (1).png",
    captain: "Theushubu",
    color: "from-green-500 to-emerald-500",
    players: ["Theushubu", "Player2", "Player3", "Player4", "Player5"],
    wins: 0,
    losses: 0
  },
  {
    id: 2,
    name: "Kongs do Atlântico",
    logo: "/src/assets/logo (2).png",
    captain: "LDates",
    color: "from-blue-500 to-cyan-500",
    players: ["LDates", "Player2", "Player3", "Player4", "Player5"],
    wins: 0,
    losses: 0
  },
  {
    id: 3,
    name: "Os Fimos",
    logo: "/src/assets/logo (3).png",
    captain: "AZR Aldeath",
    color: "from-purple-500 to-pink-500",
    players: ["AZR Aldeath", "Player2", "Player3", "Player4", "Player5"],
    wins: 0,
    losses: 0
  },
  {
    id: 4,
    name: "Te Fizguei",
    logo: "/src/assets/logo (4).png",
    captain: "Jamalzeralol",
    color: "from-orange-500 to-red-500",
    players: ["welziinho", "Beiço Reformed", "guizão rapidão", "SOU A GUILHOTINA", "BLT Reformed"],
    wins: 0,
    losses: 0
  }
];

// Dados das partidas (simuladas) - Formato: Sorteio de oponentes
const matches = [
  {
    id: 1,
    phase: "first_round",
    team1: teams[0], // Zeca e os Urubus
    team2: teams[1], // Kongs do Atlântico
    score1: 2,
    score2: 1,
    status: "completed",
    date: "2025-09-25T19:00:00Z",
    duration: "45:32"
  },
  {
    id: 2,
    phase: "first_round",
    team1: teams[2], // Os Fimos
    team2: teams[3], // Te Fizguei
    score1: 1,
    score2: 2,
    status: "completed",
    date: "2025-09-26T19:00:00Z",
    duration: "38:15"
  },
  {
    id: 3,
    phase: "winners_final",
    team1: teams[0], // Zeca e os Urubus (vencedor partida 1)
    team2: teams[3], // Te Fizguei (vencedor partida 2)
    score1: 0,
    score2: 0,
    status: "scheduled",
    date: "2025-09-28T20:00:00Z",
    duration: "TBD"
  },
  {
    id: 4,
    phase: "second_place_final",
    team1: teams[1], // Kongs do Atlântico (segundo lugar partida 1)
    team2: teams[2], // Os Fimos (segundo lugar partida 2)
    score1: 0,
    score2: 0,
    status: "scheduled",
    date: "2025-09-29T19:00:00Z",
    duration: "TBD"
  }
];

export default function Tournament() {
  const [currentPhase, setCurrentPhase] = useState("semifinal");
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getPhaseMatches = (phase: string) => {
    return matches.filter(match => match.phase === phase);
  };

  const getWinner = (match: any) => {
    if (match.status !== "completed") return null;
    return match.score1 > match.score2 ? match.team1 : match.team2;
  };

  const firstRoundMatches = getPhaseMatches("first_round");
  const winnersFinalMatch = getPhaseMatches("winners_final")[0];
  const secondPlaceFinalMatch = getPhaseMatches("second_place_final")[0];

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold neon-text text-glow-soft">
              COPA TOMATÃO
          </h1>
            <Trophy className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O maior campeonato de League of Legends da comunidade! Acompanhe todas as informações, 
            resultados e o chaveamento oficial do torneio.
          </p>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="glass-card p-6 rounded-xl text-center border border-yellow-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">4</div>
            <div className="text-sm text-gray-400">Times Participantes</div>
              </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-blue-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">20</div>
            <div className="text-sm text-gray-400">Jogadores Totais</div>
              </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-green-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">3</div>
            <div className="text-sm text-gray-400">Partidas Jogadas</div>
              </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-purple-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">28/09</div>
            <div className="text-sm text-gray-400">Próxima Partida</div>
              </div>
        </div>

        {/* Tournament Bracket */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold neon-text text-glow-soft mb-4">
              CHAVEAMENTO OFICIAL
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Acompanhe o progresso do torneio com nosso chaveamento interativo
            </p>
          </div>

          <div className="relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            {/* Bracket Container */}
            <div className="relative z-10 glass-card p-8 rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Primeira Rodada */}
                <div className="space-y-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">PRIMEIRA RODADA</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto rounded-full"></div>
                  </div>
                  
                  {firstRoundMatches.map((match, index) => (
                    <div key={match.id} className="relative">
                      {/* Match Card */}
                      <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className={`${
                            match.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                            match.status === "live" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                            "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }`}>
                            {match.status === "completed" ? "FINALIZADA" :
                             match.status === "live" ? "AO VIVO" : "AGENDADA"}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {new Date(match.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        {/* Teams */}
                        <div className="space-y-4">
                          {/* Team 1 */}
                          <div className={`flex items-center gap-4 p-3 rounded-lg ${
                            getWinner(match)?.id === match.team1.id ? "bg-green-500/10 border border-green-500/30" : "bg-white/5"
                          }`}>
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={match.team1.logo}
                                  alt={`${match.team1.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                              {getWinner(match)?.id === match.team1.id && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{match.team1.name}</h4>
                              <p className="text-sm text-gray-400">{match.team1.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{match.score1}</div>
                          </div>

                          {/* VS */}
                          <div className="text-center text-gray-400 font-bold">VS</div>

                          {/* Team 2 */}
                          <div className={`flex items-center gap-4 p-3 rounded-lg ${
                            getWinner(match)?.id === match.team2.id ? "bg-green-500/10 border border-green-500/30" : "bg-white/5"
                          }`}>
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={match.team2.logo}
                                  alt={`${match.team2.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                              {getWinner(match)?.id === match.team2.id && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{match.team2.name}</h4>
                              <p className="text-sm text-gray-400">{match.team2.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{match.score2}</div>
                          </div>
                        </div>

                        {/* Match Duration */}
                        {match.status === "completed" && (
                          <div className="mt-4 text-center">
                            <span className="text-sm text-gray-400">Duração: {match.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Animated Arrow */}
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                        <div className={`w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center ${
                          animationPhase >= index + 1 ? "animate-pulse" : "opacity-50"
                        }`}>
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Finais */}
                <div className="space-y-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">FINAIS</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
                  </div>

                  {/* Final dos Vencedores */}
                  {winnersFinalMatch && (
                    <div className="relative">
                      <div className="glass-card p-6 rounded-xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            FINAL DOS VENCEDORES
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {new Date(winnersFinalMatch.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        {/* Teams */}
                        <div className="space-y-4">
                          {/* Team 1 */}
                          <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={winnersFinalMatch.team1.logo}
                                  alt={`${winnersFinalMatch.team1.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{winnersFinalMatch.team1.name}</h4>
                              <p className="text-sm text-gray-400">{winnersFinalMatch.team1.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{winnersFinalMatch.score1}</div>
                          </div>

                          {/* VS */}
                          <div className="text-center text-yellow-400 font-bold">VS</div>

                          {/* Team 2 */}
                          <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={winnersFinalMatch.team2.logo}
                                  alt={`${winnersFinalMatch.team2.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{winnersFinalMatch.team2.name}</h4>
                              <p className="text-sm text-gray-400">{winnersFinalMatch.team2.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{winnersFinalMatch.score2}</div>
                          </div>
                        </div>

                        {/* Match Status */}
                        <div className="mt-4 text-center">
                          <div className="glass-card p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
                            <h4 className="font-bold text-yellow-400 mb-1">FINAL DOS VENCEDORES</h4>
                            <p className="text-sm text-gray-300">
                              {winnersFinalMatch.status === "scheduled" 
                                ? "Aguardando início da partida"
                                : "Partida em andamento"
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Animated Arrow */}
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                        <div className={`w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center ${
                          animationPhase >= 2 ? "animate-pulse" : "opacity-50"
                        }`}>
                          <Crown className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final dos Times em Segundo Lugar */}
                  {secondPlaceFinalMatch && (
                    <div className="relative">
                      <div className="glass-card p-6 rounded-xl border border-gray-400/30 hover:border-gray-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                            FINAL DOS TIMES EM SEGUNDO LUGAR
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {new Date(secondPlaceFinalMatch.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        {/* Teams */}
                        <div className="space-y-4">
                          {/* Team 1 */}
                          <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={secondPlaceFinalMatch.team1.logo}
                                  alt={`${secondPlaceFinalMatch.team1.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{secondPlaceFinalMatch.team1.name}</h4>
                              <p className="text-sm text-gray-400">{secondPlaceFinalMatch.team1.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{secondPlaceFinalMatch.score1}</div>
                          </div>

                          {/* VS */}
                          <div className="text-center text-gray-400 font-bold">VS</div>

                          {/* Team 2 */}
                          <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/10 rounded-full p-2 border-2 border-white/20">
                                <img
                                  src={secondPlaceFinalMatch.team2.logo}
                                  alt={`${secondPlaceFinalMatch.team2.name} Logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{secondPlaceFinalMatch.team2.name}</h4>
                              <p className="text-sm text-gray-400">{secondPlaceFinalMatch.team2.captain}</p>
                            </div>
                            <div className="text-2xl font-bold text-white">{secondPlaceFinalMatch.score2}</div>
                          </div>
                        </div>

                        {/* Match Status */}
                        <div className="mt-4 text-center">
                          <div className="glass-card p-3 rounded-lg bg-gray-400/10 border border-gray-400/30">
                            <h4 className="font-bold text-gray-400 mb-1">FINAL DOS TIMES EM SEGUNDO LUGAR</h4>
                            <p className="text-sm text-gray-300">
                              {secondPlaceFinalMatch.status === "scheduled" 
                                ? "Aguardando início da partida"
                                : "Partida em andamento"
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Trophy */}
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative">
                      <div className={`w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl ${
                        animationPhase >= 3 ? "animate-pulse" : "opacity-50"
                      }`}>
                        <Trophy className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-spin-slow"></div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mt-4">CAMPEÃO</h3>
                    <p className="text-sm text-gray-400">A ser definido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Information */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Format */}
          <Card className="glass-card glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-heading neon-text flex items-center gap-2">
                <Target className="h-6 w-6" />
                Formato do Torneio
              </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Sorteio de Oponentes</h4>
                    <p className="text-sm text-gray-400">4 times sorteados em 2 partidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Vencedores vs Vencedores</h4>
                    <p className="text-sm text-gray-400">Os que ganharam jogam entre si</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Times em Segundo vs Times em Segundo</h4>
                    <p className="text-sm text-gray-400">Os que ficaram em segundo lugar jogam entre si</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Campeão dos Vencedores</h4>
                    <p className="text-sm text-gray-400">Vencedor da final dos vencedores é o campeão</p>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>

          {/* Schedule */}
          <Card className="glass-card glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-heading neon-text flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Cronograma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Partida 1</h4>
                    <p className="text-sm text-gray-400">Zeca e os Urubus vs Kongs do Atlântico</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">FINALIZADA</div>
                    <div className="text-xs text-gray-400">25/09/2025</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Partida 2</h4>
                    <p className="text-sm text-gray-400">Os Fimos vs Te Fizguei</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">FINALIZADA</div>
                    <div className="text-xs text-gray-400">26/09/2025</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Final dos Vencedores</h4>
                    <p className="text-sm text-gray-400">Zeca e os Urubus vs Te Fizguei</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-yellow-400">AGENDADA</div>
                    <div className="text-xs text-gray-400">28/09/2025</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Final dos Times em Segundo Lugar</h4>
                    <p className="text-sm text-gray-400">Kongs do Atlântico vs Os Fimos</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-400">AGENDADA</div>
                    <div className="text-xs text-gray-400">29/09/2025</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prize Pool */}
        <div className="text-center mb-16">
          <Card className="glass-card glow-hover max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-heading neon-text text-glow-soft">
                🏆 PREMIAÇÃO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-xl border border-yellow-400/30">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-2xl font-bold text-white">1º Lugar</h3>
                  </div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">Título de Campeão</div>
                  <p className="text-gray-300">Reconhecimento eterno na comunidade Copa Tomatão</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-xl text-center">
                    <Award className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white">2º Lugar</h4>
                    <p className="text-sm text-gray-400">Vice-campeão</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <Star className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white">3º-4º Lugar</h4>
                    <p className="text-sm text-gray-400">Semifinalistas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card max-w-3xl mx-auto p-8 rounded-2xl glow-hover border border-white/10">
            <h3 className="text-3xl font-heading font-bold mb-4 neon-text text-glow-soft">
              Não Perca as Finais!
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              As finais da Copa Tomatão acontecem em breve! Acompanhe ao vivo a final dos vencedores e dos times em segundo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft">
                <Play className="mr-2 h-5 w-5" />
                Assistir ao Vivo
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 glow-hover px-8 py-4 text-lg font-semibold">
                <Calendar className="mr-2 h-5 w-5" />
                Ver Cronograma
              </Button>
            </div>
          </div>
        </div>
      </div>
          </div>
  );
}