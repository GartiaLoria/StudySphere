export const Roles = Object.freeze({ // using freeze to make objects immutable
    OWNER: "OWNER",
    ADMIN: "ADMIN",
    MEMBER: "MEMBER"
})
export const Permissions = Object.freeze({
    // Owner Roles
    CREATE_WORKSPACE: "CREATE_WORKSPACE",
    DELETE_WORKSPACE: "DELETE_WORKSPACE",
    EDIT_WORKSPACE: "EDIT_WORKSPACE",
    CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
    
    // Admin Roles
    MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",
    ADD_MEMBER: "ADD_MEMBER",
    REMOVE_MEMBER: "REMOVE_MEMBER",
    CREATE_PROJECT: "CREATE_PROJECT",
    EDIT_PROJECT: "EDIT_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",
    DELETE_TASK: "DELETE_TASK",

    // Member Roles
    CREATE_TASK: "CREATE_TASK",
    EDIT_TASK: "EDIT_TASK",
    VIEW_ONLY: "VIEW_ONLY"
})