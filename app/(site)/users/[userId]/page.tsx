"use client";

import { Header } from "@/components/Header";
import { SkeletonProfile } from "@/components/Skeleton/Profile";
import { UserBio } from "@/components/User/Bio";
import { UserHero } from "@/components/User/Hero";
import { useIndividualUser } from "@/hooks/useIndividualUser";

export default function UserView({ params }: { params: { userId: string } }) {
  console.log(params);
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useIndividualUser(userId);

  if (isLoading || !fetchedUser) {
    return <SkeletonProfile />;
  }

  // if (!isLoading) {
  //   return <SkeletonProfile />;
  // }
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero fetchedUser={fetchedUser} />
      <UserBio userId={userId} />
    </>
  );
}
