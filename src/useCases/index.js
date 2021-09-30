import usersDb from "../database/index.js"
import makeAddUser from "./addUser.js"
import makeLoginUser from "./loginUser.js";
import makeHandleUserClasses from "./handleUserClasses.js";
import makeFindUser from "./findUser.js";

const addUser = makeAddUser({usersDb});
const loginUser = makeLoginUser({usersDb})
const handleUserClasses = makeHandleUserClasses({usersDb})
const findUser = makeFindUser({usersDb})
const userService = Object.freeze({
    addUser,
    loginUser,
    handleUserClasses,
    findUser
})

export default userService
export {
    addUser,
    loginUser,
    handleUserClasses,
    findUser
}
