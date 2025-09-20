import { useState } from 'react';

export interface ShareCardData {
  type: 'team' | 'player' | 'match' | 'tournament';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  stats?: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  colors?: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export function useShareCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState<ShareCardData | null>(null);

  const openShareCard = (data: ShareCardData) => {
    setCardData(data);
    setIsOpen(true);
  };

  const closeShareCard = () => {
    setIsOpen(false);
    setCardData(null);
  };

  return {
    isOpen,
    cardData,
    openShareCard,
    closeShareCard,
  };
}

// Funções utilitárias para criar dados de cards específicos
export const createTeamCard = (team: {
  name: string;
  captain: string;
  wins: number;
  losses: number;
  logo?: string;
  description?: string;
}): ShareCardData => ({
  type: 'team',
  title: team.name,
  subtitle: `Capitão: ${team.captain}`,
  description: team.description || `Time oficial da Copa Tomatão`,
  image: team.logo,
  stats: [
    { label: 'Vitórias', value: team.wins.toString(), icon: '🏆' },
    { label: 'Derrotas', value: team.losses.toString(), icon: '⚔️' },
    { label: 'Taxa de Vitória', value: `${team.wins + team.losses > 0 ? Math.round((team.wins / (team.wins + team.losses)) * 100) : 0}%`, icon: '📊' },
    { label: 'Status', value: 'Confirmado', icon: '✅' }
  ],
  colors: {
    primary: '#10B981',
    secondary: '#059669',
    background: '#064E3B'
  }
});

export const createPlayerCard = (player: {
  gameName: string;
  tagLine: string;
  team: string;
  lane: string;
  rank?: string;
  level?: number;
  avatar?: string;
}): ShareCardData => ({
  type: 'player',
  title: player.gameName,
  subtitle: `#${player.tagLine}`,
  description: `${player.lane} do ${player.team}`,
  image: player.avatar,
  stats: [
    { label: 'Time', value: player.team, icon: '👥' },
    { label: 'Posição', value: player.lane, icon: '🎯' },
    { label: 'Rank', value: player.rank || 'Unranked', icon: '⭐' },
    { label: 'Nível', value: player.level?.toString() || '?', icon: '📈' }
  ],
  colors: {
    primary: '#3B82F6',
    secondary: '#1D4ED8',
    background: '#1E3A8A'
  }
});

export const createMatchCard = (match: {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  phase: string;
  date: string;
  winner?: string;
}): ShareCardData => ({
  type: 'match',
  title: `${match.team1} vs ${match.team2}`,
  subtitle: match.phase,
  description: `Partida da Copa Tomatão - ${match.date}`,
  stats: [
    { label: 'Time 1', value: match.team1, icon: '🔵' },
    { label: 'Score', value: match.score1 ? `${match.score1} - ${match.score2}` : 'vs', icon: '⚔️' },
    { label: 'Time 2', value: match.team2, icon: '🔴' },
    { label: 'Fase', value: match.phase, icon: '🏆' }
  ],
  colors: {
    primary: '#F59E0B',
    secondary: '#D97706',
    background: '#92400E'
  }
});

export const createTournamentCard = (): ShareCardData => ({
  type: 'tournament',
  title: 'Copa Tomatão 2025',
  subtitle: 'Campeonato de League of Legends',
  description: 'O maior campeonato entre amigos da comunidade!',
  stats: [
    { label: 'Times', value: '4', icon: '👥' },
    { label: 'Jogadores', value: '20', icon: '🎮' },
    { label: 'Status', value: 'Em Breve', icon: '⏰' },
    { label: 'Formato', value: 'Eliminação', icon: '🏆' }
  ],
  colors: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    background: '#5B21B6'
  }
});
