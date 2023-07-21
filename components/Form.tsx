"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import { useSession } from "@/hooks/useSession";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
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
      {sessionId ? (
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
      ) : (
        <div className="flex flex-col overflow-y-hidden gap-y-16">
          <div className="flex flex-col px-5 pt-6 flex-grow-[1]">
            <div className="flex items-center justify-center py-8">
              <BsTwitter size={28} color="#31a4f1" />
            </div>
            <div className="flex flex-col items-center py-4 gap-8">
              <h1 className="text-[2rem] text-white">Happening now</h1>
              <h1 className="text-[2rem] text-white">Join Twitter today.</h1>
              <Button
                label="Create an account"
                onClick={registerModal.onOpen}
                large
              />
            </div>

            <div className="text-neutral-400 text-center mt-4">
              <p>
                Already have an account
                <span
                  onClick={onToggle}
                  className="
        text-[#31a4f1]
        cursor-pointer
        hover:underline ml-2
        "
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
          <Image
            style={{
              objectFit: "contain",
            }}
            width={600}
            height={800}
            alt="Avatar"
            priority
            src={"/images/twitter-image.png"}
          />
        </div>
      )}
    </div>
  );
};
