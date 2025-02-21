import express from "express"
import { createWorkspaceController } from "../controllers/workspace.controller.js"
import { getAllWorkspacesUserIsMemberController } from "../controllers/workspace.controller.js"
import { getWorkspaceByIdController } from "../controllers/workspace.controller.js"
import { getWorkspaceMembersController } from "../controllers/workspace.controller.js"
import { getWorkspaceAnalyticsController } from "../controllers/workspace.controller.js"
import { changeWorkspaceMemberRoleController } from "../controllers/workspace.controller.js"
const workspaceRoutes = express.Router()
workspaceRoutes.post("/create/new", createWorkspaceController)
workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController)
workspaceRoutes.get("/:id", getWorkspaceByIdController)
workspaceRoutes.get("/members/:id", getWorkspaceMembersController)
workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController)
workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRoleController)
// workspaceRoutes.put("/update/:id", updateWorkspaceByIdController)
// workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController)
export default workspaceRoutes