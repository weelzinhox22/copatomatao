import React, { useState, useEffect } from 'react';
import PWAInstallPopup from './pwa-install-popup';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function PWAInstallManager() {
  const { showPrompt, isStandalone, isInstalled } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Só mostrar se não estiver instalado e não estiver em modo standalone
    if (showPrompt && !isStandalone && !isInstalled) {
      // Delay para não aparecer imediatamente
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // 3 segundos de delay

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showPrompt, isStandalone, isInstalled]);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Não renderizar se não deve mostrar
  if (!isVisible) {
    return null;
  }

  return <PWAInstallPopup onClose={handleClose} />;
}
