import { Button } from "@/components/ui/button";
import NewsCard, { NewsItem } from "./news-card";

// Dados fictícios de notícias
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Copa Tomatão 2024: Inscrições abertas para o maior torneio da comunidade!",
    excerpt: "O aguardado Copa Tomatão está de volta! Venha participar do campeonato mais divertido e competitivo entre amigos. Inscrições abertas até o fim do mês.",
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-15T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Torneio",
    featured: true,
    slug: "copa-tomatao-2024-inscricoes-abertas"
  },
  {
    id: "2", 
    title: "Kongs do Atlântico domina as primeiras rodadas",
    excerpt: "Time liderado por KongKing mostra superioridade nas oitavas de final com estratégias agressivas e excelente coordenação de equipe.",
    author: "Repórter LoL",
    publishedAt: "2025-09-14T15:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=200&fit=crop",
    category: "Resultados",
    slug: "kongs-atlantico-domina-primeiras-rodadas"
  },
  {
    id: "3",
    title: "Te Fizzguei surpreende com pick inesperado",
    excerpt: "Na partida contra Os Fimos, o time apostou em uma composição não-meta que resultou numa vitória espetacular e muitos highlights.",
    author: "Analista Pro",
    publishedAt: "2025-09-13T20:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
    category: "Highlights",
    slug: "te-fizzguei-pick-inesperado"
  },
  {
    id: "4",
    title: "Zeca e os Urubus: A surpresa que voou alto",
    excerpt: "Conheça a história por trás do time que ninguém esperava e que está surpreendendo a todos com sua garra e determinação.",
    author: "Jornalista Gamer",
    publishedAt: "2025-09-12T14:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop",
    category: "Perfil",
    slug: "zeca-urubus-surpresa-torneio"
  },
  {
    id: "5",
    title: "Regulamento atualizado: Novas regras para fair play",
    excerpt: "Confira as atualizações no regulamento do torneio, focadas em garantir um ambiente justo e divertido para todos os participantes.",
    author: "Comissão Organizadora",
    publishedAt: "2025-09-11T09:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1586953295165-e44cd8e0ee67?w=400&h=200&fit=crop",
    category: "Regulamento",
    slug: "regulamento-atualizado-fair-play"
  },
  {
    id: "6",
    title: "Os Fimos mostram experiência nas semifinais",
    excerpt: "Veteranos do cenário competitivo mostram que experiência conta muito em momentos decisivos do campeonato.",
    author: "Comentarista eSports",
    publishedAt: "2025-09-10T18:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
    category: "Análise",
    slug: "os-fimos-experiencia-semifinais"
  }
];

export default function LatestNews() {
  const featuredNews = mockNews.find(news => news.featured);
  const regularNews = mockNews.filter(news => !news.featured);

    return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 neon-text text-glow-soft">
            Últimas Notícias
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fique por dentro de tudo que acontece no Copa Tomatão
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured News */}
          <div className="lg:col-span-2">
            {featuredNews && (
              <NewsCard 
                news={featuredNews} 
                featured={true}
                index={0}
              />
            )}
          </div>
          
          {/* Sidebar News */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-heading font-bold text-white neon-text mb-4">
                Últimas Atualizações
              </h3>
              <div className="space-y-4">
                {regularNews.slice(0, 3).map((news, index) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    compact={true}
                    index={index + 1}
                  />
                ))}
                    </div>
                      </div>
                    </div>
                  </div>

        {/* More News Grid */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-white neon-text mb-8 text-center">
            Mais Notícias
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.slice(3).map((news, index) => (
              <NewsCard
                key={news.id}
                news={news}
                index={index + 4}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-16">
          <Button 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft"
          >
            Ver Todas as Notícias
                </Button>
        </div>
      </div>
    </section>
  );
}
