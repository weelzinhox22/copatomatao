import HeroSection from "@/components/hero-section";
import TournamentStatus from "@/components/tournament-status";
import FeaturedTeams from "@/components/featured-teams";
import LiveStreaming from "@/components/live-streaming";
import LatestNews from "@/components/latest-news";
import { Button } from "@/components/ui/button";
import { Users, User } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TournamentStatus />
      <FeaturedTeams />
      <LiveStreaming />
      <LatestNews />
      
      {/* Quick Actions Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Team Registration */}
            <div className="neon-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-gaming font-bold mb-4" data-testid="text-team-registration-title">
                INSCREVA SEU TIME
              </h3>
              <p className="text-muted-foreground mb-6">
                Reúna seus amigos e participe do maior campeonato de League of Legends. 
                Inscrições abertas até 20 de dezembro.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">5 jogadores + 1 substituto</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Capitão com poderes de gerenciamento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Verificação de elo mínimo</span>
                </div>
              </div>
              <Link href="/register" data-testid="link-team-registration">
                <Button className="neon-glow w-full" data-testid="button-team-registration">
                  Inscrever Time
                </Button>
              </Link>
            </div>
            
            {/* Player Registration */}
            <div className="neon-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-gaming font-bold mb-4" data-testid="text-player-registration-title">
                PROCURA TIME?
              </h3>
              <p className="text-muted-foreground mb-6">
                Cadastre-se como jogador e encontre um time que precisa de alguém com suas habilidades. 
                Conecte-se com outros jogadores.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Perfil com histórico de partidas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Sistema de convites de capitães</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Filtros por lane e elo</span>
                </div>
              </div>
              <Link href="/register" data-testid="link-player-registration">
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground neon-glow w-full"
                  data-testid="button-player-registration"
                >
                  Cadastrar como Jogador
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
