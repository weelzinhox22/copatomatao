import { Button } from "@/components/ui/button";
import TeamCard, { TeamData } from "./team-card";

// Dados fictícios dos 4 times
const mockTeams: TeamData[] = [
  {
    id: "1",
    name: "Kongs do Atlântico",
    captain: "KongKing",
    players: {
      top: "TopKong",
      jungle: "JungleKong", 
      mid: "MidKong",
      adc: "ADCKong",
      support: "SuppKong"
    },
    wins: 15,
    losses: 3,
    points: 45,
    description: "Time dominante do servidor brasileiro, conhecidos pela agressividade e jogadas coordenadas.",
    founded: "Janeiro 2024",
    achievements: ["Campeão Regional Sul", "MVP Torneio Inverno", "Melhor Early Game"],
    featured: true
  },
  {
    id: "2",
    name: "Os Fimos",
    captain: "FimoLeader",
    players: {
      top: "FimoTop",
      jungle: "FimoJungle",
      mid: "FimoMid",
      adc: "FimoADC",
      support: "FimoSupp"
    },
    wins: 12,
    losses: 6,
    points: 36,
    description: "Equipe veterana com muito entrosamento e experiência em torneios comunitários.",
    founded: "Novembro 2023",
    achievements: ["Vice-campeão Regional", "Melhor Teamfight", "Fair Play Award"],
    featured: true
  },
  {
    id: "3",
    name: "Te Fizzguei",
    captain: "FizzMaster",
    players: {
      top: "FizzTop",
      jungle: "FizzJungle",
      mid: "FizzMid",
      adc: "FizzADC",
      support: "FizzSupp"
    },
    wins: 14,
    losses: 4,
    points: 42,
    description: "Time jovem e talentoso, especialista em picks não convencionais e estratégias criativas.",
    founded: "Março 2024",
    achievements: ["Revelação do Ano", "Melhor Pick Criativo", "Upset do Torneio"],
    featured: true
  },
  {
    id: "4",
    name: "Zeca e os Urubus",
    captain: "ZecaUrubu",
    players: {
      top: "UrubuTop",
      jungle: "UrubuJungle",
      mid: "ZecaMid",
      adc: "UrubuADC",
      support: "UrubuSupp"
    },
    wins: 10,
    losses: 8,
    points: 30,
    description: "A surpresa do torneio! Time que chegou voando e não para de surpreender a cada partida.",
    founded: "Maio 2024",
    achievements: ["Maior Upset", "Melhor Comeback", "Torcida Mais Animada"],
    featured: false
  }
];

export default function FeaturedTeams() {
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
            Times em Destaque
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
              team={mockTeams[0]} // Kongs do Atlântico como destaque
              compact={false}
              index={0}
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
    </section>
  );
}
