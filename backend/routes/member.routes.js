import express from "express"
import { joinWorkspaceController } from "../controllers/member.controller.js"
export default express.Router()
    .post("/workspace/:inviteCode/join", joinWorkspaceController)