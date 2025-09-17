import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Users, 
  Trophy, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Calendar,
  Target
} from "lucide-react";

export default function Rules() {
  const rules = [
    {
      icon: Users,
      title: "Composição dos Times",
      color: "text-primary",
      items: [
        "Cada time deve ter exatamente 5 jogadores titulares",
        "É permitido 1 jogador substituto por time",
        "Todos os jogadores devem ter elo mínimo de Ouro 4",
        "Cada jogador pode participar de apenas um time",
        "O capitão é responsável pela inscrição e gerenciamento do time"
      ]
    },
    {
      icon: Target,
      title: "Formato do Torneio",
      color: "text-secondary", 
      items: [
        "Torneio eliminação simples com 64 times",
        "Fase de grupos: Melhor de 1 (Bo1)",
        "Quartas de final: Melhor de 3 (Bo3)",
        "Semifinais: Melhor de 3 (Bo3)",
        "Final: Melhor de 5 (Bo5)",
        "Draft: Tournament Draft com bans alternados"
      ]
    },
    {
      icon: Calendar,
      title: "Cronograma e Pontualidade",
      color: "text-accent",
      items: [
        "Partidas devem começar no horário agendado",
        "Tolerância máxima de 15 minutos de atraso",
        "Times ausentes após 15 minutos perdem por W.O.",
        "Reagendamento só é permitido em casos excepcionais",
        "Comunicação obrigatória via Discord oficial"
      ]
    },
    {
      icon: Shield,
      title: "Conduta e Fair Play", 
      color: "text-primary",
      items: [
        "Proibido uso de linguagem ofensiva ou discriminatória",
        "Respeito aos adversários e organizadores é obrigatório",
        "Proibido trolling, feeding intencional ou griefing",
        "Chat all deve ser usado apenas para gg e gl hf",
        "Violações podem resultar em advertência ou banimento"
      ]
    },
    {
      icon: XCircle,
      title: "Proibições Gerais",
      color: "text-destructive",
      items: [
        "Absolutamente proibido uso de bugs ou exploits",
        "Proibido pausar o jogo sem autorização",
        "Não é permitido coaching durante as partidas",
        "Proibido stream snipe ou ghosting",
        "Uso de scripts, bots ou programas terceiros"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Penalidades",
      color: "text-yellow-500",
      items: [
        "Advertência: Primeira ofensa leve",
        "Perda de partida: Ofensas moderadas",
        "Desqualificação: Ofensas graves ou reincidência",
        "Banimento permanente: Trapaça ou comportamento extremo",
        "Decisões dos moderadores são finais"
      ]
    }
  ];

  const prizes = [
    { position: "1º Lugar", amount: "R$ 25.000", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { position: "2º Lugar", amount: "R$ 15.000", color: "text-gray-400", bg: "bg-gray-400/10" },
    { position: "3º Lugar", amount: "R$ 10.000", color: "text-amber-600", bg: "bg-amber-600/10" },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">REGRAS</span> OFICIAIS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leia atentamente todas as regras antes de participar do campeonato
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-12">
          <Card className="neon-border border-yellow-500/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <CardTitle className="text-yellow-500" data-testid="text-important-notice">
                  AVISO IMPORTANTE
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todos os participantes devem ler e concordar com estas regras antes de se inscrever. 
                O desconhecimento das regras não isenta de punições. As regras podem ser atualizadas 
                e os participantes serão notificados via Discord oficial.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rules Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {rules.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <Card key={sectionIndex} className="neon-border" data-testid={`rule-section-${sectionIndex}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${section.color}`} />
                    <CardTitle className="text-xl font-gaming" data-testid={`rule-title-${sectionIndex}`}>
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3" data-testid={`rule-item-${sectionIndex}-${itemIndex}`}>
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Prize Pool */}
        <div className="mb-12">
          <Card className="neon-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-gaming">
                <span className="gradient-text">PREMIAÇÃO</span> TOTAL
              </CardTitle>
              <p className="text-muted-foreground">Distribuição dos prêmios do campeonato</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {prizes.map((prize, index) => (
                  <div 
                    key={index} 
                    className={`text-center p-6 rounded-lg ${prize.bg} border border-current/20`}
                    data-testid={`prize-position-${index}`}
                  >
                    <Trophy className={`h-12 w-12 mx-auto mb-3 ${prize.color}`} />
                    <div className={`text-2xl font-gaming font-bold mb-2 ${prize.color}`} data-testid={`prize-position-name-${index}`}>
                      {prize.position}
                    </div>
                    <div className="text-3xl font-bold" data-testid={`prize-amount-${index}`}>
                      {prize.amount}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Badge variant="secondary" className="text-lg px-4 py-2" data-testid="text-total-prize">
                  Premiação Total: R$ 50.000
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-xl font-gaming flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                ESPECIFICAÇÕES TÉCNICAS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold" data-testid="text-server-config">Configuração do Servidor</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Servidor: Brasil (BR1)</li>
                  <li>• Modo: Draft Ranqueado 5v5</li>
                  <li>• Mapa: Summoner's Rift</li>
                  <li>• Espectadores: Permitidos apenas para stream oficial</li>
                </ul>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-semibold" data-testid="text-match-config">Configurações de Partida</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tempo de draft: Padrão do jogo</li>
                  <li>• Pausas: Máximo 5 minutos por time</li>
                  <li>• Remake: Permitido até 3 minutos</li>
                  <li>• Desconexões: Aguardo de até 5 minutos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-xl font-gaming flex items-center">
                <Users className="h-5 w-5 mr-2 text-secondary" />
                SUBSTITUIÇÕES E ALTERAÇÕES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold" data-testid="text-roster-changes">Mudanças no Roster</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Permitido até 24h antes da primeira partida</li>
                  <li>• Substituto pode jogar a qualquer momento</li>
                  <li>• Máximo 1 alteração por fase do torneio</li>
                  <li>• Novos jogadores devem atender aos requisitos</li>
                </ul>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-semibold" data-testid="text-emergency-rules">Regras de Emergência</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Problemas técnicos: Pausa imediata</li>
                  <li>• Bug crítico: Remake da partida</li>
                  <li>• Desconexão em massa: Reagendamento</li>
                  <li>• Decisões dos moderadores são finais</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <Card className="neon-border max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-gaming" data-testid="text-questions-title">
                DÚVIDAS OU ESCLARECIMENTOS?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Entre em contato com a organização através dos nossos canais oficiais
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" data-testid="contact-discord">
                    Discord: LoLChampionship#2024
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" data-testid="contact-email">
                    Email: admin@lolchampionship.com
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
