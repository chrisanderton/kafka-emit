var kafka = require('no-kafka'),
    url = require('url'),
    util = require('util'),
    async = require('async');

var producer,
    CLIENT_ID = 'kafka-emit';

module.exports.init = function(callback) {

    options = { 
        clientId: CLIENT_ID,
        connectionString: process.env.KAFKA_URL,
        ssl: {
            trustedCert: process.env.KAFKA_TRUSTED_CERT,
            clientCert: process.env.KAFKA_CLIENT_CERT,
            clientCertKey: process.env.KAFKA_CLIENT_CERT_KEY
        },
        logger: {
            logFunction: console.log
        }
    };
    
    producer = new kafka.Producer(options);

    return producer.init().then(function(){
        callback(null);
    })
};

//this is in no way safe - no sanitization yet!
module.exports.push = function (req, res, next) {
    return producer.send({
        topic: process.env.KAFKA_TOPIC,
        partition: 0,
        message: {
            value: req.body.value
        }
    })
    .then(function (result) {
        return res.send({
            result
        });     
    });
}
