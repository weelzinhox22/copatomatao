import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Sword
} from "lucide-react";

export default function Statistics() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Dados de exemplo das estatísticas
  const tournamentStats = {
    totalMatches: 47,
    totalPlayers: 32,
    totalTeams: 16,
    averageMatchDuration: "28:45",
    totalKills: 1247,
    totalDeaths: 1189,
    totalAssists: 2847
  };

  const topPlayers = [
    { name: "welziinho", team: "Kongs do Atlântico", kills: 156, deaths: 89, assists: 203, kda: 4.03 },
    { name: "LDates", team: "Kongs do Atlântico", kills: 142, deaths: 78, assists: 189, kda: 4.24 },
    { name: "Beiço Reformed", team: "Kongs do Atlântico", kills: 138, deaths: 95, assists: 167, kda: 3.21 },
    { name: "AZR Aldeath", team: "Os Fimos", kills: 134, deaths: 88, assists: 178, kda: 3.55 },
    { name: "guizão rapidão", team: "Os Fimos", kills: 129, deaths: 92, assists: 201, kda: 3.59 }
  ];

  const championStats = [
    { name: "Yasuo", picks: 23, bans: 15, winRate: 65.2, kda: 2.8 },
    { name: "Darius", picks: 19, bans: 12, winRate: 68.4, kda: 3.1 },
    { name: "Lee Sin", picks: 18, bans: 18, winRate: 55.6, kda: 2.9 },
    { name: "Jinx", picks: 16, bans: 8, winRate: 62.5, kda: 2.7 },
    { name: "Thresh", picks: 15, bans: 10, winRate: 60.0, kda: 2.4 }
  ];

  const teamStats = [
    { name: "Kongs do Atlântico", wins: 8, losses: 2, winRate: 80.0, kills: 234, deaths: 189 },
    { name: "Os Fimos", wins: 7, losses: 3, winRate: 70.0, kills: 198, deaths: 167 },
    { name: "Zeca e os Urubus", wins: 6, losses: 4, winRate: 60.0, kills: 187, deaths: 178 },
    { name: "Beiço Reformed", wins: 5, losses: 5, winRate: 50.0, kills: 156, deaths: 145 }
  ];

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "players", label: "Jogadores", icon: Users },
    { id: "champions", label: "Campeões", icon: Sword },
    { id: "teams", label: "Times", icon: Trophy }
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="neon-text">Estatísticas</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Análise completa das performances, campeões mais jogados e dados do campeonato
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-8">
            {/* Tournament Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border border-white/10 glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Partidas</p>
                      <p className="text-2xl font-bold">{tournamentStats.totalMatches}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border border-white/10 glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jogadores</p>
                      <p className="text-2xl font-bold">{tournamentStats.totalPlayers}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border border-white/10 glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Times</p>
                      <p className="text-2xl font-bold">{tournamentStats.totalTeams}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border border-white/10 glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Duração Média</p>
                      <p className="text-2xl font-bold">{tournamentStats.averageMatchDuration}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Combat Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass-card border border-white/10 glow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                      <Sword className="w-4 h-4 text-red-500" />
                    </div>
                    Eliminações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-500">{tournamentStats.totalKills}</p>
                  <p className="text-sm text-muted-foreground">Total de eliminações</p>
                </CardContent>
              </Card>

              <Card className="glass-card border border-white/10 glow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-500" />
                    </div>
                    Mortes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-500">{tournamentStats.totalDeaths}</p>
                  <p className="text-sm text-muted-foreground">Total de mortes</p>
                </CardContent>
              </Card>

              <Card className="glass-card border border-white/10 glow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-500" />
                    </div>
                    Assistências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-500">{tournamentStats.totalAssists}</p>
                  <p className="text-sm text-muted-foreground">Total de assistências</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Players Tab */}
        {selectedTab === "players" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  Top Jogadores por KDA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPlayers.map((player, index) => (
                    <div key={player.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.team}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">K/D/A</p>
                          <p className="font-semibold">{player.kills}/{player.deaths}/{player.assists}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">KDA</p>
                          <Badge variant="secondary" className="font-bold">
                            {player.kda.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Champions Tab */}
        {selectedTab === "champions" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-primary" />
                  </div>
                  Campeões Mais Jogados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {championStats.map((champion, index) => (
                    <div key={champion.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{champion.name}</p>
                          <p className="text-sm text-muted-foreground">{champion.picks} picks, {champion.bans} bans</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
                          <Badge variant={champion.winRate >= 60 ? "default" : "secondary"}>
                            {champion.winRate}%
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">KDA Médio</p>
                          <p className="font-semibold">{champion.kda}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Teams Tab */}
        {selectedTab === "teams" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                  Performance dos Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamStats.map((team, index) => (
                    <div key={team.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="text-sm text-muted-foreground">{team.wins}V - {team.losses}D</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
                          <Badge variant={team.winRate >= 70 ? "default" : team.winRate >= 50 ? "secondary" : "outline"}>
                            {team.winRate}%
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">K/D</p>
                          <p className="font-semibold">{team.kills}/{team.deaths}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
