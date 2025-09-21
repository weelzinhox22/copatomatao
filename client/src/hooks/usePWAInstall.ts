import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallState {
  canInstall: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  isInstalled: boolean;
  showPrompt: boolean;
}

export function usePWAInstall() {
  const [state, setState] = useState<PWAInstallState>({
    canInstall: false,
    isIOS: false,
    isStandalone: false,
    isInstalled: false,
    showPrompt: false
  });

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Detectar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth <= 768;
    
    // Detectar se já está instalado (modo standalone)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true;
    
    // Verificar se já foi instalado (localStorage)
    const wasInstalled = localStorage.getItem('pwa-installed') === 'true';
    const promptDismissed = localStorage.getItem('pwa-prompt-dismissed') === 'true';
    
    // Verificar se deve mostrar o prompt (apenas em dispositivos móveis)
    const shouldShowPrompt = isMobile && !standalone && !wasInstalled && !promptDismissed;

    setState({
      canInstall: false, // Será definido pelo evento beforeinstallprompt
      isIOS: iOS,
      isStandalone: standalone,
      isInstalled: wasInstalled,
      showPrompt: shouldShowPrompt
    });

    // Escutar evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setState(prev => ({
        ...prev,
        canInstall: true,
        showPrompt: shouldShowPrompt
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    setState(prev => ({
      ...prev,
      showPrompt: false
    }));
  };

  const markAsInstalled = () => {
    localStorage.setItem('pwa-installed', 'true');
    setState(prev => ({
      ...prev,
      isInstalled: true,
      showPrompt: false
    }));
  };

  const resetPrompt = () => {
    localStorage.removeItem('pwa-prompt-dismissed');
    localStorage.removeItem('pwa-installed');
    setState(prev => ({
      ...prev,
      showPrompt: true,
      isInstalled: false
    }));
  };

  return {
    ...state,
    dismissPrompt,
    markAsInstalled,
    resetPrompt
  };
}
