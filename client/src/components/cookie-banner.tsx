import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, Check, X, Shield, Zap, BarChart3 } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Sempre true, não pode ser desabilitado
    analytics: false,
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem('copa-tomatao-cookie-consent');
    
    if (!cookieConsent) {
      // Mostra o banner após 1 segundo
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Carrega preferências salvas
      const savedPreferences = localStorage.getItem('copa-tomatao-cookie-preferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      performance: true,
      marketing: true,
    };
    
    savePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      performance: false,
      marketing: false,
    };
    
    savePreferences(onlyNecessary);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('copa-tomatao-cookie-consent', 'true');
    localStorage.setItem('copa-tomatao-cookie-preferences', JSON.stringify(prefs));
    
    // Aplica as preferências
    applyCookiePreferences(prefs);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Analytics
    if (prefs.analytics) {
      // Aqui você pode carregar Google Analytics, etc.
      console.log('Analytics cookies enabled');
    } else {
      console.log('Analytics cookies disabled');
    }

    // Performance
    if (prefs.performance) {
      // Cache, service workers, etc.
      console.log('Performance cookies enabled');
    } else {
      console.log('Performance cookies disabled');
    }

    // Marketing
    if (prefs.marketing) {
      // Pixels de tracking, etc.
      console.log('Marketing cookies enabled');
    } else {
      console.log('Marketing cookies disabled');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Não pode ser desabilitado
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card border border-white/10 shadow-2xl">
          <CardContent className="p-6">
            {!showSettings ? (
              // Banner Principal
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-bold text-white mb-1">
                      🍪 Cookies da Copa Tomatão
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                      Você pode escolher quais tipos de cookies aceitar.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-6"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Aceitar Todos
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5 px-6"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Rejeitar Todos
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5 px-6"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Personalizar
                  </Button>
                </div>
              </div>
            ) : (
              // Configurações Detalhadas
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-white">
                    Configurações de Cookies
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Cookies Necessários */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Cookies Necessários</div>
                        <div className="text-gray-400 text-sm">Essenciais para o funcionamento do site</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-medium">Sempre Ativo</span>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Analytics</div>
                        <div className="text-gray-400 text-sm">Ajuda a entender como você usa o site</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Performance</div>
                        <div className="text-gray-400 text-sm">Melhora a velocidade e funcionalidade</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('performance')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.performance ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences.performance ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Cookie className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Marketing</div>
                        <div className="text-gray-400 text-sm">Personalização de conteúdo e anúncios</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Preferências
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
