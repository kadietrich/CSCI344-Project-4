// We need to 'require' the following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require ("redis").createClient(),
    twitterWorker = require ("./twitter.js"),
    app = express();
    
var words = ["fun", "games", "april fools"];
    //var happyTerms = ['happy', 'excited', 'fun', 'glad', 'good'];
//var sadTerms = ['sad', 'depressed', 'crying', 'bad'];
// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});

app.get("/", function (req, res) {
    //send "Hello World" to the client as html
    res.send("Hello World!");
});
app.get("/counts.json", function	(req, res) {
    redisClient.mget(words, function	(error, counts) {
        if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var result= [],
                i;
            for(i=0; i < words.length; i = i +1){
                result.push({
                  "key":words[i],
                  "count":counts[i]
                });
            }
            // use res.json to return JSON objects instead of strings
            res.json(jsonObject);
        }
    });
});