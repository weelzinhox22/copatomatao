import React from "react";
import { Trophy, Star, Shield, Zap } from "lucide-react";

// Dados dos times confirmados
const confirmedTeams = [
  {
    id: 1,
    name: "Zeca e os Urubus",
    logo: "/src/assets/logo (1).png",
    players: ["Theushubu", "Player 2"],
    description: "Time agressivo com excelente controle de objetivos",
    color: "from-green-500 to-emerald-500",
    delay: "0ms"
  },
  {
    id: 2,
    name: "Kongs do Atlântico",
    logo: "/src/assets/logo (2).png",
    players: ["LDates", "Player 2"],
    description: "Time experiente com excelente estratégia de jogo",
    color: "from-blue-500 to-cyan-500",
    delay: "200ms"
  },
  {
    id: 3,
    name: "Os Fimos",
    logo: "/src/assets/logo (3).png",
    players: ["AZR Aldeath", "Player 2"],
    description: "Equipe versátil conhecida por suas jogadas criativas",
    color: "from-purple-500 to-pink-500",
    delay: "400ms"
  },
  {
    id: 4,
    name: "Te Fizguei",
    logo: "/src/assets/logo (4).png",
    players: ["welziinho", "Beiço Reformed", "guizão rapidão", "SOU A GUILHOTINA", "BLT Reformed"],
    description: "Equipe formada por jogadores individuais de elite",
    color: "from-orange-500 to-red-500",
    delay: "600ms"
  }
];

export default function ConfirmedTeams() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900/50 relative overflow-hidden">
      {/* Background Effects Sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold neon-text text-glow-medium">
              TIMES CONFIRMADOS
            </h2>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Os times oficiais que irão competir na Copa Tomatão. Cada equipe traz sua própria estratégia única e jogadores de elite.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {confirmedTeams.map((team, index) => (
            <div
              key={team.id}
              className="relative group h-full"
              style={{
                animationDelay: team.delay
              }}
            >
              {/* Card Principal */}
              <div className="glass-card p-8 rounded-2xl glow-hover border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105 relative overflow-hidden h-full flex flex-col">
                {/* Background Pattern Sutil */}
                <div className="absolute inset-0 opacity-5">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${team.color} rounded-full blur-3xl`}></div>
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${team.color} rounded-full blur-2xl`}></div>
                </div>

                {/* Logo do Time */}
                <div className="relative z-10 text-center mb-6 flex-shrink-0">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    {/* Brilho de fundo sutil */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-20"></div>
                    
                    {/* Container do logo */}
                    <div className="relative w-full h-full bg-white/10 rounded-full p-3 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300">
                      <img
                        src={team.logo}
                        alt={`${team.name} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/copa tomataão.png";
                        }}
                      />
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
                      {team.players.slice(0, 3).map((player, playerIndex) => (
                        <span
                          key={playerIndex}
                          className="text-xs bg-white/10 px-2 py-1 rounded-full text-white hover:bg-yellow-400/20 transition-colors"
                        >
                          {player}
                        </span>
                      ))}
                      {team.players.length > 3 && (
                        <span className="text-xs bg-yellow-400/20 px-2 py-1 rounded-full text-yellow-400">
                          +{team.players.length - 3}
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
          ))}
        </div>

        {/* Estatísticas dos Times */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="glass-card p-6 rounded-xl text-center border border-yellow-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{confirmedTeams.length}</div>
            <div className="text-sm text-gray-400">Times Confirmados</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-blue-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">20</div>
            <div className="text-sm text-gray-400">Jogadores Totais</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-green-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
            <div className="text-sm text-gray-400">Taxa de Confirmação</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center border border-purple-400/20">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">1</div>
            <div className="text-sm text-gray-400">Campeão Será</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card max-w-2xl mx-auto p-8 rounded-xl glow-hover border border-yellow-400/20">
            <h3 className="text-3xl font-heading font-bold mb-4 neon-text text-glow-medium">
              Pronto para a Batalha?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Os times estão formados e prontos para competir. A Copa Tomatão está prestes a começar!
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-semibold">Competição Iniciando Em Breve</span>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
