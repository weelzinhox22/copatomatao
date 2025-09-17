import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Clock, Users, Play } from "lucide-react";

export default function Tournament() {
  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ["/api/matches"],
  });

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ["/api/teams"],
  });

  const isLoading = matchesLoading || teamsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-8 max-w-md"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getMatchesByPhase = (phase: string) => {
    return matches?.filter((match: any) => match.phase === phase) || [];
  };

  const getPhaseProgress = (phase: string) => {
    const phaseMatches = getMatchesByPhase(phase);
    if (phaseMatches.length === 0) return 0;
    const completed = phaseMatches.filter((m: any) => m.status === "completed").length;
    return Math.round((completed / phaseMatches.length) * 100);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">COPA TOMATÃO</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O campeonato está prestes a começar! Acompanhe todas as informações aqui.
          </p>
        </div>

        {/* Tournament Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="neon-border text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-gaming font-bold" data-testid="stat-total-teams">
                4
              </div>
              <div className="text-sm text-muted-foreground">Times Confirmados</div>
            </CardContent>
          </Card>
          
          <Card className="neon-border text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-gaming font-bold" data-testid="stat-total-players">
                20
              </div>
              <div className="text-sm text-muted-foreground">Jogadores</div>
            </CardContent>
          </Card>
          
          <Card className="neon-border text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-gaming font-bold" data-testid="stat-tournament-status">
                Em Breve
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </CardContent>
          </Card>
          
          <Card className="neon-border text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-gaming font-bold" data-testid="stat-start-date">
                A Definir
              </div>
              <div className="text-sm text-muted-foreground">Data de Início</div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Status */}
        <Card className="neon-border">
          <CardHeader>
            <CardTitle className="text-3xl font-gaming text-center">
              <span className="gradient-text">COPA TOMATÃO</span>
            </CardTitle>
            <div className="text-center py-8">
              <Trophy className="h-20 w-20 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Campeonato em Breve
              </h3>
              <p className="text-muted-foreground text-lg">
                A Copa Tomatão está prestes a começar! As partidas e o formato do torneio 
                serão anunciados em breve. Fique ligado para mais informações.
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Tournament Phases - Temporariamente removido */}
        <div className="hidden">
        <Tabs defaultValue="quarterfinals" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="group" data-testid="tab-group">Grupos</TabsTrigger>
            <TabsTrigger value="quarterfinals" data-testid="tab-quarterfinals">Quartas</TabsTrigger>
            <TabsTrigger value="semifinals" data-testid="tab-semifinals">Semifinais</TabsTrigger>
            <TabsTrigger value="finals" data-testid="tab-finals">Final</TabsTrigger>
          </TabsList>

          <TabsContent value="group">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl font-gaming">
                  <span className="gradient-text">FASE DE</span> GRUPOS
                </CardTitle>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                    style={{ width: `${getPhaseProgress("group")}%` }}
                    data-testid="progress-group"
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getPhaseProgress("group")}% concluído
                </p>
              </CardHeader>
              <CardContent>
                {getMatchesByPhase("group").length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground" data-testid="text-no-group-matches">
                      A fase de grupos ainda não foi configurada.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {getMatchesByPhase("group").map((match: any, index: number) => (
                      <MatchCard key={match.id} match={match} index={index} teams={teams} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quarterfinals">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl font-gaming">
                  <span className="gradient-text">QUARTAS DE</span> FINAL
                </CardTitle>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                    style={{ width: `${getPhaseProgress("quarterfinals")}%` }}
                    data-testid="progress-quarterfinals"
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getPhaseProgress("quarterfinals")}% concluído
                </p>
              </CardHeader>
              <CardContent>
                {getMatchesByPhase("quarterfinals").length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground" data-testid="text-no-quarterfinal-matches">
                      As quartas de final ainda não foram configuradas.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {getMatchesByPhase("quarterfinals").map((match: any, index: number) => (
                      <MatchCard key={match.id} match={match} index={index} teams={teams} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semifinals">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl font-gaming">
                  <span className="gradient-text">SEMI</span>FINAIS
                </CardTitle>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                    style={{ width: `${getPhaseProgress("semifinals")}%` }}
                    data-testid="progress-semifinals"
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getPhaseProgress("semifinals")}% concluído
                </p>
              </CardHeader>
              <CardContent>
                {getMatchesByPhase("semifinals").length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground" data-testid="text-no-semifinal-matches">
                      As semifinais ainda não foram configuradas.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {getMatchesByPhase("semifinals").map((match: any, index: number) => (
                      <MatchCard key={match.id} match={match} index={index} teams={teams} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finals">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl font-gaming text-center">
                  <span className="gradient-text">GRANDE</span> FINAL
                </CardTitle>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                    style={{ width: `${getPhaseProgress("finals")}%` }}
                    data-testid="progress-finals"
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {getPhaseProgress("finals")}% concluído
                </p>
              </CardHeader>
              <CardContent>
                {getMatchesByPhase("finals").length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2" data-testid="text-no-final-title">
                      A Grande Final Ainda Não Foi Definida
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-no-final-description">
                      Os finalistas serão definidos após as semifinais.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    {getMatchesByPhase("finals").map((match: any, index: number) => (
                      <MatchCard key={match.id} match={match} index={index} teams={teams} isFinal />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>

        {/* Confirmed Teams */}
        <div className="mt-16">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming text-center">
                <span className="gradient-text">TIMES</span> CONFIRMADOS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Kongs do Atlântico */}
                <div className="glass-card p-6 text-center glow-hover">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Kongs do Atlântico</h3>
                  <p className="text-sm text-gray-400 mb-3">5 jogadores confirmados</p>
                  <div className="text-xs text-gray-500">
                    Capitão: LDates
                  </div>
                </div>

                {/* Os Fimos */}
                <div className="glass-card p-6 text-center glow-hover">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Os Fimos</h3>
                  <p className="text-sm text-gray-400 mb-3">5 jogadores confirmados</p>
                  <div className="text-xs text-gray-500">
                    Capitão: AZR Aldeath
                  </div>
                </div>

                {/* Te Fizzguei */}
                <div className="glass-card p-6 text-center glow-hover">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Te Fizzguei</h3>
                  <p className="text-sm text-gray-400 mb-3">5 jogadores confirmados</p>
                  <div className="text-xs text-gray-500">
                    Capitão: A definir
                  </div>
                </div>

                {/* Zeca e os Urubus */}
                <div className="glass-card p-6 text-center glow-hover">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Zeca e os Urubus</h3>
                  <p className="text-sm text-gray-400 mb-3">5 jogadores confirmados</p>
                  <div className="text-xs text-gray-500">
                    Capitão: Theushubu
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Schedule */}
        <div className="mt-16">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming text-center">
                <span className="gradient-text">CRONOGRAMA</span> OFICIAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Cronograma em Breve
                </h3>
                <p className="text-muted-foreground">
                  O cronograma oficial da Copa Tomatão será anunciado em breve. 
                  Fique ligado para mais informações sobre as datas e horários das partidas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match, index, teams, isFinal = false }: { 
  match: any; 
  index: number; 
  teams: any[]; 
  isFinal?: boolean; 
}) {
  const team1 = teams?.find(t => t.id === match.team1Id);
  const team2 = teams?.find(t => t.id === match.team2Id);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live": return "AO VIVO";
      case "completed": return "FINALIZADA";
      default: return "AGENDADA";
    }
  };

  return (
    <Card className={`tournament-card ${isFinal ? 'border-2 border-primary' : ''}`} data-testid={`match-card-${index}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={`${getStatusColor(match.status)} text-white`}>
            {getStatusText(match.status)}
          </Badge>
          <span className="text-sm text-muted-foreground" data-testid={`match-time-${index}`}>
            {new Date(match.scheduledAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium" data-testid={`team1-name-${index}`}>
                {team1?.name || "TBD"}
              </span>
            </div>
            <span className={`text-lg font-bold ${
              match.team1Score > match.team2Score ? 'text-primary' : 'text-muted-foreground'
            }`} data-testid={`team1-score-${index}`}>
              {match.team1Score}
            </span>
          </div>
          
          <div className="text-center text-muted-foreground text-sm">VS</div>
          
          <div className="flex items-center justify-between p-3 bg-background/50 rounded">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium" data-testid={`team2-name-${index}`}>
                {team2?.name || "TBD"}
              </span>
            </div>
            <span className={`text-lg font-bold ${
              match.team2Score > match.team1Score ? 'text-primary' : 'text-muted-foreground'
            }`} data-testid={`team2-score-${index}`}>
              {match.team2Score}
            </span>
          </div>
        </div>
        
        {match.status === "live" && (
          <div className="mt-3 text-center">
            <Button variant="outline" size="sm" className="text-primary border-primary" data-testid={`button-watch-${index}`}>
              <Play className="h-4 w-4 mr-1" />
              Assistir Agora
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
