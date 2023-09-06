import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorize", { status: 404 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID missing", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    console.log(server);
    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_INVITE-CODE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
