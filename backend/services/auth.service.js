import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"
import WorkspaceModel from "../models/workspace.model.js"
import RoleModel from "../models/roles.model.js"
import MemberModel from "../models/member.model.js"
import { Roles } from "../enums/roles.enum.js"
import { BadRequestException, NotFoundException } from "../utils/appError.util.js"
import { config } from "../config/app.config.js"
import { HTTPSTATUS } from "../config/http.config.js"

export const registerUserService = async body => {
    const { email, name, password } = body
    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new BadRequestException("Email already exists");
        }
        const user = new UserModel({
            email,
            name,
            password
        })
        await user.save()
        const workspace = new WorkspaceModel({
            name: `My Workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id
        })
        await workspace.save()
        const ownerRole = await RoleModel.findOne({
            name: Roles.OWNER,
        })
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
    } catch (error) {
        console.log(`Error In auth.service.js registerUserService Method  = ${error}`)
    }
}

export const verifyUserService = async body => {
    const { email, password } = body
    try {
        let user = await UserModel.findOne({ email })
        if(!user) {
            return ({
                "status": HTTPSTATUS.NOT_FOUND, 
                "message": "No Account Exists with this Email Address"
            })
        }
        // console.log('Loggedin user: ', user)
        let isValidPassword = await user.comparePassword(password, user.password)
        if(!isValidPassword) {
            return ({
                "status": HTTPSTATUS.BAD_REQUEST,
                "message": "Invalid Password"
            })
        }
        let token = jwt.sign({ 
            user: { 
                name: user.name, 
                email: user.email,
                _id: user._id 
            }}, 
            config.JWT_SECRET, { 
                expiresIn: '1000 minutes' 
            }
        )
        // console.log("Token = " + token)
        return ({
            "status": HTTPSTATUS.ACCEPTED,
            "message": "Login Successful",
            "signedToken": token
        })
    } catch (error) {
        // console.log(error)
        return ({
            "status": HTTPSTATUS.INTERNAL_SERVER_ERROR,
            "message": error.message
        })
    }
}