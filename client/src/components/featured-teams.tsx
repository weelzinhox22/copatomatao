import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Shield, Crown, Zap } from "lucide-react";

const teamIcons = [Shield, Crown, Zap];

export default function FeaturedTeams() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ["/api/teams"],
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted rounded mb-16 max-w-xl mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredTeams = teams?.slice(0, 3) || [];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4">
            <span className="gradient-text">TIMES EM</span> DESTAQUE
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça os times que estão fazendo história no campeonato
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTeams.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="text-no-teams">
                Nenhum time inscrito ainda. Seja o primeiro a se inscrever!
              </p>
            </div>
          ) : (
            featuredTeams.map((team: any, index: number) => {
              const Icon = teamIcons[index % teamIcons.length];
              
              return (
                <div key={team.id} className="tournament-card rounded-lg p-6 text-center" data-testid={`team-card-${index}`}>
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon className="text-2xl text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-gaming font-bold mb-2" data-testid={`team-name-${index}`}>
                    {team.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4" data-testid={`team-region-${index}`}>
                    {team.region || "Brasil"}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary" data-testid={`team-wins-${index}`}>12</div>
                      <div className="text-xs text-muted-foreground">Vitórias</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary" data-testid={`team-losses-${index}`}>3</div>
                      <div className="text-xs text-muted-foreground">Derrotas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent" data-testid={`team-winrate-${index}`}>80%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Captain</span>
                      <span className="font-medium" data-testid={`team-captain-${index}`}>Captain {index + 1}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Membros</span>
                      <span className="font-medium" data-testid={`team-members-${index}`}>5/5</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Criado</span>
                      <span className="font-medium" data-testid={`team-created-${index}`}>
                        {new Date(team.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    data-testid={`button-view-team-${index}`}
                  >
                    Ver Perfil
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
