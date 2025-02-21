import UserModel from "../models/user.model.js"
import RoleModel from "../models/roles.model.js"
import WorkspaceModel from "../models/workspace.model.js"
import MemberModel from "../models/member.model.js"
import TaskModel from "../models/task.model.js"
import ProjectModel from "../models/project.model.js/"
import { Roles } from "../enums/roles.enum.js"
import { NotFoundException } from "../utils/appError.util.js"
import { TaskStatusEnum } from "../enums/tasks.enum.js"
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
    // console.log(memberships)
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
export const getWorkspaceMembersService = async workspaceId => {
    const members = await MemberModel.find({workspaceId})
        .populate("userId", "name email profilePicture -password")
        .populate("role", "name")
    const roles = await RoleModel.find({}, {name:1, _id:1})
        .select("-permissions")
        .lean()
    return { members, roles } 
}
export const getWorkspaceAnalyticsService = async workspaceId => {
    const currentDate = new Date()
    const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId }) // count total tasks by filtering on the basis of current workspace id
    const overdueTasks = await TaskModel.countDocuments({
        workspace: workspaceId,
        dueDate: { $lt: currentDate },
        status: { $ne: TaskStatusEnum.DONE }
    }) 
    const completedTasks = await TaskModel.countDocuments({
        workspace: workspaceId,
        status: TaskStatusEnum.DONE
    })
    return  {
        totalTasks,
        overdueTasks,
        completedTasks
    } // analytics object return containing stats
}
export const changeMemberRoleService = async (workspaceId, memberId, roleId) => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    if(!workspace) {
        throw new NotFoundException("Workspace not found")
    }
    const role = await RoleModel.findById(roleId)
    if(!role) {
        throw new NotFoundException("Role not found")
    }
    const member = await MemberModel.findOne({
        userId: memberId,
        workspaceId: workspaceId
    })
    if(!member) {
        throw new NotFoundException("Member not found in the workspace")
    }
    member.role = role 
    await member.save()
    return { member }
}
export const updateWorkspaceByIdService = async (workspaceId, name, description) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
        throw new NotFoundException("Workspace not found");
    }
    // Update the workspace details
    workspace.name = name || workspace.name
    workspace.description = description || workspace.description
    await workspace.save()
    return { workspace }
}
export const deleteWorkspaceService = async (userId, workspaceId) => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    if (!workspace) {
        throw new NotFoundException("Workspace not found");
    }
    // Check if the user owns the workspace
    if (workspace.owner.toString() !== userId) {
        throw new BadRequestException("You are not authorized to delete this workspace")
    }
    const user = await UserModel.findById(userId)
    if (!user) {
        throw new NotFoundException("User not found");
    }
    await ProjectModel.deleteMany({ workspace: workspace._id })
    await TaskModel.deleteMany({ workspace: workspace._id })
    await MemberModel.deleteMany({ workspaceId: workspace._id })
    // Update the user's currentWorkspace if it matches the deleted workspace
    if (user?.currentWorkspace?.equals(workspaceId)) {
        const memberWorkspace = await MemberModel.findOne({ userId })
        // Update the user's currentWorkspace
        user.currentWorkspace = memberWorkspace ? memberWorkspace.workspaceId : null
        await user.save()
    }
    await workspace.deleteOne()
    return { currentWorkspace: user.currentWorkspace }
}