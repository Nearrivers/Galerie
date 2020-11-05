let cardRow = $('.card-group')

let cards = (
    '<div class="col-md-3">'
    + '<div class="card mb-3" style="max-width: 18rem;">'
        + '<img src="./img/space-4888643__340.webp" class="card-img-top" alt="...">'
        + '<div class="card-body">'
            + '<h5 class="card-title">Card title</h5>'
            + `<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>`
            + '<a href="#" class="btn btn-primary">Go somewhere</a>'
        + '</div>'
    + '</div>'
+'</div>');

for(let i = 0; i <= 3; i++) {
    cardRow.append(cards)
}