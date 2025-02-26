import mongoose from "mongoose"
// Deleting previously created model if facing any error due to change in model later
// if (mongoose.models.Project) {
//     delete mongoose.connection.models["Project"]
// }
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emoji: {
        type: String,
        trim: true,
        default: "👍"
    },
    description: {
        type: String,
        required: false
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})
const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema)
export default ProjectModel