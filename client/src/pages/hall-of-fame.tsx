import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Star, Award, Medal, Target, Zap, Shield, Calendar, Users, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Dados dos campeões (simulados para demonstração)
const champions = [
  {
    id: 1,
    season: "Copa Tomatão 2025",
    champion: {
      name: "Zeca e os Urubus",
      logo: "/src/assets/logo (1).png",
      captain: "Theushubu",
      players: ["Theushubu", "Player2", "Player3", "Player4", "Player5"],
      color: "from-green-500 to-emerald-500"
    },
    runnerUp: {
      name: "Te Fizguei",
      logo: "/src/assets/logo (4).png",
      captain: "Jamalzeralol",
      players: ["welziinho", "Beiço Reformed", "guizão rapidão", "SOU A GUILHOTINA", "BLT Reformed"],
      color: "from-orange-500 to-red-500"
    },
    finalScore: "3-1",
    date: "2025-09-28T20:00:00Z",
    duration: "2h 15min",
    mvp: "Theushubu",
    highlights: [
      "Pentakill épico do Ashe na teamfight final",
      "Engage perfeito do Shen no Barão",
      "Comeback histórico de 10k de ouro"
    ],
    stats: {
      totalKills: 45,
      totalDeaths: 32,
      totalAssists: 78,
      dragons: 4,
      barons: 2,
      towers: 8
    }
  }
];

// Dados dos times em segundo lugar
const secondPlaceTeams = [
  {
    id: 1,
    season: "Copa Tomatão 2025",
    team: {
      name: "Te Fizguei",
      logo: "/src/assets/logo (4).png",
      captain: "Jamalzeralol",
      players: ["welziinho", "Beiço Reformed", "guizão rapidão", "SOU A GUILHOTINA", "BLT Reformed"],
      color: "from-orange-500 to-red-500"
    },
    opponent: "Zeca e os Urubus",
    score: "1-3",
    date: "2025-09-28T20:00:00Z",
    achievements: [
      "Melhor early game do torneio",
      "Maior número de kills em uma partida",
      "Estratégias inovadoras"
    ]
  }
];

// Dados dos times em terceiro lugar
const thirdPlaceTeams = [
  {
    id: 1,
    season: "Copa Tomatão 2025",
    team: {
      name: "Kongs do Atlântico",
      logo: "/src/assets/logo (2).png",
      captain: "LDates",
      players: ["LDates", "Player2", "Player3", "Player4", "Player5"],
      color: "from-blue-500 to-cyan-500"
    },
    opponent: "Os Fimos",
    score: "2-1",
    date: "2025-09-29T19:00:00Z",
    achievements: [
      "Melhor controle de objetivos",
      "Jogadas mais criativas",
      "Espírito esportivo exemplar"
    ]
  }
];

