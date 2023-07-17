"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { useForm } from "react-hook-form";
import { FormInput } from "../Form/Input";
import { useCallback, useState } from "react";
import { Modal } from "../Modal";

type FormValues = {
	email: string;
	password: string;
};

export const LoginModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const loginModal = useLoginModal();
	const { handleSubmit, register } = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

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
					// value={""}
					placeholder="Email"
					disabled={isLoading}
					{...register("email")}
				/>
				<FormInput
					type="password"
					// value={""}
					placeholder="Password"
					disabled={isLoading}
					{...register("password")}
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
