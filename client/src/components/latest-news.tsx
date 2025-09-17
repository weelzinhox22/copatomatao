import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar } from "lucide-react";

export default function LatestNews() {
  const { data: allNews, isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const { data: featuredNews } = useQuery({
    queryKey: ["/api/news/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted rounded mb-16 max-w-xl mx-auto"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-64 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featured = featuredNews?.[0];
  const recent = allNews?.slice(0, 3) || [];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4">
            <span className="gradient-text">ÚLTIMAS</span> NOTÍCIAS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro de todas as novidades e atualizações do campeonato
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featured ? (
              <article className="neon-border rounded-lg overflow-hidden" data-testid="featured-article">
                <img 
                  src="https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Professional eSports match celebration" 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      DESTAQUE
                    </span>
                    <span className="text-sm text-muted-foreground" data-testid="featured-date">
                      {new Date(featured.createdAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="featured-title">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid="featured-excerpt">
                    {featured.excerpt || featured.content.slice(0, 200) + '...'}
                  </p>
                  <Button variant="ghost" className="p-0 text-primary hover:text-primary/80" data-testid="button-read-more">
                    Ler matéria completa <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </article>
            ) : (
              <div className="neon-border rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold mb-4" data-testid="no-featured-title">Nenhuma Notícia em Destaque</h3>
                <p className="text-muted-foreground">
                  As notícias em destaque aparecerão aqui quando forem publicadas.
                </p>
              </div>
            )}
          </div>
          
          {/* News Sidebar */}
          <div className="space-y-6">
            {recent.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground" data-testid="no-news">
                  Nenhuma notícia publicada ainda.
                </p>
              </div>
            ) : (
              recent.map((news: any, index: number) => (
                <article key={news.id} className="tournament-card rounded-lg p-4" data-testid={`news-item-${index}`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-2 line-clamp-2" data-testid={`news-title-${index}`}>
                        {news.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2" data-testid={`news-excerpt-${index}`}>
                        {news.excerpt || news.content.slice(0, 100) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground" data-testid={`news-date-${index}`}>
                          {new Date(news.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-xs text-muted-foreground" data-testid={`news-author-${index}`}>
                          Por {news.author?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
            
            {recent.length > 0 && (
              <div className="text-center pt-4">
                <Button variant="ghost" className="text-primary hover:text-primary/80" data-testid="button-view-all-news">
                  Ver todas as notícias <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
