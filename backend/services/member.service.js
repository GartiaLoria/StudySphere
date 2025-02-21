import WorkspaceModel from "../models/workspace.model.js"
import MemberModel from "../models/member.model.js"
import { NotFoundException, UnauthorizedException } from "../utils/appError.util.js"
import { ErrorCodesEnum } from "../enums/errorCodes.enum.js"
export const getMemberRoleInWorkspaceService = async (userId, workspaceId) => {
    // console.log(userId, "WorkspaceId = ", workspaceId)
    const workspace = await WorkspaceModel.findById(workspaceId)
    if(!workspace) {
        throw new NotFoundException("WorkSpace not found")
    }
    const member = await MemberModel.findOne({ userId, workspaceId })
        .populate("role")
    if(!member) {
        throw new UnauthorizedException("You do not have access to this workspace", ErrorCodesEnum.ACCESS_UNAUTHORIZED)
    }
    const roleName = member.role?.name
    // console.log("Rolename = ", roleName) 
    return roleName
}