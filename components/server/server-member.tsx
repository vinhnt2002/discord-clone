"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";

import { cn } from "@/lib/utils";
import { UserAvatar } from "../shares/user-avatar";

interface ServerMember {
  member: Member & { profile: Profile };
  server: Server;
  icon: React.ReactNode;
}

export const ServerMember: React.FC<ServerMember> = ({
  member,
  server,
  icon,
}) => {
  return (
    <button
      // TO DO
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center w-full gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
      )}
    >
      <UserAvatar
        src={member.profile.imgUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />

      <p
        className={cn(
          "font-semibold text-xs text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition"
        )}
      >
        {member.profile.name.slice(0,18)}
      </p>
      <p className="ml-auto">{icon}</p>
    </button>
  );
};
