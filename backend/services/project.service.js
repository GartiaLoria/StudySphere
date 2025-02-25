import ProjectModel from "../models/project.model.js"
export const createProjectService = async (userId, workspaceId, body) => {
    const project = new ProjectModel({
        ...(body.emoji && { emoji: body.emoji }),
        name: body.name,
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