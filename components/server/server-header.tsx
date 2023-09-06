"use client";

import { ServerWithMemberslAndWithProfile } from "@/types";
import { MemberRole } from "@prisma/client";

//icon
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

// ui component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMemberslAndWithProfile;
  role?: MemberRole;
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();

  const isAmin = role === MemberRole.ADMIN;
  const isModerator = isAmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button
          className="w-full h-12 flex items-center text-base font-semibold px-3 border-neutral-200  
        dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition capitalize
        "
        >
          {server.name}
          <ChevronDown className="h-5 m-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs space-y-[2px] font-medium text-black dark:text-neutral-400 ">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite people
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="text-neutral-800 dark:text-neutral-400 px-3 py-2 text-sm cursor-pointer"
          >
            Server setting
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="text-neutral-800 dark:text-neutral-400 px-3 py-2 text-sm cursor-pointer"
          >
            Manage members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="text-neutral-800 dark:text-neutral-400 px-3 py-2 text-sm cursor-pointer"
          >
            Create channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {!isAmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leave", { server })}
            className="text-rose-500 dark:text-rose-600 px-3 py-2 text-sm cursor-pointer "
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />

        {isAmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 dark:text-rose-600 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
