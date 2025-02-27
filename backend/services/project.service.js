import mongoose from "mongoose"
import TaskModel from "../models/task.model.js"
import ProjectModel from "../models/project.model.js"
import { TaskStatusEnum } from "../enums/tasks.enum.js"
import { NotFoundException } from "../utils/appError.util.js"

export const createProjectService = async (userId, workspaceId, body) => {
    const project = new ProjectModel({
        name: body.name,
        ...(body.emoji && { emoji: body.emoji }),
        description: body.description,
        workspace: workspaceId,
        createdBy: userId
    })
    await project.save()
    return { project }
}
export const getProjectsInWorkspaceService = async (workspaceId, pageSize, pageNumber) => {
    const totalCount = await ProjectModel.countDocuments({ workspace: workspaceId })
    const totalPages = Math.ceil(totalCount / pageSize)
    const skip = (pageNumber - 1) * pageSize
    const projects = await ProjectModel
        .find({ workspace: workspaceId })
        .skip(skip)
        .populate("createdBy", "_id name profilePicture -password")
        .sort({ createdAt: -1 })
    return { projects, totalCount, totalPages, skip }
}
export const getProjectByIdAndWorkspaceIdService = async (workspaceId, projectId) => {
    const project = await ProjectModel.find({
        _id: projectId,
        workspace: workspaceId
    })
    if(!project) {
        throw new NotFoundException("Project not found or does not belong to specified workspace")
    }
    return { project }
}
export const getProjectAnalyticsService = async (workspaceId, projectId) => {
    const project = await ProjectModel.findById(projectId)
    if(!project || project.workspace.toString() !== workspaceId.toString()) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    }
    const currentDate = new Date()
    const taskAnalytics = await TaskModel.aggregate([
        {
          $match: { project: new mongoose.Types.ObjectId(projectId) }
        },
        {
            $facet: {
                totalTasks: [{ $count: "count" }],
                overdueTasks: [
                    { 
                        $match: {
                            dueDate: { $lt: currentDate },
                            status: { $ne: TaskStatusEnum.DONE }
                        }
                    },
                    { $count: "count" }
                ],
                completedTasks: [
                    {
                        $match: { status: TaskStatusEnum.DONE }
                    },
                    { $count: "count" }
                ]
            }
        }
    ])
    const _analytics = taskAnalytics[0]
    const analytics = {
        totalTasks: _analytics.totalTasks[0]?.count || 0,
        overdueTasks: _analytics.overdueTasks[0]?.count || 0,
        completedTasks: _analytics.completedTasks[0]?.count || 0
    }
    return { analytics }
}
export const updateProjectService = async (workspaceId, projectId, body) => {
    const { name, emoji, description } = body
    const project = await ProjectModel.findOne({
        _id: projectId,
        workspace: workspaceId
    })
    if(!project) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    }
    if(emoji) {
        project.emoji = emoji
    }
    if(name) {
        project.name = name 
    }
    if(description) {
        project.description = description
    }
    await project.save()
    return { project }
}
export const deleteProjectService = async (workspaceId, projectId) => {
    const project = await ProjectModel.findOne({
        _id: projectId,
        workspace: workspaceId
    })
    if(!project) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    }
    await project.deleteOne()
    await TaskModel.deleteMany({ project: project._id })
    return project
}