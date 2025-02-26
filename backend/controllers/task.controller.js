import { Permissions } from "../enums/roles.enum.js"
import { roleGuard } from "../utils/roleGuard.util.js"
import { projectIdSchema } from "../validation/project.validation.js"
import { createTaskSchema, taskIdSchema, updateTaskSchema } from "../validation/task.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { createTaskService } from "../services/task.service.js"
import { updateTaskService } from "../services/task.service.js"
import { getAllTasksService } from "../services/task.service.js"
import { getTaskByIdService } from "../services/task.service.js"
import { deleteTaskService } from "../services/task.service.js"

export const createTaskController = async (req, res, next) => {
    try {
        // console.log(req.body)
        const body = createTaskSchema.parse(req.body)
        const projectId = projectIdSchema.parse(req.params.projectId)
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.CREATE_TASK])
        const { task } = await createTaskService(workspaceId, projectId, userId, body)
        return res.status(HTTPSTATUS.CREATED).json({
            "message": "Task Created successfully",
            task
        })
    } catch (error) {
        next(error)
    }
}
export const updateTaskController = async (req, res, next) => {
    try {
        const body = updateTaskSchema.parse(req.body)
        const projectId = projectIdSchema.parse(req.params.projectId)
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const taskId = taskIdSchema.parse(req.params.id)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.EDIT_TASK])
        const { task } = await updateTaskService(workspaceId, projectId, taskId, body)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Task Updated successfully",
            task
        })
    } catch (error) {
        next(error)
    }
}
export const getAllTasksController = async (req, res, next) => {
    try {
        await getAllTasksService()
    } catch (error) {
        next(error)
    }
}
export const getTaskByIdController = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const taskId = taskIdSchema.parse(req.params.id)
        const projectId = projectIdSchema.parse(req.params.projectId)
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const { task } = await getTaskByIdService(workspaceId, projectId, taskId)
        return res.status(HTTPSTATUS.OK).json({
            message: "Task fetched successfully",
            task
        })
    } catch (error) {
        next(error)
    }
}
export const deleteTaskController = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const taskId = taskIdSchema.parse(req.params.id)
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.DELETE_TASK])
        await deleteTaskService(workspaceId, taskId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Task deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}