import { getEnv } from "../utils/getEnv.util.js"
const appConfig = () => ({
    PORT: getEnv("PORT", "8000"), // getting first parameter value from .env file otherwise right side default value
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost")
})
export const config = appConfig()