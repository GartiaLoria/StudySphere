import { createProjectSchema } from "../validation/project.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"
import { createProjectService } from "../services/project.service.js"
import { getProjectsInWorkspaceService } from "../services/project.service.js"
import { roleGuard } from "../utils/roleGuard.util.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { Permissions } from "../enums/roles.enum.js"
export const createProjectController = async(req, res, next) => {
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