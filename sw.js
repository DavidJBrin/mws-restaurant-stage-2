/* Building the service worker was accomplished while viewing the Offline First modules
that are part of the course, and adapting the promises and functions to fit the restaurant
site and ensure the cache was reflective of the needs of the site.
Last reviewed 7/23/2018 @ Udacity Nanodegree: Mobile Web Specialist, Lesson 17: Introducing
the service worker.
*/ 

var staticCacheName = 'mws-restaurant-v1';

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
                    '/js/dbhelper.js',
                    '/img/*.*',
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
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return cache.delete(cacheName);
                })
            );
        })
    
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});