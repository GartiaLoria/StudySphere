import { HTTPSTATUS } from "../config/http.config.js"
import { getCurrentUserService } from "../services/user.service.js"
export const getCurrentUserController = async (req, res, next) => {
    try {
        const userId = req.user?._id
        // console.log("UserId = ", userId)
        let user = await getCurrentUserService(userId)
        return res.status(HTTPSTATUS.OK).json({
            message: "User fetch successfully",
            user
        })
    } catch (error) {
        next(error)       
    }
}