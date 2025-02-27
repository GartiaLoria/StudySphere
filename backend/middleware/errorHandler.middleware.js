import { ZodError } from "zod"
import { AppError } from "../utils/appError.util.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { ErrorCodesEnum } from "../enums/errorCodes.enum.js"

const errorHandler = (error, req, res, next) => {
    // console.error("Error Handler Middleware:", error)
    // Handle invalid JSON format errors
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: "Invalid JSON format. Please check your request payload."
        })
    }

    // Handle validation errors from Zod
    if (error instanceof ZodError) {
        console.error(`ZodError caught: ${JSON.stringify(error.errors, null, 2)}`)
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: "Validation failed",
            errors: error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message
            })),
            errorCode: ErrorCodesEnum.VALIDATION_ERROR
        })
    }

    // Handle custom application errors
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errorCode: error.errorCode
        })
    }

    // Catch all other unknown errors
    console.error("Unknown Error Caught:", error)
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error: An unexpected error occurred.",
        error: error?.message || "Unknown error"
    })
}
export default errorHandler