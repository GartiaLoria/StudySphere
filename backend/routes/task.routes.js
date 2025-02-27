import express from "express"
import { 
    createTaskController,
    updateTaskController,
    getAllTasksController,
    getTaskByIdController,
    deleteTaskController 
} from "../controllers/task.controller.js"

const taskRoutes = express.Router()
taskRoutes.post("/project/:projectId/workspace/:workspaceId/create", createTaskController)
taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update", updateTaskController)
taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController)
taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskByIdController)
taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController)
export default taskRoutes