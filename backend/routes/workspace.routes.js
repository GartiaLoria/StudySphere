import express from "express"
import { createWorkspaceController } from "../controllers/workspace.controller.js"
import { getAllWorkspacesUserIsMemberController } from "../controllers/workspace.controller.js"
import { getWorkspaceByIdController } from "../controllers/workspace.controller.js"
const workspaceRoutes = express.Router()
workspaceRoutes.post("/create/new", createWorkspaceController)
workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController)
workspaceRoutes.get("/:id", getWorkspaceByIdController)
// workspaceRoutes.put("/update/:id", updateWorkspaceByIdController)
// workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRoleController)
// workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController)
// workspaceRoutes.get("/members/:id", getWorkspaceMembersController)
// workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController)
export default workspaceRoutes