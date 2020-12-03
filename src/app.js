const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
var http = require('http');

app.use(session({
    secret: "Favorites",
    resave: true,
    saveUnintialized: true,
    cookie: { maxAge : 60000},
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});

app.use(express.static(__dirname + '/frontend/public'));

app.use(require('./routes/homePage'));

// app.listen(3000, () =>{
//     console.log("Bienvenue sur http://localhost:3000");
// });

http.createServer(app).listen(3000);