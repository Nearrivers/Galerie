const CACHE_NAME = 'Galerie-PWA-app-cache';
const urlsToCache = [
    '/',
    '/styles.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2',
    '/scripts/script.js',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js'
];

let cardRow = $('.card-group')
let cards = ' ' 

function afficher(items) {
    for(let item of items) {
        cards = (
            '<div class="col-md-3">'
            + '<div class="card mb-3" style="max-width: 18rem;">'
                + `<img src="${item.chemin}" class="card-img-top" alt="...">`
                + '<div class="card-body">'
                    + `<h5 class="card-title">${item.alt}</h5>`
                    + `<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>`
                    + '<a href="#" class="btn btn-primary">Go somewhere</a>'
                + '</div>'
            + '</div>'
        +'</div>');
        cardRow.append(cards)
    }
}

if ('indexDB' in window) {
    console.log('IndexDb est là');
    const bdd = window.indexedDB.open('infosGalerie', 1)
    bdd.onupgradeneeded((function(event) {
        const upgradeBdd = event.target.result

        if (!upgradeBdd.objectStoreNames.contains('infosGalerie')) {
            upgradeBdd.creteObjectStore('infosGalerie')
        }
    }))
} else {
    console.log("IndexDb n'est pas là");
}

if ('cache' in window) {
    caches.open(CACHE_NAME)
    .then((cache) => {
      cache.addAll(urlsToCache)
      console.log(cache);
    })
    .catch((e) => {
      console.log(e);
    })
} else {
    console.log("Pas de cache détecté");
}

fetch('https://raw.githubusercontent.com/Nearrivers/Galerie/master/img/images.json')
.then((response) => {
    return response.json()
}).then((res) => {
    console.log(res);
    afficher(res)
})
.catch((err) => {
    console.log(err);
})

exports.CACHE_NAME = CACHE_NAME
exports.urlsToCache = urlsToCache