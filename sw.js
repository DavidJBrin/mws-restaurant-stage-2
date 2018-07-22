var staticCacheName = "mws-restaurant-v1";

// create a cache with the above files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg',
                    '/img/stock-photo-website-error-offline-767201059.jpg',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/'
            ]);
        })
    );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('mws-restaurant-') &&
                        cachename != staticCacheName;
                }).map(function(cacheName) {
                    return cache.delete(cacheName);
                })
            );
        })
    
    );
});

/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            if (response.status === 404) {
                return fetch('/img/stock-photo-website-error-offline-767201059.jpg');
            }
            return response;
        }).catch(function() {
            return new Response("That totally failed!");
        })
    );
});
*/

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});