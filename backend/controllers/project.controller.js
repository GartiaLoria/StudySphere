import { Permissions } from "../enums/roles.enum.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { roleGuard } from "../utils/roleGuard.util.js"
import { 
    createProjectSchema, 
    projectIdSchema, 
    updateProjectSchema 
} from "../validation/project.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { 
    createProjectService, 
    getProjectsInWorkspaceService,
    getProjectByIdAndWorkspaceIdService,
    getProjectAnalyticsService, 
    updateProjectService,
    deleteProjectService
} from "../services/project.service.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"

export const createProjectController = async (req, res, next) => {
    try {
        const body = createProjectSchema.parse(req.body)
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.CREATE_PROJECT])
        const { project } = await createProjectService(userId, workspaceId, body)
        return res.status(HTTPSTATUS.CREATED).json({
            message: "Project created successfully",
            project
        })
    } catch (error) {
        next(error)
    }
}
export const getAllProjectsInWorkspaceController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const pageSize = parseInt(req.query.pageSize) || 10
        const pageNumber = parseInt(req.query.pageNumber) || 1
        const { projects, totalCount, totalPages, skip } = await getProjectsInWorkspaceService(workspaceId, pageSize, pageNumber)
        return res.status(HTTPSTATUS.OK).json({
            message: "Project fetched successfully",
            projects,
            pagination: {
                totalCount,
                pageSize,
                pageNumber,
                totalPages,
                skip,
                limit: pageSize
            }
        })
    } catch (error) {
        next(error)
    }
}
export const getProjectByIdAndWorkspaceIdController = async (req, res, next) => {
    try {
        const projectId = projectIdSchema.parse(req.params.id)
        const workspaceId = projectIdSchema.parse(req.params.workspaceId)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const { project } = await getProjectByIdAndWorkspaceIdService(workspaceId, projectId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Project fetched successfully",
            project
        })
    } catch (error) {
        next(error)
    }
}
export const getProjectAnalyticsController = async (req, res, next) => {
    try {
        const projectId = projectIdSchema.parse(req.params.id)
        const workspaceId = projectIdSchema.parse(req.params.workspaceId)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const { analytics } = await getProjectAnalyticsService(workspaceId, projectId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Project Analytics fetched successfully",
            analytics
        })
    } catch (error) {
        next(error)
    }
}
export const updateProjectController = async (req, res, next) => {
    try {
        const body = updateProjectSchema.parse(req.body)
        const userId = req.user?._id 
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const projectId = projectIdSchema.parse(req.params.id)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.EDIT_PROJECT])
        const { project } = await updateProjectService(workspaceId, projectId, body) 
        return res.status(HTTPSTATUS.OK).json({
            "message": "Project Updated successfully",
            project
        })
    } catch (error) {
        next(error)
    }
}
export const deleteProjectController = async (req, res, next) => {
    try {
        const userId = req.user?._id 
        const workspaceId = workspaceIdSchema.parse(req.params.workspaceId)
        const projectId = projectIdSchema.parse(req.params.id)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.DELETE_PROJECT])
        await deleteProjectService(workspaceId, projectId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Project deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}