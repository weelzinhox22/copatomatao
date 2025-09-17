import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Target, Clock, Zap, Crown } from "lucide-react";

// Dados fictícios do torneio
const mockTournamentData = {
  currentPhase: "Em Breve",
  completedMatches: 0,
  totalMatches: 0,
  nextMatch: "A definir",
  progress: 0,
  upcomingMatches: [],
  recentResults: []
};

export default function TournamentStatus() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 neon-text text-glow-soft">
            Status do Torneio
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Acompanhe o progresso do campeonato e veja os confrontos das próximas fases
          </p>
        </div>
        
        {/* Tournament Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 rounded-xl text-center glow-hover animate-fade-in-up">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center glow-soft">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white neon-text text-glow-soft">{mockTournamentData.currentPhase}</div>
            <div className="text-gray-400 text-sm">Fase Atual</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center glow-hover animate-fade-in-up" style={{animationDelay: "0.1s"}}>
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center glow-soft">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white neon-text">{mockTournamentData.completedMatches}/{mockTournamentData.totalMatches}</div>
            <div className="text-gray-400 text-sm">Partidas</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center glow-hover animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center glow-soft">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white neon-text">{mockTournamentData.progress}%</div>
            <div className="text-gray-400 text-sm">Concluído</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center glow-hover animate-fade-in-up" style={{animationDelay: "0.3s"}}>
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center glow-soft">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white neon-text">Hoje 20h</div>
            <div className="text-gray-400 text-sm">Próxima</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Matches */}
          <div className="glass-card p-8 rounded-xl glow-hover animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            <h3 className="text-2xl font-heading font-bold text-white neon-text mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Próximas Partidas
            </h3>
            
            <div className="space-y-4">
              {mockTournamentData.upcomingMatches.map((match, index) => (
                <div key={match.id} className="glass-card p-4 rounded-lg border border-white/10 glow-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                      OITAVAS #{index + 1}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{match.date} - {match.time}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <span className="font-semibold text-white">{match.team1}</span>
                      <span className="text-gray-400">vs</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <span className="font-semibold text-white">{match.team2}</span>
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">AGUARDANDO</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="glass-card p-8 rounded-xl glow-hover animate-fade-in-up" style={{animationDelay: "0.5s"}}>
            <h3 className="text-2xl font-heading font-bold text-white neon-text mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-secondary" />
              Resultados Recentes
            </h3>
            
            <div className="space-y-4">
              {mockTournamentData.recentResults.map((match, index) => (
                <div key={match.id} className="glass-card p-4 rounded-lg border border-white/10 glow-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                      FINALIZADA
                    </span>
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${match.winner === 'team1' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                      <span className={`font-semibold ${match.winner === 'team1' ? 'text-green-400' : 'text-red-400'}`}>
                        {match.team1}
                      </span>
                      <span className={`font-bold text-xl ${match.winner === 'team1' ? 'text-green-400' : 'text-red-400'}`}>
                        {match.team1Score}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${match.winner === 'team2' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                      <span className={`font-semibold ${match.winner === 'team2' ? 'text-green-400' : 'text-red-400'}`}>
                        {match.team2}
                      </span>
                      <span className={`font-bold text-xl ${match.winner === 'team2' ? 'text-green-400' : 'text-red-400'}`}>
                        {match.team2Score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 glass-card p-8 rounded-xl glow-hover animate-fade-in-up" style={{animationDelay: "0.6s"}}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-heading font-bold text-white neon-text mb-2">
              Progresso do Torneio
            </h3>
            <p className="text-gray-300">
              {mockTournamentData.currentPhase} - {mockTournamentData.progress}% concluído
            </p>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer transition-all duration-2000 ease-out"
                style={{ 
                  width: `${mockTournamentData.progress}%`,
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            <div className={`absolute top-5 transform -translate-x-1/2 transition-all duration-1000`} style={{left: `${mockTournamentData.progress}%`}}>
              <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">
                {mockTournamentData.progress}%
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <span>Início</span>
            <span>Final</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <Button 
            className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft"
            data-testid="button-view-bracket"
          >
            <Trophy className="mr-2 w-5 h-5" />
            Ver Chaveamento Completo
          </Button>
        </div>
      </div>
    </section>
  );
}
