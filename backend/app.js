import "dotenv/config"
import cors from "cors"
import express from "express"
import { config } from "./config/app.config.js"
import { HTTPSTATUS } from "./config/http.config.js"
import connectMongoDb from "./config/mongo.config.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import workspaceRoutes from "./routes/workspace.routes.js"
import memberRoutes from "./routes/member.routes.js"
import projectRoutes from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"
// isAuthenticated will work as an alias for authenticateUser imoprted from auth.middleware
import isAuthenticated from "./middleware/auth.middleware.js"  
import errorHandler from "./middleware/errorHandler.middleware.js"

const app = express()
const BASE_PATH = config.BASE_PATH

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => res.status(HTTPSTATUS.OK).json({ message: "StudySphere First Api" }))

app.use(`${BASE_PATH}/auth`, authRoutes)
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes)
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes)
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes)
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes)
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes)

// Using the Global error handling middleware
app.use(errorHandler)
// Why Must It Come After Routes?
// Express Processes Middleware in Order
// When a request comes in, Express checks middleware and routes sequentially.
// If the error-handling middleware is before the routes, errors never reach it because the request would never be processed correctly.

connectMongoDb()
app.listen(config.PORT, () => console.log(`Server is Intercepting Requests on port = http://localhost:${config.PORT}`))