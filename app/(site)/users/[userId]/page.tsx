"use client";

import { Header } from "@/components/Header";
import { UserBio } from "@/components/User/Bio";
import { UserHero } from "@/components/User/Hero";
import { useIndividualUser } from "@/hooks/useIndividualUser";

export default function UserView({ params }: { params: { userId: string } }) {
  console.log(params);
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useIndividualUser(userId);

  if (isLoading || !fetchedUser) {
    return <p className="text-white">Carrot</p>;
  }
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero fetchedUser={fetchedUser} />
      <UserBio userId={userId} />
    </>
  );
}
