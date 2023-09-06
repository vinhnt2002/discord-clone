import { ServerHeader } from "./server-header";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

//prisma
import { ChannelType } from "@prisma/client";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar: React.FC<ServerSidebarProps> = async ({
  serverId,
}) => {
  const profile = await currentProfile();
  if (!profile) redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "desc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const TextChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const AudioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const VideoVIDEOChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  if (!server) return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile?.id
  )?.role;
  // console.log(role);
  // console.log(TextChannel);

  return (
    <div className="flex flex-col w-full h-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader role={role} server={server} />
      <div className="pl-4">channel here</div>
    </div>
  );
};
