import express from "express"
import { 
    createProjectController,
    getAllProjectsInWorkspaceController,
    getProjectByIdAndWorkspaceIdController,
    getProjectAnalyticsController,
    updateProjectController,
    deleteProjectController 
} from "../controllers/project.controller.js"

const projectRoutes = express.Router()
projectRoutes.post("/workspace/:workspaceId/create", createProjectController)
projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsInWorkspaceController)
projectRoutes.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController)
projectRoutes.get("/:id/workspace/:workspaceId/analytics", getProjectAnalyticsController)
projectRoutes.put("/:id/workspace/:workspaceId/update", updateProjectController)
projectRoutes.delete("/:id/workspace/:workspaceId/delete", deleteProjectController)
export default projectRoutes