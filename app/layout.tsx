import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

export const metadata: Metadata = {
	title: "Twitter Clone",
	description: "A Twitter clone built with Next.js and Prisma.",
};

const barlow = Barlow({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: "normal",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-barlow",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${barlow.variable}`}>
			<body>{children}</body>
		</html>
	);
}
