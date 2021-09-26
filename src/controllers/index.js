import userService from "../useCases/index.js";

import makePostUser from "./postUser.js";
import Id from "../Id/index.js";
import makeAuthUser from "./authUser.js";


const {
    addUser,
    loginUser,
} = userService

const postUser = makePostUser({ addUser })
const authUser = makeAuthUser({ loginUser })

const userController = Object.freeze({
    postUser,
    authUser
});

export default userController
export {
    postUser,
    authUser,
}