import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    if (!params.memberId) {
      return new NextResponse("Missing Member Id", { status: 400 });
    }

    if (!serverId) {
      return new NextResponse("Missing serverId", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server)

  } catch (error) {
    console.log("MEMBER_ID DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    // console.log(searchParams);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");

    // console.log(serverId);

    if (!profile) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Missing Server Id", { status: 401 });
    }

    if (!params.memberId) {
      return new NextResponse("Missing Member Id", { status: 401 });
    }

    //update server and res the data

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server);
  } catch (error) {
    console.log("MEMBER_ID PATHC", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
