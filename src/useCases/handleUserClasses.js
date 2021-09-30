export default function makeHandleUserClasses ({usersDb}) {
    return async function handleUserClasses (updateClassesInfos) {

        const dbResponses = await usersDb.userClassesHandler({...updateClassesInfos});
        return dbResponses
    }
}