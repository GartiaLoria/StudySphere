import { TaskPriorityEnum, TaskStatusEnum } from "../enums/tasks.enum.js"
import MemberModel from "../models/member.model.js"
import ProjectModel from "../models/project.model.js"
import TaskModel from "../models/task.model.js"
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError.util.js"

export const createTaskService = async (workspaceId, projectId, userId, body) => {
    const { title, description, priority, status, assignedTo, dueDate } = body
    const project = await ProjectModel.findById(projectId)
    if(!project || project.workspace.toString() !== workspaceId.toString()) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    } 
    if(assignedTo) {
        const isAssignedUserMember = await MemberModel.exists({
            userId: assignedTo,
            workspaceId
        })
        if(!isAssignedUserMember) {
            throw new UnauthorizedException("Assigned user is not a member of this workspace")
        }
    }
    const task = new TaskModel({
        title,
        description,
        priority: priority || TaskPriorityEnum.MEDIUM,
        status: status || TaskStatusEnum.TODO,
        assignedTo,
        createdBy: userId,
        workspace: workspaceId,
        project: projectId,
        dueDate
    })
    await task.save()
    return { task }
}
export const updateTaskService = async (workspaceId, projectId, taskId, body) => {
    const project = await ProjectModel.findById(projectId)
    if(!project || project.workspace.toString() !== workspaceId.toString()) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    } 
    const task = await TaskModel.findById(taskId)
    // console.log(task)
    if(!task || task.project.toString() !== projectId.toString()) {
        throw new NotFoundException("Task not found or does not belong to this project")
    }
    const updatedTask = await TaskModel.findByIdAndUpdate( taskId, { ...body }, { new: true })
    if(!updatedTask) {
        throw new BadRequestException("Failed to Update task")
    }
    return { task: updatedTask }
}
export const getAllTasksService = async (workspaceId, filters, pagination) => {
    // Setting up query and adding filters to it
    const query = {
        workspace: workspaceId
    }
    if (filters.projectId) {
        query.project = filters.projectId
    }
    if (filters.status && filters.status?.length > 0) {
        query.status = { $in: filters.status }
    }
    if (filters.priority && filters.priority?.length > 0) {
        query.priority = { $in: filters.priority }
    }
    if (filters.assignedTo && filters.assignedTo?.length > 0) {
        query.assignedTo = { $in: filters.assignedTo }
    }
    if (filters.keyword && filters.keyword !== undefined) {
        query.title = { $regex: filters.keyword, $options: "i" }
    }
    if (filters.dueDate) {
        query.dueDate = { $eq: new Date(filters.dueDate) }
    }
    //Pagination Setup
    const { pageSize, pageNumber } = pagination
    const skip = (pageNumber - 1) * pageSize
    // using Promise.all to execute two database queries concurrently using Mongoose.
    const [tasks, totalCount] = await Promise.all([
        TaskModel.find(query)
          .skip(skip)
          .limit(pageSize)
          .sort({ createdAt: -1 })
          .populate("assignedTo", "_id name profilePicture -password")
          .populate("project", "_id emoji name"),
        TaskModel.countDocuments(query)
    ])
    const totalPages = Math.ceil(totalCount / pageSize)
    return { tasks, pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip
        }
    }
}
export const getTaskByIdService = async (workspaceId, projectId, taskId) => {
    const project = await ProjectModel.findById(projectId)
    if (!project || project.workspace.toString() !== workspaceId.toString()) {
        throw new NotFoundException("Project not found or does not belong to this workspace")
    }
    const task = await TaskModel.findOne({
        _id: taskId, 
        workspace: workspaceId, 
        project: projectId
    }).populate("assignedTo", "_id name profilePicture -password")
    if (!task) {
        throw new NotFoundException("Task not found")
    }
    return { task }
}
export const deleteTaskService = async (workspaceId, taskId) => {
    const task = await TaskModel.findOneAndDelete({
        _id: taskId,
        workspace: workspaceId,
    })
    if (!task) {
        throw new NotFoundException("Task not found or does not belong to the specified workspace")
    }
    return;
}