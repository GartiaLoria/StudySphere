import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export const ConfirmDialog = ({ 
  isOpen, 
  isLoading, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  description = "Are you sure you want to perform this action?", 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  children 
}) => {
  const handleClose = React.useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isLoading} 
            className="flex items-center gap-2"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
