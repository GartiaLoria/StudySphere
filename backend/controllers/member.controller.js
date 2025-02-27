import { HTTPSTATUS } from "../config/http.config.js"
import { joinWorkspaceByInviteCodeService } from "../services/member.service.js"
export const joinWorkspaceController = async (req, res, next) => {
    try {
        const userId = req.user?._id 
        const inviteCode = req.params.inviteCode
        let { workspaceId, role } = await joinWorkspaceByInviteCodeService(userId, inviteCode)
        return res.status(HTTPSTATUS.OK).json({
            "message": "successfully joined the workspace",
            workspaceId,
            role
        })
    } catch (error) {
        next(error)
    }
}