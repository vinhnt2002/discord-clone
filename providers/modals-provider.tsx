"use client";

import { useEffect, useState } from "react";
import { MemberModal } from "@/components/modals/member-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModel } from "@/components/modals/invite-model";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal/>
      <InviteModel/>
      <EditServerModal/>
      <MemberModal/>
      <CreateChannelModal/>
      <LeaveServerModal/>
      <DeleteServerModal/>
    </>
  );
};
