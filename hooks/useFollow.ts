import { useCallback, useMemo } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useIndividualUser } from "./useIndividualUser";
import useLoginModal from "./useLoginModal";
import useCurrentUser from "./useCurrentUser";

export const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useIndividualUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete(`/api/follow/${userId}`);
      } else {
        request = () => axios.post(`/api/follow/${userId}`);
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};
