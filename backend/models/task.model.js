import mongoose from "mongoose"
import { generateTaskCode } from "../utils/uuid.util.js"
import { 
    TaskPriorityEnum, 
    TaskStatusEnum 
} from "../enums/tasks.enum.js"
const taskSchema = new mongoose.Schema({
    taskCode: {
        type: String,
        unique: true,
        default: generateTaskCode
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(TaskStatusEnum),
        default: TaskStatusEnum.TODO
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriorityEnum),
        default: TaskPriorityEnum.MEDIUM
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dueDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})
const TaskModel = mongoose.models.Task ||  mongoose.model("Task", taskSchema)
export default TaskModel