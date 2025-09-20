import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Registrar Service Worker para PWA de forma mais conservadora
if ('serviceWorker' in navigator) {
  // Aguardar um pouco mais para garantir que a página carregou completamente
  setTimeout(() => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado com sucesso: ', registration);
        
        // Verificar se há atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nova versão disponível, mas não recarregar automaticamente
                console.log('Nova versão do SW disponível');
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW falhou ao registrar: ', registrationError);
      });
  }, 2000); // Aguardar 2 segundos antes de registrar
}

createRoot(document.getElementById("root")!).render(<App />);
