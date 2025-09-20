import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone, Monitor, Star, Zap, Shield, Wifi } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallPopupProps {
  onClose: () => void;
}

export default function PWAInstallPopup({ onClose }: PWAInstallPopupProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detectar se já está instalado (modo standalone)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Escutar evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA instalado com sucesso!');
      }
      
      setDeferredPrompt(null);
      onClose();
    }
  };

  const handleIOSInstall = () => {
    // Para iOS, mostrar instruções
    const instructions = `
Para instalar o Copa Tomatão no seu iPhone/iPad:

1. Toque no botão de compartilhar (📤) na barra de navegação
2. Role para baixo e toque em "Adicionar à Tela de Início"
3. Toque em "Adicionar" no canto superior direito

Agora você terá acesso rápido ao campeonato!
    `;
    
    alert(instructions);
    onClose();
  };

  // Não mostrar se já estiver instalado
  if (isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl max-w-sm bg-gradient-to-br from-background/95 to-gray-900/95 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Instalar App</h3>
              <p className="text-sm text-gray-400">Acesso rápido e fácil</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-gray-300">Acesso instantâneo ao campeonato</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center">
              <Wifi className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-gray-300">Funciona offline</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-purple-400" />
            </div>
            <span className="text-gray-300">Notificações de partidas</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-yellow-400" />
            </div>
            <span className="text-gray-300">Experiência nativa</span>
          </div>
        </div>

        {/* Install Button */}
        <div className="space-y-3">
          {isIOS ? (
            <Button
              onClick={handleIOSInstall}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Instalar no iPhone/iPad
            </Button>
          ) : deferredPrompt ? (
            <Button
              onClick={handleInstall}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
            >
              <Download className="mr-2 h-4 w-4" />
              Instalar App
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">
                Seu navegador não suporta instalação automática
              </p>
              <Button
                onClick={handleIOSInstall}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <Monitor className="mr-2 h-4 w-4" />
                Ver Instruções
              </Button>
            </div>
          )}
          
          <p className="text-xs text-gray-500 text-center">
            Instale para ter acesso rápido ao Copa Tomatão
          </p>
        </div>
      </div>
    </div>
  );
}
