import { z } from "zod"
export const emailSchema = z
    .string()
    .trim()
    .email("Invalid email address")
    .max(50, "Too long Email Address")
export const passwordSchema = z
    .string()
    .trim()
    .min(4, "Password must have minimum 4 characters")
export const registerSchema= z.object({
    name: z
        .string()
        .trim()
        .min(1,"Name Can't be Empty")
        .max(255, "Too Long Name"),
    email: emailSchema,
    password: passwordSchema
})
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})