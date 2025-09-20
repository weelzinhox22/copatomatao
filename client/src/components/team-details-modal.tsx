import React from 'react';
import { X, Users, Trophy, Star, Crown, Target, Shield, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamData } from './team-card';

interface TeamDetailsModalProps {
  team: TeamData | null;
  isOpen: boolean;
  onClose: () => void;
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

export default function TeamDetailsModal({ team, isOpen, onClose }: TeamDetailsModalProps) {
  if (!isOpen || !team) return null;

  const winRate = team.wins + team.losses > 0 ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(0) : '0';
  const completedRoster = Object.values(team.players).filter(player => player).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="glass-card rounded-2xl overflow-hidden glow-hover border border-white/20">
          {/* Header */}
          <div className="relative p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5"></div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                {/* Logo */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center p-4 border-2 border-white/20 shadow-xl">
                    {team.logoUrl ? (
                      <img
                        src={team.logoUrl}
                        alt={`${team.name} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                        }}
                      />
                    ) : (
                      <Users className="w-full h-full text-white" />
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20"></div>
                </div>
                
                {/* Team Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    {team.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-300 font-semibold">Capitão: {team.captain}</span>
                    </div>
                    {team.featured && (
                      <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-400/30">
                        <Star className="w-4 h-4 inline mr-1" />
                        DESTAQUE
                      </div>
                    )}
                  </div>
                  {team.founded && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Fundado em {team.founded}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {team.description && (
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {team.description}
                </p>
              )}

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-green-400 mb-1">{team.wins}</div>
                  <div className="text-sm text-gray-500 font-medium">Vitórias</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-red-400 mb-1">{team.losses}</div>
                  <div className="text-sm text-gray-500 font-medium">Derrotas</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-primary mb-1">{winRate}%</div>
                  <div className="text-sm text-gray-500 font-medium">Taxa de Vitória</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/30">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{team.points}</div>
                  <div className="text-sm text-gray-500 font-medium">Pontos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Players */}
              <div>
                <h3 className="text-2xl font-heading neon-text flex items-center gap-2 mb-6">
                  <Users className="h-6 w-6" />
                  Escalação Principal
                </h3>
                <div className="space-y-4">
                  {Object.entries(laneIcons).map(([lane, icon]) => {
                    const player = team.players[lane as keyof typeof team.players];
                    const laneColor = laneColors[lane as keyof typeof laneColors];
                    
                    return (
                      <div key={lane} className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                        player 
                          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-primary/50 shadow-lg shadow-primary/10' 
                          : 'bg-gradient-to-br from-gray-800/30 to-gray-900/20 border-gray-700/30'
                      }`}>
                        <div className="relative p-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg ${
                              player 
                                ? `bg-gradient-to-br ${laneColor} shadow-lg` 
                                : 'bg-gradient-to-br from-gray-700 to-gray-800 opacity-50'
                            }`}>
                              {icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-400 uppercase mb-1">
                                {lane}
                              </div>
                              <div className={`font-bold ${player ? 'text-white' : 'text-gray-500'}`}>
                                {player || 'Vago'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Info */}
              <div className="space-y-6">
                {/* Achievements */}
                {team.achievements && team.achievements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-heading neon-text flex items-center gap-2 mb-4">
                      <Trophy className="h-5 w-5" />
                      Conquistas
                    </h3>
                    <div className="space-y-3">
                      {team.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 glass-card p-3 rounded-lg">
                          <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Stats */}
                <div>
                  <h3 className="text-xl font-heading neon-text flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5" />
                    Estatísticas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Formação Completa:</span>
                      <span className="font-semibold text-white">{completedRoster}/5</span>
                    </div>
                    <div className="flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-semibold text-green-400">Confirmado</span>
                      </div>
                    </div>
                    <div className="flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <span className="text-gray-400 text-sm font-medium">Partidas Jogadas:</span>
                      <span className="font-semibold text-white">{team.wins + team.losses}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
              <Button 
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white glow-hover border-0"
              >
                Fechar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
              >
                Ver Todos os Times
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
