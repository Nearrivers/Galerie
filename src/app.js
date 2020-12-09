const express = require('express');
const app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));

app.use(require('./homePage'));

http.createServer(app).listen(3000);