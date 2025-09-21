import { useState, useEffect } from "react";
import { Target, Zap, Users, Shield, Gamepad2 } from "lucide-react";
import videovava from "@/assets/videovava.mp4";
import logovava from "@/assets/logovava.png";

export default function ValorantSlider() {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    {
      text: "COPA TOMATÃO VALORANT EM BREVE",
      icon: Target,
      color: "text-red-400"
    },
    {
      text: "COPA TOMATÃO VALORANT",
      icon: Users,
      color: "text-blue-400"
    },
    {
      text: "AGENTS COM HABILIDADES ÚNICAS",
      icon: Zap,
      color: "text-purple-400"
    },
    {
      text: "MAPAS ESTRATÉGICOS",
      icon: Shield,
      color: "text-green-400"
    },
    {
      text: "GAMEPLAY INTENSO E RÁPIDO",
      icon: Gamepad2,
      color: "text-orange-400"
    },
    {
      text: "TIMES DE 5 JOGADORES",
      icon: Target,
      color: "text-red-400"
    },
    {
      text: "COPA TOMATÃO VALORANT",
      icon: Users,
      color: "text-blue-400"
    }
  ];

  // Auto-change message every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const currentMsg = messages[currentMessage];
  const Icon = currentMsg.icon;

  return (
    <>
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-muted/20 border-b border-muted/30">
        <div className="flex animate-scroll">
          {[...messages, ...messages].map((msg, index) => {
            const MsgIcon = msg.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-3 px-8 py-3 whitespace-nowrap flex-shrink-0"
              >
                <MsgIcon className={`w-4 h-4 ${msg.color}`} />
                <span className="text-sm font-medium text-muted-foreground">
                  {msg.text}
                </span>
                <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
              </div>
            );
          })}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>

      {/* Center Announcement */}
      <section className="py-12 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${logovava})` }}
        ></div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Video */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden glow-hover">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto max-h-80 object-contain"
                >
                  <source src={videovava} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
                
                {/* Video overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Play indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <div className="inline-block border border-muted/30 rounded-xl px-8 py-6 bg-muted/10 glow-hover">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${currentMsg.color}`} />
                    <h2 className="text-xl font-semibold text-foreground">
                      PRÓXIMA COMPETIÇÃO
                    </h2>
                    <Icon className={`w-6 h-6 ${currentMsg.color}`} />
                  </div>
                  
                  <p className="text-base text-muted-foreground mb-4 font-medium">
                    {messages[currentMessage].text}
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    {messages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMessage ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Status */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-primary">
                      EM DESENVOLVIMENTO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <div className="relative overflow-hidden bg-muted/20 border-t border-muted/30">
        <div className="flex animate-scroll-reverse">
          {[...messages, ...messages].map((msg, index) => {
            const MsgIcon = msg.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-3 px-8 py-3 whitespace-nowrap flex-shrink-0"
              >
                <MsgIcon className={`w-4 h-4 ${msg.color}`} />
                <span className="text-sm font-medium text-muted-foreground">
                  {msg.text}
                </span>
                <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
              </div>
            );
          })}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </>
  );
}