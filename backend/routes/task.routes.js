import express from "express"
import { createTaskController } from "../controllers/task.controller.js"
const taskRoutes = express.Router()
taskRoutes.post("/project/:projectId/workspace/:workspaceId/create", createTaskController)
// taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController)
// taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update", updateTaskController)
// taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController)
// taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskByIdController)
export default taskRoutes