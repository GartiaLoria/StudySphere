import { Permissions } from "../enums/roles.enum.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { roleGuard } from "../utils/roleGuard.util.js"
import { 
    changeRoleSchema, 
    createWorkspaceSchema,
    updateWorkspaceSchema,
    workspaceIdSchema
} from "../validation/workspace.validation.js"
import { 
    createWorkspaceService,
    getAllWorkspacesUserIsMemberService,
    getWorkspaceByIdService,
    getWorkspaceMembersService,
    getWorkspaceAnalyticsService,
    changeMemberRoleService,
    updateWorkspaceByIdService,
    deleteWorkspaceService
} from "../services/workspace.service.js"
import { getMemberRoleInWorkspaceService } from "../services/member.service.js"

export const createWorkspaceController = async (req, res, next) => {
    try {
        const body = createWorkspaceSchema.parse(req.body)
        const userId = req.user?._id
        const workspace = await createWorkspaceService(userId, body)
        return res.status(HTTPSTATUS.CREATED).json({
            message: "Workspace created successfully",
            workspace
        })
        
    } catch (error) {
        next(error)
    }
}
export const getAllWorkspacesUserIsMemberController = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const workspaces = await getAllWorkspacesUserIsMemberService(userId)
        return res.status(HTTPSTATUS.OK).json({
            message: "All The User's workspaces fetched successfully",
            workspaces
        })    
    } catch (error) {
        next(error)
    }
} 
export const getWorkspaceByIdController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const userId = req.user?._id
        await getMemberRoleInWorkspaceService(userId, workspaceId)
        const { workspace } = await getWorkspaceByIdService(workspaceId)
        return res.status(HTTPSTATUS.OK).json({
            message: "Workspace fetched successfully",
            workspace
        })
    } catch (error) {
        next(error)
    }
}
export const getWorkspaceMembersController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const userId = req.user?._id
        // console.log(userId, workspaceId) 
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        // console.log(role)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const { members, roles } = await getWorkspaceMembersService(workspaceId)
        return res.status(HTTPSTATUS.OK).json({
            message: "Workspace members retrieved successfully",
            members,
            roles
        })
    } catch (error) {
        next(error)
    }
}
export const getWorkspaceAnalyticsController = async (req, res, next) => {
    try {
        console.log("Inside workspace analytics Controller")
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const userId = req.user?._id 
        // console.log(userId, workspaceId)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.VIEW_ONLY])
        const analytics =  await getWorkspaceAnalyticsService(workspaceId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "WorkSpace's Tasks Status Fetched Successfully",
            analytics
        })
    } catch (error) {
        next(error)
    }
} 
export const changeWorkspaceMemberRoleController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const userId = req.user?._id
        const { memberId, roleId } = changeRoleSchema.parse(req.body)
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE])
        const { member } = await changeMemberRoleService(workspaceId, memberId, roleId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Member role changed successfully",
            member
        })
    } catch (error) {
        next(error)
    }
}
export const updateWorkspaceByIdController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const { name, description } = updateWorkspaceSchema.parse(req.body)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.EDIT_WORKSPACE])
        const { workspace } = await updateWorkspaceByIdService(workspaceId, name, description)
        return res.status(HTTPSTATUS.OK).json({
            message: "Workspace updated successfully",
            workspace
        })
    } catch (error) {
        next(error)
    }
}
export const deleteWorkspaceByIdController = async (req, res, next) => {
    try {
        const workspaceId = workspaceIdSchema.parse(req.params.id)
        const userId = req.user?._id
        const role = await getMemberRoleInWorkspaceService(userId, workspaceId)
        roleGuard(role, [Permissions.DELETE_WORKSPACE])
        const { currentWorkspace } = await deleteWorkspaceService(userId, workspaceId)
        return res.status(HTTPSTATUS.OK).json({
            "message": "Workspace deleted successfully",
            currentWorkspace
        })
    } catch (error) {
        next(error)
    }
}