export default function makeAuthUser ({ loginUser }) {
    return async function authUser (httpRequest) {
        try {
            const {...userInfo} = httpRequest.body
            if (!userInfo.username || !userInfo.password) {
                return {
                    statusCode: 400,
                    text: 'Bad Request',
                    description: "Object doesn't match with requirements",
                    body: null
                }
            }
            const user = await loginUser({...userInfo})

            if (user.isAuthenticated) {
                return {
                    statusCode: 201,
                    text: "Authorized",
                    description: "Authentication successful!!",
                    body: user.user
                }
            } else {
                return {
                    statusCode: 401,
                    text: "Unauthorized",
                    text: 'Username or password incorrect.',
                    body: null
                }
            }
            
        } 
        catch (e) {
            console.log(e)
            return {
                statusCode: 400,
                body: {
                    error: e.message
                }
            }

        }
    }
}