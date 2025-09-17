import { Crown, Users, Trophy, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function TeamCard({ team, compact = false, index = 0 }: TeamCardProps) {
  const winRate = team.wins + team.losses > 0 ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(0) : '0';
  const completedRoster = Object.values(team.players).filter(player => player).length;

  if (compact) {
    return (
      <div 
        className="glass-card p-4 rounded-xl glow-hover group cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-soft">
              {team.logoUrl ? (
                <img src={team.logoUrl} alt={team.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>
            {team.featured && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-white neon-text group-hover:text-primary transition-colors duration-300">
              {team.name}
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              Capitão: {team.captain}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{completedRoster}/5 jogadores</span>
              <span>{team.points} pts</span>
              <span>{winRate}% vitórias</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-green-400">{team.wins}</div>
            <div className="text-xs text-gray-400">vitórias</div>
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
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
