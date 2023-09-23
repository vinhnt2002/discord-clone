import React from "react";
import MobileToggle from "../shares/mobile-toggle";
import { Hash } from "lucide-react";
import { UserAvatar } from "../shares/user-avatar";
import SocketIndicator from "../shares/soket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  imageUrl: string;
  type: "channel" | "conversation";
}
const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-base flex items-center font-semibol h-12 border-neutral-200 dark:border-neutral-800 px-3 border-b-2">
      <MobileToggle serverId={serverId} />

      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}

      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:w-8 md:h-8" />
      )}

      <p className="text-base to-zinc-500 dark:text-zinc-200">{name}</p>
    <div className="flex items-center ml-auto">
       <SocketIndicator/>
    </div>
    </div>
  );
};

export default ChatHeader;
