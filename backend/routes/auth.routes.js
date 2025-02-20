import express from "express"
import { registerUser, loginUser } from "../controllers/auth.controller.js"
const authRouter = express.Router()
// const {
//     loginUser,
//     addUser
// } = require('../controllers/user.controller')
// userRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
export default authRouter