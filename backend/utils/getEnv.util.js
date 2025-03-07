export const getEnv = (key, defaultValue = "") => {
    const value = process.env[key]
    if(value === undefined) {
        if(defaultValue) {
            return defaultValue
        }
        throw new Error(`Environment Variable Key = ${key}, is not set`)
    }
    return value
}