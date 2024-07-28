import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";

export default function Header() {
	return (
		<div className="supports-backdrop-blur:bg-background/60 left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-14 items-center justify-between px-4">
				<div className="hidden lg:block">
					<img src="/favicon.png" className="w-9 h-9 rounded-full" alt="logo" />
				</div>
				<div className={cn("block lg:!hidden")}>
					<MobileSidebar />
				</div>

				<div className="flex items-center gap-2">
					<UserNav />
				</div>
			</nav>
		</div>
	);
}