export default function HallOfFame() {
  const [selectedChampion, setSelectedChampion] = useState(champions[0]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-heading font-bold neon-text text-glow-soft">
              HALL DOS VENCEDORES
            </h1>
            <Crown className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O lugar onde os grandes campeões da Copa Tomatão são eternizados. 
            Conheça os times que fizeram história e conquistaram a glória eterna.
          </p>
          <Link href="/">
            <Button variant="ghost" className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
        </div>

        {/* Champions Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold neon-text text-glow-soft mb-4">
              🏆 CAMPEÕES
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Os times que conquistaram o título máximo da Copa Tomatão
            </p>
          </div>

          {champions.map((champion) => (
            <div key={champion.id} className="relative">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 glass-card p-8 rounded-2xl border border-yellow-400/30 glow-hover">
                {/* Season Header */}
                <div className="text-center mb-8">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-2 text-lg font-bold mb-4">
                    {champion.season}
                  </Badge>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-3xl font-heading font-bold text-white">GRANDE FINAL</h3>
                    <Trophy className="w-8 h-8 text-yellow-400" />
                  </div>
                  <p className="text-gray-300">{formatDate(champion.date)} • {champion.duration}</p>
                </div>

                {/* Final Match */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Champion */}
                  <div className="glass-card p-6 rounded-xl border border-yellow-400/50 bg-yellow-400/10">
                    <div className="text-center mb-4">
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-30"></div>
                        <div className="relative w-full h-full bg-white/10 rounded-full p-3 border-2 border-yellow-400/50">
                          <img
                            src={champion.champion.logo}
                            alt={`${champion.champion.name} Logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                            }}
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Crown className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-yellow-400 mb-2">CAMPEÃO</h4>
                      <h5 className="text-xl font-bold text-white mb-1">{champion.champion.name}</h5>
                      <p className="text-gray-300">Capitão: {champion.champion.captain}</p>
                    </div>

                    {/* Players */}
                    <div className="space-y-2">
                      <h6 className="font-semibold text-white mb-2">Escalação:</h6>
                      <div className="grid grid-cols-2 gap-2">
                        {champion.champion.players.map((player, index) => (
                          <div key={index} className="text-sm bg-white/10 px-2 py-1 rounded text-white">
                            {player}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Runner Up */}
                  <div className="glass-card p-6 rounded-xl border border-gray-400/30 bg-gray-400/5">
                    <div className="text-center mb-4">
                      <div className="relative mx-auto w-20 h-20 mb-4">
                        <div className="relative w-full h-full bg-white/10 rounded-full p-2 border-2 border-gray-400/30">
                          <img
                            src={champion.runnerUp.logo}
                            alt={`${champion.runnerUp.name} Logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                            }}
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <Medal className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-400 mb-2">VICE-CAMPEÃO</h4>
                      <h5 className="text-lg font-bold text-white mb-1">{champion.runnerUp.name}</h5>
                      <p className="text-gray-300 text-sm">Capitão: {champion.runnerUp.captain}</p>
                    </div>

                    {/* Players */}
                    <div className="space-y-2">
                      <h6 className="font-semibold text-white mb-2 text-sm">Escalação:</h6>
                      <div className="grid grid-cols-2 gap-1">
                        {champion.runnerUp.players.slice(0, 4).map((player, index) => (
                          <div key={index} className="text-xs bg-white/5 px-2 py-1 rounded text-white">
                            {player}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Score */}
                <div className="text-center mb-8">
                  <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/5 max-w-md mx-auto">
                    <h4 className="text-2xl font-bold text-white mb-2">PLACAR FINAL</h4>
                    <div className="text-4xl font-bold text-yellow-400">{champion.finalScore}</div>
                    <p className="text-gray-300 mt-2">MVP: {champion.mvp}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h4 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400" />
                    Momentos Épicos
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {champion.highlights.map((highlight, index) => (
                      <div key={index} className="glass-card p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-white font-medium">{highlight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Target className="h-6 w-6 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.totalKills}</div>
                    <div className="text-xs text-gray-400">Kills</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.totalDeaths}</div>
                    <div className="text-xs text-gray-400">Deaths</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Zap className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.totalAssists}</div>
                    <div className="text-xs text-gray-400">Assists</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.dragons}</div>
                    <div className="text-xs text-gray-400">Dragões</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Crown className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.barons}</div>
                    <div className="text-xs text-gray-400">Barões</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center border border-white/10">
                    <Trophy className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{champion.stats.towers}</div>
                    <div className="text-xs text-gray-400">Torres</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Place Teams */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold neon-text text-glow-soft mb-4">
              🥈 TIMES EM SEGUNDO LUGAR
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Os times que chegaram à final e mostraram grande qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondPlaceTeams.map((team) => (
              <div key={team.id} className="glass-card p-6 rounded-xl border border-gray-400/30 glow-hover">
                <div className="text-center mb-4">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="relative w-full h-full bg-white/10 rounded-full p-3 border-2 border-gray-400/30">
                      <img
                        src={team.team.logo}
                        alt={`${team.team.name} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                        }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <Medal className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{team.team.name}</h4>
                  <p className="text-gray-300 mb-2">Capitão: {team.team.captain}</p>
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                    {team.season}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="glass-card p-3 rounded-lg bg-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Final contra:</span>
                      <span className="text-sm font-bold text-white">{team.opponent}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-400">Placar:</span>
                      <span className="text-sm font-bold text-gray-400">{team.score}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h6 className="font-semibold text-white text-sm">Conquistas:</h6>
                    {team.achievements.map((achievement, index) => (
                      <div key={index} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third Place Teams */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold neon-text text-glow-soft mb-4">
              🥉 TIMES EM TERCEIRO LUGAR
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Os times que conquistaram o terceiro lugar com mérito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thirdPlaceTeams.map((team) => (
              <div key={team.id} className="glass-card p-6 rounded-xl border border-orange-400/30 glow-hover">
                <div className="text-center mb-4">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="relative w-full h-full bg-white/10 rounded-full p-3 border-2 border-orange-400/30">
                      <img
                        src={team.team.logo}
                        alt={`${team.team.name} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                        }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{team.team.name}</h4>
                  <p className="text-gray-300 mb-2">Capitão: {team.team.captain}</p>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {team.season}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="glass-card p-3 rounded-lg bg-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Final contra:</span>
                      <span className="text-sm font-bold text-white">{team.opponent}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-400">Placar:</span>
                      <span className="text-sm font-bold text-orange-400">{team.score}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h6 className="font-semibold text-white text-sm">Conquistas:</h6>
                    {team.achievements.map((achievement, index) => (
                      <div key={index} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card max-w-3xl mx-auto p-8 rounded-2xl glow-hover border border-white/10">
            <h3 className="text-3xl font-heading font-bold mb-4 neon-text text-glow-soft">
              Faça Parte da História!
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Participe da próxima Copa Tomatão e tenha a chance de ser eternizado no Hall dos Vencedores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/teams">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft">
                  <Users className="mr-2 h-5 w-5" />
                  Ver Times
                </Button>
              </Link>
              <Link href="/tournament">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 glow-hover px-8 py-4 text-lg font-semibold">
                  <Trophy className="mr-2 h-5 w-5" />
                  Ver Torneio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
