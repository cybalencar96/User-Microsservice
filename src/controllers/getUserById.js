export default function makeGetUserById ({ findUser, Id }) {
    return async function getUserById (httpRequest) {
        try {
            const userId = httpRequest.params.id
            
            if (!Id.isValidId(userId)) throw new Error ('Id is not cuid valid')

            const user = await findUser(userId)

            return {
                statusCode: 201,
                body: user
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