"use client";

import { usePosts } from "@/hooks/usePosts";
import { SkeletonProfile } from "./Skeleton/Profile";
import { PostItem } from "./Post/Item";
import { useSession } from "@/hooks/useSession";
import { SkeletonItem } from "@/app/(site)/tweet-loading";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [], isLoading } = usePosts(userId);
  const { data: sessionId } = useSession();

  if (isLoading || !posts) {
    return <SkeletonItem />;
  }

  return (
    <>
      {sessionId && (
        <>
          {posts.map((post: Record<string, any>) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))}
        </>
      )}
    </>
  );
};
