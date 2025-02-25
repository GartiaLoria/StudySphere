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