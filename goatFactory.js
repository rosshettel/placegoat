var GoatFactory = function () {
    var fs = require('fs'),
        gm = require('gm').subClass({imageMagick: true}),
        jsonFile = require('jsonfile'),
        self = this;

    const GOAT_DIR = __dirname + '/public_html/goats/';
    const GOATSE = __dirname + '/public_html/goatsee.jpg';
    const COUNT_FILE = __dirname + '/public_html/count.json'

    this.grabAGoat = function (params, callback) {
        var goat = params.goatse ? GOATSE : self.getRandomGoat();

        console.log('Serving %s at dimensions %d x %d', goat, params.width, params.height);

        self.updateGoatsServedCount();

        gm(goat)
            .resize(params.width, params.height)
            .toBuffer(function (err, buffer) {
                callback(err, buffer);
            });
    };

    this.updateGoatsServedCount = function () {
        jsonFile.readFile(COUNT_FILE, function (err, file) {
            if (err) {
                console.log('Error reading file:', err);
                file = { count: 6113 };
            }

            file.count++;
            process.env.GOAT_COUNT = file.count;
            console.log('updated count', file);

            jsonFile.writeFile(COUNT_FILE, file, function (err) {
                if (err) {
                    console.log('Error writing file:', err);
                }
            });
        });
    };

    this.getRandomGoat = function () {
        var files = fs.readdirSync(GOAT_DIR);
        return GOAT_DIR + files[Math.floor(Math.random() * files.length)];
    }
};

module.exports = GoatFactory;