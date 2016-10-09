# Transactions Heat
Heat map of transactions made by clients of a Bank (HackUPC '16). It consists of a Web application that allows the user to enter an interval of age, average salary and situation; in order to search the best commercial areas that suits their requeriments.

This areas are retrieved analyzing and mining the data from the transactions and clients of the dataset with same characteristics. The zones retrieved are represented in a heat map covering all spain, regarding the impact of each zone.

This project is a Proof of Concept of how mining data from transactions and clients in a specific bank would be utilized to enrich the movements of a current account, and providing more useful services to their customers.

## Web interface

The web allows to renderize all the map efficiently, making petitions and drawing points as the user moves around the map, in order to minimize the load on the client and server side.

This interface allows the entering of three types of data, in order to retrive the best commercial areas:
 - Interval of ages.
 - Average salary.
 - Actual situation.

## Mongo DB
It's used a big JSON dataset, imported to MongoDB from a Bank that contains information about customers and its transactions.

The structure of the two collections it's the following:

- Customers schema:

```JavaScript
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
```

- Transactions schema:
```JavaScript
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
```

Since the dataset it's too big, there is the need of creating indexes on the main queried fields in the queries. Therefore the index created are the following:

```
> db.customers.ensureIndex({'customer.age':1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}

> db.transactions.ensureIndex({'accountId':1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```
