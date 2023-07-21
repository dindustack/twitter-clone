import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 5;

export async function GET(req: Request, res: Response) {
  try {
    const posts = await prisma?.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: error.message,
        }),
        { status: 400 }
      );
    }
  }
}
