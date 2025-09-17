import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function TournamentStatus() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["/api/matches/phase/quarterfinals"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted rounded mb-16 max-w-xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4">
            <span className="gradient-text">STATUS DO</span> TORNEIO
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe o progresso do campeonato e veja os confrontos das próximas fases
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="neon-border rounded-lg p-6 h-full">
              <h3 className="text-xl font-gaming font-bold text-primary mb-4" data-testid="text-current-phase">
                FASE ATUAL
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fase:</span>
                  <span className="font-semibold" data-testid="text-phase">Oitavas de Final</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Partidas:</span>
                  <span className="font-semibold" data-testid="text-matches-progress">6/8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Próxima:</span>
                  <span className="font-semibold" data-testid="text-next-match">Hoje 20h</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                    style={{ width: "75%" }}
                    data-testid="progress-bar"
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground text-center" data-testid="text-progress">
                  75% Concluído
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="neon-border rounded-lg p-6">
              <h3 className="text-xl font-gaming font-bold text-secondary mb-6" data-testid="text-bracket-title">
                CHAVEAMENTO
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {!matches || matches.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground" data-testid="text-no-matches">
                      Nenhuma partida programada para esta fase.
                    </p>
                  </div>
                ) : (
                  matches.slice(0, 2).map((match: any, index: number) => (
                    <div key={match.id} className="tournament-card rounded-lg p-4" data-testid={`match-card-${index}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-secondary">OITAVAS #{index + 1}</span>
                        <span className="text-xs text-muted-foreground" data-testid={`match-time-${index}`}>
                          {new Date(match.scheduledAt).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                          <span className="font-medium" data-testid={`team1-name-${index}`}>Team 1</span>
                          <span className={`font-bold ${match.team1Score > match.team2Score ? 'text-primary' : 'text-muted-foreground'}`} data-testid={`team1-score-${index}`}>
                            {match.team1Score}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                          <span className="font-medium" data-testid={`team2-name-${index}`}>Team 2</span>
                          <span className={`font-bold ${match.team2Score > match.team1Score ? 'text-primary' : 'text-muted-foreground'}`} data-testid={`team2-score-${index}`}>
                            {match.team2Score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="text-center">
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground neon-glow"
                  data-testid="button-view-bracket"
                >
                  Ver Chaveamento Completo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
