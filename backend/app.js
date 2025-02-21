import "dotenv/config"
import express from "express"
import cors from "cors"
import connectMongoDb from "./config/mongo.config.js"
import { HTTPSTATUS } from "./config/http.config.js"
import { config } from "./config/app.config.js"
import isAuthenticated from "./middleware/auth.middleware.js"  // isAuthenticated will work as an alias for authenticateUser imoprted from auth.middleware 
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import workspaceRoutes from "./routes/workspace.routes.js"
import memberRoutes from "./routes/member.routes.js"
const app = express()
const BASE_PATH = config.BASE_PATH
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    return res.status(HTTPSTATUS.OK).json({
        message: "StudySphere First Api"
    })
})
app.use(`${BASE_PATH}/auth`, authRoutes)
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes)
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes)
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes)
connectMongoDb()
app.listen(config.PORT, () => console.log(`Server is Intercepting Requests on port = http://localhost:${config.PORT}`))
// app.get('/auth', authenticateUser, (req, res) => {
//     return res.status(HTTPSTATUS.OK).json({
//         message: "StudySphere First Api"
//     })
// })