import express from "express"
import { joinWorkspaceController } from "../controllers/member.controller.js"
const memberRoutes = express.Router()
memberRoutes.post("/workspace/:inviteCode/join", joinWorkspaceController)
export default memberRoutes