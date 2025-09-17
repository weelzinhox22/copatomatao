import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shuffle, 
  Crown, 
  Target, 
  Zap, 
  Sword, 
  Shield, 
  Eye,
  Sparkles,
  Trophy,
  Star,
  Play
} from 'lucide-react';

// Importar assets
import actionCardVideo from '@/assets/actioncard.mp4';
import cardRevealImage from '@/assets/cardreveal1.jpg';

// Tipos
interface Player {
  id: string;
  name: string;
  tag: string;
  lane: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';
  rank: string;
  avatar?: string;
  isCaptain?: boolean;
}

interface Captain {
  id: string;
  name: string;
  tag: string;
  team: string;
  draftedPlayers: Player[];
}

// Dados dos jogadores disponíveis para sorteio (16 jogadores, 4 por lane)
// NOTA: LDates, Theushubu, Al Death e Jamal são capitães e NÃO estão nesta lista
const availablePlayers: Player[] = [
  // TOP LANE (4 jogadores)
  { id: '1', name: 'Sou a Guilhotina', tag: '00000', lane: 'TOP', rank: 'PLATINUM IV' },
  { id: '2', name: 'TopPlayer1', tag: 'TOP1', lane: 'TOP', rank: 'GOLD II' },
  { id: '3', name: 'TopPlayer2', tag: 'TOP2', lane: 'TOP', rank: 'GOLD I' },
  { id: '4', name: 'TopPlayer3', tag: 'TOP3', lane: 'TOP', rank: 'GOLD III' },
  
  // JUNGLE LANE (4 jogadores)
  { id: '5', name: 'Guizão Rapidão', tag: 'teco', lane: 'JUNGLE', rank: 'PLATINUM IV' },
  { id: '6', name: 'JunglePlayer1', tag: 'JG1', lane: 'JUNGLE', rank: 'GOLD III' },
  { id: '7', name: 'JunglePlayer2', tag: 'JG2', lane: 'JUNGLE', rank: 'GOLD II' },
  { id: '8', name: 'JunglePlayer3', tag: 'JG3', lane: 'JUNGLE', rank: 'GOLD I' },
  
  // MID LANE (4 jogadores)
  { id: '9', name: 'MidPlayer1', tag: 'MID1', lane: 'MID', rank: 'GOLD I' },
  { id: '10', name: 'MidPlayer2', tag: 'MID2', lane: 'MID', rank: 'GOLD II' },
  { id: '11', name: 'MidPlayer3', tag: 'MID3', lane: 'MID', rank: 'GOLD III' },
  { id: '12', name: 'MidPlayer4', tag: 'MID4', lane: 'MID', rank: 'GOLD IV' },
  
  // ADC LANE (4 jogadores)
  { id: '13', name: 'Beiço Reformed', tag: 'BLT', lane: 'ADC', rank: 'PLATINUM IV' },
  { id: '14', name: 'AdcPlayer1', tag: 'ADC1', lane: 'ADC', rank: 'GOLD II' },
  { id: '15', name: 'AdcPlayer2', tag: 'ADC2', lane: 'ADC', rank: 'GOLD I' },
  { id: '16', name: 'AdcPlayer3', tag: 'ADC3', lane: 'ADC', rank: 'GOLD III' },
  
  // SUPPORT LANE (4 jogadores)
  { id: '17', name: 'BLT Reformed', tag: 'BLT', lane: 'SUPPORT', rank: 'PLATINUM IV' },
  { id: '18', name: 'SupportPlayer1', tag: 'SUP1', lane: 'SUPPORT', rank: 'GOLD II' },
  { id: '19', name: 'SupportPlayer2', tag: 'SUP2', lane: 'SUPPORT', rank: 'GOLD I' },
  { id: '20', name: 'SupportPlayer3', tag: 'SUP3', lane: 'SUPPORT', rank: 'GOLD III' },
];

