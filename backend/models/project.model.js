import mongoose from "mongoose"
const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emoji: {
        type: String,
        required: false,
        trim: true,
        default: "👍"
    },
    description: {
        type: String,
        required: false
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})
const projectModel = mongoose.model("Project", projectSchema)
export default projectModel