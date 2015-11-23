var winston = require('winston'),
    slackWinston = require('slack-winston'),
    slackWebhook = process.env.LOGGER_WEBHOOK || 'n/a',
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                colorize: true,
                prettyPrint: true,
                timestamp: function () {
                    return new Date().toLocaleString();
                }
            }),
            new slackWinston.Slack({
                domain: 'rosshettel',
                webhook_url: slackWebhook,
                channel: 'placegoat-logs',
                silent: slackWebhook === 'n/a',
                level: 'debug'
            })
        ]
    });

module.exports = logger;