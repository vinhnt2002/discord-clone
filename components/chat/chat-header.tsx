import React from "react";
import MobileToggle from "../shares/mobile-toggle";
import { Hash } from "lucide-react";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
}
const ChatHeader = ({ serverId, name, type }: ChatHeaderProps) => {
  return (
    <div className="text-base flex items-center font-semibol h-12 border-neutral-200 dark:border-neutral-800 px-3 border-b-2">
      <MobileToggle serverId={serverId} />

      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}

      <p className="text-base to-zinc-500 dark:text-zinc-200">{name}</p>
    </div>
  );
};

export default ChatHeader;
