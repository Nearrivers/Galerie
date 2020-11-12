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