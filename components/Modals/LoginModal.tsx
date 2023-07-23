"use client";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FormInput } from "../Form/Input";
import { Modal } from "../Modal";

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose();
      toast.success("Success logging in");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput
          type="email"
          value={email}
          data-testid="email"
          placeholder="Email"
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          data-testid="password"
          value={password}
          placeholder="Password"
          disabled={isLoading}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </form>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-2"
        >
          Create new account
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading || !email || !password}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel={isLoading ? "Submitting" : "Sign in"}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
