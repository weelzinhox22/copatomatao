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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 backdrop-blur-sm animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card border border-white/10 shadow-xl">
          <CardContent className="p-4">
            {!showSettings ? (
              // Banner Principal Compacto
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    🍪 Cookies
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Usamos cookies para melhorar sua experiência. Você pode personalizar suas preferências.
                  </p>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={handleAcceptAll}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 px-3 text-xs h-8"
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Aceitar
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5 px-3 text-xs h-8"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Rejeitar
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5 px-2 text-xs h-8"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              // Configurações Detalhadas Compactas
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Configurações de Cookies
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="text-white hover:bg-white/10 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {/* Cookies Necessários */}
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-red-400" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">Necessários</div>
                        <div className="text-gray-400 text-xs">Sempre ativo</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-3 h-3 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">Analytics</div>
                        <div className="text-gray-400 text-xs">Uso do site</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-8 h-4 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Zap className="w-3 h-3 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">Performance</div>
                        <div className="text-gray-400 text-xs">Velocidade</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('performance')}
                      className={`w-8 h-4 rounded-full transition-colors ${
                        preferences.performance ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.performance ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Cookie className="w-3 h-3 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">Marketing</div>
                        <div className="text-gray-400 text-xs">Personalização</div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-8 h-4 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSavePreferences}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 text-xs h-7"
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-white/5 text-xs h-7"
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

