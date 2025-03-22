export const isAuthRoute = pathname => 
  Object.values(AUTH_ROUTES).includes(pathname);

export const AUTH_ROUTES = {
  SIGN_IN: "/login",
  SIGN_UP: "/register",
};

export const PROTECTED_ROUTES = {
  WORKSPACE: "/workspace/:workspaceId",
  TASKS: "/workspace/:workspaceId/tasks",
  MEMBERS: "/workspace/:workspaceId/members",
  SETTINGS: "/workspace/:workspaceId/settings",
  PROJECT_DETAILS: "/workspace/:workspaceId/project/:projectId",
};

export const BASE_ROUTE = {
  HOME: "/home", 
  INVITE: "/joinByInviteId",
  INVITE_URL: "/invite/workspace/:inviteCode/join",
};