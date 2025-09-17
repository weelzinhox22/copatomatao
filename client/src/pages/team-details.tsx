import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, Calendar, MapPin, Star, Shield, Crown, Target } from "lucide-react";
import { Link } from "wouter";

// Mock data - same as teams page
const teams = [
  {
    id: 1,
    name: "Kongs do Atlântico",
    captain: "LDates",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time dominante da região nordeste, conhecido por suas jogadas agressivas e estratégias inovadoras.",
    logo: "🦍",
    color: "from-blue-500 to-cyan-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z",
    players: [
      { name: "LDates", role: "Jungle", champion: "Graves", rank: "Platina 4", isCaptain: true, kda: "2.8", cs: "6.2", winrate: "65%" },
      { name: "Player2", role: "Top", champion: "Darius", rank: "Ouro 1", isCaptain: false, kda: "2.1", cs: "7.1", winrate: "58%" },
      { name: "Player3", role: "Mid", champion: "Yasuo", rank: "Ouro 2", isCaptain: false, kda: "1.9", cs: "6.8", winrate: "52%" },
      { name: "Player4", role: "ADC", champion: "Jinx", rank: "Ouro 3", isCaptain: false, kda: "2.3", cs: "8.2", winrate: "61%" },
      { name: "Player5", role: "Support", champion: "Thresh", rank: "Ouro 4", isCaptain: false, kda: "1.7", cs: "1.2", winrate: "55%" }
    ],
    achievements: [
      "🏆 Time confirmado para Copa Tomatão",
      "🔥 Preparação intensiva em andamento",
      "⚡ Estratégias sendo desenvolvidas",
      "🎯 Maior taxa de kills por minuto"
    ],
    strategy: "Time focado em early game agressivo e controle de objetivos. Preparando estratégias para dominar o campeonato com picks agressivos e rotações rápidas.",
    strengths: ["Early Game", "Teamfights", "Objetivos"],
    weaknesses: ["Late Game", "Scaling"],
    playstyle: "Agressivo",
    formationDate: "17 de Setembro de 2025"
  },
  {
    id: 2,
    name: "Os Fimos",
    captain: "AZR Aldeath",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Equipe técnica e estratégica, especialistas em late game e teamfights coordenados.",
    logo: "⚡",
    color: "from-purple-500 to-pink-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T14:30:00Z",
    players: [
      { name: "AZR Aldeath", role: "Mid", champion: "Azir", rank: "Platina 4", isCaptain: true, kda: "3.2", cs: "8.5", winrate: "68%" },
      { name: "Player2", role: "Top", champion: "Gnar", rank: "Ouro 1", isCaptain: false, kda: "2.4", cs: "7.3", winrate: "62%" },
      { name: "Player3", role: "Jungle", champion: "Kindred", rank: "Ouro 2", isCaptain: false, kda: "2.7", cs: "5.8", winrate: "59%" },
      { name: "Player4", role: "ADC", champion: "Aphelios", rank: "Ouro 3", isCaptain: false, kda: "2.9", cs: "8.7", winrate: "64%" },
      { name: "Player5", role: "Support", champion: "Braum", rank: "Ouro 4", isCaptain: false, kda: "1.8", cs: "1.5", winrate: "57%" }
    ],
    achievements: [
      "🧠 Estratégias de late game sendo refinadas",
      "🛡️ Preparação defensiva em andamento",
      "📈 Crescimento constante da equipe",
      "🎭 Melhor coordenação de teamfights"
    ],
    strategy: "Especialistas em scaling e teamfights tardios. Preparando estratégias para dominar nas fases finais das partidas com picks de late game.",
    strengths: ["Late Game", "Teamfights", "Scaling"],
    weaknesses: ["Early Game", "Agressividade"],
    playstyle: "Estratégico",
    formationDate: "17 de Setembro de 2025"
  },
  {
    id: 3,
    name: "Te Fizzguei",
    captain: "Jamal",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Time jovem e promissor, com grande potencial de crescimento e picks criativos.",
    logo: "🐟",
    color: "from-green-500 to-emerald-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T09:15:00Z",
    players: [
      { name: "Jamal", role: "Top", champion: "Fizz", rank: "Ouro 1", isCaptain: true, kda: "2.5", cs: "6.9", winrate: "60%" },
      { name: "Player2", role: "Jungle", champion: "Rek'Sai", rank: "Ouro 2", isCaptain: false, kda: "2.2", cs: "5.5", winrate: "56%" },
      { name: "Player3", role: "Mid", champion: "Fizz", rank: "Ouro 3", isCaptain: false, kda: "2.6", cs: "7.2", winrate: "58%" },
      { name: "Player4", role: "ADC", champion: "Lucian", rank: "Ouro 4", isCaptain: false, kda: "2.4", cs: "8.1", winrate: "59%" },
      { name: "Player5", role: "Support", champion: "Nautilus", rank: "Prata 1", isCaptain: false, kda: "1.6", cs: "1.3", winrate: "53%" }
    ],
    achievements: [
      "🌊 Revelação da Copa Tomatão",
      "💪 Maior potencial de crescimento",
      "🎯 Estratégias criativas sendo desenvolvidas",
      "🚀 Picks não convencionais"
    ],
    strategy: "Time jovem que aposta na criatividade e picks não convencionais. Preparando estratégias surpresa para o campeonato com composições únicas.",
    strengths: ["Criatividade", "Surpresa", "Flexibilidade"],
    weaknesses: ["Experiência", "Consistência"],
    playstyle: "Criativo",
    formationDate: "17 de Setembro de 2025"
  },
  {
    id: 4,
    name: "Zeca e os Urubus",
    captain: "Theushubu",
    region: "Bahia",
    wins: 0,
    losses: 0,
    winRate: "0%",
    members: 5,
    description: "Veteranos experientes que nunca desistem, famosos pelas viradas épicas e espírito de luta.",
    logo: "🦅",
    color: "from-orange-500 to-red-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T16:45:00Z",
    players: [
      { name: "Theushubu", role: "Top", champion: "Shen", rank: "Platina 4", isCaptain: true, kda: "2.3", cs: "6.7", winrate: "63%" },
      { name: "Player2", role: "Jungle", champion: "Warwick", rank: "Ouro 1", isCaptain: false, kda: "2.0", cs: "5.2", winrate: "55%" },
      { name: "Player3", role: "Mid", champion: "Malzahar", rank: "Ouro 2", isCaptain: false, kda: "2.1", cs: "7.0", winrate: "57%" },
      { name: "Player4", role: "ADC", champion: "Ashe", rank: "Ouro 3", isCaptain: false, kda: "2.2", cs: "7.8", winrate: "58%" },
      { name: "Player5", role: "Support", champion: "Leona", rank: "Ouro 4", isCaptain: false, kda: "1.5", cs: "1.1", winrate: "54%" }
    ],
    achievements: [
      "🔄 Especialistas em comebacks",
      "💯 Veteranos da comunidade",
      "🏆 Melhor espírito esportivo",
      "💪 Nunca desistem"
    ],
    strategy: "Veteranos experientes que apostam na paciência e experiência. Preparando estratégias para virar jogos difíceis com picks de controle.",
    strengths: ["Experiência", "Comebacks", "Controle"],
    weaknesses: ["Agressividade", "Early Game"],
    playstyle: "Defensivo",
    formationDate: "17 de Setembro de 2025"
  }
];

