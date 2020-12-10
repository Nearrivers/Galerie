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
                    + `<a id="${item.id}" class="btn btn-outline-primary like" onclick="ajout(${item.id})">J'aime</a>`
                + '</div>'
            + '</div>'
        +'</div>');
        cardRow.append(cards);
    }    
        // let transation = db.transaction('favoris', 'readwrite');
        // let objectStore = transation.objectStore('favoris');

        // let item = {
        //     id: '',
        //     created: new Date().getTime()
        // }

        // let key = objectStore.get(this.id)
        // key.onsuccess = function() {
        //     let _key = key.result;
        //     item.id = _key;
        //     suppression(objectStore, item, _key);
        // }
        // key.onerror = function() {
        //     ajout(objectStore, item);
        // }
}

function ajout(key) {
    console.log(key);
    let monBtn = $("#" + key);

    localforage.getItem('favoris')
        .then((result) => {
            if (result) {
                console.log("Coucou toi " + result);
                monBtn.removeClass('btn-primary');
                monBtn.addClass('btn-btn-outline-primary');
            } else {
                localforage.setItem('favoris', key)
                .then(() => {
                    console.log("Ca à fonctionné plus vite qu'IndexedDB");
                    monBtn.removeClass('btn-outline-primary');
                    monBtn.addClass('btn-primary');
                })
                .catch((e) => {
                    console.log("En fait non : ", e);
                })
            }
        })
        .catch((e) => {
            console.log(e);            
        })
}

// async function ajout(objectStore, item, key) {
//     try {
//         await objectStore.add(item, this.id)
//         console.log('Ajout en favoris réussi');
//     }
//     catch(e) {
//         console.log(e);
//     }
// }

// async function suppression(objectStore, item, key) {
//     try {
//         await objectStore.delete(item, key)
//         console.log('Suppression du favoris réussie');
//     }
//     catch(e) {
//         console.log(e);
//     }
// }


// IndexedDB
if (!window.indexedDB) {
    console.log("IndexDb n'est pas là");
} else {
    console.log('IndexDb est là');
    openRequest = window.indexedDB.open('favoris', 1);
    openRequest.onupgradeneeded = function() {
        db = openRequest.result;

        if (!db.objectStoreNames.contains('favoris')) {   
            db.createObjectStore('favoris', {keyPath: 'id'});
            // objectStore.createIndex("imgAlt", "imgAlt", { unique: true });
        }
    };

    openRequest.onerror = () => console.log("IndexedDB inaccessible !");

    openRequest.onsuccess = function() {
        db = openRequest.result;
    };
};

// Regarde si le navigateur supporte les services workers
if ('serviceWorker' in navigator) {
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

// Détection du passage hors-ligne
$('.alert').hide();

window.addEventListener('offline', () => {
    $('.alert-danger').show();
    setTimeout(() => $('.alert').hide(), 5000);
});

window.addEventListener('online', () => {
    $('.alert-success').show();
    setTimeout(() => $('.alert').hide(), 5000)
});

// Requête fetch
fetch('https://raw.githubusercontent.com/Nearrivers/Galerie/master/src/public/img/images.json')
.then((response) => {
    return response.json();
}).then((res) => {
    console.log(res);
    afficher(res);
})
.catch((err) => {
    console.log(err);
})