import jwt from "jsonwebtoken"
import { config } from "../config/app.config.js"
import { HTTPSTATUS } from "../config/http.config.js"
import { Roles } from "../enums/roles.enum.js"
import UserModel from "../models/user.model.js"
import RoleModel from "../models/roles.model.js"
import MemberModel from "../models/member.model.js"
import WorkspaceModel from "../models/workspace.model.js"
import { 
    BadRequestException, 
    NotFoundException 
} from "../utils/appError.util.js"

export const registerUserService = async body => {
    let { email, name, password } = body
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        throw new BadRequestException("Email already exists");
    }
    const user = new UserModel({ email, name, password })
    await user.save()
    const workspace = new WorkspaceModel({
        name: `${user.name} - Workspace`,
        description: `Workspace created for ${user.name}`,
        owner: user._id
    })
    await workspace.save()
    const ownerRole = await RoleModel.findOne({ name: Roles.OWNER })
    if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
    }
    const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date()
    })
    await member.save()
    user.currentWorkspace = workspace._id 
    await user.save()
    return {
        userId: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        workspaceId: workspace._id
    }
}

export const verifyUserService = async body => {
    const { email, password } = body
    let user = await UserModel.findOne({ email })
    if(!user) {
        throw new NotFoundException("No account exists with this Email address")
    }
    // console.log('Loggedin user: ', user)
    let isValidPassword = await user.comparePassword(password, user.password)
    if(!isValidPassword) {
        throw new BadRequestException("Invalid Password")
    }
    user.omitPassword()
    let token = jwt.sign(user, config.JWT_SECRET, { expiresIn: '1000 minutes' })
    // console.log("Token = " + token)
    return ({
        "status": HTTPSTATUS.ACCEPTED,
        "message": "Login Successful",
        "signedToken": token
    })
}