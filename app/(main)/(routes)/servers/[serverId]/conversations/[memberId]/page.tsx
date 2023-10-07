import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Component
import ChatHeader from "@/components/chat/chat-header";
import ChatMessage from "@/components/chat/chat-message";
import ChatInput from "@/components/chat/chat-input";


interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    redirect(`/servers/${params.serverId}`);
  }

  // console.log(conversation);

  const { memberOne, memberTwo } = conversation;

  const ortherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
          <ChatHeader 
          name={ortherMember.profile.name}
          serverId={ortherMember.serverId}
          imageUrl={ortherMember.profile.imgUrl}
          type="conversation"
          />

          <ChatMessage 
          name={ortherMember.profile.name}
          member={currentMember}
          chatId={conversation.id}
          apiUrl="/api/direct-messages"
          socketUrl="/api/socket/direct-messages"
          socketQuery={{
            conversationId: conversation.id
          }}
          paramKey="conversationId"
          paramValue={conversation.id}
          type="conversation"
          />

          <ChatInput
          name={ortherMember.profile.name}
          type="conversation"
          apiUrl="/api/socket/direct-messages"
          query={{
            conversationId: conversation.id
          }}
          />
      </div>
    )
};

export default MemberIdPage;
