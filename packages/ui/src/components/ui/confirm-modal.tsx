"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  triggerVariant?:
    | "default"
    | "outline"
    | "destructive"
    | "ghost"
    | "secondary";
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive";
}

function ConfirmModal({
  title,
  description,
  onConfirm,
  triggerText = "",
  triggerIcon,
  triggerVariant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Error executing confirm action:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          className="flex items-center gap-2 cursor-pointer"
          size="sm"
        >
          {triggerIcon && <span>{triggerIcon}</span>}
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={confirmVariant}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmModal };
