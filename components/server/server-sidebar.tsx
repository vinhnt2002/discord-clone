import { ServerHeader } from "./server-header";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
//prisma
import { ChannelType, MemberRole } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ServerSearch } from "./server-search";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4/ mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4/ mr-2" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4' w-4 mr-2 text-indigo-500" />
  ),
};

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
          createdAt: "asc",
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
  const VideoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile?.id
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

      <ScrollArea className="flex px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: TextChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: AudioChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: VideoChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Member",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />

          <Separator className="bg-zinc-400 dark:bg-zinc-700 my-2" />
          {!!TextChannel?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label="Text channels"
              />

              <div className="space-y-[2px]">
                {TextChannel.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    role={role}
                    server={server}
                    channel={channel}
                  />
                ))}
              </div>
            </div>
          )}
          {!!AudioChannel?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label="Audio channels"
              />

              <div className="space-y-[2px]">
                {AudioChannel.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    role={role}
                    server={server}
                    channel={channel}
                  />
                ))}
              </div>
            </div>
          )}
          {!!VideoChannel?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label="Video channels"
              />

              <div className="space-y-[2px]">
                {VideoChannel.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    role={role}
                    server={server}
                    channel={channel}
                  />
                ))}
              </div>
            </div>
          )}
          {!!members?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="members"
                role={role}
                label="Manage Member"
                server={server}
              />

              <div className="space-y-[2px]">
                {members?.map((member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server}
                    icon={roleIconMap[member.role]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
