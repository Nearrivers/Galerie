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
                    + `<a id="${item.id}" class="btn btn-outline-primary" onclick="ajout(${item.id})">J'aime</a>`
                + '</div>'
            + '</div>'
        +'</div>');
        cardRow.append(cards);

        // Affichage des favoris au chargement de la page
        localforage.getItem('favoris')
        .then((result) => {
            // Si mon localforage n'est pas vide
            if (result != null) {
                // On récupère le bouton qui vient d'être affiché dans cette itération de la boucle
                let monBtn = $("#" + item.id)
                // On parcourt le localforage
                for (let i = 0; i < result.length; i++) {
                    // Si un des éléments du tableau est égal à l'id de l'image sélectionnée
                    if (result[i] == item.id) {
                        // On fait savoir que l'image a déjà été ajoutée dans les favoris
                        monBtn.removeClass('btn-outline-primary');
                        monBtn.addClass('btn-primary');
                        // On quitte la boucle
                        return
                    }
                }
            }
        })
        .catch((e) => {
            console.log(e);
        })
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
    // On récupère le bouton sur lequel on a cliqué grâce à son id qu'on passe en paramètres
    let monBtn = $("#" + key);
    // Booléen pour indiquer si on a bien trouvé l'id de l'image dans le local storage
    let top_ok = false;
    // On cherche dans la table favoris de localForage qui contient les id de mes images
    localforage.getItem('favoris')
        // Si l'opération est un succès on passe le tableau de résultats
        .then((result) => {
            // On construit un array qui reçoit notre tableau de résultats
            let array = [];            
            // S'il n'est pas vide
            if (result != null) {
                array = result;
                console.log("hello there", array.length);

                // On parcourt le tableau de résultats
                for (let i = 0; i < result.length; i++) {
                    // Si un des éléments du tableau est égal à l'id de l'image sélectionnée
                    if (result[i] == key) {
                        // On retire l'élément de notre tableau intermédiaire
                        array.splice(i, 1);
                        // Et on le met dans le localforage
                        localforage.setItem('favoris', array);
                        // On change l'apparence du bouton pour montrer que l'image a été enlevée des favoris
                        monBtn.removeClass('btn-primary');
                        monBtn.addClass('btn-outline-primary');
                        // On le crie sur tous les toits 
                        console.log("Ca à fonctionné plus vite qu'IndexedDB");
                        // On fait savoir à l'application qu'on a trouvé un élément 
                        top_ok = true;
                        // On quitte la boucle
                        return
                    }
                }

                // Si on a pas trouvé l'item dans le local storage cela veut dire qu'on ne l'a pas mit tout simplement
                if (!top_ok) {
                    // On met le nouvel id dans le tableau
                    array.push(key);
                    // Si le localforage est vide on se contente juste de rajouter l'id de l'image dans le localforage
                    localforage.setItem('favoris', array);
                    // On change l'apparence du bouton pour montrer que l'image a bien été ajoutée dans les favoris
                    monBtn.removeClass('btn-outline-primary');
                    monBtn.addClass('btn-primary');
                    // Comme ça marche je me rappelle que je suis trop fort
                    console.log("Je suis trop fort");
                }

            } else {
                array.push(key);
                // Si le localforage est vide on se contente juste de rajouter l'id de l'image dans le localforage
                localforage.setItem('favoris', array);
                // On change l'apparence du bouton pour montrer que l'image a bien été ajoutée dans les favoris
                monBtn.removeClass('btn-outline-primary');
                monBtn.addClass('btn-primary');
                // Comme on est content encore une fois on le fait savoir
                console.log("Je suis content");
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