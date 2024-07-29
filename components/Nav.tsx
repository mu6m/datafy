"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
	Badge,
	DatabaseZap,
	LogIn,
	MenuIcon,
	User2Icon,
	UserPlus,
} from "lucide-react";
import useSession from "@/hooks/useSession";

export default function Nav() {
	const user = useSession.getState().user;
	return (
		<>
			<header className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 bg-white shadow-sm sm:px-6 lg:px-8">
				<Link href="#" className="flex items-center gap-2" prefetch={false}>
					<img src="/favicon.png" className="w-9 h-9 rounded-full" alt="logo" />
					<span className="sr-only">Datafy</span>
				</Link>

				<div className="hidden md:flex items-center gap-4">
					{user ? (
						<Button
							aria-label="dashboard"
							variant="outline"
							size="icon"
							className="relative"
						>
							<Link href={"/user/"}>
								<User2Icon className="size-4" aria-hidden="true" />
							</Link>
						</Button>
					) : (
						<>
							<Button
								aria-label="register"
								variant="outline"
								size="icon"
								className="relative"
							>
								<Link href={"/auth/register/"}>
									<UserPlus className="size-4" aria-hidden="true" />
								</Link>
							</Button>
							<Button
								aria-label="login"
								variant="outline"
								size="icon"
								className="relative"
								asChild
							>
								<Link href={"/auth/login/"}>
									<LogIn className="size-4" aria-hidden="true" />
								</Link>
							</Button>
						</>
					)}
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<MenuIcon className="w-6 h-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="bg-white">
						<div className="flex flex-col gap-4 p-4">
							<Link
								href="#"
								className="flex items-center gap-2"
								prefetch={false}
							>
								<img
									src="/favicon.png"
									className="w-9 h-9 rounded-full"
									alt="logo"
								/>
								<span className="sr-only">Datafy</span>
							</Link>
							<nav className="flex flex-col gap-2">
								<Button
									aria-label="Open cart"
									variant="outline"
									size={"lg"}
									className="relative flex gap-4"
								>
									<User2Icon className="size-4" aria-hidden="true" />
									Signup
								</Button>
							</nav>
						</div>
					</SheetContent>
				</Sheet>
			</header>
		</>
	);
}
