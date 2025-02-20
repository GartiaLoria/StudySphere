import "dotenv/config"
import express from "express"
import cors from "cors"
import connectMongoDb from "./config/mongo.config.js"
import { HTTPSTATUS } from "./config/http.config.js"
import { config } from "./config/app.config.js"
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    return res.status(HTTPSTATUS.OK).json({
        message: "StudySphere First Api"
    })
})
connectMongoDb()
app.listen(config.PORT, () => console.log(`Server is Intercepting Requests on port = http://localhost:${config.PORT}`))