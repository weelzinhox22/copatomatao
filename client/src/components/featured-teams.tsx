import { Button } from "@/components/ui/button";
import TeamCard, { TeamData } from "./team-card";
import TeamDetailsModal from "./team-details-modal";
import { useState } from "react";

// Dados fictícios dos 4 times
const mockTeams: TeamData[] = [
  {
    id: "1",
    name: "Zeca e os Urubus",
    captain: "Theushubu",
    players: {
      top: "Theushubu",
      jungle: "Player2", 
      mid: "Player3",
      adc: "Player4",
      support: "Player5"
    },
    wins: 10,
    losses: 8,
    points: 30,
    description: "Veteranos experientes que nunca desistem, famosos pelas viradas épicas e espírito de luta.",
    founded: "Setembro 2025",
    achievements: ["Especialistas em comebacks", "Veteranos da comunidade", "Melhor espírito esportivo"],
    featured: true,
          logoUrl: "/logo-1.png"
  },
  {
    id: "2",
    name: "Kongs do Atlântico",
    captain: "LDates",
    players: {
      top: "Player2",
      jungle: "LDates",
      mid: "Player3",
      adc: "Player4",
      support: "Player5"
    },
    wins: 15,
    losses: 3,
    points: 45,
    description: "Time dominante da região nordeste, conhecido por suas jogadas agressivas e estratégias inovadoras.",
    founded: "Setembro 2025",
    achievements: ["Time confirmado para Copa Tomatão", "Preparação intensiva", "Maior taxa de kills por minuto"],
    featured: true,
          logoUrl: "/logo-2.png"
  },
  {
    id: "3",
    name: "Os Fimos",
    captain: "AZR Aldeath",
    players: {
      top: "Player2",
      jungle: "Player3",
      mid: "AZR Aldeath",
      adc: "Player4",
      support: "Player5"
    },
    wins: 12,
    losses: 6,
    points: 36,
    description: "Equipe técnica e estratégica, especialistas em late game e teamfights coordenados.",
    founded: "Setembro 2025",
    achievements: ["Estratégias de late game", "Preparação defensiva", "Melhor coordenação de teamfights"],
    featured: true,
          logoUrl: "/logo-3.png"
  },
  {
    id: "4",
    name: "Te Fizguei",
    captain: "welziinho",
    players: {
      top: "SOU A GUILHOTINA",
      jungle: "BLT Reformed",
      mid: "welziinho",
      adc: "Beiço Reformed",
      support: "guizão rapidão"
    },
    wins: 14,
    losses: 4,
    points: 42,
    description: "Equipe formada por jogadores individuais de elite com grande potencial explosivo.",
    founded: "Setembro 2025",
    achievements: ["Equipe de jogadores individuais de elite", "Maior diversidade de estilos", "Flexibilidade tática única"],
    featured: false,
          logoUrl: "/logo-4.png"
  }
];

export default function FeaturedTeams() {
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (team: TeamData) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40v40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 neon-text text-glow-soft">
            Times Confirmados
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Conheça os times que estão fazendo história no Copa Tomatão
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mockTeams.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              compact={true}
              index={index}
            />
          ))}
        </div>

        {/* Featured Team Spotlight */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-heading font-bold text-white neon-text mb-4">
              Time em Spotlight
            </h3>
            <p className="text-gray-300">
              Destaque especial para o líder atual do torneio
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TeamCard
              team={mockTeams[0]} // Zeca e os Urubus como destaque
              compact={false}
              index={0}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-16">
          <Button 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft"
          >
            Ver Todos os Times
          </Button>
        </div>
      </div>

      {/* Modal */}
      <TeamDetailsModal
        team={selectedTeam}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
