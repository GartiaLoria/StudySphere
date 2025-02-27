import express from "express"
import { 
    createWorkspaceController,
    getAllWorkspacesUserIsMemberController,
    getWorkspaceByIdController,
    getWorkspaceMembersController,
    getWorkspaceAnalyticsController,
    changeWorkspaceMemberRoleController,
    updateWorkspaceByIdController,
    deleteWorkspaceByIdController 
} from "../controllers/workspace.controller.js"

const workspaceRoutes = express.Router()
workspaceRoutes.post("/create/new", createWorkspaceController)
workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController)
workspaceRoutes.get("/:id", getWorkspaceByIdController)
workspaceRoutes.get("/members/:id", getWorkspaceMembersController)
workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController)
workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRoleController)
workspaceRoutes.put("/update/:id", updateWorkspaceByIdController)
workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController)
export default workspaceRoutes