const express = require('express');

var path = require('path');
var router = express.Router();

router.route('/')
.get((req, res) => {
    res.sendFile(path.join('./index.html'));
});

module.exports = router;