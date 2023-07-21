"use client";

import { Header } from "@/components/Header";
import { UserBio } from "@/components/User/Bio";
import { UserHero } from "@/components/User/Hero";
import { useIndividualUser } from "@/hooks/useIndividualUser";
import { SkeletonProfile } from "../../profile-loading";

export default function UserView({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useIndividualUser(userId);

  if (isLoading || !fetchedUser) {
    return <SkeletonProfile />;
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero fetchedUser={fetchedUser} />
      <UserBio userId={userId} />
    </>
  );
}
