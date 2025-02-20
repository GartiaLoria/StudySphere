import { HTTPSTATUS } from "../config/http.config.js"
import { getCurrentUserService } from "../services/user.service.js"
export const getCurrentUserController = async (req, res) => {
    const userId = req.user.userId
    // console.log("UserId = ", userId)
    const user = await getCurrentUserService(userId)
    return res.status(HTTPSTATUS.OK).json({
        message: "User fetch successfully",
        user
    })
}