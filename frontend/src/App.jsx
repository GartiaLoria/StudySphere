import NotFound from "./pages/errors/NotFound";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import SignUp from "./pages/auth/Signup";
import SignIn from "./pages/auth/Signin";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/protected.route";
import { AUTH_ROUTES, PROTECTED_ROUTES, BASE_ROUTE } from "./routes/routePaths";
import WorkspaceDashboard from "./pages/workspace/Dashboard";
import Tasks from "./pages/workspace/Tasks";
import Members from "./pages/workspace/Members";
import Settings from "./pages/workspace/Settings"
import ProjectDetails from "./pages/workspace/ProjectDetails";
import InviteUser from "./pages/invite/InviteUser";
const App = () => {
  const browserRoutes = createBrowserRouter([{
      element: <BaseLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: BASE_ROUTE.HOME, element: <Home /> },
        { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
        { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
      ]
    }, {
      element: <ProtectedRoute />,
      children: [{
        element: <AppLayout />, 
        children: [
          {path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
          { path: PROTECTED_ROUTES.TASKS, element: <Tasks /> },
          { path: PROTECTED_ROUTES.MEMBERS, element: <Members /> },
          { path: PROTECTED_ROUTES.SETTINGS, element: <Settings /> },
          { path: PROTECTED_ROUTES.PROJECT_DETAILS, element: <ProjectDetails /> },
        ]
      }]
    }, {
      element: <BaseLayout />,
      children: [
        { path: BASE_ROUTE.INVITE_URL, element: <InviteUser /> },
        { path: '/*', element: <NotFound /> },
      ]
    }
  ])
  return <RouterProvider router = { browserRoutes } />
};
export default App;