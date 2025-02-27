import UserModel from "../models/user.model.js"
import { BadRequestException } from "../utils/appError.util.js"
export const getCurrentUserService = async userId => {
    // console.log("User ID = ", userId)
    const user = await UserModel.findById(userId)
        .populate("currentWorkspace")
        .select("-password")
    if (!user) {
        throw new BadRequestException("User not found");
    }
    // console.log(user)
    return user
}