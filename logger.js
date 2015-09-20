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
                webhook_url: process.env.SLACK_WEBHOOK,
                channel: 'placegoat',
                level: 'debug'
            })
        ]
    });

module.exports = logger;