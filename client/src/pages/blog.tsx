import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Play, Heart, Laugh, Zap, Trophy, Star, Target } from "lucide-react";
import { Link } from "wouter";

// Dados fictícios de artigos de blog com resumos de jogos
const blogPosts = [
  {
    id: "1",
    title: "Zeca e os Urubus vs Kongs do Atlântico: A Virada Épica que Marcou História",
    excerpt: "Uma partida que começou com Kongs dominando completamente, mas terminou com uma das maiores viradas já vistas na Copa Tomatão.",
    content: `
      <h2>O Cenário da Batalha</h2>
      <p>Na semifinal da Copa Tomatão, Zeca e os Urubus enfrentaram Kongs do Atlântico em uma partida que prometia ser eletrizante. Os Kongs começaram dominando completamente, com LDates fazendo uma performance excepcional no jungle, garantindo controle total dos objetivos.</p>
      
      <h2>Primeira Fase: Domínio dos Kongs</h2>
      <p>Os primeiros 20 minutos foram completamente dominados pelos Kongs do Atlântico. Com picks agressivos e estratégias bem coordenadas, eles conseguiram uma vantagem de 8k de gold e múltiplos dragões. Parecia que a vitória estava garantida.</p>
      
      <h2>A Virada Épica</h2>
      <p>Tudo mudou quando Theushubu, capitão dos Urubus, conseguiu um engage perfeito com Shen no Baron. A equipe coordenou uma teamfight impecável, eliminando 4 jogadores dos Kongs e garantindo o Baron. A partir daí, foi uma avalanche de plays incríveis.</p>
      
      <h2>Momentos Decisivos</h2>
      <p>O momento mais marcante foi quando Player4 (ADC dos Urubus) conseguiu um pentakill com Ashe, usando sua ultimate para iniciar uma teamfight perfeita. A coordenação da equipe foi impecável, mostrando que experiência e determinação podem superar qualquer vantagem.</p>
      
      <h2>Resultado Final</h2>
      <p>Após 45 minutos de jogo intenso, Zeca e os Urubus conseguiram a vitória, classificando-se para a final da Copa Tomatão. Uma partida que ficará marcada na história do torneio como uma das maiores viradas já vistas.</p>
    `,
    author: "Repórter Copa Tomatão",
    publishedAt: "2025-09-20T18:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Resumo de Jogo",
    featured: true,
    slug: "zeca-urubus-vs-kongs-atlantico-virada-epica",
    highlights: {
      beautiful: [
        {
          title: "Pentakill Épico do Ashe",
          description: "Player4 conseguiu um pentakill perfeito com Ashe, usando sua ultimate para iniciar a teamfight decisiva.",
          timestamp: "38:45",
          type: "teamfight"
        },
        {
          title: "Engage Perfeito do Shen",
          description: "Theushubu executou um engage impecável com Shen no Baron, virando completamente o jogo.",
          timestamp: "32:20",
          type: "engage"
        }
      ],
      funny: [
        {
          title: "Flash para Morte",
          description: "LDates tentou escapar com flash mas acabou caindo direto na armadilha dos Urubus.",
          timestamp: "41:15",
          type: "fail"
        },
        {
          title: "Baron Roubado por Acidente",
          description: "Player3 dos Urubus roubou o Baron sem querer com uma habilidade perdida.",
          timestamp: "35:30",
          type: "lucky"
        }
      ],
      troll: [
        {
          title: "Build AP no ADC",
          description: "Player4 dos Kongs decidiu fazer build AP no Jinx 'para testar'.",
          timestamp: "25:00",
          type: "build"
        },
        {
          title: "Dance na Base Inimiga",
          description: "Theushubu fez dance em frente à base dos Kongs antes da teamfight final.",
          timestamp: "44:00",
          type: "bm"
        }
      ]
    },
    stats: {
      duration: "45:32",
      kills: "28-31",
      gold: "67.2k - 71.8k",
      dragons: "3-2",
      barons: "1-1"
    }
  },
  {
    id: "2",
    title: "Os Fimos vs Te Fizguei: A Batalha dos Estrategistas",
    excerpt: "Uma partida técnica onde Os Fimos mostraram sua experiência em late game contra a criatividade de Te Fizguei.",
    content: `
      <h2>Estratégia vs Criatividade</h2>
      <p>Esta partida foi marcada pelo confronto entre duas filosofias diferentes: Os Fimos com sua estratégia tradicional e experiência, contra Te Fizguei com picks criativos e jogadas inovadoras.</p>
      
      <h2>Early Game Equilibrado</h2>
      <p>Os primeiros 15 minutos foram muito equilibrados, com ambas as equipes trocando kills e objetivos. AZR Aldeath dos Fimos mostrou sua maestria com Azir, enquanto welziinho dos Fizguei surpreendeu com Ahri.</p>
      
      <h2>Mid Game Decisivo</h2>
      <p>O momento decisivo veio quando Os Fimos conseguiram controlar o mapa com visão superior. Sua experiência em teamfights coordenados fez a diferença, garantindo múltiplos objetivos.</p>
      
      <h2>Late Game Dominante</h2>
      <p>Com picks de scaling como Azir e Aphelios, Os Fimos dominaram completamente o late game. A coordenação da equipe foi impecável, mostrando por que são considerados veteranos.</p>
    `,
    author: "Analista Pro",
    publishedAt: "2025-09-19T16:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    category: "Análise Técnica",
    slug: "os-fimos-vs-te-fizguei-batalha-estrategistas",
    highlights: {
      beautiful: [
        {
          title: "Shurima Shuffle Perfeito",
          description: "AZR Aldeath executou um Shurima Shuffle impecável, eliminando 3 jogadores.",
          timestamp: "28:15",
          type: "teamfight"
        }
      ],
      funny: [
        {
          title: "Ahri Charm no Minion",
          description: "welziinho tentou charm no ADC mas acertou um minion.",
          timestamp: "22:30",
          type: "fail"
        }
      ],
      troll: [
        {
          title: "Build Tank no Azir",
          description: "AZR Aldeath decidiu fazer build tank no Azir 'para sobreviver'.",
          timestamp: "18:00",
          type: "build"
        }
      ]
    },
    stats: {
      duration: "38:15",
      kills: "22-18",
      gold: "58.7k - 61.2k",
      dragons: "2-1",
      barons: "1-0"
    }
  },
  {
    id: "3",
    title: "Semifinal: Kongs do Atlântico vs Te Fizguei - A Surpresa dos Picks",
    excerpt: "Te Fizguei surpreendeu com picks não-meta que resultaram em uma vitória espetacular contra os favoritos Kongs.",
    content: `
      <h2>Picks Surpresa</h2>
      <p>Te Fizguei entrou na partida com uma estratégia completamente diferente, escolhendo campeões que ninguém esperava. A criatividade da equipe foi o diferencial.</p>
      
      <h2>Early Game Agressivo</h2>
      <p>Com picks como Fizz e Tryndamere, Te Fizguei conseguiu dominar o early game com agressividade. Os Kongs não conseguiram se adaptar à estratégia inovadora.</p>
      
      <h2>Mid Game Decisivo</h2>
      <p>O momento decisivo veio quando BLT Reformed conseguiu múltiplos kills com Lee Sin, dominando completamente o jungle e controlando todos os objetivos.</p>
      
      <h2>Vitória Espetacular</h2>
      <p>Com uma coordenação impecável e estratégias criativas, Te Fizguei conseguiu a vitória, classificando-se para a final contra Zeca e os Urubus.</p>
    `,
    author: "Comentarista eSports",
    publishedAt: "2025-09-18T20:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    category: "Highlights",
    slug: "kongs-vs-fizguei-surpresa-picks",
    highlights: {
      beautiful: [
        {
          title: "Lee Sin Insec Perfeito",
          description: "BLT Reformed executou um Insec perfeito, eliminando o ADC dos Kongs.",
          timestamp: "25:45",
          type: "play"
        }
      ],
      funny: [
        {
          title: "Tryndamere Spinning Away",
          description: "SOU A GUILHOTINA usou E do Tryndamere para fugir mas acabou entrando na base inimiga.",
          timestamp: "31:20",
          type: "fail"
        }
      ],
      troll: [
        {
          title: "Fizz Build AD",
          description: "welziinho fez build AD no Fizz 'para diversão'.",
          timestamp: "15:00",
          type: "build"
        }
      ]
    },
    stats: {
      duration: "42:18",
      kills: "31-24",
      gold: "69.5k - 65.8k",
      dragons: "3-1",
      barons: "1-0"
    }
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="neon-text text-glow-soft">BLOG</span> COPA TOMATÃO
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Resumos detalhados dos jogos, highlights das melhores plays e momentos mais engraçados
          </p>
          
          <div className="glass-card inline-block px-6 py-3 rounded-full glow-soft">
            <div className="flex items-center gap-2 text-primary">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">Últimos Jogos Analisados</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Lista de Posts */}
          <div className="lg:col-span-1">
            <Card className="glass-card glow-hover">
              <CardHeader>
                <CardTitle className="text-xl font-heading neon-text flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Artigos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPost.id === post.id 
                          ? 'border-primary/50 bg-primary/10' 
                          : 'hover:border-primary/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          {post.category}
                        </Badge>
                        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Post Selecionado */}
          <div className="lg:col-span-2">
            <Card className="glass-card glow-hover">
              {/* Header do Post */}
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedPost.publishedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {selectedPost.category}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-heading font-bold text-white mb-4">
                  {selectedPost.title}
                </CardTitle>
                
                {selectedPost.imageUrl && (
                  <div className="relative h-64 overflow-hidden rounded-xl mb-6">
                    <img 
                      src={selectedPost.imageUrl} 
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {/* Estatísticas do Jogo */}
                <div className="mb-8">
                  <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Estatísticas do Jogo
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{selectedPost.stats.duration}</div>
                      <div className="text-sm text-gray-400">Duração</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{selectedPost.stats.kills}</div>
                      <div className="text-sm text-gray-400">Kills</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">{selectedPost.stats.gold}</div>
                      <div className="text-sm text-gray-400">Gold</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{selectedPost.stats.dragons}</div>
                      <div className="text-sm text-gray-400">Dragões</div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do Post */}
                <div className="mb-8">
                  <div 
                    className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>

                {/* Highlights */}
                <div className="space-y-6">
                  {/* Plays Bonitas */}
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-400" />
                      Plays Mais Bonitas
                    </h3>
                    <div className="space-y-3">
                      {selectedPost.highlights.beautiful.map((highlight, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-red-400/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{highlight.title}</h4>
                            <span className="text-sm text-red-400 font-mono">{highlight.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plays Engraçadas */}
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
                      <Laugh className="h-5 w-5 text-yellow-400" />
                      Plays Mais Engraçadas
                    </h3>
                    <div className="space-y-3">
                      {selectedPost.highlights.funny.map((highlight, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-yellow-400/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{highlight.title}</h4>
                            <span className="text-sm text-yellow-400 font-mono">{highlight.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plays Trolls */}
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      Plays Mais Trolls
                    </h3>
                    <div className="space-y-3">
                      {selectedPost.highlights.troll.map((highlight, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-purple-400/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{highlight.title}</h4>
                            <span className="text-sm text-purple-400 font-mono">{highlight.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-16">
          <Link href="/">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold glow-soft">
              <ArrowRight className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
