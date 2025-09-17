import { Crown, Star, Trophy, Zap } from "lucide-react";
import { useState } from "react";

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    nickname: string;
    avatar?: string;
    rank: string;
    lane: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';
    level: number;
    wins: number;
    losses: number;
    kda: string;
    mainChampions: string[];
    achievements: string[];
  };
  index?: number;
}

const laneIcons = {
  TOP: '⚔️',
  JUNGLE: '🌲', 
  MID: '⭐',
  ADC: '🏹',
  SUPPORT: '🛡️'
};

const laneColors = {
  TOP: 'from-red-500 to-orange-500',
  JUNGLE: 'from-green-500 to-emerald-500',
  MID: 'from-yellow-500 to-amber-500',
  ADC: 'from-purple-500 to-pink-500',
  SUPPORT: 'from-blue-500 to-cyan-500'
};

export default function PlayerCard({ player, index = 0 }: PlayerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-80 h-96 perspective-1000 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Card Container */}
      <div className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
        isFlipped ? 'rotate-y-180' : ''
      } ${isHovered ? 'scale-105' : ''}`}>
        
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {/* Main Card */}
          <div className="relative w-full h-full rounded-xl overflow-hidden glass-card border-2 border-white/20">
            {/* Background with animated particles */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/30 rounded-full animate-floating"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card Border Glow */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${laneColors[player.lane]} opacity-20 glow-soft`} />
            
            {/* Level Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${laneColors[player.lane]} flex items-center justify-center glow-soft`}>
                  <span className="text-white font-bold text-sm">{player.level}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="glass-card px-3 py-1 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-white">{player.rank}</span>
              </div>
            </div>

            {/* Player Avatar */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${laneColors[player.lane]} p-1 glow-soft`}>
                  <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
                    {player.avatar ? (
                      <img src={player.avatar} alt={player.nickname} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-3xl">{laneIcons[player.lane]}</div>
                    )}
                  </div>
                </div>
                {/* Floating lane indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className={`px-3 py-1 bg-gradient-to-r ${laneColors[player.lane]} rounded-full text-xs font-bold text-white animate-floating`}>
                    {player.lane}
                  </div>
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="absolute bottom-8 left-0 right-0 px-6 text-center z-10">
              <h3 className="text-xl font-heading font-bold text-white mb-1 neon-text">
                {player.nickname}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{player.name}</p>
              
              {/* Stats Row */}
              <div className="flex justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-green-400 font-bold text-sm">{player.wins}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-red-400 font-bold text-sm">{player.losses}</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-sm">{player.kda}</div>
                  <div className="text-xs text-gray-400">KDA</div>
                </div>
              </div>

              {/* Champions Icons */}
              <div className="flex justify-center space-x-2">
                {player.mainChampions.slice(0, 3).map((champion, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 bg-gray-700 rounded border border-white/20 flex items-center justify-center text-xs"
                  >
                    {champion.slice(0, 2)}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="relative w-full h-full rounded-xl overflow-hidden glass-card border-2 border-white/20 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-bold text-white neon-text mb-2">
                  {player.nickname}
                </h3>
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${laneColors[player.lane]} rounded-full text-xs font-bold text-white`}>
                  {player.lane} MAIN
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    Conquistas
                  </h4>
                  <div className="space-y-1">
                    {player.achievements.map((achievement, i) => (
                      <div key={i} className="text-xs text-gray-400 flex items-center">
                        <Star className="w-3 h-3 mr-2 text-yellow-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Champions */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-primary" />
                    Campeões Principais
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {player.mainChampions.map((champion, i) => (
                      <div key={i} className="glass-card p-2 text-center rounded border border-white/10">
                        <div className="text-xs text-white">{champion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <div className="text-xs text-gray-400">Clique para virar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
