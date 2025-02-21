import UserModel from "../models/user.model.js"
import RoleModel from "../models/roles.model.js"
import WorkspaceModel from "../models/workspace.model.js"
import MemberModel from "../models/member.model.js"
import { Roles } from "../enums/roles.enum.js"
import { NotFoundException } from "../utils/appError.util.js"
export const createWorkspaceService = async (userId, body) => {
    const { name, description } = body
    const user = await UserModel.findById(userId)
    if (!user) {
        throw new NotFoundException("User not found")
    }
    const ownerRole = await RoleModel.findOne({ name: Roles.OWNER })
    if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
    }
    const workspace = new WorkspaceModel({
        name: name,
        description: description,
        owner: user._id
    })
    await workspace.save()
    const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date()
    })
    await member.save()
    user.currentWorkspace = workspace._id 
    await user.save()
    return workspace
}
export const getAllWorkspacesUserIsMemberService = async userId => {
    const memberships = await MemberModel.find({ userId })
        .populate("workspaceId")
        // .select("-password") // No need to remove password, it doesn't come in query
        .exec()
    console.log(memberships)
    // Extract workspace details from memberships
    const workspaces = memberships.map(membership => membership.workspaceId);
    return workspaces
}
export const getWorkspaceByIdService = async workspaceId => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    if (!workspace) {
        throw new NotFoundException("Workspace not found");
    }
    const members = await MemberModel.find({ workspaceId })
        .populate("role")
    // console.log("Workspace = ", workspace)
    const workspaceWithMembers = {
        ...workspace,
        members
    }
    return { workspace: workspaceWithMembers }
}