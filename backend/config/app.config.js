import { getEnv } from "../utils/getEnv.util.js"
const appConfig = () => ({
    PORT: getEnv("PORT", "8000"), // getting first parameter value from .env file otherwise right side default value
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),
    DB_NAME: getEnv("DB_NAME", "studysphere-db"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost")
})
export const config = appConfig()