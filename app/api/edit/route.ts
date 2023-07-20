import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
      );
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    const { name, username, bio, profileImage, coverImage } =
      (await req.json()) as {
        bio: string;
        coverImage: string;
        name: string;
        profileImage: string;
        username: string;
      };

    if (!name || !username) {
      return new Error("Missing Fields");
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser!.id,
      },
      data: {
        bio,
        coverImage,
        name,
        profileImage,
        username,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: error.message,
        }),
        { status: 500 }
      );
    }
  }
}
