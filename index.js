var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile('./demo/index.html', {
        root: __dirname,
    });
});

app.use(express.static('.'));

app.listen(3000, function () {
    console.log('Angular Events demo listening on port 3000!');
});
