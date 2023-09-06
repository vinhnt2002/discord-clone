"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

//hook
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";

export const InviteModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  //hook
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "invite";

  const origin = useOrigin();
  // console.log(origin);

  const { server } = data;
  // console.log(server);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  // console.log(inviteUrl);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const onNews = async () => {
    // TO DO TO UPDATE ID OF INVITE CODE
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // const handleClose = () => {
  //   onClose();
  // };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friend
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Label className="uppercase text-sm mx-2 text-zinc-600 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              value={inviteUrl}
              className="bg-zinc-300/50 text-black border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {isCopy ? (
                <Check className="w-4 h-4 " />
              ) : (
                <Copy className="w-4 h-4 " />
              )}
            </Button>
          </div>

          <Button
            variant={"link"}
            disabled={isLoading}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
            onClick={onNews}
          >
            <div className="flex gap-x-2">
              Generate the link
              <RefreshCw className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

