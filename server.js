var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port),
    goatFactory = require('./goatFactory'),
    isNumber = require('lodash.isnumber'),
    GoatFactory = new goatFactory(),
    logger = require('./logger');

logger.info('Server started');

app.use(express.static(__dirname + '/public_html'));

app.get('/', function (req, res) {
    res.send(__dirname + '/public_html/index.html');
});


// Goat, see?
app.get('/goatse/:width', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        goatse: true
    }, req, res);
});
app.get('/goatse/:width/:height', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        height: req.params.height,
        goatse: true
    }, req, res);
});

// Normal Goats
app.get('/:width', function (req, res) {
    resizeAndServe({
        width: req.params.width
    }, req, res);
});
app.get('/:width/:height', function (req, res) {
    resizeAndServe({
        width: req.params.width,
        height: req.params.height
    }, req, res);
});

function resizeAndServe (params, req, res) {
    params.height = params.height || params.width;  //set height to width if it was not set

    params.width = parseInt(params.width, 10);
    params.height = parseInt(params.height, 10);

    if (!isNumber(params.width) || !isNumber(params.height)) {
        return res.status(400).send("You must provide a number!");
    }

    if (params.width > 1500 || params.height > 1500) {
        return res.status(413).send("Slow down, buddy. We don't have goats that big.");
    }

    logger.info('Request for %d x %d from %s - Referrer: %s', params.width, params.height, req.get('x-forwarded-for'), req.get('Referrer'));

    GoatFactory.grabAGoat(params, function (err, goat) {
        if (err) {
            logger.error("Error serving goat:", err);
            res.status(500).send("Sorry, the goats started chewing on the server.");
        } else {
            GoatFactory.updateGoatsServedCount();

            res.set('Content-Type', 'image/jpeg');
            res.send(goat);
        }
    });
}
