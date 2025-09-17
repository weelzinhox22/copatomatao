import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import bgVideo from "../assets/bghome.mp4";
import CountdownTimer from "./countdown-timer";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
                {/* Enhanced overlay for better text readability */}
                <div className="absolute inset-0 bg-black/25"></div>
                {/* Bottom gradient for text area */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                {/* Top gradient for header text */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-5rem)]">
          {/* Content Left Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full text-sm font-medium animate-scale-in glow-soft">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-white">Inscrições abertas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight animate-fade-in-up">
                <span className="text-white hero-text-enhanced" style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.6)'
                }}>Copa Tomatão</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed animate-fade-in-up hero-text-enhanced" style={{animationDelay: "0.2s"}}>
                Campeonato de League of Legends feito por pura resenha entre amigos e conhecidos. 
                Reúna seu time e venha se divertir com a galera!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold text-white hero-button-secondary"
                  data-testid="button-watch-live"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Assistir Transmissões
                </Button>
              </div>
            </div>
          </div>

          {/* Center/Right Side - Free for video visibility */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end lg:pr-2">
            {/* Countdown Timer positioned aligned with left content */}
            <div className="max-w-lg animate-fade-in-up lg:ml-8" style={{animationDelay: "0.6s"}}>
              <CountdownTimer 
                targetDate="2025-10-04"
                title="Início do Torneio"
                subtitle="Faltam apenas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
