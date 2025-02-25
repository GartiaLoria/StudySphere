import { createProjectSchema } from "../validation/project.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"
import { createProjectService } from "../services/project.service.js"
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