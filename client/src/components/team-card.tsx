import { Crown, Users, Trophy, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copaLogo from "@/assets/copa-tomatao.png";

export interface TeamData {
  id: string;
  name: string;
  captain: string;
  players: {
    top?: string;
    jungle?: string;
    mid?: string;
    adc?: string;
    support?: string;
  };
  wins: number;
  losses: number;
  points: number;
  logoUrl?: string;
  description?: string;
  founded?: string;
  achievements?: string[];
  featured?: boolean;
}

interface TeamCardProps {
  team: TeamData;
  compact?: boolean;
  index?: number;
  onViewDetails?: (team: TeamData) => void;
}

const laneIcons = {
  top: '⚔️',
  jungle: '🌲',
  mid: '⭐',
  adc: '🏹',
  support: '🛡️'
};

const laneColors = {
  top: 'from-red-500 to-orange-500',
  jungle: 'from-green-500 to-emerald-500',
  mid: 'from-yellow-500 to-amber-500',
  adc: 'from-purple-500 to-pink-500',
  support: 'from-blue-500 to-cyan-500'
};

export default function TeamCard({ team, compact = false, index = 0, onViewDetails }: TeamCardProps) {
  const winRate = team.wins + team.losses > 0 ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(0) : '0';
  const completedRoster = Object.values(team.players).filter(player => player).length;

  if (compact) {
    return (
      <div 
        className="relative group h-full"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Card Principal */}
        <div className="glass-card p-8 rounded-2xl glow-hover border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105 relative overflow-hidden h-full flex flex-col">
          {/* Background Pattern Sutil */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full blur-2xl"></div>
          </div>

          {/* Logo do Time */}
          <div className="relative z-10 text-center mb-6 flex-shrink-0">
            <div className="relative mx-auto w-24 h-24 mb-4">
              {/* Brilho de fundo sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-20"></div>
              
              {/* Container do logo */}
              <div className="relative w-full h-full bg-white/10 rounded-full p-3 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300">
                {team.logoUrl ? (
                  <img
                    src={team.logoUrl}
                    alt={`${team.name} Logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                             (e.target as HTMLImageElement).src = copaLogo;
                    }}
                  />
                ) : (
                  <Users className="w-full h-full text-white" />
                )}
              </div>
              
              {/* Efeito de brilho rotativo sutil */}
              <div className="absolute inset-0 rounded-full border border-yellow-400/20 animate-spin-slow"></div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
              {team.name}
            </h3>
          </div>

          {/* Informações do Time */}
          <div className="relative z-10 space-y-4 flex-grow flex flex-col justify-between">
            <p className="text-gray-300 text-sm text-center leading-relaxed">
              {team.description}
            </p>
            
            {/* Jogadores */}
            <div className="space-y-2 mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-400">Jogadores</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {Object.values(team.players).filter(player => player).slice(0, 3).map((player, playerIndex) => (
                  <span
                    key={playerIndex}
                    className="text-xs bg-white/10 px-2 py-1 rounded-full text-white hover:bg-yellow-400/20 transition-colors"
                  >
                    {player}
                  </span>
                ))}
                {Object.values(team.players).filter(player => player).length > 3 && (
                  <span className="text-xs bg-yellow-400/20 px-2 py-1 rounded-full text-yellow-400">
                    +{Object.values(team.players).filter(player => player).length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                CONFIRMADO
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden glow-hover group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="relative p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-soft">
              {team.logoUrl ? (
                <img src={team.logoUrl} alt={team.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <Users className="w-10 h-10 text-white" />
              )}
            </div>
            {team.featured && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center glow-soft">
                <Crown className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-heading font-bold text-white neon-text mb-1">
              {team.name}
            </h3>
            <p className="text-gray-300 flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              Capitão: {team.captain}
            </p>
            {team.founded && (
              <p className="text-sm text-gray-400">
                Fundado em {team.founded}
              </p>
            )}
          </div>
        </div>
        
        {team.description && (
          <p className="text-gray-300 text-sm leading-relaxed">
            {team.description}
          </p>
        )}
      </div>
      
      {/* Stats */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">{team.wins}</div>
            <div className="text-xs text-gray-400 uppercase">Vitórias</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">{team.losses}</div>
            <div className="text-xs text-gray-400 uppercase">Derrotas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{team.points}</div>
            <div className="text-xs text-gray-400 uppercase">Pontos</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Taxa de Vitória</span>
            <span>{winRate}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${winRate}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Roster */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Formação ({completedRoster}/5)
        </h4>
        
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(laneIcons).map(([lane, icon]) => {
            const player = team.players[lane as keyof typeof team.players];
            const laneColor = laneColors[lane as keyof typeof laneColors];
            
            return (
              <div key={lane} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${laneColor} rounded-full flex items-center justify-center text-white text-lg ${player ? 'glow-soft' : 'opacity-50'}`}>
                  {icon}
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  {lane}
                </div>
                <div className={`text-xs ${player ? 'text-white' : 'text-gray-500'} truncate`}>
                  {player || 'Vago'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Achievements */}
      {team.achievements && team.achievements.length > 0 && (
        <div className="px-6 pb-4">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Conquistas
          </h4>
          <div className="flex flex-wrap gap-2">
            {team.achievements.slice(0, 3).map((achievement, i) => (
              <span 
                key={i}
                className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium border border-yellow-400/30"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Action Button */}
      <div className="p-6 pt-0">
        <Button 
          onClick={() => onViewDetails?.(team)}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
