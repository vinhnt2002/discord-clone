"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ActionTooltip } from "../shares/action-tooltip";


// hook
import { useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
  role?: MemberRole;
  server: Server;
  channel: Channel;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel: React.FC<ServerChannelProps> = ({
  role,
  server,
  channel,
}) => {

  const {onOpen, } = useModal();

  const router = useRouter();
  const params = useParams();

  // console.log(params);

  // const onClick = () => {
  //   router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  // };

  const Icon = iconMap[channel.type];

  return (
    <button
    // TO DO
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 mb-1 transition",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 h-5 w-5  text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition"
        )}
      >
        {channel.name}
      </p>

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex items-center ml-auto gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              //TO DO
              onClick={() => onOpen('editChannel', {server, channel})}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              // TO DO
              onClick={() => onOpen('deleteChannel', {server, channel})}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}

      {channel.name === 'general' && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400"/>
      )}
    </button>
  );
};
