// app/models/results.js
// load the things we need
var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
        customer: {
                age: Number,
                email: String,
                first_name: String,
                gender: String,
                id: String,
                last_name: String,
                location: {
                        address: String,
                        city: String,
                        latitude: Number,
                        longitude: Number,
                        province: String,
                        state: String,
                        zip: String
                },
                profile: String
        },
        contracts: {
                accounts: [
                        {
                                id: String,
                                amount: Number,
                                currency: String,
                                limit: Number,
                                overlimit_interest: Number,
                                overlimit_fee: Number
                        }
                ],
                credit_cards: {
                        id: String,
                        related_account_id: String,
                        amount: Number,
                        limit: Number,
                        interest: Number
                },
                debit_cards: {
                        id: String,
                        related_account_id: String
                }
        },
        credits: [],
        mortgages: []

});

var transactionSchema = mongoose.Schema({
        operationDate: String,
        timeMilis: Number,
        accountCode: String,
        amount: Number,
        peerState: String,
        peerZip: Number,
        description: String,
        peerCountry: String,
        valueDate: String,
        type: String,
        transactionId: String,
        peerAddress: String,
        peerName: String,
        accountId: String,
        peerCity: String,
        peerLocation: {
                lat: Number,
                lon: Number
        },
        accountBalance: Number,
        peerActivity: String
});

// create the model for users and expose it to our app
module.exports = {
        Customers: mongoose.model('customers', customerSchema),
        Transactions: mongoose.model('transactions', transactionSchema)
};