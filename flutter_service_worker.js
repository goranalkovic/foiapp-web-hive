'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets\AssetManifest.json": "a5f6cb88df15da761b560bd00f687efa",
"/assets\FontManifest.json": "a187fd1bf185e1facbb5aa46196e4145",
"/assets\fonts\MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets\LICENSE": "dfb3df3123ce64f6a27c02eb2cdd4e76",
"/assets\packages\outline_material_icons\lib\outline_material_icons.ttf": "6b94994fffd9868330d830fcb18a6026",
"/index.html": "f4dba618bb5da9faf9376b6a9cf9b74e",
"/main.dart.js": "3e02eb90719317a3f465337b6a575eff"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
