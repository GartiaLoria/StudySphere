import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo";
import { useAuthContext } from "@/context/AuthProvider";
import { Button } from "../ui/button";
const BaseHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate()
  const getPageLabel = (pathname) => {
    // console.log(pathname)
    if (pathname.includes("/login")) return "Login";
    if (pathname.includes("/register")) return "Signup";
    if (pathname.includes("/home")) return "Home";
    return pathname == "/" ? "Home" : "Not Found";
  };
  const { user, logout } = useAuthContext();
  console.log("isLoggedIn = ", !!user);
  const pageHeading = getPageLabel(pathname);

  const logoutButtonAction = () => {
    console.log("logout called from baseHeader")
    logout()
  }
  return (
    <header className="flex sticky top-0 z-50 bg-white h-12 shrink-0 items-center border-b">
      <div className="flex flex-1 items-center gap-2 px-3">
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block text-[15px]">
              <Link
                to="/"
                className="flex items-center gap-2 self-center font-medium text-2xl"
              >
                <Logo /> StudySphere
              </Link>
            </BreadcrumbItem>
            <Separator orientation="vertical" className="mr-2 h-8" />
            {pageHeading && (
              <div>
                <BreadcrumbSeparator className="hidden md:hidden" />
                <BreadcrumbItem className="text-[15px]">
                  <BreadcrumbPage className="line-clamp-1 text-2xl font-semibold">
                    {pageHeading}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </div>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Button onClick = {() => logoutButtonAction()} className="font-mono px-5 py-2 me-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-sm shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-lg text-center">Logout</Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button onClick = {() => navigate("/register")} className="text-lg font-mono text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg px-5 py-2.5 text-center">Register</Button>
            <Button onClick = {() => navigate("/login")} className="text-lg font-mono px-5 py-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg me-2">
              Login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default BaseHeader;
