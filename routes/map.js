module.exports = function(app) {

    app.get("/heat/:id", function (req, response) {
        var db = require('../database');
        // Lectura de todas las tareas de la BD
        db.readFromDatabaseAge(req.params.id, function (rows) {
            if (typeof(rows) == "object" && rows != null && !rows.hasOwnProperty('error')) {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(rows));
                response.end();
            } else if (rows.hasOwnProperty('error')) {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            } else {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            }
        });
    });

    app.get("/heat/:id/:amount", function (req, response) {
        var db = require('../database');
        // Lectura de todas las tareas de la BD
        db.readFromDatabaseAgeAmount(req.params.id, req.params.amount, function (rows) {
            if (typeof(rows) == "object" && rows != null && !rows.hasOwnProperty('error')) {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(rows));
                response.end();
            } else if (rows.hasOwnProperty('error')) {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            } else {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            }
        });
    });

};
