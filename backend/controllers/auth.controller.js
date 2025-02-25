import { HTTPSTATUS } from "../config/http.config.js"
import { emailSchema, passwordSchema, registerSchema } from "../validation/auth.validation.js"
import { registerUserService, verifyUserService } from "../services/auth.service.js"
export const registerUser = async (req, res, next) => {
    // console.log("Request Body = " + req.body)
    try {
        registerSchema.parse(req.body) // This should throw an error if validation fails
        // console.log("Validation Success✅")
        let createdUser = await registerUserService(req.body)
        return res.status(HTTPSTATUS.CREATED).json({
            "message": "User created successfully",
            "credentials": createdUser
        })
    } catch (error) {
        // console.error("Validation Failed ❌:", error)
        next(error) // Ensuring error is passed to the error handler middleware
    }
}
export const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body
        emailSchema.parse(email) // This should throw an error if validation fails
        passwordSchema.parse(password) 
        let resJson = await verifyUserService(req.body)
        // console.log(resJson)
        return res.status(resJson.status).json({
            message: resJson.message,
            SignedToken: resJson.status === HTTPSTATUS.ACCEPTED ? resJson.signedToken : null
        })
    } catch (error) {
        next(error) // passing the error to error handler middleware
    }
}