export default function TeamDetails() {
  const [, params] = useRoute("/teams/:id");
  const teamId = params?.id ? parseInt(params.id) : null;
  const team = teams.find(t => t.id === teamId);

  if (!team) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Time não encontrado</h1>
          <Link href="/teams">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Times
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
          <Link href="/teams">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Times
            </Button>
          </Link>

          <div className="glass-card p-8 rounded-xl glow-soft">
            <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-10 rounded-xl`}></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-8xl">{team.logo}</div>
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-2">
                      {team.name}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg px-4 py-2">
                        <Shield className="h-4 w-4 mr-2" />
                        {team.status}
                      </Badge>
                      <span className="text-gray-400 font-bold text-xl">Pronto para competir</span>
                    </div>
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      {team.region}
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl">{team.description}</p>
                  </div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-gray-400 mb-1">-</div>
                  <div className="text-sm text-gray-500 font-medium">Vitórias</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-gray-400 mb-1">-</div>
                  <div className="text-sm text-gray-500 font-medium">Derrotas</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-gray-400 mb-1">-</div>
                  <div className="text-sm text-gray-500 font-medium">Taxa de Vitória</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-primary mb-1">{team.members}/5</div>
                  <div className="text-sm text-gray-500 font-medium">Membros</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Players */}
          <div className="lg:col-span-2">
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-2xl font-heading neon-text flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Escalação Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.players.map((player, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                      player.isCaptain 
                        ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-primary/50 shadow-lg shadow-primary/10' 
                        : 'bg-gradient-to-br from-gray-800/30 to-gray-900/20 border-gray-700/30 hover:border-gray-600/50'
                    }`}>
                      {player.isCaptain && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                      )}
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                              player.isCaptain 
                                ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' 
                                : 'bg-gradient-to-br from-gray-700 to-gray-800'
                            }`}>
                              {player.role.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl font-bold text-white">{player.name}</span>
                                {player.isCaptain && (
                                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-2 py-1">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Capitão
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-400 font-medium">{player.role}</div>
                              <div className="text-sm text-primary font-semibold">{player.champion}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white mb-1">{player.rank}</div>
                            <div className="text-sm text-gray-400">Rank Atual</div>
                          </div>
                        </div>
                        
                        {/* Player Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/30">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-400">{player.kda}</div>
                            <div className="text-xs text-gray-500">KDA</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-400">{player.cs}</div>
                            <div className="text-xs text-gray-500">CS/min</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-400">{player.winrate}</div>
                            <div className="text-xs text-gray-500">Win Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Info */}
          <div className="space-y-6">
            {/* Team Analysis */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Análise do Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Estilo de Jogo</h4>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {team.playstyle}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Pontos Fortes</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.strengths.map((strength, index) => (
                        <Badge key={index} className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Pontos de Melhoria</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.weaknesses.map((weakness, index) => (
                        <Badge key={index} className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strategy */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Estratégia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{team.strategy}</p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 glass-card p-3 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Details */}
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capitão:</span>
                    <span className="text-white font-medium">{team.captain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Formado em:</span>
                    <span className="text-white font-medium">{team.formationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Região:</span>
                    <span className="text-white font-medium">{team.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {team.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Membros:</span>
                    <span className="text-white font-medium">{team.members}/5</span>
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
