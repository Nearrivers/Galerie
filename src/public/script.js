// Affichage des images sur la page
let cardRow = $('.card-group');
let cards = ' ';

function afficher(items) {
    for(let item of items) {

        cards = (
            '<div class="col-md-3">'
            + '<div class="card mb-3" style="max-width: 18rem;">'
                + `<img src="${item.chemin}" class="card-img-top" alt="...">`
                + '<div class="card-body">'
                    + `<h5 class="card-title">${item.alt}</h5>`
                    + `<a href="/" id="like" class="btn btn-outline-primary">J'aime</a>`
                + '</div>'
            + '</div>'
        +'</div>');
        cardRow.append(cards);
    }
}

// IndexedDB
if (!window.indexedDB) {
    console.log("IndexDb n'est pas là");
} else {    
    console.log('IndexDb est là');
    const bdd = window.indexedDB.open('infosGalerie', 1);
    bdd.onupgradeneeded = function(event) {
        const upgradeBdd = event.target.result;

        if (!upgradeBdd.objectStoreNames.contains('infosGalerie')) {
            upgradeBdd.createObjectStore('infosGalerie');
        }
    };
}

// Cache
const CACHE_NAME = 'Galerie-PWA-app-cache';
const urlsToCache = [
    '/',
    './style.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    './script.js',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js',
    './img/icons/apple-touch-icon-180x180.png',
    './img/icons/camera64.png',
    './img/icons/camera128.png',
    './img/icons/camera256.png',
    './img/icons/camera512.png',
];

if ('caches' in window) {
    caches.open(CACHE_NAME)
    .then((cache) => {
        cache.addAll(urlsToCache);                    
    })
    .catch((e) => {
        console.log(e);
    });
} else {
    console.log("Pas de cache détecté");
}

// Regarde si le navigateur supporte les services workers
if ('serviceWorker' in navigator) {
    // Attend que la fenêtre soit chargée
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-workers/service-worker.js')
        .then((registration) => {
            console.log('Service worker lancé dans le scope : ', registration.scope);
        })
        .catch((e) => {
            console.error("Erreur dans l'enregistrement du service worker : ", e);
        })

        navigator.serviceWorker.ready.then(function(swRegistration) {
            return swRegistration.sync.register('synchroImages');
        });
    });
} else {
    console.warn('Les services workers ne sont pas supportés');
}

// détection du passage hors-ligne
$('.alert').hide();

window.addEventListener('offline', () => {
    $('.alert-danger').show();
    setTimeout(() => $('.alert').hide(), 5000);
});

window.addEventListener('online', () => {
    $('.alert-success').show();
    setTimeout(() => $('.alert').hide(), 5000)
});

// Paramètres requête fetch

var myHeaders = new Headers({
    'Access-Control-Allow-Origin':'*',
    "Content-Type" : "application/json",
})

var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
};

fetch('https://github.com/Nearrivers/Galerie/blob/master/src/public/img/images.json', myInit)
.then((response) => {
    return response.json();
}).then((res) => {
    console.log(res);
    afficher(res);
})
.catch((err) => {
    console.log(err);
})