import { useState, useEffect } from 'react';
import { Clock, Calendar, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // formato: YYYY-MM-DD
  title?: string;
  subtitle?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ 
  targetDate, 
  title = "Contagem Regressiva",
  subtitle = "Faltam apenas"
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 18, hours: 10, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Construir a data corretamente com horário específico (meio-dia)
      const target = new Date(`${targetDate}T12:00:00-03:00`).getTime(); // Horário de Brasília
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Horas', value: timeLeft.hours, icon: Clock, color: 'from-purple-500 to-pink-500' },
    { label: 'Minutos', value: timeLeft.minutes, icon: Zap, color: 'from-green-500 to-emerald-500' },
    { label: 'Segundos', value: timeLeft.seconds, icon: Clock, color: 'from-orange-500 to-red-500' }
  ];

  if (isExpired) {
    return (
      <div className="glass-card p-8 rounded-xl text-center glow-hover">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center glow-soft">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-white neon-text mb-2">
          Evento Iniciado!
        </h3>
        <p className="text-gray-300">
          O Copa Tomatão já começou! Acompanhe as partidas ao vivo.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-xl glow-hover">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-heading font-bold text-white neon-text mb-2">
          {title}
        </h3>
        <p className="text-gray-300">
          {subtitle} para o início da Copa Tomatão
        </p>
        <div className="text-sm text-gray-400 mt-2">
          Início: 4 de outubro de 2025
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => {
          const Icon = unit.icon;
          return (
            <div
              key={unit.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${unit.color} rounded-full flex items-center justify-center glow-soft`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="glass-card p-4 rounded-lg border border-white/10">
                <div className="text-3xl font-bold text-white neon-text text-glow-soft">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {unit.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Início das inscrições</span>
          <span>Início do torneio</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out animate-shimmer"
            style={{ 
              width: '75%', // Simular progresso
              backgroundSize: '200% 100%'
            }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          75% até o início
        </div>
      </div>
    </div>
  );
}
