import { createWorkspaceSchema } from "../validation/workspace.validation.js"
import { workspaceIdSchema } from "../validation/workspace.validation.js"
import { createWorkspaceService } from "../services/workspace.service.js"
import { getAllWorkspacesUserIsMemberService } from "../services/workspace.service.js"
import { getWorkspaceByIdService } from "../services/workspace.service.js"
import { getMemberRoleInWorkspace } from "../services/member.service.js"
import { HTTPSTATUS } from "../config/http.config.js"
export const createWorkspaceController = async (req, res) => {
    const body = createWorkspaceSchema.parse(req.body)
    const userId = req.user?._id
    const workspace = await createWorkspaceService(userId, body)
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Workspace created successfully",
      workspace
    })
}
export const getAllWorkspacesUserIsMemberController = async (req, res) => {
    const userId = req.user?._id
    const workspaces = await getAllWorkspacesUserIsMemberService(userId)
    return res.status(HTTPSTATUS.OK).json({
      message: "All The User's workspaces fetched successfully",
      workspaces
    })
} 
export const getWorkspaceByIdController = async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    await getMemberRoleInWorkspace(userId, workspaceId)
    const { workspace } = await getWorkspaceByIdService(workspaceId)
    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace fetched successfully",
      workspace
    })
}