import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  featured?: boolean;
  slug: string;
}

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
  compact?: boolean;
  index?: number;
}

export default function NewsCard({ news, featured = false, compact = false, index = 0 }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (featured) {
    return (
      <div 
        className="glass-card rounded-xl overflow-hidden glow-hover group cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {news.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-primary/30">
                {news.category}
              </span>
            </div>
            {featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-yellow-400/30">
                  Destaque
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{news.author}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-heading font-bold text-white mb-3 neon-text group-hover:text-primary transition-colors duration-300">
            {news.title}
          </h3>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {news.excerpt}
          </p>
          
          <Button 
            variant="outline" 
            className="glass-card border-primary/30 text-white hover:bg-primary/20 glow-hover group-hover:border-primary/60 transition-all duration-300"
          >
            Ler mais
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div 
        className="glass-card p-4 rounded-xl glow-hover group cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start gap-4">
          {news.imageUrl && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                {news.category}
              </span>
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            
            <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {news.title}
            </h4>
            
            <p className="text-sm text-gray-400 line-clamp-2">
              {news.excerpt}
            </p>
          </div>
          
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden glow-hover group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {news.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-primary/30">
              {news.category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(news.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{news.author}</span>
          </div>
        </div>
        
        <h4 className="font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {news.title}
        </h4>
        
        <p className="text-sm text-gray-300 line-clamp-3 mb-4">
          {news.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium"
          >
            Ler mais
          </Button>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
