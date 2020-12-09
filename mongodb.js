// CRUD

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('task').insertMany([
        {
            description: 'Go to sleep',
            completed: false,
        },
        {
            description: 'Finish mongoDb tutorial',
            completed: false,
        },
        {
            description: 'Say goodbye to Paula',
            completed: true,
        },
    ], (error, result) => {
        if (error) {
            return console.log('Failed to add tasks');
        }
        console.log(result.ops);
    })


});
