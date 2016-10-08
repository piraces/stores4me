// Modo estricto
'use strict';

// Módulos importados
var mongoose = require('mongoose'),
    Customers = require("./models/result.js").Customers,
    Transactions = require("./models/result.js").Transactions;

// URL de conexión
function readFromDatabaseByAge(age, callback) {
    Customers.find({'customer.age': age}).exec(function (err, cust) {
        if (err){
            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
        } else {
            var validTransactions = {};
            var numberOfIterations = 0;
            var currentArray = [];
            cust.forEach(function(customer){
                if(customer.contracts.credit_cards) {
                    var current = customer.contracts.credit_cards.toObject();
                    for(var i=0; i<current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                    current = customer.contracts.debit_cards.toObject();
                    for(var i=0; i<current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                    current = customer.contracts.accounts.toObject();
                    for(var i=0; i<current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                }
                if(numberOfIterations == cust.length-1){
                    Transactions.find({'accountId': {$in: currentArray}, peerLocation:{$exists:true}}).exec(function (err, documents) {
                        if (err) {
                            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
                        } else {
                            var iterations = 0;
                            documents.forEach(function (document) {
                                if (validTransactions[document.peerLocation.lat.toFixed(2) + "," + document.peerLocation.lon.toFixed(2)]){
                                    validTransactions[document.peerLocation.lat.toFixed(2) + "," + document.peerLocation.lon.toFixed(2)].intensity =
                                        validTransactions[document.peerLocation.lat.toFixed(2) + "," + document.peerLocation.lon.toFixed(2)].intensity + 1;
                                } else {
                                    validTransactions[document.peerLocation.lat.toFixed(2) + "," + document.peerLocation.lon.toFixed(2)] = {
                                        lat: document.peerLocation.lat.toFixed(2),
                                        lon: document.peerLocation.lon.toFixed(2),
                                        intensity: 0
                                    };
                                }
                                if(iterations == documents.length-1){
                                    callback(validTransactions);
                                }
                                iterations++;
                            });
                        }
                    });
                }
                numberOfIterations++;
            });
        }
    });
}

// Funciones exportadas para ser usadas externamente
exports.readFromDatabaseByAge = readFromDatabaseByAge;