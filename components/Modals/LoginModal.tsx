"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { FormInput } from "../Form/Input";
import { useCallback, useState } from "react";
import { Modal } from "../Modal";

export const LoginModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const loginModal = useLoginModal();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			loginModal.onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, [loginModal]);

	// onSubmit useCallback and submit the form

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
	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Sign in"
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
		/>
	);
};
