var GoatFactory = function () {
    var fs = require('fs'),
        gm = require('gm').subClass({imageMagick: true}),
        Twitter = require('twitter'),
        twitter = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        }),
        logger = require('./logger'),
        self = this,
        cachedGoatCount;

    const GOAT_DIR = __dirname + '/public_html/goats/';
    const GOATSE = __dirname + '/public_html/goatsee.jpg';
    const COUNT_FILE = __dirname + '/public_html/count.json';
    const TWEET_REGEX = /([0-9]+)(?= goats served!)/;

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
            twitter.get('statuses/user_timeline', {screen_name: 'placegoats'}, function (err, tweets) {
                if (err) {
                    logger.error('Error getting tweets:', err);
                    return;
                }

                //find last tweet mentioning "goats served!"
                var countTweets = tweets.filter(function (tweet) {
                        return TWEET_REGEX.exec(tweet.text);
                    });

                cachedGoatCount = TWEET_REGEX.exec(countTweets[0].text)[0];
                callback(null, cachedGoatCount);
            })
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
            cachedGoatCount++;
            
            //send out a tweet with the new count
            var tweet = {status: "I just served someone a #goat! That's " + lastCount + " goats served!"};
            twitter.post('statuses/update', tweet, function (err, tweet, response) {
                if (err) {
                    logger.error('Error posting tweet:', err);
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
