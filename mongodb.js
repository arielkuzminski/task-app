import { MongoClient } from 'mongodb';

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const client = new MongoClient(connectionUrl, {useUnifiedTopology: true });

client.connect((error)=> {
    if (error) {
        console.log(error);
    }
    const db = client.db(databaseName);
})