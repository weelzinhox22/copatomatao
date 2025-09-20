import { useEffect } from 'react';
import { useCookieConsent, optimizeResourceLoading } from '@/hooks/useCookieConsent';

export default function ResourceOptimizer() {
  const { preferences, hasConsent } = useCookieConsent();

  useEffect(() => {
    if (hasConsent) {
      // Aplica otimizações baseadas nas preferências
      optimizeResourceLoading(preferences);

      // Carrega scripts condicionalmente
      if (preferences.analytics) {
        loadAnalytics();
      }

      if (preferences.performance) {
        loadPerformanceOptimizations();
      }

      if (preferences.marketing) {
        loadMarketingScripts();
      }
    }
  }, [preferences, hasConsent]);

  const loadAnalytics = () => {
    // Simula carregamento do Google Analytics
    console.log('📊 Analytics carregado - coletando dados de uso');
    
    // Aqui você pode adicionar o código real do Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID');
  };

  const loadPerformanceOptimizations = () => {
    // Implementa otimizações de performance
    console.log('⚡ Performance otimizada - cache e preload ativados');
    
    // Service Worker para cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    // Preload de recursos críticos
    preloadCriticalResources();
  };

  const loadMarketingScripts = () => {
    // Carrega scripts de marketing/tracking
    console.log('📢 Marketing scripts carregados - personalização ativada');
    
    // Aqui você pode adicionar pixels de tracking, etc.
  };

  const preloadCriticalResources = () => {
    // Preload de fontes críticas
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);

    // Preload de CSS crítico
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.href = '/src/index.css';
    cssLink.as = 'style';
    document.head.appendChild(cssLink);
  };

  return null; // Este componente não renderiza nada
}

// Hook para carregar recursos sob demanda
export const useLazyResource = (
  resourceType: 'image' | 'script' | 'style',
  src: string,
  shouldLoad: boolean = true
) => {
  useEffect(() => {
    if (!shouldLoad) return;

    const element = document.createElement(resourceType === 'image' ? 'img' : resourceType);
    
    if (resourceType === 'image') {
      (element as HTMLImageElement).src = src;
      (element as HTMLImageElement).style.display = 'none';
    } else if (resourceType === 'script') {
      (element as HTMLScriptElement).src = src;
      (element as HTMLScriptElement).async = true;
    } else if (resourceType === 'style') {
      (element as HTMLLinkElement).rel = 'stylesheet';
      (element as HTMLLinkElement).href = src;
    }

    document.head.appendChild(element);

    return () => {
      if (document.head.contains(element)) {
        document.head.removeChild(element);
      }
    };
  }, [resourceType, src, shouldLoad]);
};
