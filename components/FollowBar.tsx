"use client";

import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "./Avatar";
import { useSession } from "next-auth/react";

export const FollowBar = () => {
  const { data: currentUser } = useSession();
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  if (!currentUser) {
    return;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-6 mt-4">
            {users.map((user: Record<string, any>) => (
              <div key={user.id} className="flex flex-row gap-4 items-center">
                <Avatar userId={user.id} profileImage={user.profileImage} />
                <div className="flex flex-col ">
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-neutral-400 text-sm">{`@${user.username}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
