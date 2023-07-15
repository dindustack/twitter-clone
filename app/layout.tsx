import { Sidebar } from "@/components/Sidebar/Main";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FollowBar } from "@/components/FollowBar";

export const metadata: Metadata = {
	title: "Twitter Clone",
	description: "A Twitter clone built with Next.js and Prisma.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className="h-screen bg-black">
					<div className="container h-full mx-auto xl:px-30 max-w-6xl">
						<div className="grid grid-cols-4 h-full">
							<Sidebar />
							<div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
								{children}
							</div>
							<FollowBar />
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
