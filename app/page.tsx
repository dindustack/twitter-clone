"use client";

import { FollowBar } from "@/components/FollowBar";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { Sidebar } from "@/components/Sidebar/Main";
import { useCallback, useState } from "react";

export default function Home() {
	const [isOpen, setIsOpen] = useState(true);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		alert("hello");
	}, []);

	const handleSubmit = useCallback(() => {
		setIsOpen(false);
		alert("bye");
	}, []);
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				onSubmit={handleSubmit}
				title="Modal"
				actionLabel="Submit"
			/>
			<>
				<div className="h-screen bg-black">
					<div className="container h-full mx-auto xl:px-30 max-w-6xl">
						<div className="grid grid-cols-4 h-full">
							<Sidebar />
							<div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
								<Header label="Home" />
							</div>
							<FollowBar />
						</div>
					</div>
				</div>
			</>
		</>
	);
}
