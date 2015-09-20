var winston = require('winston'),
    slackWinston = require('slack-winston'),
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
                domain: 'highground',
                webhook_url: 'https://hooks.slack.com/services/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',
                channel: 'placegoat',
                level: 'debug'
            })
        ]
    });

module.exports = logger;