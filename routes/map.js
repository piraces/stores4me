module.exports = function(app) {

    app.get("/heat/:lat1/:lon1/:lat2/:lon2/:age", function (req, response) {
        var db = require('../database');
        // Lectura de todas las tareas de la BD
        if(req.params.age.includes("-")){
            db.readFromDatabaseAgeInterval(req.params.age.split("-")[0], req.params.age.split("-")[1], req.params.lat1,
                req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        } else {
            db.readFromDatabaseAge(req.params.age,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        }
    });

    app.get("/profile/:lat1/:lon1/:lat2/:lon2/:age/:profile", function (req, response) {
        var db = require('../database');
        // Lectura de todas las tareas de la BD
        if(req.params.age.includes("-")){
            db.readFromDatabaseAgeIntervalProfile(req.params.age.split("-")[0], req.params.age.split("-")[1], req.params.profile,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        } else {
            db.readFromDatabaseAgeProfile(req.params.age, req.params.profile,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        }
    });

    app.get("/heat/:lat1/:lon1/:lat2/:lon2/:age/:amount", function (req, response) {
        var db = require('../database');
        if(req.params.age.includes("-")){
            db.readFromDatabaseAgeIntervalAmount(req.params.age.split("-")[0], req.params.age.split("-")[1], req.params.amount,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        } else {
            // Lectura de todas las tareas de la BD
            db.readFromDatabaseAgeAmount(req.params.age, req.params.amount,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        }
    });

    app.get("/profile/:lat1/:lon1/:lat2/:lon2/:age/:amount/:profile", function (req, response) {
        var db = require('../database');
        if(req.params.age.includes("-")){
            db.readFromDatabaseAgeIntervalAmountProfile(req.params.age.split("-")[0], req.params.age.split("-")[1], req.params.amount,
                req.params.profile, req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        } else {
            // Lectura de todas las tareas de la BD
            db.readFromDatabaseAgeAmountProfile(req.params.age, req.params.amount, req.params.profile,
                req.params.lat1, req.params.lon1, req.params.lat2, req.params.lon2, function (rows) {
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
        }
    });
};
