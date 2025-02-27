import { Roles, Permissions } from "../enums/roles.enum.js"
export const RolePermissions = Object.freeze({
    [Roles.OWNER]: Object.values(Permissions),
    [Roles.ADMIN]: [
        Permissions.ADD_MEMBER,
        Permissions.CREATE_PROJECT,
        Permissions.EDIT_PROJECT,
        Permissions.DELETE_PROJECT,
        Permissions.CREATE_TASK,
        Permissions.EDIT_TASK,
        Permissions.DELETE_TASK,
        Permissions.MANAGE_WORKSPACE_SETTINGS,
        Permissions.VIEW_ONLY
    ],
    [Roles.MEMBER]: [
        Permissions.CREATE_TASK,
        Permissions.EDIT_TASK,
        Permissions.VIEW_ONLY
    ]
})