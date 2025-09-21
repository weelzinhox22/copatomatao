import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock, Users, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Watch() {
  const { data: matches } = useQuery({
    queryKey: ["/api/matches"],
  });

  const openTwitch = () => {
    window.open("https://twitch.tv", "_blank");
  };

  const openJamalzeralol = () => {
    window.open("https://www.twitch.tv/jamalzeralol", "_blank");
  };

  const openMecwelll = () => {
    window.open("https://www.twitch.tv/mecwelll", "_blank");
  };


  const openDiscord = () => {
    window.open("https://discord.gg", "_blank");
  };

  const upcomingMatches = matches?.filter((match: any) => 
    match.status === "scheduled" && new Date(match.scheduledAt) > new Date()
  ).slice(0, 3) || [];

  const liveMatches = matches?.filter((match: any) => match.status === "live") || [];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
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
            <span className="gradient-text">ONDE</span> ASSISTIR
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe todas as partidas ao vivo nas nossas plataformas oficiais
          </p>
        </div>

        {/* Live Matches Alert */}
        {liveMatches.length > 0 && (
          <div className="mb-12">
            <Card className="neon-border border-red-500/50 bg-red-500/10">
              <CardHeader>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <CardTitle className="text-red-500 text-center" data-testid="text-live-alert">
                    {liveMatches.length} PARTIDA{liveMatches.length > 1 ? 'S' : ''} AO VIVO AGORA!
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Não perca a ação! Assista agora nas nossas plataformas oficiais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={openTwitch} className="bg-purple-600 hover:bg-purple-700 neon-glow">
                    <Play className="mr-2 h-4 w-4" />
                    Ver na Twitch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Streaming Platforms */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Jamalzeralol Twitch */}
          <Card className="glass-card border border-white/10 glow-hover relative overflow-hidden">
            {/* Card Background Texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
            
            <CardHeader className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-full flex items-center justify-center border border-purple-500/20">
                <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428C1.714 21.143 2.571 22 3.43 22h17.143c.857 0 1.714-.857 1.714-1.286V4.286L17.714 0zm14.571 20.571H3.43V6.286L6 3.714h12l2.571 2.572z"/>
                </svg>
              </div>
              <CardTitle className="text-2xl font-gaming text-white" data-testid="text-jamalzeralol-title">JAMALZERALOL</CardTitle>
              <p className="text-gray-300 text-sm">Capitão do Te Fizguei</p>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-red-400">AO VIVO</span>
                </div>
                <p className="text-sm text-gray-400" data-testid="text-jamalzeralol-viewers">
                  1.2K espectadores
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Qualidade:</span>
                  <span className="text-white">1080p60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chat:</span>
                  <span className="text-green-400">Ativo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400">Streaming</span>
                </div>
              </div>
              <Button 
                onClick={openJamalzeralol}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white glow-hover border-0 py-3"
                data-testid="button-jamalzeralol-watch"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Assistir Stream
              </Button>
            </CardContent>
          </Card>

          {/* Mecwelll Twitch */}
          <Card className="glass-card border border-white/10 glow-hover relative overflow-hidden">
            {/* Card Background Texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>
            
            <CardHeader className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-full flex items-center justify-center border border-purple-500/20">
                <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428C1.714 21.143 2.571 22 3.43 22h17.143c.857 0 1.714-.857 1.714-1.286V4.286L17.714 0zm14.571 20.571H3.43V6.286L6 3.714h12l2.571 2.572z"/>
                </svg>
              </div>
              <CardTitle className="text-2xl font-gaming text-white" data-testid="text-mecwelll-title">MECWELLL</CardTitle>
              <p className="text-gray-300 text-sm">Streamer Oficial</p>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-red-400">AO VIVO</span>
                </div>
                <p className="text-sm text-gray-400" data-testid="text-mecwelll-viewers">
                  890 espectadores
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Qualidade:</span>
                  <span className="text-white">1080p60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chat:</span>
                  <span className="text-green-400">Ativo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400">Streaming</span>
                </div>
              </div>
              <Button 
                onClick={openMecwelll}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white glow-hover border-0 py-3"
                data-testid="button-mecwelll-watch"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Assistir Stream
              </Button>
            </CardContent>
          </Card>


          {/* Discord Community */}
          <Card className="glass-card border border-white/10 glow-hover relative overflow-hidden">
            {/* Card Background Texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
            
            <CardHeader className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 rounded-full flex items-center justify-center border border-indigo-500/20">
                <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </div>
              <CardTitle className="text-2xl font-gaming text-white" data-testid="text-discord-title">DISCORD</CardTitle>
              <p className="text-gray-300 text-sm">Comunidade e discussões</p>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-green-400">ONLINE</span>
                </div>
                <p className="text-sm text-gray-400" data-testid="text-discord-members">
                  1.5K membros ativos
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Chat ao vivo:</span>
                  <span className="text-green-400">Ativo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avisos:</span>
                  <span className="text-green-400">Habilitados</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Comunidade:</span>
                  <span className="text-green-400">Ativa</span>
                </div>
              </div>
              <Button 
                onClick={openDiscord}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white glow-hover border-0 py-3"
                data-testid="button-discord-join"
              >
                <Users className="mr-2 h-4 w-4" />
                Entrar no Discord
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upcoming Matches */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-primary" />
                <span className="gradient-text">PRÓXIMAS</span> PARTIDAS
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingMatches.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground" data-testid="text-no-upcoming-matches">
                    Nenhuma partida agendada no momento.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingMatches.map((match: any, index: number) => (
                    <div key={match.id} className="tournament-card rounded-lg p-4" data-testid={`upcoming-match-${index}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" data-testid={`upcoming-match-phase-${index}`}>
                          {match.phase}
                        </Badge>
                        <span className="text-sm text-muted-foreground" data-testid={`upcoming-match-time-${index}`}>
                          {new Date(match.scheduledAt).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-medium" data-testid={`upcoming-match-teams-${index}`}>
                          Time 1 vs Time 2
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stream Schedule */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming flex items-center">
                <Clock className="mr-2 h-6 w-6 text-secondary" />
                <span className="gradient-text">HORÁRIOS DE</span> TRANSMISSÃO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <h4 className="font-semibold mb-2" data-testid="text-weekday-schedule">Dias de Semana</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Pré-show: 19:30 - 20:00</li>
                    <li>• Partidas: 20:00 - 23:00</li>
                    <li>• Pós-show: 23:00 - 23:30</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <h4 className="font-semibold mb-2" data-testid="text-weekend-schedule">Fins de Semana</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Pré-show: 13:30 - 14:00</li>
                    <li>• Partidas: 14:00 - 18:00</li>
                    <li>• Partidas noturnas: 20:00 - 23:00</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-primary text-primary-foreground">ESPECIAL</Badge>
                    <span className="font-medium">Grande Final</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    28 de Dezembro - 16:00 às 20:00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Watch Tips */}
        <div className="text-center">
          <Card className="neon-border max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming" data-testid="text-tips-title">
                <span className="gradient-text">DICAS PARA</span> ASSISTIR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Melhor Experiência</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Use fones para melhor áudio</li>
                    <li>• Qualidade mínima: 720p</li>
                    <li>• Conexão estável recomendada</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-secondary">Interação</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Participe do chat</li>
                    <li>• Use hashtags oficiais</li>
                    <li>• Respeite outros espectadores</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-accent">Perdeu Algo?</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Replays disponíveis em 1h</li>
                    <li>• Highlights no YouTube</li>
                    <li>• Resumos no Discord</li>
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
