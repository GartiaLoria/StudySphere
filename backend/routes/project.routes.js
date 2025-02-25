import express from "express"
import { createProjectController } from "../controllers/project.controller.js"
import { getAllProjectsInWorkspaceController } from "../controllers/project.controller.js"
const projectRoutes = express.Router()
projectRoutes.post("/workspace/:workspaceId/create", createProjectController)
projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsInWorkspaceController)
// projectRoutes.put("/:id/workspace/:workspaceId/update", updateProjectController)
// projectRoutes.delete("/:id/workspace/:workspaceId/delete",deleteProjectController)
// projectRoutes.get("/:id/workspace/:workspaceId/analytics",getProjectAnalyticsController)
// projectRoutes.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController)
export default projectRoutes