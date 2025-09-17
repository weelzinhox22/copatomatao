import { useEffect, useState } from 'react';
import { Trophy, Users, Zap, Target, Crown, Sword } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<any>;
  label: string;
  value: number;
  suffix: string;
  color: string;
  delay: number;
}

const stats: StatItem[] = [
  { icon: Users, label: 'Jogadores Ativos', value: 20, suffix: '', color: 'from-blue-500 to-cyan-500', delay: 0 },
  { icon: Trophy, label: 'Diversão Total', value: 100, suffix: '%', color: 'from-yellow-500 to-orange-500', delay: 0.2 },
  { icon: Zap, label: 'Partidas Jogadas', value: 45, suffix: '', color: 'from-purple-500 to-pink-500', delay: 0.4 },
  { icon: Target, label: 'Precisão Média', value: 87, suffix: '%', color: 'from-green-500 to-emerald-500', delay: 0.6 },
  { icon: Crown, label: 'MVP Awards', value: 12, suffix: '', color: 'from-red-500 to-pink-500', delay: 0.8 },
  { icon: Sword, label: 'KDA Médio', value: 2.4, suffix: '', color: 'from-indigo-500 to-purple-500', delay: 1.0 }
];

function AnimatedCounter({ targetValue, suffix, delay }: { targetValue: number; suffix: string; delay: number }) {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = targetValue / 50;
      const interval = setInterval(() => {
        setCurrent(prev => {
          const next = prev + increment;
          if (next >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return next;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [targetValue, delay]);
  
  return (
    <span className="neon-text text-2xl font-bold">
      {suffix === 'R$' && suffix}
      {typeof targetValue === 'number' && targetValue % 1 !== 0 
        ? current.toFixed(1) 
        : Math.floor(current)
      }
      {suffix !== 'R$' && suffix}
    </span>
  );
}

function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Matrix-like background */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-gradient-to-b from-primary/20 to-transparent animate-matrix-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: '100px',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`shape-${i}`}
          className="absolute w-4 h-4 border border-primary/20 rotate-45 animate-floating"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}

export default function AnimatedInfographic() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('infographic');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="infographic" className="py-20 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 neon-text text-glow-soft">
            Estatísticas do Torneio
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Acompanhe os números impressionantes da Copa Tomatão em tempo real
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative group"
                style={{ animationDelay: `${stat.delay}s` }}
              >
                {/* Card */}
                <div className="glass-card p-8 rounded-xl border-2 border-white/10 glow-hover tilt-hover relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />
                  
                  {/* Data stream effect */}
                  <div className="absolute top-0 left-0 w-full h-0.5 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stat.color} animate-data-stream`} 
                         style={{ animationDelay: `${stat.delay + 2}s` }} />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center glow-soft group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Value */}
                    <div className="text-center mb-4">
                      {isVisible && (
                        <AnimatedCounter 
                          targetValue={stat.value} 
                          suffix={stat.suffix}
                          delay={stat.delay}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <h3 className="text-center text-white font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {stat.label}
                    </h3>

                    {/* Progress bar */}
                    <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out ${
                          isVisible ? 'w-full' : 'w-0'
                        }`}
                        style={{ transitionDelay: `${stat.delay + 0.5}s` }}
                      />
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full animate-floating`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tournament Progress Bar */}
        <div className="mt-16 glass-card p-8 rounded-xl border-2 border-white/10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              Progresso do Torneio
            </h3>
            <p className="text-gray-300">Fase atual: Oitavas de Final</p>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer transition-all duration-2000 ease-out w-3/4"
                style={{ 
                  backgroundSize: '200% 100%',
                  animationDelay: '1s'
                }}
              />
            </div>
            <div className="absolute top-5 left-3/4 transform -translate-x-1/2">
              <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">
                75%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
