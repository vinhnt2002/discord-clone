import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";



export async function POST(req: Request) {
  try {
    const { name, imgUrl } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorize", { status: 404 });
    }

    const server = await db.server.create({
        data: {
            profileId: profile.id,
            name, 
            imgUrl,
            inviteCode: uuidv4(),
            channels:{
                create: [
                    {name: 'general', profileId: profile.id}
                ]
            },
            members:{
                create:[
                    {profileId: profile.id, role: MemberRole.ADMIN}
                ]
            }
        }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("SERVER_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
