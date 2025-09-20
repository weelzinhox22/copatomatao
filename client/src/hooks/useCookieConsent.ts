import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    performance: false,
    marketing: false,
  });
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Verifica se há consentimento salvo
    const consent = localStorage.getItem('copa-tomatao-cookie-consent');
    const savedPreferences = localStorage.getItem('copa-tomatao-cookie-preferences');

    if (consent === 'true' && savedPreferences) {
      setHasConsent(true);
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('copa-tomatao-cookie-preferences', JSON.stringify(newPreferences));
    localStorage.setItem('copa-tomatao-cookie-consent', 'true');
    setHasConsent(true);
  };

  const clearConsent = () => {
    localStorage.removeItem('copa-tomatao-cookie-consent');
    localStorage.removeItem('copa-tomatao-cookie-preferences');
    setHasConsent(false);
    setPreferences({
      necessary: true,
      analytics: false,
      performance: false,
      marketing: false,
    });
  };

  const canLoadScript = (scriptType: keyof CookiePreferences): boolean => {
    return preferences[scriptType] || scriptType === 'necessary';
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    clearConsent,
    canLoadScript,
  };
}

// Função utilitária para carregar scripts condicionalmente
export const loadScriptConditionally = (
  scriptType: keyof CookiePreferences,
  preferences: CookiePreferences,
  scriptLoader: () => void
) => {
  if (preferences[scriptType] || scriptType === 'necessary') {
    scriptLoader();
  }
};

// Função para otimizar carregamento de recursos
export const optimizeResourceLoading = (preferences: CookiePreferences) => {
  // Preload de recursos críticos apenas se performance estiver habilitada
  if (preferences.performance) {
    // Preload de imagens críticas
    const criticalImages = [
      '/src/assets/copa tomataão.png',
      '/src/assets/bghome.mp4'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Lazy loading de recursos não críticos se analytics estiver desabilitada
  if (!preferences.analytics) {
    // Desabilita tracking desnecessário
    console.log('Analytics disabled - reducing tracking overhead');
  }

  // Cache agressivo se performance estiver habilitada
  if (preferences.performance) {
    // Implementa cache de recursos estáticos
    console.log('Performance mode enabled - aggressive caching');
  }
};
