import express from "express"
import { getCurrentUserController } from "../controllers/user.controller.js"
const userRoutes = express.Router()
userRoutes.get("/current", getCurrentUserController)
export default userRoutes