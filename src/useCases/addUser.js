import makeUser from "../user/index.js";
export default function makeAddUser ({usersDb}) {
    return async function addUser (userInfo) {
        const user = makeUser(userInfo);
        const credentials = user.getCredentials();
        const exists = await usersDb.findByUsername(credentials.private.username);
        if (exists) {
            return {
                isCreated: false,
                text: 'username already in use',
                body: null
            }
        }

        const newUser = await usersDb.insert({...user})
        
        return {
            isCreated: true,
            text: 'user created successfully',
            body: newUser
        }
    }
}