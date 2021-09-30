import userService from "../useCases/index.js";

import makePostUser from "./postUser.js";
import Id from "../Id/index.js";
import makeAuthUser from "./authUser.js";
import makeUpdateUserClasses from "./updateUserClasses.js";
import makeGetUserById from "./getUserById.js";

const {
    addUser,
    loginUser,
    handleUserClasses,
    findUser
} = userService

const postUser = makePostUser({ addUser })
const authUser = makeAuthUser({ loginUser })
const updateUserClasses = makeUpdateUserClasses( { handleUserClasses,Id } )
const getUserById = makeGetUserById( {findUser, Id} )
const userController = Object.freeze({
    postUser,
    authUser,
    updateUserClasses,
    getUserById
});

export default userController
export {
    postUser,
    authUser,
    updateUserClasses
}