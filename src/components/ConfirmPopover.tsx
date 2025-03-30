"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ConfirmPopoverProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ConfirmPopover = ({
  trigger,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  open,
  onOpenChange,
}: ConfirmPopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isPopoverOpen = isControlled ? open : isOpen;
  const setIsPopoverOpen = isControlled ? onOpenChange : setIsOpen;

  const handleConfirm = () => {
    onConfirm();
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-80 p-0 z-50">
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex justify-end gap-2 p-3 bg-gray-50">
          <Button variant="outline" size="sm" onClick={() => setIsPopoverOpen(false)}>
            {cancelText}
          </Button>
          <Button variant="default" size="sm" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
