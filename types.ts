import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemberslAndWithProfile = Server & {
  members: ( Member & { profile: Profile })[];
};
