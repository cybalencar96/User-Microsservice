export default function makeLoginUser ({usersDb}) {
    return async function loginUser(userInfo) {
        const { 
            username,
            password
        } = userInfo;

        const response = await usersDb.validate(username,password);
        if (response) {
            return {
                isAuthenticated: true,
                user: {
                    _id: response._id,
                    credentials: response.credentials.public,
                    learnings: response.learnings,
                    teaching: response.teaching,
                }
            }
        } else {
            return {
                isAuthenticated: false,
                user: null
            }
        }
    }
}