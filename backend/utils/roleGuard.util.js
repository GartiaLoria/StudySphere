// import { Permissions } from "../enums/roles.enum.js"
import { UnauthorizedException } from "./appError.util.js"
import { RolePermissions } from "./rolesPermissions.util.js"
export const roleGuard = (role, requiredPermissions) => {
    const permissions = RolePermissions[role]
    // console.log(role, permissions)
    // console.log(requiredPermissions)
    // If the role doesn't exist or lacks required permissions, throw an exception
    const hasPermission = requiredPermissions.every(permission => permissions.includes(permission))
    if (!hasPermission) {
        throw new UnauthorizedException("You do not have the necessary permissions to perform this action")
    }
};