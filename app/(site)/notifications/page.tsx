"use client";

import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { NotificationsFeed } from "@/components/Notification/Feed";
import { Header } from "@/components/Header";

export default function Notifications() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        <div className="border-b-[1px] border-neutral-800 p-5">
          <div className="flex flex-row items-center gap-2">
            <div className="w-[10%] h-[1rem] bg-neutral-700 rounded-[3px]"></div>
          </div>
        </div>
        <div className="flex flex-col py-8 px-5 gap-8">
          <div className="w-[full] h-[0.8rem] bg-neutral-700 rounded-[10px]"></div>
          <div className="w-[full] h-[0.8rem] bg-neutral-700 rounded-[10px]"></div>
          <div className="w-[full] h-[0.8rem] bg-neutral-700 rounded-[10px]"></div>
          <div className="w-[full] h-[0.8rem] bg-neutral-700 rounded-[10px]"></div>
          <div className="w-[full] h-[0.8rem] bg-neutral-700 rounded-[10px]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
}
