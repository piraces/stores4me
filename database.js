// Modo estricto
'use strict';

// Módulos importados
var mongoose = require('mongoose'),
    Customers = require("./models/result.js").Customers,
    Transactions = require("./models/result.js").Transactions;

// URL de conexión
function readFromDatabaseAge(age, callback) {
    Customers.find({'customer.age': age}).exec(function (err, cust) {
        if (err) {
            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
        } else {
            var validTransactions = {};
            var numberOfIterations = 0;
            var currentArray = [];
            cust.forEach(function (customer) {
                var current = [];
                if (customer.contracts.credit_cards) {
                    current = customer.contracts.credit_cards.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                }
                if (customer.contracts.debit_cards) {
                    current = customer.contracts.debit_cards.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                }
                if (customer.contracts.accounts) {
                    current = customer.contracts.accounts.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                    }
                }
                if (numberOfIterations == cust.length - 1) {
                    Transactions.find({
                        'accountId': {$in: currentArray},
                        peerLocation: {$exists: true}
                    }).exec(function (err, documents) {
                        if (err) {
                            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
                        } else {
                            var iterations = 0;
                            documents.forEach(function (document) {
                                if (validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)]) {
                                    validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)].intensity =
                                        validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)].intensity + 1;
                                } else {
                                    validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)] = {
                                        lat: document.peerLocation.lat.toFixed(3),
                                        lon: document.peerLocation.lon.toFixed(3),
                                        intensity: 0
                                    };
                                }
                                if (iterations == documents.length - 1) {
                                    var finalArray = [];
                                    for(var i in validTransactions){
                                        finalArray.push(validTransactions[i]);
                                    }
                                    callback(finalArray);
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

function readFromDatabaseAgeAmount(age, amount, callback) {
    Customers.find({'customer.age': age}).exec(function (err, cust) {
        if (err) {
            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
        } else {
            var validTransactions = {};
            var numberOfIterations = 0;
            var currentArray = [];
            cust.forEach(function (customer) {
                var current = [];
                var currentMoney = 0, ccard = false, dcard = false, account = false;
                if (customer.contracts.credit_cards) {
                    current = customer.contracts.credit_cards.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                        currentMoney += current[i].amount;
                    }
                }
                if (customer.contracts.debit_cards) {
                    current = customer.contracts.debit_cards.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                        currentMoney += current[i].amount;
                    }
                }
                if (customer.contracts.accounts) {
                    current = customer.contracts.accounts.toObject();
                    for (var i = 0; i < current.length; i++) {
                        currentArray.push(current[i].id);
                        currentMoney += current[i].amount;
                    }
                }
                if(currentMoney<amount){
                    if(ccard) {
                        currentArray.pop();
                    }
                    if(dcard){
                        currentArray.pop();
                    }
                    if(account){
                        currentArray.pop();
                    }
                }
                if (numberOfIterations == cust.length - 1) {
                    Transactions.find({
                        'accountId': {$in: currentArray},
                        peerLocation: {$exists: true}
                    }).exec(function (err, documents) {
                        if (err) {
                            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
                        } else {
                            var iterations = 0;
                            documents.forEach(function (document) {
                                if (validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)]) {
                                    validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)].intensity =
                                        validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)].intensity + 1;
                                } else {
                                    validTransactions[document.peerLocation.lat.toFixed(3) + "," + document.peerLocation.lon.toFixed(3)] = {
                                        lat: document.peerLocation.lat.toFixed(3),
                                        lon: document.peerLocation.lon.toFixed(3),
                                        intensity: 0
                                    };
                                }
                                if (iterations == documents.length - 1) {
                                    var finalArray = [];
                                    for(var i in validTransactions){
                                        finalArray.push(validTransactions[i]);
                                    }
                                    callback(finalArray);
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
exports.readFromDatabaseAge = readFromDatabaseAge;
exports.readFromDatabaseAgeAmount = readFromDatabaseAgeAmount;