const CACHE = 'kokoron-journal-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/kokoron_cover.png',
  './images/kokoron_01.png',
  './images/kokoron_02.png',
  './images/kokoron_03.png',
  './images/kokoron_04.png',
  './images/kokoron_05.png',
  './images/kokoron_06.png',
  './images/kokoron_07.png'
];

// インストール時にキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// キャッシュファースト（オフラインでも動く）
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