// Dados dos capitães (não estão na lista de jogadores disponíveis)
const captains: Captain[] = [
  { id: '1', name: 'LDates', tag: 'LDates', team: 'Kongs do Atlântico', draftedPlayers: [] },
  { id: '2', name: 'Jamal', tag: 'Jamal', team: 'Te Fizzguei', draftedPlayers: [] },
  { id: '3', name: 'Al Death', tag: 'AlDeath', team: 'Os Fimos', draftedPlayers: [] },
  { id: '4', name: 'Theushubu', tag: 'ZoioO', team: 'Zeca e os Urubus', draftedPlayers: [] },
];

// Ícones das lanes
const laneIcons = {
  TOP: Sword,
  JUNGLE: Target,
  MID: Zap,
  ADC: Eye,
  SUPPORT: Shield,
};

// Cores das lanes
const laneColors = {
  TOP: 'from-red-500 to-red-700',
  JUNGLE: 'from-green-500 to-green-700',
  MID: 'from-blue-500 to-blue-700',
  ADC: 'from-purple-500 to-purple-700',
  SUPPORT: 'from-yellow-500 to-yellow-700',
};

const DraftPage: React.FC = () => {
  const [currentCaptainIndex, setCurrentCaptainIndex] = useState(0);
  const [currentLane, setCurrentLane] = useState<'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT' | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftedPlayer, setDraftedPlayer] = useState<Player | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [remainingPlayers, setRemainingPlayers] = useState<Player[]>(availablePlayers);
  const [captainsData, setCaptainsData] = useState<Captain[]>(captains);
  const [draftPhase, setDraftPhase] = useState<'select-lane' | 'video-playing' | 'reveal' | 'complete'>('select-lane');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentCaptain = captainsData[currentCaptainIndex];

  // Função para sortear jogador por lane
  const draftPlayerByLane = (lane: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT') => {
    const playersInLane = remainingPlayers.filter(player => player.lane === lane);
    
    if (playersInLane.length === 0) {
      alert(`Não há mais jogadores disponíveis para a lane ${lane}`);
      return;
    }

    // Lógica avançada de sorteio com pesos
    const weights = playersInLane.map(player => {
      let weight = 1; // Peso base
      
      // Ajustar peso baseado no rank (ranks mais altos têm menor chance)
      if (player.rank.includes('DIAMOND')) weight *= 0.3;
      else if (player.rank.includes('PLATINUM')) weight *= 0.7;
      else if (player.rank.includes('GOLD')) weight *= 1.2;
      else if (player.rank.includes('SILVER')) weight *= 1.5;
      
      // Ajustar peso baseado na posição no array (primeiros têm menor chance)
      const positionWeight = 1 + (playersInLane.indexOf(player) * 0.1);
      weight *= positionWeight;
      
      return weight;
    });

    // Sorteio ponderado
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }

    return playersInLane[selectedIndex];
  };

  // Função para iniciar o sorteio
  const startDraft = (lane: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT') => {
    setCurrentLane(lane);
    setIsDrafting(true);
    setDraftPhase('video-playing');
    
    // Reproduzir vídeo
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
      
      // Timeout de fallback (5 segundos) caso o vídeo não termine
      setTimeout(() => {
        if (draftPhase === 'video-playing') {
          console.log('Timeout atingido, forçando reveal...');
          forceReveal();
        }
      }, 5000);
    }
  };

  // Função para quando o vídeo terminar
  const handleVideoEnd = () => {
    console.log('Vídeo terminou, revelando jogador...');
    const selectedPlayer = draftPlayerByLane(currentLane!);
    if (selectedPlayer) {
      console.log('Jogador sorteado:', selectedPlayer);
      setDraftedPlayer(selectedPlayer);
      setDraftPhase('reveal');
      setShowReveal(true);
    }
  };

  // Função para forçar o reveal após um tempo (fallback)
  const forceReveal = () => {
    console.log('Forçando reveal após timeout...');
    const selectedPlayer = draftPlayerByLane(currentLane!);
    if (selectedPlayer) {
      setDraftedPlayer(selectedPlayer);
      setDraftPhase('reveal');
      setShowReveal(true);
    }
  };

  // Função para confirmar o sorteio
  const confirmDraft = () => {
    if (draftedPlayer) {
      // Atualizar capitão com jogador sorteado
      const updatedCaptains = captainsData.map((captain, index) => {
        if (index === currentCaptainIndex) {
          return {
            ...captain,
            draftedPlayers: [...captain.draftedPlayers, draftedPlayer]
          };
        }
        return captain;
      });
      setCaptainsData(updatedCaptains);

      // Remover jogador da lista de disponíveis
      setRemainingPlayers(prev => prev.filter(p => p.id !== draftedPlayer.id));

      // Resetar estado
      setDraftedPlayer(null);
      setShowReveal(false);
      setCurrentLane(null);
      setIsDrafting(false);
      setDraftPhase('select-lane');

      // Próximo capitão ou finalizar
      if (currentCaptainIndex < captainsData.length - 1) {
        setCurrentCaptainIndex(prev => prev + 1);
      } else {
        // Reiniciar para próxima rodada ou finalizar
        if (captainsData[0].draftedPlayers.length < 4) {
          setCurrentCaptainIndex(0);
        } else {
          setDraftPhase('complete');
        }
      }
    }
  };

  // Função para reiniciar o draft
  const resetDraft = () => {
    setCurrentCaptainIndex(0);
    setCurrentLane(null);
    setIsDrafting(false);
    setDraftedPlayer(null);
    setShowReveal(false);
    setRemainingPlayers(availablePlayers);
    setCaptainsData(captains);
    setDraftPhase('select-lane');
    
    // Pausar vídeo se estiver tocando
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Obter jogadores disponíveis por lane
  const getAvailablePlayersByLane = (lane: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT') => {
    return remainingPlayers.filter(player => player.lane === lane);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-xl"></div>
                <Sparkles className="h-10 w-10 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                <span className="relative z-10 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                  Copa Tomatão Draft
                </span>
                <Sparkles className="h-10 w-10 text-secondary animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-lg"></div>
            </div>
            <p className="text-gray-300 text-xl font-medium">Sorteio de Jogadores para os Times</p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Status do Draft */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {captainsData.map((captain, index) => (
              <div key={captain.id} className="relative group">
                <Card className={`relative overflow-hidden rounded-3xl border transition-all duration-500 transform ${
                  index === currentCaptainIndex 
                    ? 'border-primary shadow-2xl shadow-primary/30 bg-gradient-to-br from-primary/15 to-secondary/15 scale-105' 
                    : 'border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/40 hover:scale-102 hover:border-gray-600/50'
                }`}>
                  {/* Background Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === currentCaptainIndex 
                      ? 'from-primary/10 via-secondary/5 to-primary/10' 
                      : 'from-gray-700/20 via-transparent to-gray-700/20'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardContent className="relative z-10 p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        index === currentCaptainIndex 
                          ? 'from-primary to-secondary shadow-lg shadow-primary/30' 
                          : 'from-gray-600 to-gray-800'
                      } flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110`}>
                        <Crown className="h-8 w-8 text-white" />
                        {index === currentCaptainIndex && (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{captain.name}</h3>
                        <p className="text-sm text-gray-300 font-medium">#{captain.tag}</p>
                        <p className="text-xs text-gray-400 mt-1">{captain.team}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                        <span className="text-sm text-gray-300 font-medium">Jogadores:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">{captain.draftedPlayers.length}</span>
                          <span className="text-sm text-gray-400">/4</span>
                        </div>
                      </div>
                      
                      {captain.draftedPlayers.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Jogadores Sorteados:</p>
                          <div className="flex flex-wrap gap-2">
                            {captain.draftedPlayers.map((player, playerIndex) => {
                              const LaneIcon = laneIcons[player.lane];
                              return (
                                <Badge key={playerIndex} variant="secondary" className="text-xs bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white hover:from-primary/20 hover:to-secondary/20 transition-all duration-300">
                                  <LaneIcon className="h-3 w-3 mr-1" />
                                  {player.name}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Área Principal do Draft */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Painel de Controle */}
            <div className="lg:col-span-1">
              <Card className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
                
                <CardContent className="relative z-10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Controle do Draft</h3>
                  </div>
                
                {draftPhase === 'select-lane' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Capitão Atual: {currentCaptain.name}
                      </h4>
                      <p className="text-sm text-gray-400">Escolha uma lane para sortear</p>
                    </div>
                    
                    <div className="space-y-4">
                      {(['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'] as const).map(lane => {
                        const availableCount = getAvailablePlayersByLane(lane).length;
                        const LaneIcon = laneIcons[lane];
                        const isDisabled = availableCount === 0;
                        
                        return (
                          <Button
                            key={lane}
                            onClick={() => startDraft(lane)}
                            disabled={isDisabled}
                            className={`w-full justify-between gap-4 h-16 rounded-2xl border transition-all duration-300 transform ${
                              isDisabled 
                                ? 'opacity-50 cursor-not-allowed bg-gray-800/30 border-gray-700/30' 
                                : 'bg-gradient-to-r from-gray-800/60 to-gray-900/40 border-gray-600/50 hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:from-primary/20 hover:to-secondary/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isDisabled 
                                  ? 'bg-gray-700/50' 
                                  : `bg-gradient-to-br ${laneColors[lane]} shadow-lg`
                              }`}>
                                <LaneIcon className="h-5 w-5 text-white" />
                              </div>
                              <span className="font-bold text-white text-lg">{lane}</span>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`px-3 py-1 text-sm font-bold ${
                                isDisabled 
                                  ? 'bg-gray-700/50 text-gray-400' 
                                  : 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border-primary/30'
                              }`}
                            >
                              {availableCount}
                            </Badge>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {draftPhase === 'video-playing' && (
                  <div className="text-center space-y-4">
                    <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <h4 className="text-lg font-semibold text-white">Revelando Carta...</h4>
                    <p className="text-sm text-gray-400">Lane: {currentLane}</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}

                {draftPhase === 'reveal' && draftedPlayer && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-white mb-2">Jogador Sorteado!</h4>
                      <p className="text-sm text-gray-400">Confirme o sorteio</p>
                    </div>
                    
                    <Button 
                      onClick={confirmDraft}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-3"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Confirmar Sorteio
                    </Button>
                  </div>
                )}

                {draftPhase === 'complete' && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Draft Concluído!</h4>
                    <p className="text-sm text-gray-400">Todos os times foram formados</p>
                    <Button 
                      onClick={resetDraft}
                      variant="outline"
                      className="w-full"
                    >
                      <Shuffle className="h-4 w-4 mr-2" />
                      Reiniciar Draft
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

            {/* Área de Reveal das Cartas */}
            <div className="lg:col-span-2">
              <Card className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl min-h-[600px] flex items-center justify-center">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
                
                <CardContent className="relative z-10 p-12 w-full">
                {draftPhase === 'select-lane' && (
                  <div className="text-center space-y-6">
                    {/* Vídeo de fundo */}
                    <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover opacity-30"
                        muted
                        loop
                        onEnded={handleVideoEnd}
                      >
                        <source src={actionCardVideo} type="video/mp4" />
                      </video>
                      
                      {/* Overlay com ícone */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-700/80 to-gray-900/80 rounded-2xl flex items-center justify-center border-2 border-gray-600 backdrop-blur-sm">
                          <Users className="h-16 w-16 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Aguardando Seleção</h3>
                      <p className="text-gray-400">Escolha uma lane para iniciar o sorteio</p>
                    </div>
                  </div>
                )}

                  {draftPhase === 'video-playing' && (
                    <div className="text-center space-y-8">
                      <div className="relative">
                        {/* Vídeo de Reveal */}
                        <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl">
                          <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            muted
                            autoPlay
                            onEnded={handleVideoEnd}
                            onLoadedData={() => console.log('Vídeo carregado')}
                            onError={(e) => console.error('Erro no vídeo:', e)}
                            onTimeUpdate={(e) => {
                              const video = e.target as HTMLVideoElement;
                              if (video.duration && video.currentTime / video.duration > 0.9) {
                                console.log('Vídeo quase terminando...');
                              }
                            }}
                          >
                            <source src={actionCardVideo} type="video/mp4" />
                            Seu navegador não suporta vídeos.
                          </video>
                          
                          {/* Overlay de loading */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                              <div className="text-white font-bold text-lg">Revelando...</div>
                              <div className="text-white/60 text-sm mt-2">Abrindo baú...</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                          Revelando Carta...
                        </h3>
                        <p className="text-gray-300 text-lg">Lane: <span className="font-bold text-primary">{currentLane}</span></p>
                        <div className="mt-4 flex justify-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        
                        {/* Botão de fallback para debug */}
                        <div className="mt-6">
                          <Button 
                            onClick={forceReveal}
                            variant="outline"
                            className="text-xs opacity-50 hover:opacity-100"
                          >
                            Forçar Reveal (Debug)
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {draftPhase === 'reveal' && draftedPlayer && (
                    <div className="text-center space-y-8">
                      <div className="relative">
                        {/* Carta Revelada com Imagem - Animação de Entrada */}
                        <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                          {/* Imagem de fundo da carta */}
                          <img
                            src={cardRevealImage}
                            alt="Carta Revelada"
                            className="w-full h-full object-cover animate-fade-in"
                          />
                          
                          {/* Overlay com informações do jogador */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 flex flex-col justify-between p-6 animate-fade-in-up">
                            {/* Header da Carta */}
                            <div className="flex justify-between items-start animate-slide-in-left">
                              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 animate-glow">
                                {draftedPlayer.lane}
                              </Badge>
                              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm px-3 py-1 animate-glow">
                                {draftedPlayer.rank}
                              </Badge>
                            </div>
                            
                            {/* Conteúdo Central */}
                            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                              {/* Avatar */}
                              <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/30 animate-pulse-glow">
                                <Users className="h-12 w-12 text-white" />
                              </div>
                              
                              {/* Nome do Jogador */}
                              <h4 className="text-xl font-bold text-white mb-2 animate-text-glow">{draftedPlayer.name}</h4>
                              <p className="text-white/80 text-sm font-medium">#{draftedPlayer.tag}</p>
                            </div>
                            
                            {/* Footer com Lane Icon */}
                            <div className="flex justify-center animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 animate-glow">
                                {React.createElement(laneIcons[draftedPlayer.lane], {
                                  className: "h-6 w-6 text-white"
                                })}
                              </div>
                            </div>
                          </div>
                          
                          {/* Efeitos de confete */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(50)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`,
                                  animationDuration: `${1 + Math.random() * 2}s`
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Efeito de explosão de luz */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                                style={{
                                  left: `${50 + (Math.random() - 0.5) * 30}%`,
                                  top: `${50 + (Math.random() - 0.5) * 30}%`,
                                  animationDelay: `${Math.random() * 1}s`,
                                  animationDuration: `${0.5 + Math.random() * 1}s`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent animate-text-glow">
                          Jogador Sorteado!
                        </h3>
                        <p className="text-gray-300 text-lg">Confirme para continuar</p>
                      </div>
                    </div>
                  )}

                {draftPhase === 'complete' && (
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
                      <Trophy className="h-16 w-16 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Draft Concluído!</h3>
                      <p className="text-gray-400">Todos os times foram formados com sucesso</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

          {/* Jogadores Restantes */}
          <div className="mt-12">
            <Card className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
              
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Jogadores Disponíveis</h3>
                    <p className="text-gray-300 text-lg">{remainingPlayers.length} jogadores restantes</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {remainingPlayers.map(player => {
                    const LaneIcon = laneIcons[player.lane];
                    return (
                      <div key={player.id} className="group relative">
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${laneColors[player.lane]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <LaneIcon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{player.name}</p>
                            <p className="text-xs text-gray-300 font-medium">{player.lane}</p>
                            <p className="text-xs text-gray-400">{player.rank}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftPage;
