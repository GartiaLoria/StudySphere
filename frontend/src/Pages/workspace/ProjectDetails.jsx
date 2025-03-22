import { Separator } from "@/components/ui/separator";
import ProjectAnalytics from "@/components/workspace/project/projectAnalytics";
import ProjectHeader from "@/components/workspace/project/projectHeader";
import { TaskTable } from "@/components/workspace/task/taskTable";

const ProjectDetails = () => {
  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        <ProjectAnalytics />
        <Separator />
        {/* {Task Table} */}
        <TaskTable />
      </div>
    </div>
  );
};

export default ProjectDetails;