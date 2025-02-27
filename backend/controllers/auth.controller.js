import { HTTPSTATUS } from "../config/http.config.js"
import { 
    emailSchema, 
    passwordSchema, 
    registerSchema 
} from "../validation/auth.validation.js"
import { 
    registerUserService, 
    verifyUserService 
} from "../services/auth.service.js"
export const registerUser = async (req, res, next) => {
    try {
        // This should throw an error if validation fails
        registerSchema.parse(req.body) 
        // console.log("Validation Success✅")
        let createdUser = await registerUserService(req.body)
        return res.status(HTTPSTATUS.CREATED).json({
            "message": "User created successfully",
            "credentials": createdUser
        })
    } catch (error) {
        // console.error("Validation Failed ❌:", error)
        // Ensuring error is passed to the error handler middleware
        next(error) 
    }
}
export const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body
         // This should throw an error if validation fails
        emailSchema.parse(email)
        passwordSchema.parse(password) 
        let resJson = await verifyUserService(req.body)
        return res.status(resJson.status).json({
            message: resJson.message,
            SignedToken: resJson.status === HTTPSTATUS.ACCEPTED ? resJson.signedToken : null
        })
    } catch (error) {
         // passing the error to error handler middleware
        next(error)
    }
}