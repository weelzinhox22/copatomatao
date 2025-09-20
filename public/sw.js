// Service Worker para cache de recursos quando performance está habilitada
const CACHE_NAME = 'copa-tomatao-v1';
const STATIC_CACHE = [
  '/',
  '/src/assets/copa tomataão.png',
  '/src/index.css',
  '/src/index.js'
];

// Instala o service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker instalado - cacheando recursos');
        return cache.addAll(STATIC_CACHE);
      })
      .catch((error) => {
        console.error('Erro ao instalar Service Worker:', error);
      })
  );
});

// Ativa o service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições para cache
self.addEventListener('fetch', (event) => {
  // Verifica se performance está habilitada
  const performanceEnabled = localStorage.getItem('copa-tomatao-cookie-preferences');
  
  if (!performanceEnabled) {
    return; // Não faz cache se performance não estiver habilitada
  }

  const preferences = JSON.parse(performanceEnabled);
  
  if (!preferences.performance) {
    return; // Não faz cache se performance não estiver habilitada
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }

        // Se não estiver no cache, busca da rede
        return fetch(event.request).then((response) => {
          // Verifica se a resposta é válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona a resposta para o cache
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Fallback para página offline se disponível
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});
