import express from "express"
import { getCurrentUserController } from "../controllers/user.controller.js"
export default express.Router()
    .get("/current", getCurrentUserController)