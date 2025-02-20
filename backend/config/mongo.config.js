import mongoose from "mongoose"
import { config } from "./app.config.js"
const connectMongoDb = async () => {
    try {
        await mongoose.connect(config.MONGO_URI + config.DB_NAME)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log(`MongoDb Error = ${error.message}`)
        process.exit(1)
    }
}
export default connectMongoDb