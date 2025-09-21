import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star,
  TrendingUp, 
  TrendingDown,
  Minus,
  Target,
  Users,
  Award,
  Zap,
  Shield,
  Sword,
  BarChart3
} from "lucide-react";

export default function Rankings() {
  const [selectedCategory, setSelectedCategory] = useState("overall");

  // Dados de exemplo dos rankings
  const overallRankings = [
    { 
      position: 1, 
      name: "welziinho", 
      team: "Kongs do Atlântico", 
      points: 2847, 
      change: "+127", 
      trend: "up",
      wins: 8, 
      losses: 2, 
      kda: 4.03,
      role: "MID/JUNGLE"
    },
    { 
      position: 2, 
      name: "LDates", 
      team: "Kongs do Atlântico", 
      points: 2756, 
      change: "+89", 
      trend: "up",
      wins: 8, 
      losses: 2, 
      kda: 4.24,
      role: "JUNGLE"
    },
    { 
      position: 3, 
      name: "Beiço Reformed", 
      team: "Kongs do Atlântico", 
      points: 2634, 
      change: "+156", 
      trend: "up",
      wins: 7, 
      losses: 3, 
      kda: 3.21,
      role: "ADC"
    },
    { 
      position: 4, 
      name: "AZR Aldeath", 
      team: "Os Fimos", 
      points: 2512, 
      change: "-23", 
      trend: "down",
      wins: 7, 
      losses: 3, 
      kda: 3.55,
      role: "MID/TOP"
    },
    { 
      position: 5, 
      name: "guizão rapidão", 
      team: "Os Fimos", 
      points: 2489, 
      change: "+67", 
      trend: "up",
      wins: 6, 
      losses: 4, 
      kda: 3.59,
      role: "SUPPORT"
    },
    { 
      position: 6, 
      name: "SOU A GUILHOTINA", 
      team: "Os Fimos", 
      points: 2345, 
      change: "+45", 
      trend: "up",
      wins: 6, 
      losses: 4, 
      kda: 2.98,
      role: "TOP"
    },
    { 
      position: 7, 
      name: "BLT Reformed", 
      team: "Zeca e os Urubus", 
      points: 2234, 
      change: "-12", 
      trend: "down",
      wins: 5, 
      losses: 5, 
      kda: 2.87,
      role: "JUNGLE/SUPPORT"
    },
    { 
      position: 8, 
      name: "Theushubu", 
      team: "Zeca e os Urubus", 
      points: 2156, 
      change: "+34", 
      trend: "up",
      wins: 5, 
      losses: 5, 
      kda: 2.76,
      role: "TOP/JUNGLE"
    }
  ];

  const teamRankings = [
    { 
      position: 1, 
      name: "Kongs do Atlântico", 
      points: 8237, 
      change: "+234", 
      trend: "up",
      wins: 8, 
      losses: 2, 
      winRate: 80.0,
      players: ["welziinho", "LDates", "Beiço Reformed"]
    },
    { 
      position: 2, 
      name: "Os Fimos", 
      points: 7345, 
      change: "+156", 
      trend: "up",
      wins: 7, 
      losses: 3, 
      winRate: 70.0,
      players: ["AZR Aldeath", "guizão rapidão", "SOU A GUILHOTINA"]
    },
    { 
      position: 3, 
      name: "Zeca e os Urubus", 
      points: 6390, 
      change: "-45", 
      trend: "down",
      wins: 6, 
      losses: 4, 
      winRate: 60.0,
      players: ["BLT Reformed", "Theushubu"]
    },
    { 
      position: 4, 
      name: "Beiço Reformed", 
      points: 5123, 
      change: "+78", 
      trend: "up",
      wins: 5, 
      losses: 5, 
      winRate: 50.0,
      players: ["Player1", "Player2", "Player3"]
    }
  ];

  const categories = [
    { id: "overall", label: "Geral", icon: Trophy },
    { id: "teams", label: "Times", icon: Users },
    { id: "kda", label: "KDA", icon: Target },
    { id: "wins", label: "Vitórias", icon: Crown }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold">🥇 1º</Badge>;
      case 2:
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold">🥈 2º</Badge>;
      case 3:
        return <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold">🥉 3º</Badge>;
      default:
        return <Badge variant="secondary">#{position}</Badge>;
    }
  };

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
            <span className="neon-text">Rankings</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Classificação oficial dos jogadores e times da Copa Tomatão
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Overall Rankings */}
        {selectedCategory === "overall" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                  Ranking Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overallRankings.map((player, index) => (
                    <div key={player.name} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20' : 'bg-muted/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          {getPositionIcon(player.position)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg">{player.name}</p>
                            {getPositionBadge(player.position)}
                          </div>
                          <p className="text-sm text-muted-foreground">{player.team} • {player.role}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground">{player.wins}V - {player.losses}D</span>
                            <Badge variant="outline" className="text-xs">KDA: {player.kda}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Pontos</p>
                          <p className="text-xl font-bold">{player.points.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Mudança</p>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(player.trend)}
                            <span className={`font-semibold ${
                              player.trend === 'up' ? 'text-green-500' : 
                              player.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                            }`}>
                              {player.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Rankings */}
        {selectedCategory === "teams" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  Ranking de Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamRankings.map((team, index) => (
                    <div key={team.name} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20' : 'bg-muted/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          {getPositionIcon(team.position)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg">{team.name}</p>
                            {getPositionBadge(team.position)}
                          </div>
                          <p className="text-sm text-muted-foreground">{team.wins}V - {team.losses}D • {team.winRate}% WR</p>
                          <div className="flex items-center gap-2 mt-1">
                            {team.players.map((player, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {player}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Pontos</p>
                          <p className="text-xl font-bold">{team.points.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Mudança</p>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(team.trend)}
                            <span className={`font-semibold ${
                              team.trend === 'up' ? 'text-green-500' : 
                              team.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                            }`}>
                              {team.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* KDA Rankings */}
        {selectedCategory === "kda" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  Ranking por KDA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overallRankings
                    .sort((a, b) => b.kda - a.kda)
                    .map((player, index) => (
                    <div key={player.name} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20' : 'bg-muted/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          {getPositionIcon(index + 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg">{player.name}</p>
                            {getPositionBadge(index + 1)}
                          </div>
                          <p className="text-sm text-muted-foreground">{player.team} • {player.role}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">KDA</p>
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg px-3 py-1">
                          {player.kda}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Wins Rankings */}
        {selectedCategory === "wins" && (
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-primary" />
                  </div>
                  Ranking por Vitórias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overallRankings
                    .sort((a, b) => b.wins - a.wins)
                    .map((player, index) => (
                    <div key={player.name} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20' : 'bg-muted/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          {getPositionIcon(index + 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg">{player.name}</p>
                            {getPositionBadge(index + 1)}
                          </div>
                          <p className="text-sm text-muted-foreground">{player.team} • {player.role}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Vitórias</p>
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg px-3 py-1">
                          {player.wins}
                        </Badge>
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
