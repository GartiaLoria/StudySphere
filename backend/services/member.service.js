import WorkspaceModel from "../models/workspace.model.js"
import MemberModel from "../models/member.model.js"
import RoleModel from "../models/roles.model.js"
import { NotFoundException, UnauthorizedException } from "../utils/appError.util.js"
import { ErrorCodesEnum } from "../enums/errorCodes.enum.js"
import { Roles } from "../enums/roles.enum.js"
export const getMemberRoleInWorkspaceService = async (userId, workspaceId) => {
    // console.log(userId, "WorkspaceId = ", workspaceId)
    const workspace = await WorkspaceModel.findById(workspaceId)
    if(!workspace) {
        throw new NotFoundException("WorkSpace not found")
    }
    const member = await MemberModel.findOne({ userId, workspaceId })
        .populate("role")
    // console.log(member)
    if(!member) {
        throw new UnauthorizedException("You do not have access to this workspace", ErrorCodesEnum.ACCESS_UNAUTHORIZED)
    }
    const roleName = member.role?.name
    // console.log("Rolename = ", roleName) 
    return roleName
}
export const joinWorkspaceByInviteCodeService = async (userId, inviteCode) => {
    const workspace = await WorkspaceModel.findOne({ inviteCode }).exec()
    if(!workspace) {
        throw new NotFoundException("Workspace not found with this invite code")
    }
    const existingMember = await MemberModel.findOne({ userId, workspaceId: workspace._id }).exec()
    if (existingMember) {
        throw new BadRequestException("You are already a member of this workspace")
    }
    const role = await RoleModel.findOne({ name: Roles.MEMBER })
    if (!role) {
        throw new NotFoundException("Role not found")
    }    
      // Add user to workspace as a member
    const newMember = new MemberModel({ userId, workspaceId: workspace._id, role: role._id })
    await newMember.save()
    return { workspaceId: workspace._id, role: role.name }
}  