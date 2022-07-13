const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const { ObjectId } = require('mongodb');
const User = require('../models/User');
const NamedCrown = require('../models/NamedCrown');

exports.fetchUsers = async () => {
    let users = [];
    try {
        await client.connect();
        let cursor = await client.db('horrorwatchlist').collection('users').find();
        await cursor.forEach(function (item, err) {
            if (item === null) {
                console.log('Nothing in here...')
                client.close();
                return;
            }
            users.push(item);
        });
        return users;
    } catch (e) {
        console.log(e);
    }
}

exports.fetchNamedCrownsByUserID = async (userID) => {
    try {
        await client.connect();
        return await client.db('horrorwatchlist').collection('crowns').find({"userID": new ObjectId(userID)}).toArray();
    } catch (e) {
        console.log(e);
    }
}

exports.createNamedCrown = async (namedCrown) => {
    try {
        let crown = new NamedCrown(undefined, namedCrown.userID, namedCrown.date, namedCrown.type, namedCrown.context, namedCrown.line);
        await client.connect();
        await client.db('horrorwatchlist').collection('crowns').insertOne(crown, (err) => {
            if(err) throw err;
            else console.log(`${crown.line} inserted!`);
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.incrementCrownsForUser = async (userID, amount) => {
    try {
        await client.connect();
        await client.db('horrorwatchlist').collection('users').updateOne({"_id": new ObjectId(userID)}, {$inc: {crowns: amount}});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}