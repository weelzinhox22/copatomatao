import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, X, Sparkles, Trophy, Users, Star } from 'lucide-react';

export default function ShareFeaturePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já viu o popup
    const hasSeenPopup = localStorage.getItem('copa-tomatao-share-popup-seen');
    
    if (!hasSeenPopup) {
      // Mostra o popup após 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('copa-tomatao-share-popup-seen', 'true');
  };

  const handleNeverShow = () => {
    setIsVisible(false);
    localStorage.setItem('copa-tomatao-share-popup-seen', 'true');
    localStorage.setItem('copa-tomatao-share-popup-never', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <Card className="glass-card max-w-md w-full rounded-2xl border border-white/10 shadow-2xl animate-scale-in">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">
                Nova Funcionalidade!
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Agora você pode criar e compartilhar cards incríveis do seu time ou perfil de jogador! 
              Perfeito para redes sociais e stories.
            </p>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Cards de Times</div>
                  <div className="text-gray-400 text-xs">Compartilhe seu time com estatísticas</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Cards de Jogadores</div>
                  <div className="text-gray-400 text-xs">Seu perfil personalizado</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Compartilhamento</div>
                  <div className="text-gray-400 text-xs">Direto para redes sociais</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold">Como usar:</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Vá até a página de Times ou Jogadores e clique no ícone de compartilhamento 
                <Share2 className="w-3 h-3 inline mx-1" /> nos cards para gerar sua imagem!
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleClose}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
            >
              Entendi!
            </Button>
            <Button
              onClick={handleNeverShow}
              variant="outline"
              className="text-gray-400 border-gray-600 hover:bg-white/5"
            >
              Não mostrar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
