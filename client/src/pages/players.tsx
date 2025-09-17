import { Button } from "@/components/ui/button";
import { User, Search, ExternalLink, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import AnimatedInfographic from "@/components/animated-infographic";
import RiotPlayerCard from "@/components/riot-player-card";
import { useRiotPlayer } from "@/hooks/useRiotAPI";


// Jogadores oficiais do campeonato Copa Tomatão
const officialPlayers = [
  {
    gameName: "welziinho",
    tagLine: "wel",
    lane: "MID/JUNGLE",
    team: "Indefinido",
    description: "Mid laner e jungler versátil com excelente controle de wave, roaming e timing de ganks. Conhecido por sua adaptabilidade entre as duas posições."
  },
  {
    gameName: "LDates",
    tagLine: "BR1", 
    lane: "JUNGLE",
    team: "Kongs do Atlântico",
    description: "Jungler experiente com excelente controle de objetivos e timing de ganks. Conhecido por suas decisões estratégicas em momentos cruciais."
  },
  {
    gameName: "Beiço Reformed",
    tagLine: "Cold",
    lane: "ADC",
    team: "Indefinido", 
    description: "ADC preciso com excelente posicionamento em teamfights e farm consistente. Conhecido por sua capacidade de carry em late game."
  },
  {
    gameName: "AZR Aldeath",
    tagLine: "mond",
    lane: "MID/TOP",
    team: "Os Fimos",
    description: "Mid laner e top laner versátil com excelente controle de lane e versatilidade de campeões. Conhecido por sua adaptabilidade entre as duas posições."
  },
  {
    gameName: "guizão rapidão",
    tagLine: "teco",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support versátil conhecido por suas jogadas criativas e excelente visão de jogo. Conhecido por suas jogadas inovadoras."
  },
  {
    gameName: "SOU A GUILHOTINA",
    tagLine: "00000",
    lane: "TOP",
    team: "Indefinido",
    description: "Top laner dominante com estilo de jogo agressivo e excelente controle de wave. Conhecido por suas jogadas ousadas e carry potential."
  },
  {
    gameName: "BLT Reformed",
    tagLine: "BLT",
    lane: "JUNGLE/SUPPORT",
    team: "Indefinido",
    description: "Jungler e support versátil com grande versatilidade de campeões e excelente controle de objetivos. Conhecido por sua adaptabilidade."
  },
  {
    gameName: "Theushubu",
    tagLine: "ZoioO",
    lane: "TOP/JUNGLE",
    team: "Zeca e os Urubus",
    description: "Top laner e jungler versátil com excelente farm, posicionamento e timing de ganks. Conhecido por sua versatilidade entre as duas posições."
  },
  {
    gameName: "ShadowStrike",
    tagLine: "BR1",
    lane: "JUNGLE",
    team: "Indefinido",
    description: "Jungler agressivo com excelente timing de ganks"
  },
  {
    gameName: "MidKing",
    tagLine: "BR1",
    lane: "MID",
    team: "Indefinido",
    description: "Mid laner dominante com pool de campeões diversificada"
  },
  {
    gameName: "SupportPro",
    tagLine: "BR1",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support estratégico com excelente visão de jogo"
  },
  {
    gameName: "TopDestroyer",
    tagLine: "BR1",
    lane: "TOP",
    team: "Indefinido",
    description: "Top laner tank com excelente controle de teamfight"
  },
  {
    gameName: "ADCPro",
    tagLine: "BR1",
    lane: "ADC",
    team: "Indefinido",
    description: "ADC preciso com excelente kiting e posicionamento"
  },
  {
    gameName: "JungleKing",
    tagLine: "BR1",
    lane: "JUNGLE",
    team: "Indefinido",
    description: "Jungler estratégico com controle total de objetivos"
  },
  {
    gameName: "MidMaster",
    tagLine: "BR1",
    lane: "MID",
    team: "Indefinido",
    description: "Mid laner técnico com excelente roaming"
  },
  {
    gameName: "SupportKing",
    tagLine: "BR1",
    lane: "SUPPORT",
    team: "Indefinido",
    description: "Support versátil com excelente proteção de carry"
  },
  {
    gameName: "TopLegend",
    tagLine: "BR1",
    lane: "TOP",
    team: "Indefinido",
    description: "Top laner experiente com excelente macro game"
  },
  {
    gameName: "ADCMaster",
    tagLine: "BR1",
    lane: "ADC",
    team: "Indefinido",
    description: "ADC técnico com excelente farm e teamfight"
  },
  {
    gameName: "JunglePro",
    tagLine: "BR1",
    lane: "JUNGLE",
    team: "Indefinido",
    description: "Jungler versátil com excelente controle de mapa"
  }
];


// Componente para exibir jogador oficial
function OfficialPlayerCard({ player }: { player: typeof officialPlayers[0] }) {
  const { data: playerData, isLoading, error } = useRiotPlayer(player.gameName, player.tagLine);

  if (isLoading) {
    return (
      <div className="glass-card p-4 rounded-xl glow-hover animate-pulse">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        <div className="space-y-1">
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4 rounded-xl glow-hover border border-red-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{player.gameName}#{player.tagLine}</h3>
            <p className="text-gray-400 text-sm">{player.team} • {player.lane}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-2">{player.description}</p>
        <p className="text-red-400 text-xs">Erro ao carregar dados</p>
      </div>
    );
  }

  const rank = playerData?.rank;
  const recentStats = playerData?.recentStats;

  return (
    <Link href={`/riot-player/${player.gameName}/${player.tagLine}`}>
      <div className="glass-card p-4 rounded-xl glow-hover hover:glow-medium transition-all duration-300 group cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {player.gameName.charAt(0).toUpperCase()}
            </span>
        </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{player.gameName}#{player.tagLine}</h3>
            <p className="text-gray-400 text-sm">{player.team} • {player.lane}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{player.description}</p>
        
        {rank && recentStats ? (
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
            <div className="text-center">
              <div className="text-sm font-bold text-primary">{rank.tier} {rank.rank}</div>
              <div className="text-xs text-gray-400">Rank</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-secondary">{rank.leaguePoints}</div>
              <div className="text-xs text-gray-400">LP</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-green-400">{recentStats.wins}V</div>
              <div className="text-xs text-gray-400">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-yellow-400">{recentStats.winRate}%</div>
              <div className="text-xs text-gray-400">WR</div>
              </div>
            </div>
          ) : (
          <div className="pt-3 border-t border-white/10">
            <p className="text-center text-gray-500 text-xs">Dados não disponíveis</p>
                    </div>
                  )}
      </div>
    </Link>
  );
}

export default function Players() {
  const { data: user } = useAuth();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Simplificado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 neon-text text-glow-soft">
            Jogadores da Copa Tomatão
          </h1>
                    </div>

        {/* Busca de Jogadores */}
        <div className="mb-12">
          <RiotPlayerCard />
                    </div>

        {/* Jogadores Oficiais do Campeonato */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white neon-text mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Jogadores Oficiais ({officialPlayers.length})
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Os jogadores oficiais do campeonato com dados atualizados da API da Riot Games
            </p>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {officialPlayers.map((player, index) => (
              <OfficialPlayerCard key={`${player.gameName}-${player.tagLine}`} player={player} />
            ))}
                      </div>
                    </div>

        {/* Estatísticas do Campeonato */}
        <div className="mb-16">
          <AnimatedInfographic />
        </div>

        {/* Call to Action */}
        {user?.role !== "player" && (
          <div className="mt-16 text-center">
            <div className="glass-card max-w-2xl mx-auto p-8 rounded-xl glow-hover">
              <h3 className="text-2xl font-heading font-bold mb-4 neon-text" data-testid="text-join-players-title">
                Junte-se aos Jogadores
                </h3>
              <p className="text-gray-300 mb-6">
                Cadastre-se como jogador e participe do maior campeonato de League of Legends da comunidade.
                </p>
                <Link href="/register" data-testid="link-join-players">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 glow-soft">
                    <User className="mr-2 h-5 w-5" />
                    Cadastrar como Jogador
                  </Button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
