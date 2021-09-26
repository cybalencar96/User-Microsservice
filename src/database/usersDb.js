import Id from "../Id/index.js"

export default function makeUsersDb({makeDb}) {
    return Object.freeze({
        insert,
        find,
        validate
    });

    async function insert({...user }) {
        const db = await makeDb();
        const users = db.collection('users')
        const newUser = {
            _id: user.getId(),
            credentials: user.getCredentials(),
            learnings: user.getLearning(),
            teaching: user.getTeaching(),
            createdAt: user.getCreatedAt()
        }
        const result = await users.insertOne(newUser)
        const classInserted = await users.find({_id:result.insertedId}).toArray();
        return classInserted[0];
    }

    async function find(username) {
        const db = await makeDb();
        const users = db.collection('users')
        const result = await users.find({'credentials.private.username': username}).toArray();
        return result[0];
    }

    async function validate(username,password) {
            const db = await makeDb();
            const users = db.collection('users')
            console.log(username,password)
            const result = await users.find({'credentials.private.username': username,'credentials.private.password': password}).toArray();
            return result[0]
    }

}