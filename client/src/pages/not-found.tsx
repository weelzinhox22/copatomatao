import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  Home, 
  ArrowLeft, 
  Search, 
  Trophy, 
  Users, 
  Calendar,
  HelpCircle,
  ExternalLink
} from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Início", icon: Home, description: "Voltar para a página principal" },
    { href: "/tournament", label: "Campeonato", icon: Trophy, description: "Ver chaveamento e resultados" },
    { href: "/teams", label: "Times", icon: Users, description: "Conhecer os times participantes" },
    { href: "/players", label: "Jogadores", icon: Users, description: "Ver perfil dos jogadores" },
    { href: "/watch", label: "Onde Assistir", icon: ExternalLink, description: "Acompanhar as transmissões" },
    { href: "/faq", label: "FAQ", icon: HelpCircle, description: "Tirar dúvidas frequentes" }
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-6xl md:text-7xl font-gaming font-bold">
              <span className="neon-text">404</span>
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ops! Parece que você se perdeu no Summoner's Rift. A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Error Info */}
          <Card className="glass-card border border-white/10 glow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-red-500" />
                </div>
                O que aconteceu?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Possíveis causas:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• A página foi movida ou removida</li>
                    <li>• Você digitou o endereço incorretamente</li>
                    <li>• O link que você seguiu está quebrado</li>
                    <li>• A página ainda está sendo desenvolvida</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">O que você pode fazer:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Verificar se o endereço está correto</li>
                    <li>• Usar a navegação do site</li>
                    <li>• Voltar para a página anterior</li>
                    <li>• Ir para a página inicial</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border border-white/10 glow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-primary" />
                </div>
                Navegação Rápida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="mr-2 h-4 w-4" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Página Anterior
                </Button>
                <Link href="/faq">
                  <Button className="w-full justify-start" variant="outline">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Central de Ajuda
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Reportar Problema
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="glass-card border border-white/10 glow-hover mb-12">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="neon-text">Links Úteis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <div className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors duration-200">
                          {link.label}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="glass-card border border-white/10 glow-hover">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="neon-text">Curiosidades da Copa Tomatão</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="font-semibold mb-2">Campeonato Épico</h4>
                <p className="text-sm text-muted-foreground">
                  A Copa Tomatão é feita por pura resenha entre amigos!
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-semibold mb-2">Comunidade Ativa</h4>
                <p className="text-sm text-muted-foreground">
                  Mais de 20 jogadores participando do torneio!
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-semibold mb-2">Sempre Atualizado</h4>
                <p className="text-sm text-muted-foreground">
                  Acompanhe resultados e próximas partidas!
                </p>
              </div>
            </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
