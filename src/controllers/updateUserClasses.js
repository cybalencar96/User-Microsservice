export default function makeUpdateUserClasses ({ handleUserClasses,Id }) {
    return async function updateUserClasses (httpRequest) {
        try {
            const {...updateClassesInfos} = httpRequest.body

            const {
                userId,
                action, 
                classType, 
                classId
            } = updateClassesInfos

            if (!userId || !action || !classType || !classId) {
                throw new Error ('Object must have attributes userId, action, classType and classId')
            }

            if (!Id.isValidId(userId)) throw new Error ('User id is not cuid valid')

            if (classType !== 'teaching' && classType !== 'learnings') {
                throw new Error ("classType must be either 'teaching' or 'learnings'")
            }
            if (action !== 'add' && action !== 'remove') {
                throw new Error ("action must be either 'add' or 'remove'")
            }
            
            if (!Id.isValidId(classId)) throw new Error (`classId ${classId} is not cuid valid`)

            const change = await handleUserClasses({...updateClassesInfos})
            console.log(change, "oooooooooooi");
            return {
                statusCode: 201,
                changes: change
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