export default function makePostUser ({ addUser }) {
    return async function postUser (httpRequest) {
        try {
            const {...userInfo} = httpRequest.body
            const {isCreated,text,body} = await addUser({...userInfo})

            if (!isCreated) {
                return {
                    statusCode: 401,
                    text: text,
                    body: null
                }
            } else {
                return {
                    statusCode: 201,
                    text: text,
                    body: body
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