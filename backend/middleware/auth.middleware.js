import jwt from "jsonwebtoken"
import { config } from "../config/app.config.js"
import { 
    BadRequestException, 
    UnauthorizedException 
} from "../utils/appError.util.js"
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token){
        throw new UnauthorizedException("Bearer Token Unavailable, Authorization Failed ❌") 
    }
    try {
        let decodedData = jwt.verify(token.split(" ")[1], config.JWT_SECRET)
        req.user = decodedData
    } catch (error) {
        throw new BadRequestException("Login Invalidated, Token not verified")
    }
    next()
}
export default authenticateUser
