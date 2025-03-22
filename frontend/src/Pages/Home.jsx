import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthProvider";
import { toast } from "@/hooks/useToast";
import { BASE_ROUTE } from "@/routes/routePaths";
const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const exploreWorkspaceAction = () => {
    if(user) {
      navigate(`/workspace/${user.currentWorkspace}`)
    } else {
      toast({
        title: "Login Required",
        description: "Login to Explore your Workspace",
        variant: "destructive",
      });
    }
  }
  const joinWorkspaceByIdAction = () => {
    if(user) {
      navigate(`${BASE_ROUTE.INVITE_URL}`)
    } else {
      toast({
        title: "Login Required",
        description: "Login to Join Any Workspace",
        variant: "destructive",
      });
    }
  }
  return (
    <div>
      <div
        className="flex justify-center md:justify-end bg-cover bg-center min-h-screen md:p-5"
        style={{ backgroundImage: "url('/deskwithelements-neutral.jpg')" }}
      >
        <div className="w-full md:w-auto flex flex-col items-center md:items-end justify-center font-semibold font-sans text-zinc-800 pt-10 md:pt-20 md:pe-40 overflow-hidden">
          <p className="w-max text-center text-4xl md:text-7xl md:text-right">
            Welcome...
          </p>
          <div className="flex flex-col md:flex-row mt-7 gap-4 md:gap-6">
            <Button onClick = {() => exploreWorkspaceAction()} className="bg-rose-600 hover:bg-rose-700 p-4 md:p-5 text-lg">
              Explore Own Workspace
            </Button>
            <Button onClick = {() => joinWorkspaceByIdAction()} className="bg-green-600 hover:bg-green-700 p-4 md:p-5 text-lg">
              Join Workspace by Invite Id
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center"></div>
    </div>
  );
};
export default Home;
