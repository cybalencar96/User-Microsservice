import usersDb from "../database/index.js"
import makeAddUser from "./addUser.js"
import makeLoginUser from "./loginUser.js";

const addUser = makeAddUser({usersDb});
const loginUser = makeLoginUser({usersDb})

const userService = Object.freeze({
    addUser,
    loginUser
})

export default userService
export {
    addUser,
    loginUser
}
