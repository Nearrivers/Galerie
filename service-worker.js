// import des variables de cache depuis le script.js
import * as cacheInfos from './scripts/script'

// détection du passage hors-ligne
window.addEventListener('offline', function(event) {
  alert('Vous êtes maintenant hors-ligne !')
})

// Permet de déterminer quand la phase d'installation est terminée
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.resolve(`Phase d'installation terminée`)
    .then(() => {
      new Response(event)
    })
    .catch((err) => {
      new Response(err)
    })
  );
});

// // Autre moyen d'ouvrir le cache, il faudra aussi exporter les variables depuis script.js
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(cacheInfos.CACHE_NAME)
//     .then((cache) => {
//       return cache.add(cacheInfos.urlsToCache)
//     })
//     .catch((e) => {
//       console.log("Problème d'ouverture du cache", e);
//     })
//   )
// })

// Log l'url de la requête fetch
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
});

// Permet de récupérer l'url de la requête fetch et de formatter les données reçues dans le format souhaité
self.addEventListener('fetch', (event) => {
  const url = event.request.url

  if (url.indexOf("https://raw.githubusercontent.com/Nearrivers/Galerie/master/img/images.json") === 0) {
    event.respondWith(
      fetch(event.request)
      .then((response) => {
        if (response.statusText !== "OK") {
          console.error("Service worker", "Erreur lors du 'fetch'", event.request.url);
          return response
        }
        console.info("Formattage des données")

        return response.json().then((json) => {
          const formattedResponse = json.map((j) => ({
            chemin: j.chemin,
            alt: j.alt,
            updated_at: j.updated_at,
          }));
          return new Response(JSON.stringify(formattedResponse))
        })
      })
    )
  }
})

// Permet de savoir que la phase d'activation du service worker est terminée
self.addEventListener('activate', function(event) {
  event.waitUntil(
    Promise.resolve(`Phase d'activation terminée`)
    .then(() => {
      new Response(event)
    })
    .catch((err) => {
      new Response(err)
    })
  )
})