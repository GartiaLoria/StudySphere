import { Roles, Permissions } from "../enums/roles.enum.js"
export const RolePermissions = Object.freeze({
    [Roles.OWNER]: Object.values(Permissions),
    [Roles.ADMIN]: [
        Permissions.CREATE_WORKSPACE,
        Permissions.EDIT_WORKSPACE,
        Permissions.ADD_MEMBER,
        Permissions.REMOVE_MEMBER,
        Permissions.CREATE_PROJECT,
        Permissions.EDIT_PROJECT,
        Permissions.CREATE_TASK,
        Permissions.EDIT_TASK,
        Permissions.DELETE_TASK
    ],
    [Roles.MEMBER]: [
        Permissions.CREATE_TASK,
        Permissions.EDIT_TASK,
        Permissions.VIEW_ONLY
    ]
})