import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Calendar, MapPin, Star, Shield, Crown, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";

// Mock data dos 4 times definidos
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
    description: "Time dominante da região nordeste, conhecido por suas jogadas agressivas.",
    logo: "🦍",
    color: "from-blue-500 to-cyan-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T10:00:00Z",
    players: ["LDates", "Player2", "Player3", "Player4", "Player5"]
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
    description: "Equipe técnica e estratégica, especialistas em late game.",
    logo: "⚡",
    color: "from-purple-500 to-pink-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T14:30:00Z",
    players: ["AZR Aldeath", "Player2", "Player3", "Player4", "Player5"]
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
    description: "Time jovem e promissor, com grande potencial de crescimento.",
    logo: "🐟",
    color: "from-green-500 to-emerald-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T09:15:00Z",
    players: ["Jamal", "Player2", "Player3", "Player4", "Player5"]
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
    description: "Veteranos experientes que nunca desistem, famosos pelas viradas.",
    logo: "🦅",
    color: "from-orange-500 to-red-500",
    status: "Confirmado",
    points: 0,
    createdAt: "2025-09-17T16:45:00Z",
    players: ["Theushubu", "Player2", "Player3", "Player4", "Player5"]
  }
];

export default function Teams() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="neon-text text-glow-soft">TIMES</span> PARTICIPANTES
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Conheça os quatro times que estão competindo na Copa Tomatão
          </p>
          
          <div className="glass-card inline-block px-6 py-3 rounded-full glow-soft">
            <div className="flex items-center gap-2 text-primary">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">4 Times Confirmados</span>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teams.map((team, index) => (
            <div key={team.id} className="group relative" data-testid={`team-card-${index}`}>
              {/* Card Principal */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/10">
                
                {/* Background Gradient sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Header com Logo e Nome */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Logo clean */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl shadow-lg border border-gray-700/50 group-hover:border-primary/50 transition-all duration-300">
                        {team.logo}
                      </div>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${team.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Informações do Time */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300" data-testid={`team-name-${index}`}>
                        {team.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-1"
                          data-testid={`team-status-${index}`}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {team.status}
                        </Badge>
                        <span className="text-xs text-gray-400">Pronto para competir</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Região */}
                  <div className="flex items-center text-sm text-gray-400 mb-3" data-testid={`team-region-${index}`}>
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{team.region}</span>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-300 text-sm leading-relaxed">{team.description}</p>
                </div>

                {/* Stats Section */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30 group-hover:border-primary/30 transition-all duration-300">
                      <div className="text-2xl font-bold text-gray-400 mb-1" data-testid={`team-wins-${index}`}>
                        -
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Vitórias</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30 group-hover:border-primary/30 transition-all duration-300">
                      <div className="text-2xl font-bold text-gray-400 mb-1" data-testid={`team-losses-${index}`}>
                        -
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Derrotas</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30 group-hover:border-primary/30 transition-all duration-300">
                      <div className="text-2xl font-bold text-gray-400 mb-1" data-testid={`team-winrate-${index}`}>
                        -
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Win Rate</div>
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Capitão:</span>
                      <span className="font-semibold text-white" data-testid={`team-captain-${index}`}>
                        {team.captain}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Membros:</span>
                      <span className="font-semibold text-white" data-testid={`team-member-count-${index}`}>
                        {team.members}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Criado em:</span>
                      <span className="font-semibold text-white" data-testid={`team-created-date-${index}`}>
                        {new Date(team.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - Fora do card mas visualmente integradas */}
              <div className="flex gap-3 mt-4 px-6">
                <button 
                  className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 text-white hover:from-primary hover:to-secondary hover:border-primary transition-all duration-300 h-10 rounded-md px-4 py-2 flex items-center justify-center gap-2 font-medium cursor-pointer"
                  data-testid={`button-view-team-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Button clicked, navigating to team:", team.id);
                    setLocation(`/teams/${team.id}`);
                  }}
                >
                  <Users className="h-4 w-4" />
                  Ver Detalhes
                </button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 text-white hover:from-primary hover:to-secondary hover:border-primary h-10 w-10"
                  data-testid={`button-team-stats-${index}`}
                >
                  <Trophy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Tournament Info */}
        <div className="text-center">
          <Card className="glass-card max-w-4xl mx-auto glow-soft">
            <CardContent className="pt-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-heading neon-text" data-testid="text-tournament-info">
                  Informações do Campeonato
                </h3>
              </div>
              <p className="text-gray-300 mb-8 text-lg">
                A Copa Tomatão já possui seus 4 times definidos e está pronta para começar!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-primary mb-3">
                    <Users className="h-8 w-8 mx-auto" />
                  </div>
                  <strong className="text-white text-lg">Composição:</strong>
                  <ul className="text-gray-300 mt-2 space-y-1">
                    <li>• 5 jogadores por time</li>
                    <li>• Todos os times confirmados</li>
                    <li>• Apenas diversão entre amigos</li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-secondary mb-3">
                    <Trophy className="h-8 w-8 mx-auto" />
                  </div>
                  <strong className="text-white text-lg">Formato:</strong>
                  <ul className="text-gray-300 mt-2 space-y-1">
                    <li>• Eliminação simples</li>
                    <li>• Bo3 semifinais e final</li>
                    <li>• Partidas ao vivo</li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-accent mb-3">
                    <Zap className="h-8 w-8 mx-auto" />
                  </div>
                  <strong className="text-white text-lg">Início:</strong>
                  <ul className="text-gray-300 mt-2 space-y-1">
                    <li>• 4 de outubro de 2025</li>
                    <li>• Transmissão ao vivo</li>
                    <li>• Pura resenha!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
