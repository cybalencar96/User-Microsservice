export default function makeGetUserById ({ findUser, Id }) {
    return async function getUserById (httpRequest) {
        try {
            const userId = httpRequest.params.id
            
            if (!Id.isValidId(userId)) throw new Error ('Id is not cuid valid')

            const user = await findUser(userId)

            if (user) {
                return {
                    statusCode: 201,
                    body: user
                }
            } else {
                return {
                    statusCode: 401,
                    body: 'User not found'
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