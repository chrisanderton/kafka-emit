require('dotenv').load({silent: true});

//modules
var restify =   require('restify'),
    validator = require('node-restify-validation'),
    request =   require('request'),
    fs =        require('fs'),
    path =      require('path'),
    redirect =  require('restify-redirect'),
    async =     require('async');
    
//lib
var message =   require('./lib/message.js'),
    kafka   =   require('./lib/kafka.js');

var server = restify.createServer({
     name: 'fox-emit',
     version: '1.0.0'
});

server.use(validator.validationPlugin( {
    errorsAsArray: true,
    forbidUndefinedVariables: true,
    errorHandler: restify.errors.InvalidArgumentError
}));

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(redirect());

server.post({
    path: '/push', 
    version: '1.0.0',
}, message.push);

async.series([
    kafka.init
],
function(err, results) {
    if (err) { 
        console.error(err.messagePrimary); 
        exit(1);
    }
    server.listen((process.env.PORT || 8080), function() {
        console.log('%s listening at %s', server.name, server.url);
    });
});