import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function LiveStreaming() {
  const openJamalzeralol = () => {
    window.open("https://www.twitch.tv/jamalzeralol", "_blank");
  };

  const openMecwelll = () => {
    window.open("https://www.twitch.tv/mecwelll", "_blank");
  };


  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Onde <span className="brand-text">Assistir</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe todas as partidas ao vivo nas nossas plataformas oficiais
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Jamalzeralol */}
            <div className="glass-card border border-white/10 p-8 text-center glow-hover relative overflow-hidden">
              {/* Card Background Texture */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-full flex items-center justify-center border border-purple-500/20">
                  <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428C1.714 21.143 2.571 22 3.43 22h17.143c.857 0 1.714-.857 1.714-1.286V4.286L17.714 0zm14.571 20.571H3.43V6.286L6 3.714h12l2.571 2.572z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-white" data-testid="text-jamalzeralol-title">Jamalzeralol</h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Capitão do Te Fizguei - Stream oficial do campeonato
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" data-testid="indicator-jamalzeralol-live"></div>
                    <span className="text-sm font-semibold text-red-400">AO VIVO</span>
                  </div>
                  <span className="text-sm text-gray-400" data-testid="text-jamalzeralol-viewers">
                    1.2K espectadores
                  </span>
                </div>
                <Button 
                  onClick={openJamalzeralol}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white glow-hover border-0 w-full py-3"
                  data-testid="button-jamalzeralol"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Assistir Stream
                </Button>
              </div>
            </div>

            {/* Mecwelll */}
            <div className="glass-card border border-white/10 p-8 text-center glow-hover relative overflow-hidden">
              {/* Card Background Texture */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/20 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-full flex items-center justify-center border border-purple-500/20">
                  <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428C1.714 21.143 2.571 22 3.43 22h17.143c.857 0 1.714-.857 1.714-1.286V4.286L17.714 0zm14.571 20.571H3.43V6.286L6 3.714h12l2.571 2.572z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-white" data-testid="text-mecwelll-title">Mecwelll</h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Streamer oficial do campeonato com análise técnica
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" data-testid="indicator-mecwelll-live"></div>
                    <span className="text-sm font-semibold text-red-400">AO VIVO</span>
                  </div>
                  <span className="text-sm text-gray-400" data-testid="text-mecwelll-viewers">
                    890 espectadores
                  </span>
                </div>
                <Button 
                  onClick={openMecwelll}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white glow-hover border-0 w-full py-3"
                  data-testid="button-mecwelll"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Assistir Stream
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 glass-card border border-white/10 px-8 py-6 glow-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-white" data-testid="text-next-match-title">Próxima Partida</div>
              <div className="text-sm text-gray-300" data-testid="text-next-match-info">
                Hoje às 20:00 - Aguardando times
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
