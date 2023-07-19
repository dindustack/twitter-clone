"use client";

import { Header } from "@/components/Header";
import { UserBio } from "@/components/User/Bio";
import { UserHero } from "@/components/User/Hero";
import { useIndividualUser } from "@/hooks/useIndividualUser";
import React from "react";

export default function UserView({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useIndividualUser(userId);

  if (isLoading || !fetchedUser) {
    return <p className="text-white">Carrot</p>;
  }
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
}
