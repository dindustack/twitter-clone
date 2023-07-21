"use client";

import { usePosts } from "@/hooks/usePosts";
import { PostItem } from "./Post/Item";
import { useSession } from "@/hooks/useSession";
import { SkeletonItem } from "@/app/(site)/tweet-loading";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [], isLoading } = usePosts(userId);
  const { data: sessionId } = useSession();
  const numbers = [1, 2, 3, 4, 5];

  if (isLoading || !posts) {
    const skeletonItems = numbers.map((_n, index) => (
      <SkeletonItem key={index} />
    ));

    return skeletonItems;
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
