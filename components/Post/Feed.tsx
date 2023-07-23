"use client";

import { usePosts } from "@/hooks/usePosts";
import { PostItem } from "./Item";
import { SkeletonItem } from "@/app/(site)/tweet-loading";
import { Suspense } from "react";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);
  const numbers = [1, 2, 3, 4, 5];

  if (!posts && userId !== undefined && isLoading) {
    const skeletonItems = numbers.map((_n, index) => (
      <SkeletonItem key={index} />
    ));

    return skeletonItems;
  }

  return (
    <Suspense fallback={<SkeletonItem />}>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </Suspense>
  );
};
