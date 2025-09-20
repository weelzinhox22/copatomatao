const CACHE_NAME = 'copa-tomatao-v3';

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalando...');
  // Não forçar ativação imediata para evitar problemas
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        // Não cachear automaticamente para evitar problemas
        return Promise.resolve();
      })
      .catch((error) => {
        console.log('Erro ao abrir cache:', error);
      })
  );
});

// Interceptar requisições de forma mais conservadora
self.addEventListener('fetch', (event) => {
  // Só interceptar requisições GET e apenas para recursos estáticos
  if (event.request.method !== 'GET') {
    return;
  }

  // Não interceptar requisições para a página principal para evitar problemas
  if (event.request.destination === 'document') {
    return;
  }

  // Não interceptar requisições para APIs
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Interceptar apenas recursos estáticos (CSS, JS, imagens)
  if (event.request.destination === 'style' || 
      event.request.destination === 'script' || 
      event.request.destination === 'image') {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            })
            .catch(() => {
              // Se falhar, deixar o navegador lidar com isso
              return fetch(event.request);
            });
        })
    );
  }
});

// Atualizar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Não tomar controle imediato para evitar problemas
});
