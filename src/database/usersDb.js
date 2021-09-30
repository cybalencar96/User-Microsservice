import Id from "../Id/index.js"

export default function makeUsersDb({makeDb}) {
    return Object.freeze({
        insert,
        findByUsername,
        validate,
        userClassesHandler,
        findById
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

    async function findByUsername(username) {
        const db = await makeDb();
        const users = db.collection('users')
        const result = await users.find({'credentials.private.username': username}).toArray();
        return result[0];
    }

    async function findById(userId) {
        const db = await makeDb();
        const users = db.collection('users')
        const result = await users.find({'_id': userId}).toArray();
        return result[0];
    }

    async function validate(username,password) {
            const db = await makeDb();
            const users = db.collection('users')
            const result = await users.find({'credentials.private.username': username,'credentials.private.password': password}).toArray();
            return result[0]
    }

    async function userClassesHandler({userId, action, classType, classId}) {
        const db = await makeDb();
        const users = db.collection('users')

        const arrUsers = await users.find({"_id": userId}).toArray()
        const user = arrUsers[0]
        if (!user) throw new Error ('user not registered in database');


        if (classType === 'teaching') {
            if (action === 'add') {
                const classIdsExists = user.teaching.includes(classId)
                
                if (classIdsExists) return {
                    id: classId,
                    modified: false,
                    text: "id already inserted"
                }

                const updateDoc = {
                    $push: {
                        teaching: classId
                    }
                }

                const res = await users.updateOne({_id: userId},updateDoc)
                if(res.modifiedCount > 0) {
                    return {
                        id: classId,
                        modified: true,
                        text: "class added successfully"
                    }
                } else {
                    return {
                        id: classId,
                        modified: false,
                        text: "class not modified"
                    }
                }
            }

            if (action === 'remove') {
                const classIdsExists = user.teaching.includes(classId)
                
                if (!classIdsExists) return {
                    id: classId,
                    modified: false,
                    text: "classId not found in teaching array"
                }
                
                const updateDoc = {
                    $pull: {
                        teaching: classId
                    }
                }

                const res = await users.updateOne({_id: userId},updateDoc)
                
                if(res.modifiedCount > 0) {
                    return {
                        id: classId,
                        modified: true,
                        text: "class removed successfully"
                    }
                } else {
                    return {
                        id: classId,
                        modified: false,
                        text: "class not modified"
                    }
                }
            }
            
        }

        if (classType === 'learnings') {
            if (action === 'add') {
                const classIdsExists = user.learnings.includes(classId)
                
                if (classIdsExists) return {
                    id: classId,
                    modified: false,
                    text: "id already inserted"
                }

                const updateDoc = {
                    $push: {
                        learnings: classId
                    }
                }

                const res = await users.updateOne({_id: userId},updateDoc)

                if(res.modifiedCount > 0) {
                    return {
                        id: classId,
                        modified: true,
                        text: "class added successfully"
                    }

                } else {
                    return {
                        id: classId,
                        modified: false,
                        text: "class not modified"
                    }
                }
            }

            if (action === 'remove') {
                const classIdsExists = user.learnings.includes(classId)

                
                if (!classIdsExists) return {
                    id: classId,
                    modified: false,
                    text: "classId not found"
                }

                const updateDoc = {
                    $pull: {
                        learnings: classId
                    }
                }

                const res = await users.updateOne({_id: userId},updateDoc)

                if(res.modifiedCount > 0) {
                    return {
                        id: classId,
                        modified: true,
                        text: "class removed successfully"
                    }

                } else {
                    return {
                        id: classId,
                        modified: false,
                        text: "class not modified"
                    }
                }
            }
        }
    }
}