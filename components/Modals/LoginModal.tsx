"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { FormInput } from "../Form/Input";
import { useCallback, useState } from "react";
import { Modal } from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

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
		} catch (error) {
			console.error(error);
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
					placeholder="Email"
					disabled={isLoading}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormInput
					type="password"
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
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Sign in"
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
