const CACHE_NAME = 'imperio-shell-v82';
const APP_SHELL = [
    './',
    './index.html',
    './login.html',
    './registro.html',
    './css/styles.css',
    './js/services/db.js',
    './js/data/gameData.js',
    './js/core/app.js',
    './json/manifest.webmanifest',
    './assets/logos/app-icon-192.png',
    './assets/logos/app-icon-512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request).then(response => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
            return response;
        }).catch(() => caches.match(event.request).then(cached => {
            if (cached) return cached;
            if (event.request.mode === 'navigate') return caches.match('./index.html');
            return Response.error();
        }))
    );
});
