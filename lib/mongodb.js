// lib/mongodb.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().then(() => client);
    }
    clientPromise = global._mongoClientPromise;
} else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect().then(() => client);
}

export default clientPromise;
