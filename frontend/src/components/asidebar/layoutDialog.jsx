import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { useCallback } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logoutMutationFn } from "@/lib/api";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/context/AuthProvider";

const LogoutDialog = (props) => {
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  // const queryClient = useQueryClient();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: () => {
  //     console.log("Logout logic is Missing in the layoutDialog.jsx in asidebar component")
  //   },
  //   onSuccess: () => {
  //     queryClient.resetQueries({
  //       queryKey: ["authUser"],
  //     });
  //     navigate("/");
  //     setIsOpen(false);
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   },
  // });

  // Handle logout action
  // const handleLogout = useCallback(() => {
  //   if (isLoading) return;
  //   logout();
  //   setisLoading(true);
  // }, [isLoading]);
  const handleLogout = ()=>{
    logout();
    toast({
      title: "Logout",
      description: "Logout Successful",
      variant: "success",
    });
    
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={false} type="button" onClick={handleLogout}>
              {/* {isPending && <Loader className="animate-spin" />} */}
              Sign out
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default LogoutDialog;