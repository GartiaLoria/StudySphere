import express from "express"
import { createTaskController } from "../controllers/task.controller.js"
import { updateTaskController } from "../controllers/task.controller.js"
import { getAllTasksController } from "../controllers/task.controller.js"
import { getTaskByIdController } from "../controllers/task.controller.js"
import { deleteTaskController } from "../controllers/task.controller.js"
const taskRoutes = express.Router()
taskRoutes.post("/project/:projectId/workspace/:workspaceId/create", createTaskController)
taskRoutes.put("/:id/project/:projectId/workspace/:workspaceId/update", updateTaskController)
taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController)
taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskByIdController)
taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController)
export default taskRoutes