var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');
var http = require('http');

//create redis client
var client = redis.createClient();

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});
var happyTerms = ['happy', 'excited', 'fun', 'glad', 'good'];
var sadTerms = ['sad', 'depressed', 'crying', 'bad'];
t.stream(
    'statuses/filter',
    { track: happyTerms },
    function(stream) {
        stream.on('data', function(tweet) {
            happyTerms.forEach( function(elt){
                if(tweet.text.indexOf(elt) === -1) {
                    client.incr(elt);
                }
            });
            console.log(tweet.text);
        });
    }
);
//create http server
var server = http.createServer(function (req, res) {
    client.mget(happyTerms, function (err, resultsCount){
        if (err !== null) {
            //handle error here
            console.log('error: ' + err);
        } else {           
            var i = 0;
            var response = 'Counts <br />';
            resultsCount.forEach(function(result) {
                response += 'The ' + happyTerms[i] + ' count is ' + result + '<br />';
                i++;
            });

            //var response = 'The awesome count is ' + resultsCount[0];
            //response += 'The cool count is ' + resultsCount[1];
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(response);
        }
    });
}).listen(3000);
