"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FormInput } from "../Form/Input";
import { useCallback, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export const RegisterModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const registerModal = useRegisterModal();

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			await axios.post("/api/register", {
				email,
				name,
				password,
				username,
			});

			toast.success("Account created");

			signIn("credentials", {
				email,
				password,
			});

			toast.success("Account Logged in!");

			registerModal.onClose();
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}, [email, name, password, registerModal, username]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<FormInput
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				disabled={isLoading}
			/>
			<FormInput
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				disabled={isLoading}
			/>
			<FormInput
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				disabled={isLoading}
			/>
			<FormInput
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				autoComplete="current-password"
				disabled={isLoading}
			/>
		</div>
	);

	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>
				Already have an account
				<span
					className="
        text-white
        cursor-pointer
        hover:underline
        "
				>
					Sign in
				</span>
			</p>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Create an account"
			actionLabel="Register"
			onClose={registerModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
