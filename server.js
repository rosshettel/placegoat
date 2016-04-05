var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port),
    GoatFactory = require('./goatFactory'),
    isFinite = require('lodash.isfinite'),
    logger = require('./logger');

logger.info('Server started 🐐');

app.use(express.static(__dirname + '/public_html'));

app.get('/', function (req, res) {
    res.send(__dirname + '/public_html/index.html');
});

app.get('/count.json', function (req, res) {
    GoatFactory.getGoatsServedCount(function (err, count) {
        if (err) {
            res.send(500);
        } else {
            res.set('Content-Type', 'application/json');
            res.send({count: count});
        }
    });
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

    if (params.width.indexOf('.php') > -1) {
        //handle script kiddies looking for PHP servers
        logger.warn('Served a 404 to idiots looking for a .php file. IP: %s', req.get('x-forwarded-for'));
        return res.status(404).send("Cannot GET /" + params.width);
    }

    params.width = parseInt(params.width, 10);
    params.height = parseInt(params.height, 10);

    if (!isFinite(params.width) || !isFinite(params.height)) {
        return res.status(404).send("You must provide a number!");
    }

    if (params.width > 1500 || params.height > 1500) {
        return res.status(413).send("Slow down, buddy. We don't have goats that big.");
    }

    logger.info('Request for %s x %s from %s - Referrer: %s', req.params.width, req.params.height, req.get('x-forwarded-for'), req.get('Referrer'));

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
