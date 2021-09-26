import makeUsersDb from "./usersDb.js";
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient;

const CLASS_DB_URL = "mongodb+srv://testdb:testdb@cluster0.4ucbz.mongodb.net/users-microsservice?retryWrites=true&w=majority";
const CLASS_DB_NAME = "users-microsservice";
const client = new MongoClient(CLASS_DB_URL, { useNewUrlParser: true });

export async function makeDb () {
    await client.connect();
    return client.db(CLASS_DB_NAME);
}

const usersDb = makeUsersDb({ makeDb });
export default usersDb;