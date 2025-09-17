import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search, Filter, Trophy, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { useState } from "react";

const laneIcons = {
  top: "🗡️",
  jungle: "🌲", 
  mid: "⚡",
  adc: "🏹",
  support: "🛡️"
};

const laneColors = {
  top: "bg-red-500",
  jungle: "bg-green-500",
  mid: "bg-blue-500", 
  adc: "bg-yellow-500",
  support: "bg-purple-500"
};

export default function Players() {
  const { data: user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLane, setSelectedLane] = useState<string>("all");
  
  // Note: This would typically fetch from /api/users?role=player or similar endpoint
  const { data: players, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-8 max-w-md"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter players based on search and lane
  const filteredPlayers = players?.filter((player: any) => {
    const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (player.fullName && player.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLane = selectedLane === "all" || player.preferredLane === selectedLane;
    return player.role === "player" && matchesSearch && matchesLane;
  }) || [];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">JOGADORES</span> PARTICIPANTES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Conheça todos os jogadores que participam do campeonato
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar jogadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-players"
            />
          </div>
          <div className="md:w-48">
            <Select value={selectedLane} onValueChange={setSelectedLane}>
              <SelectTrigger data-testid="select-lane-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por lane" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as lanes</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="jungle">Jungle</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="adc">ADC</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-no-players-title">
                  {searchTerm || selectedLane !== "all" ? "Nenhum Jogador Encontrado" : "Nenhum Jogador Inscrito"}
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="text-no-players-description">
                  {searchTerm || selectedLane !== "all" 
                    ? "Tente ajustar os filtros de busca." 
                    : "Seja o primeiro jogador a se cadastrar no campeonato!"
                  }
                </p>
                {(!searchTerm && selectedLane === "all") && (
                  <Link href="/register" data-testid="link-first-player">
                    <Button className="neon-glow">
                      Cadastrar-se como Jogador
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            filteredPlayers.map((player: any, index: number) => (
              <Card key={player.id} className="tournament-card" data-testid={`player-card-${index}`}>
                <CardHeader className="text-center pb-4">
                  {/* Player Avatar */}
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-lg font-gaming" data-testid={`player-username-${index}`}>
                    {player.username}
                  </CardTitle>
                  
                  {player.fullName && (
                    <p className="text-sm text-muted-foreground" data-testid={`player-fullname-${index}`}>
                      {player.fullName}
                    </p>
                  )}

                  {/* Lane Badge */}
                  {player.preferredLane && (
                    <div className="flex justify-center mt-2">
                      <Badge 
                        className={`${laneColors[player.preferredLane as keyof typeof laneColors]} text-white`}
                        data-testid={`player-lane-${index}`}
                      >
                        {laneIcons[player.preferredLane as keyof typeof laneIcons]} {player.preferredLane.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Player Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary" data-testid={`player-rank-${index}`}>
                          Gold III
                        </div>
                        <div className="text-xs text-muted-foreground">Elo Atual</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary" data-testid={`player-games-${index}`}>
                          127
                        </div>
                        <div className="text-xs text-muted-foreground">Partidas</div>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="space-y-2">
                      {player.riotId && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Riot ID:</span>
                          <span className="font-medium font-mono" data-testid={`player-riot-id-${index}`}>
                            {player.riotId}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cadastrado:</span>
                        <span className="font-medium" data-testid={`player-joined-${index}`}>
                          {new Date(player.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary" data-testid={`player-status-${index}`}>
                          Disponível
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        data-testid={`button-view-player-${index}`}
                      >
                        Ver Perfil
                      </Button>
                      {user?.role === "captain" && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-primary hover:text-primary/80"
                          data-testid={`button-invite-player-${index}`}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Lane Statistics */}
        <div className="mt-16">
          <Card className="neon-border max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-gaming">
                <span className="gradient-text">DISTRIBUIÇÃO</span> POR LANE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(laneIcons).map(([lane, icon]) => {
                  const count = filteredPlayers.filter((p: any) => p.preferredLane === lane).length;
                  return (
                    <div key={lane} className="text-center" data-testid={`lane-stat-${lane}`}>
                      <div className={`w-12 h-12 mx-auto mb-2 ${laneColors[lane as keyof typeof laneColors]} rounded-full flex items-center justify-center text-white text-xl`}>
                        {icon}
                      </div>
                      <div className="font-bold text-lg" data-testid={`lane-count-${lane}`}>
                        {count}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {lane}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        {user?.role !== "player" && (
          <div className="mt-16 text-center">
            <Card className="neon-border max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-xl font-gaming font-bold mb-4" data-testid="text-join-players-title">
                  JUNTE-SE AOS JOGADORES
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cadastre-se como jogador e participe do maior campeonato de League of Legends do Brasil.
                </p>
                <Link href="/register" data-testid="link-join-players">
                  <Button className="neon-glow">
                    <User className="mr-2 h-5 w-5" />
                    Cadastrar como Jogador
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
