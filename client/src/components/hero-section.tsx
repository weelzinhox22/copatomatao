import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-16 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Gaming setup with League of Legends" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-gaming font-black mb-6">
            <span className="gradient-text">CHAMPIONSHIP</span>
            <br />
            <span className="text-foreground">2024</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Participe do maior campeonato de League of Legends do ano. Inscreva seu time, 
            compete pelos melhores prêmios e mostre suas habilidades na Fenda do Invocador.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold neon-glow transform hover:scale-105 transition-all duration-300"
              data-testid="button-team-registration"
            >
              <Users className="mr-2 h-5 w-5" />
              Inscrever Time
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transform hover:scale-105 transition-all duration-300"
              data-testid="button-watch-live"
            >
              <Play className="mr-2 h-5 w-5" />
              Assistir Ao Vivo
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center" data-testid="stat-teams">
              <div className="text-3xl md:text-4xl font-gaming font-bold text-primary mb-2">64</div>
              <div className="text-muted-foreground text-sm md:text-base">Times Inscritos</div>
            </div>
            <div className="text-center" data-testid="stat-prize">
              <div className="text-3xl md:text-4xl font-gaming font-bold text-secondary mb-2">R$ 50K</div>
              <div className="text-muted-foreground text-sm md:text-base">Premiação</div>
            </div>
            <div className="text-center" data-testid="stat-days">
              <div className="text-3xl md:text-4xl font-gaming font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground text-sm md:text-base">Dias Restantes</div>
            </div>
            <div className="text-center" data-testid="stat-viewers">
              <div className="text-3xl md:text-4xl font-gaming font-bold text-secondary mb-2">2.5K</div>
              <div className="text-muted-foreground text-sm md:text-base">Espectadores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
