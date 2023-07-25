import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId || typeof userId !== "string") {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "Invalid ID" }),
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: error.message }),
        { status: 401 }
      );
    }
  }
}
