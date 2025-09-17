import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function LiveStreaming() {
  const openTwitch = () => {
    window.open("https://twitch.tv", "_blank");
  };

  const openYouTube = () => {
    window.open("https://youtube.com", "_blank");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Onde <span className="brand-text">Assistir</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe todas as partidas ao vivo nas nossas plataformas oficiais
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="minimal-border p-8 text-center minimal-hover">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-600/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428C1.714 21.143 2.571 22 3.43 22h17.143c.857 0 1.714-.857 1.714-1.286V4.286L17.714 0zm14.571 20.571H3.43V6.286L6 3.714h12l2.571 2.572z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4" data-testid="text-twitch-title">Twitch</h3>
            <p className="text-muted-foreground mb-6">
              Transmissão principal com chat interativo e análises em tempo real
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" data-testid="indicator-live"></div>
                <span className="text-sm font-semibold text-red-500">AO VIVO</span>
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-twitch-viewers">
                2.1K espectadores
              </span>
            </div>
            <Button 
              onClick={openTwitch}
              className="bg-purple-600 hover:bg-purple-700 text-white minimal-hover w-full"
              data-testid="button-twitch"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Assistir na Twitch
            </Button>
          </div>
          
          <div className="minimal-border p-8 text-center minimal-hover">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-600/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4" data-testid="text-youtube-title">YouTube</h3>
            <p className="text-muted-foreground mb-6">
              Transmissão alternativa com replays e highlights das melhores jogadas
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" data-testid="indicator-youtube-live"></div>
                <span className="text-sm font-semibold text-red-500">AO VIVO</span>
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-youtube-viewers">
                890 espectadores
              </span>
            </div>
            <Button 
              onClick={openYouTube}
              className="bg-red-600 hover:bg-red-700 text-white minimal-hover w-full"
              data-testid="button-youtube"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Assistir no YouTube
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-card border border-border rounded-lg px-6 py-4">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <div className="text-left">
              <div className="font-semibold" data-testid="text-next-match-title">Próxima Partida</div>
              <div className="text-sm text-muted-foreground" data-testid="text-next-match-info">
                Hoje às 20:00 - Aguardando times
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
