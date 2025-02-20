import jwt from "jsonwebtoken"
import { HTTPSTATUS } from "../config/http.config.js"
import { config } from "../config/app.config.js"
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            "message": "Token Unavailable, Can't be Authorized"
        })
    }
    try {
        let decodedData = jwt.verify(token, config.JWT_SECRET)
        // console.log('Decoded data: ', decodedData)
        req.user = decodedData.user
        console.log("Authentication Success")
    } catch (error) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            "message": "Login Invalidated, Try Logging in Again"
        })
    }
    next()
}
export default authenticateUser