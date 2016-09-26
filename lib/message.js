var kafka = require('./kafka.js');

module.exports.push = function (req, res, next) {
    res = kafka.push(req, res, next);
    
    return next();
};