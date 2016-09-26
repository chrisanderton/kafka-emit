require('dotenv').load({silent: true});

var request = require('request'),
    InfiniteLoop = require('infinite-loop'),
    Chance = require('chance');
    
var il = new InfiniteLoop,
    chance = new Chance,
    specialData = process.env.SPECIAL_VALUE,
    counter = 0;

function emit() {
    counter++;

    var id = 'K'+parseInt((Math.random() * 9 + 1) * Math.pow(10,9-1), 10),
        special = chance.integer({min: 1, max: 15});
        
    var formData = {
        id: special == 7 ? specialData : id
    }

    console.log('Emitting #'+counter+': '+formData.id);

    request.post({url: process.env.API_KAFKA_URL, formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error('Failed:', err);
    }
    });
}

il.add(emit).setInterval(chance.integer({min: 1, max: 15})*process.env.INTERVAL).run();