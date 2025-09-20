import { Button } from "@/components/ui/button";
import NewsCard, { NewsItem } from "./news-card";
import { Link } from "wouter";
import { Newspaper, TrendingUp, Eye, Calendar, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";

// Dados fictícios de notícias atualizados
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Copa Tomatão 2025: Inscrições abertas para o maior torneio da comunidade!",
    excerpt: "O aguardado Copa Tomatão está de volta! Venha participar do campeonato mais divertido e competitivo entre amigos. Inscrições abertas até o fim do mês.",
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-15T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Torneio",
    featured: true,
    slug: "copa-tomatao-2025-inscricoes-abertas"
  },
  {
    id: "2", 
    title: "Zeca e os Urubus conquistam o título da Copa Tomatão 2025!",
    excerpt: "Em uma final épica contra Te Fizguei, Zeca e os Urubus se sagraram campeões com uma vitória por 3-1. Theushubu foi eleito MVP da final.",
    author: "Repórter LoL",
    publishedAt: "2025-09-28T22:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=200&fit=crop",
    category: "Campeão",
    slug: "zeca-urubus-campeao-copa-tomatao-2025"
  },
  {
    id: "3",
    title: "Te Fizguei surpreende com estratégias inovadoras",
    excerpt: "Na semifinal contra Os Fimos, o time apostou em uma composição não-meta que resultou numa vitória espetacular e muitos highlights.",
    author: "Analista Pro",
    publishedAt: "2025-09-26T20:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
    category: "Highlights",
    slug: "te-fizguei-estrategias-inovadoras"
  },
  {
    id: "4",
    title: "Kongs do Atlântico: A força do nordeste",
    excerpt: "Conheça a história por trás do time que representa a força do nordeste e está surpreendendo a todos com sua garra e determinação.",
    author: "Jornalista Gamer",
    publishedAt: "2025-09-25T14:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop",
    category: "Perfil",
    slug: "kongs-atlantico-forca-nordeste"
  },
  {
    id: "5",
    title: "Os Fimos mostram experiência nas decisões",
    excerpt: "Veteranos do cenário competitivo mostram que experiência conta muito em momentos decisivos do campeonato.",
    author: "Comentarista eSports",
    publishedAt: "2025-09-24T18:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
    category: "Análise",
    slug: "os-fimos-experiencia-decisoes"
  },
  {
    id: "6",
    title: "Hall dos Vencedores: Nova seção no site",
    excerpt: "Conheça a nova seção dedicada aos campeões da Copa Tomatão, onde os grandes vencedores são eternizados.",
    author: "Equipe Copa Tomatão",
    publishedAt: "2025-09-23T12:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1586953295165-e44cd8e0ee67?w=400&h=200&fit=crop",
    category: "Site",
    slug: "hall-vencedores-nova-secao"
  }
];

const categories = ['Todos', 'Torneio', 'Campeão', 'Highlights', 'Perfil', 'Análise', 'Site'];

export default function LatestNews() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const featuredNews = mockNews.find(news => news.featured);
  const filteredNews = selectedCategory === 'Todos' 
    ? mockNews.filter(news => !news.featured)
    : mockNews.filter(news => !news.featured && news.category === selectedCategory);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects - Sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Simplificado */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold neon-text text-glow-soft">
              ÚLTIMAS NOTÍCIAS
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Fique por dentro de tudo que acontece no Copa Tomatão. Notícias exclusivas, 
            análises detalhadas e resultados épicos para você acompanhar o maior campeonato da comunidade!
          </p>
          
          {/* Stats Bar - Simplificado */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">6 artigos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">1.2k visualizações</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">Atualizado hoje</span>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured News */}
          <div className="lg:col-span-2">
            {featuredNews && (
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center z-20">
                  <span className="text-white font-bold text-sm">★</span>
                </div>
                <NewsCard 
                  news={featuredNews} 
                  featured={true}
                  index={0}
                />
              </div>
            )}
          </div>
          
          {/* Sidebar News */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white neon-text">
                  Trending Now
                </h3>
              </div>
              <div className="space-y-4">
                {mockNews.filter(news => !news.featured).slice(0, 3).map((news, index) => (
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

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-gray-400" />
            <h3 className="text-xl font-heading font-bold text-white">Filtrar por Categoria</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* More News Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-white neon-text text-glow-soft mb-4">
              {selectedCategory === 'Todos' ? 'Todas as Notícias' : `Notícias de ${selectedCategory}`}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, index) => (
              <NewsCard
                key={news.id}
                news={news}
                index={index + 4}
              />
            ))}
          </div>
        </div>


        {/* Action Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft"
            >
              <Newspaper className="mr-2 h-5 w-5" />
              Ver Todas as Notícias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}