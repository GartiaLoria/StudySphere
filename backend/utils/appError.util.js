import { HTTPSTATUS } from "../config/http.config.js"
import { ErrorCodesEnum } from "../enums/errorCodes.enum.js"

export class AppError extends Error {
    constructor(message, statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
        Error.captureStackTrace(this, this.constructor)
    }
}

export class HttpException extends AppError {
    constructor(message = "Http Exception Error", statusCode, errorCode) {
        super(message, statusCode, errorCode)
    }
}

export class InternalServerException extends AppError {
    constructor(message = "Internal Server Error", errorCode) {
        super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCodesEnum.INTERNAL_SERVER_ERROR)
    }
}

export class NotFoundException extends AppError {
    constructor(message = "Resource Not Found", errorCode) {
        super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCodesEnum.RESOURCE_NOT_FOUND)
    }
}

export class BadRequestException extends AppError {
    constructor(message = "Bad Request", errorCode) {
        super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCodesEnum.VALIDATION_ERROR)
    }
}

export class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized Access", errorCode) {
        super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCodesEnum.ACCESS_UNAUTHORIZED)
    }
}