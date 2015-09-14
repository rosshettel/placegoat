var GoatFactory = function () {
    var fs = require('fs'),
        gm = require('gm').subClass({imageMagick: true}),
        self = this;

    const GOAT_DIR = __dirname + '/public_html/goats/';
    const GOATSE = __dirname + '/public_html/goatsee.jpg';

    this.grabAGoat = function (params, callback) {
        var goat = params.goatse ? GOATSE : self.getRandomGoat();

        console.log('Serving %s at dimensions %d x %d', goat, params.width, params.height);

        gm(goat)
            .resize(params.width, params.height)
            .toBuffer(function (err, buffer) {
                callback(err, buffer);
            });
    };

    this.updateGoatsServedCount = function (callback) {

    };

    this.getRandomGoat = function () {
        var files = fs.readdirSync(GOAT_DIR);
        return GOAT_DIR + files[Math.floor(Math.random() * files.length)];
    }
};

module.exports = GoatFactory;