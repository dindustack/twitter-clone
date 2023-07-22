"use client";

import { Header } from "@/components/Header";
import { UserBio } from "@/components/User/Bio";
import { UserHero } from "@/components/User/Hero";
import { useIndividualUser } from "@/hooks/useIndividualUser";
import { SkeletonProfile } from "../../profile-loading";
import { usePosts } from "@/hooks/usePosts";
import { PostItem } from "@/components/Post/Item";
import { SkeletonItem } from "../../tweet-loading";

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useIndividualUser(userId);

  const { data: posts = [] } = usePosts(userId);
  const numbers = [1, 2, 3, 4, 5];

  if (!posts && userId !== undefined && isLoading) {
    const skeletonItems = numbers.map((_n, index) => (
      <SkeletonItem key={index} />
    ));

    return skeletonItems;
  }

  const fetchPostsUserId = posts.map(
    (post: Record<string, any>) => post.userId
  )[0];

  if (isLoading || !fetchedUser) {
    return <SkeletonProfile />;
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero fetchedUser={fetchedUser} />
      <UserBio userId={userId} />

      <>
        {fetchPostsUserId === userId && (
          <>
            {posts.map((post: Record<string, any>) => (
              <PostItem userId={userId} key={post.id} data={post} />
            ))}
          </>
        )}
      </>
    </>
  );
};

export default UserView;
