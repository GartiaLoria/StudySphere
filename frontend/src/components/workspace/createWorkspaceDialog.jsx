import CreateWorkspaceForm from "./createWorkspaceForm";
import useCreateWorkspaceDialog from "@/hooks/useCreateWorkspaceDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        <CreateWorkspaceForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;