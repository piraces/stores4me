// Imported modules
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect('mongodb://localhost/bank');



// set up our express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./routes/map.js')(app); // load our routes and pass in our app and fully configured passport

// Contenido estático
app.use(express.static(__dirname + '/public'));


function start(port) {
    var server = app.listen(port, function () {
        console.log("Express listening on port %s. Address: %s", server.address().port, server.address().address);
    });
}

// Funciones exportadas para ser usadas externamente
exports.start = start;

