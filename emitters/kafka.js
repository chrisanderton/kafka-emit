require('dotenv').load({silent: true});

var request = require('request'),
    InfiniteLoop = require('infinite-loop'),
    Chance = require('chance');
    
var il = new InfiniteLoop,
    chance = new Chance,
    specialValue = process.env.SPECIAL_VALUE,
    counter = 0;

function emit() {
    counter++;

    var value = 'K'+parseInt((Math.random() * 9 + 1) * Math.pow(10,9-1), 10),
        special = chance.integer({min: 1, max: 15});
        
    var formData = {
        value: special == 7 ? specialValue : value
    }

    console.log('Emitting #'+counter+': '+formData.value);

    request.post({url: process.env.API_KAFKA_URL, formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error('Failed:', err);
    }
    });
}

il.add(emit).setInterval(chance.integer({min: 1, max: 15})*process.env.INTERVAL).run();