// We need to 'require' the following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require ("redis").createClient(),
    twitterWorker = require ("./twitter.js"),
    app = express();
    
var happyTerms = ['happy', 'excited', 'fun', 'glad', 'blessed'];
var sadTerms = ['sad', 'depressed', 'crying', 'bad', 'unhappy'];
var trackedTerms= happyTerms.concat(sadTerms);

twitterWorker(trackedTerms);
// This is our basic configuration 
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});

app.get("/happyCounts.json", function	(req, res) {
    redisClient.mget(happyTerms, function	(error, counts) {
        if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var result= [],
                i;
            for(i=0; i < happyTerms.length; i = i +1){
                result.push({
                  "key":happyTerms[i],
                  "count":counts[i]
                });
            }
            // use res.json to return JSON objects instead of strings
            res.json(result);
        }
    });
});

app.get("/happyTotal.json", function (req, res) {
    redisClient.mget(happyTerms, function (error, counts) {
        if (error !== null) {
            console.log("ERROR: " + error);
        } else {
            var total = 0,
                result,
                i;
            for(i=0; i < happyTerms.length; i = i +1){
                result = {
                    "count":total += parseInt(counts[i]) 
                }               
            }
        }
        res.json(result);
    });
});

app.get("/sadCounts.json", function	(req, res) {
    redisClient.mget(sadTerms, function	(error, counts) {
        if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var result= [],
                i;
            for(i=0; i < sadTerms.length; i = i +1){
                result.push({
                  "key":sadTerms[i],
                  "count":counts[i]
                });
            }
            // use res.json to return JSON objects instead of strings
            res.json(result);
        }
    });
});

app.get("/sadTotal.json", function (req, res) {
    redisClient.mget(sadTerms, function (error, counts) {
        if (error !== null) {
            console.log("ERROR: " + error);
        } else {
            var total = 0,
                result,
                i;
            for(i=0; i < sadTerms.length; i = i +1){
                result = {
                  "count":total += parseInt(counts[i]) 
                }               
            }
        }
        res.json(result);
    });
});

app.get("/counts.json", function	(req, res) {
    redisClient.mget(trackedTerms, function	(error, counts) {
        if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var result= [],
                i;
            for(i=0; i < trackedTerms.length; i = i +1){
                result.push({
                  "key":trackedTerms[i],
                  "count":counts[i]
                });
            }
            // use res.json to return JSON objects instead of strings
            res.json(result);
        }
    });
});