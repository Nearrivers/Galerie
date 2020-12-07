const express = require('express');
const app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));

app.use(require('./homePage'));

// app.listen(3000, () =>{
//     console.log("Bienvenue sur http://localhost:3000");
// });

http.createServer(app).listen(3000);