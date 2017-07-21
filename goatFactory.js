var GoatFactory = function () {
    var fs = require('fs'),
        gm = require('gm').subClass({imageMagick: true}),
        logger = require('./logger'),
        self = this,
        cachedGoatCount;

    const GOAT_DIR = __dirname + '/public_html/goats/';
    const GOATSE = __dirname + '/public_html/goatsee.jpg';
    const GOAT_COUNT = '/srv/placegoat/goatcount.txt';

    this.grabAGoat = function (params, callback) {
        var goat = params.goatse ? GOATSE : self.getRandomGoat();

        gm(goat)
            .resize(params.width, params.height, '^')
            .gravity('Center')
            .crop(params.width, params.height)
            .toBuffer(function (err, buffer) {
                callback(err, buffer);
            });
    };

    this.getGoatsServedCount = function (callback) {
        if (cachedGoatCount) {
            callback(null, cachedGoatCount);
        } else {
            fs.readFile(GOAT_COUNT, function (err, data) {
                if (err) {
                    logger.error('Error getting goat count', err);
                    return;
                }
                cachedGoatCount = parseInt(data, 10);
                callback(null, cachedGoatCount);
            });
        }
    };

    this.updateGoatsServedCount = function () {
        self.getGoatsServedCount(function (err, lastCount) {
            if (err) {
                logger.error("Couldn't get goats served count");
                return;
            }

            //that's the count, increment it
            lastCount++;
            cachedGoatCount = lastCount;
            
            //write the new count to file
            fs.writeFile(GOAT_COUNT, cachedGoatCount, function (err) {
                if (err) {
                    logger.error('Error writing goat count', err);
                }
            });
        });
    };

    this.getRandomGoat = function () {
        var files = fs.readdirSync(GOAT_DIR);
        return GOAT_DIR + files[Math.floor(Math.random() * files.length)];
    }
};

module.exports = new GoatFactory();
