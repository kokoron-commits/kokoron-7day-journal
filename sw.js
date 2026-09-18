const CACHE = 'kokoron-journal-v2';
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

// ネットワーク優先（新しい版を先に届ける）・つながらないときはキャッシュで動く
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === self.location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
