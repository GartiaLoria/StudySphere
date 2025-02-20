// import mongoose from "mongoose"
// import {
//     TaskPriorityEnum,
//     TaskPriorityEnumType,
//     TaskStatusEnum,
//     TaskStatusEnumType
// } from "../enums/tasks.enum"
// import { generateTaskCode } from "../utils/uuid"
// const taskSchema = new Schema({
//     taskCode: {
//         type: String,
//         unique: true,
//         default: generateTaskCode
//     },
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         trim: true,
//         default: null
//     },
//     project: {
//         type: Schema.Types.ObjectId,
//         ref: 'Project',
//         required: true
//     },
//     workspace: {
//         type: Schema.Types.ObjectId,
//         ref: 'Workspace',
//         required: true
//     },
//     status: {
//         type: String,
//         enum: Object.values(TaskStatusEnum),
//         default: TaskStatusEnum.TODO
//     },
//     priority: {
//         type: String,
//         enum: Object.values(TaskPriorityEnum),
//         default: TaskPriorityEnum.MEDIUM
//     },
//     assignedTo: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         default: null
//     },
//     createdBy: {
//         types: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     dueDate: {
//         type: Date,
//         default: null
//     }
// }, {
//     timestamps: true
// })
// const TaskModel = mongoose.model('Task', taskSchema)
// export default TaskModel