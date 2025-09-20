import { Calendar, User, ArrowRight, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

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

const categoryColors = {
  'Torneio': 'from-blue-500 to-cyan-500',
  'Campeão': 'from-yellow-500 to-orange-500',
  'Highlights': 'from-green-500 to-emerald-500',
  'Perfil': 'from-purple-500 to-pink-500',
  'Análise': 'from-red-500 to-rose-500',
  'Site': 'from-indigo-500 to-blue-500'
};

export default function NewsCard({ news, featured = false, compact = false, index = 0 }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    return formatDate(dateString);
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600';
  };

  if (featured) {
    return (
      <div 
        className="glass-card rounded-xl overflow-hidden glow-hover group cursor-pointer animate-fade-in-up border border-white/10 hover:border-primary/30 transition-all duration-300"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {news.imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Category Badge - Pequeno */}
            <div className="absolute top-4 left-4">
              <span className={`bg-gradient-to-r ${getCategoryColor(news.category)} text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20`}>
                {news.category}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-secondary" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{formatTimeAgo(news.publishedAt)}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-white mb-4 neon-text group-hover:text-primary transition-colors duration-300 leading-tight">
            {news.title}
          </h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            {news.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <Link href={`/article?article=${news.slug}`}>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-6 py-3 font-semibold"
              >
                Ler mais
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>1.2k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <Link href={`/article?article=${news.slug}`}>
        <div 
          className="glass-card p-4 rounded-xl glow-hover group cursor-pointer animate-fade-in-up border border-white/10 hover:border-primary/30 transition-all duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-4">
            {news.imageUrl && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className={`bg-gradient-to-r ${getCategoryColor(news.category)} text-white px-2 py-1 rounded-full font-medium`}>
                  {news.category}
                </span>
                <span>{formatTimeAgo(news.publishedAt)}</span>
              </div>
              
              <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                {news.title}
              </h4>
              
              <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                {news.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>245</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{news.author}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article?article=${news.slug}`}>
      <div 
        className="glass-card rounded-xl overflow-hidden glow-hover group cursor-pointer animate-fade-in-up border border-white/10 hover:border-primary/30 transition-all duration-300"
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
            
            {/* Category Badge - Pequeno */}
            <div className="absolute top-3 left-3">
              <span className={`bg-gradient-to-r ${getCategoryColor(news.category)} text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20`}>
                {news.category}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(news.publishedAt)}</span>
            </div>
          </div>
          
          <h4 className="font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
            {news.title}
          </h4>
          
          <p className="text-sm text-gray-300 line-clamp-3 mb-4 leading-relaxed">
            {news.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-primary font-medium">
              Ler mais
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
            
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}