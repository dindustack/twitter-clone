"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import { useSession } from "@/hooks/useSession";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { usePost } from "@/hooks/usePost";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
export const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: sessionId } = useSession();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments/${postId}` : "/api/posts/create";

      await axios.post(url, { body });

      toast.success("Tweet Created");

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, mutatePost, mutatePosts, postId]);

  return (
    <div className="py-2">
      {/* {sessionId ? ( */}
      <div className="flex flex-row gap-4 px-5">
        <div>
          <Avatar profileImage={currentUser?.profileImage} />
        </div>
        <div className="w-full">
          <textarea
            placeholder={placeholder}
            disabled={isLoading}
            onChange={(event) => setBody(event.target.value)}
            value={body}
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
          ></textarea>
          <hr
            className="opacity-0 peer-focus:opacity-100
            h-[1px]
            w-full
            border-neutral-800
            transition
            "
          />
          <div className="mt-4 flex flex-row justify-end">
            <Button
              disabled={isLoading || !body}
              onClick={onSubmit}
              label="Tweet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
