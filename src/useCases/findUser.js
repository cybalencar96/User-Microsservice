export default function makeFindUser ({usersDb}) {
    return async function findUser (userId) {
        const user = await usersDb.findById(userId);
        if (user) {
            return {
                id: user._id,
                public: user.credentials.public,
                teaching: user.teaching,
                learnings: user.learnings
            }
        } else {
            return null
        }
    }
}