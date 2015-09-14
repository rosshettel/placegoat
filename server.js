var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port),
    goatFactory = require('./goatFactory'),
    GoatFactory = new goatFactory();

app.use(express.static(__dirname + '/public_html'));

app.get('/', function (req, res) {
    res.send(__dirname + '/public_html/index.html');
});


// Goat, see?
app.get('/goatse/:width', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        goatse: true
    }, res);
});
app.get('/goatse/:width/:height', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        height: req.params.height,
        goatse: true
    }, res);
});

// Normal Goats
app.get('/:width', function (req, res) {
    resizeAndServe({
        width: req.params.width
    }, res);
});
app.get('/:width/:height', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        height: req.params.height
    }, res);
});

function resizeAndServe (params, res) {
    params.height = params.height || params.width;  //set height to width if it was not set

    if (params.width > 1500 || params.height > 1500) {
        return res.status(413).send("Slow down, buddy. We don't have goats that big.");
    }

    GoatFactory.grabAGoat(params, function (err, goat) {
        if (err) {
            console.log("Error serving goat:", err);
            res.status(500).send("Sorry, the goats started chewing on the server.");
        } else {
            res.set('Content-Type', 'image/jpeg');
            res.send(goat);
        }
    });
}
