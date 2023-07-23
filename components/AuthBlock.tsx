"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { BsTwitter } from "react-icons/bs";
import { Button } from "./Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

export const AuthBlock = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  return (
    <div className="py-2">
      <div className="flex flex-col overflow-y-hidden gap-y-16 h-screen">
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
          height={200}
          alt="Avatar"
          priority
          src={"/images/twitter-image.png"}
        />
      </div>
    </div>
  );
};
