'use client'

import { ServerWithMemberslAndWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import React from "react";
import { ActionTooltip } from "@/components/shares/action-tooltip";

import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  role?: MemberRole;
  label: string;
  server?: ServerWithMemberslAndWithProfile;
}

export const ServerSection: React.FC<ServerSectionProps> = ({
  server,
  sectionType,
  role,
  label,
  channelType,
}) => {

  const {onOpen} = useModal()

  return (
    <div className="flex items-center py-2">
      <p className=" text-zinc-400 text-sm font-semibold dark:text-zinc-500">{label}</p>
      
      
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channels" side="top">
          <button 
          onClick={() => onOpen('createChannel', {server})}
          className="ml-auto text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition ">
            <Plus className="h-4 w-4 " />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Manage Member" side="right">
          <button
          onClick={() => onOpen('members' , {server})}
          className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition ml-auto"
          >
              <Settings className="h-4 w-4"/>
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
