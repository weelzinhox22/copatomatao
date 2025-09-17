import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";

export default function Teams() {
  const { data: user } = useAuth();
  const { data: teams, isLoading } = useQuery({
    queryKey: ["/api/teams"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-8 max-w-md"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">TIMES</span> PARTICIPANTES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Conheça todos os times que estão competindo no campeonato
          </p>
          
          {user?.role === "captain" && (
            <Link href="/register" data-testid="link-create-team">
              <Button className="neon-glow" data-testid="button-create-team">
                <Users className="mr-2 h-5 w-5" />
                Criar Novo Time
              </Button>
            </Link>
          )}
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!teams || teams.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-no-teams-title">
                  Nenhum Time Inscrito
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="text-no-teams-description">
                  Seja o primeiro capitão a inscrever um time no campeonato!
                </p>
                {user?.role === "captain" ? (
                  <Link href="/register" data-testid="link-first-team">
                    <Button className="neon-glow">
                      Criar Primeiro Time
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register" data-testid="link-become-captain">
                    <Button variant="outline">
                      Tornar-se Capitão
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            teams.map((team: any, index: number) => (
              <Card key={team.id} className="tournament-card" data-testid={`team-card-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-gaming" data-testid={`team-name-${index}`}>
                      {team.name}
                    </CardTitle>
                    <Badge variant="secondary" data-testid={`team-status-${index}`}>
                      Ativo
                    </Badge>
                  </div>
                  
                  {team.region && (
                    <div className="flex items-center text-sm text-muted-foreground" data-testid={`team-region-${index}`}>
                      <MapPin className="h-4 w-4 mr-1" />
                      {team.region}
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Team Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary" data-testid={`team-wins-${index}`}>
                          12
                        </div>
                        <div className="text-xs text-muted-foreground">Vitórias</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary" data-testid={`team-losses-${index}`}>
                          3
                        </div>
                        <div className="text-xs text-muted-foreground">Derrotas</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent" data-testid={`team-winrate-${index}`}>
                          80%
                        </div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                    </div>

                    {/* Team Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Capitão:</span>
                        <span className="font-medium" data-testid={`team-captain-${index}`}>
                          Captain {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Membros:</span>
                        <span className="font-medium" data-testid={`team-member-count-${index}`}>
                          5/5
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Criado em:</span>
                        <span className="font-medium" data-testid={`team-created-date-${index}`}>
                          {new Date(team.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        data-testid={`button-view-team-${index}`}
                      >
                        Ver Perfil
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        data-testid={`button-team-stats-${index}`}
                      >
                        <Trophy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Tournament Info */}
        <div className="mt-16 text-center">
          <Card className="neon-border max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold" data-testid="text-registration-info">
                  Informações de Inscrição
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                As inscrições para o campeonato estão abertas até <span className="font-semibold text-primary">20 de Dezembro de 2024</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Requisitos:</strong>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• 5 jogadores + 1 substituto</li>
                    <li>• Elo mínimo: Ouro 4</li>
                  </ul>
                </div>
                <div>
                  <strong>Formato:</strong>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• Eliminação simples</li>
                    <li>• Bo3 semifinais e final</li>
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
