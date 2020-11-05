import images from './../img/images.json'

let cardRow = $('.card-group')
let cards = ' '
for(let image of images) {
    cards = (
        '<div class="col-md-3">'
        + '<div class="card mb-3" style="max-width: 18rem;">'
            + `<img src="${image.chemin}" class="card-img-top" alt="...">`
            + '<div class="card-body">'
                + `<h5 class="card-title">${image.alt}</h5>`
                + `<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>`
                + '<a href="#" class="btn btn-primary">Go somewhere</a>'
            + '</div>'
        + '</div>'
    +'</div>');
    cardRow.append(cards)
}