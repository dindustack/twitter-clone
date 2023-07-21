"use client";

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import React from "react";

import { SidebarLogo } from "./Logo";
import { SidebarItem } from "./Item";
import { SidebarTweetButton } from "./TweetButton";
import { useSession } from "@/hooks/useSession";

export const Sidebar = () => {
  const { data: currentUser } = useSession();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {React.Children.toArray(
            items.map((item) => (
              <SidebarItem
                label={item.label}
                href={item.href}
                icon={item.icon}
                auth={item.auth}
              />
            ))
          )}

          {currentUser && (
            <SidebarItem
              onClick={() => {
                signOut();
              }}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
