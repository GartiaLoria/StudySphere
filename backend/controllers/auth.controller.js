import { HTTPSTATUS } from "../config/http.config.js"
import { emailSchema, passwordSchema, registerSchema } from "../validation/auth.validation.js"
import { registerUserService, verifyUserService } from "../services/auth.service.js"
export const registerUser = async (req, res) => {
    // console.log("Request Body = " + req.body)
    try {
        registerSchema.parse(req.body) // This should throw an error if validation fails
        // console.log("Validation Success✅")
    } catch (error) {
        // console.error("Validation Failed ❌:", error)
        // Ensure error is passed to the error handler
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            "message": "Backend Signup ZodError: Register Schema Validation Failed"
        })
    }
    let createdUser = await registerUserService(req.body)
    return res.status(HTTPSTATUS.CREATED).json({
        "message": "User created successfully",
        "credentials": createdUser
    })
}
export const loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        emailSchema.parse(email) // This should throw an error if validation fails
        passwordSchema.parse(password) 
        // console.log("Validation Success✅")
    } catch (error) {
        // console.error("Validation Failed ❌:", error)
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            "message": "Backend Login ZodError: Email/Password Schema Validation Failed"
        })
    }
    let resJson = await verifyUserService(req.body)
    // console.log(resJson)
    return res.status(resJson.status).json({
        message: resJson.message,
        SignedToken: resJson.status === HTTPSTATUS.ACCEPTED ? resJson.signedToken : null
    })
}