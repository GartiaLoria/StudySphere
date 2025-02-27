import { Permissions } from "../enums/roles.enum.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { roleGuard } from "../utils/roleGuard.util.js"
import { 
    createTaskSchema, 
    taskIdSchema, 
    updateTaskSchema 
} from "../validation/task.validation.js"
import { projectIdSchema } from "../validation/project.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { 
    createTaskService,
    updateTaskService,
    getAllTasksService,
    getTaskByIdService,
    deleteTaskService,
} from "../services/task.service.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"

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
        const userId = req.user?._id
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const filters = {
            projectId: req.query.projectId || undefined,
            status: req.query.status ? req.query.status.split(",") : undefined,
            priority: req.query.priority ? req.query.priority.split(",") : undefined,
            assignedTo: req.query.assignedTo ? req.query.assignedTo.split(",") : undefined,
            keyword: req.query.keyword || undefined,
            dueDate: req.query.dueDate || undefined
        }
        const pagination = {
            pageSize: parseInt(req.query.pageSize) || 10,
            pageNumber: parseInt(req.query.pageNumber) || 1
        }
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const result = await getAllTasksService(workspaceId, filters, pagination)
        return res.status(HTTPSTATUS.OK).json({
            message: "All tasks fetched successfully",
            ...result
        })
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