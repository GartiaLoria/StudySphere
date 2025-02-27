import { z } from "zod"
import { 
    TaskPriorityEnum, 
    TaskStatusEnum 
} from "../enums/tasks.enum.js"

export const titleSchema = z.string().trim().min(1,"Task must have a title").max(255)
export const descriptionSchema = z.string().trim().optional()
export const assignedToSchema = z.string().trim().min(1).nullable().optional()
export const prioritySchema = z.enum(Object.values(TaskPriorityEnum))
export const statusSchema = z.enum(Object.values(TaskStatusEnum))
export const dueDateSchema = z
    .string()
    .trim()
    .optional()
    .refine( val => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format. Please provide a valid date string."
    })
export const taskIdSchema = z.string().trim().min(1)
export const createTaskSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
    priority: prioritySchema,
    status: statusSchema,
    assignedTo: assignedToSchema,
    dueDate: dueDateSchema
})
export const updateTaskSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
    priority: prioritySchema,
    status: statusSchema,
    assignedTo: assignedToSchema,
    dueDate: dueDateSchema
})