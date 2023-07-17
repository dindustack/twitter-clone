import { Header } from "./Header";
import { FollowBar } from "./FollowBar";
import { Sidebar } from "./Sidebar/Main";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="h-screen bg-black">
			<div className="container h-full mx-auto xl:px-30 max-w-6xl">
				<div className="grid grid-cols-4 h-full">
					<Sidebar />
					<div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
						{/* <Header label="Home" /> */}
						{children}
					</div>
					<FollowBar />
				</div>
			</div>
		</div>
	);
}