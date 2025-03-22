import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Asidebar from "@/components/asidebar/asidebar";
import Header from "@/components/header/Header";
import CreateWorkspaceDialog from "@/components/workspace/createWorkspaceDialog";
import CreateProjectDialog from "@/components/workspace/project/createProjectDialog";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <Asidebar />
      <SidebarInset className="overflow-x-hidden">
        <div className="w-full">
          <div>
            <Header />
            <div className="pb-0.5">
              <Outlet />
            </div>
          </div>
          <CreateWorkspaceDialog />
          <CreateProjectDialog />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AppLayout;
