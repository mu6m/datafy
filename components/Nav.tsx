"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { LogIn, MenuIcon, User2Icon, UserPlus } from "lucide-react";
import useSession from "@/hooks/useSession";

export default function Nav() {
	const user = useSession.getState().user;
	return (
		<>
			<header className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 bg-white shadow-sm sm:px-6 lg:px-8">
				<a href="/" className="flex items-center gap-2">
					<img src="/favicon.png" className="w-9 h-9 rounded-full" alt="logo" />
					<span className="sr-only">Datafy</span>
				</a>

				<div className="hidden md:flex items-center gap-4">
					{user ? (
						<a
							className={buttonVariants({
								variant: "outline",
								size: "icon",
								className: "relative",
							})}
							href={"/user/"}
						>
							<User2Icon className="size-4" aria-hidden="true" />
						</a>
					) : (
						<>
							<a
								className={buttonVariants({
									variant: "outline",
									size: "icon",
									className: "relative",
								})}
								href={"/auth/register/"}
							>
								<UserPlus className="size-4" aria-hidden="true" />
							</a>
							<a
								className={buttonVariants({
									variant: "outline",
									size: "icon",
									className: "relative",
								})}
								href={"/auth/login/"}
							>
								<LogIn className="size-4" aria-hidden="true" />
							</a>
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
							<a href="#" className="flex items-center gap-2">
								<img
									src="/favicon.png"
									className="w-9 h-9 rounded-full"
									alt="logo"
								/>
								<span className="sr-only">Datafy</span>
							</a>
							<nav className="flex flex-col gap-2">
								{user ? (
									<a
										className={buttonVariants({
											variant: "outline",
											size: "lg",
											className: "relative flex gap-4",
										})}
										href={"/user/"}
									>
										<User2Icon className="size-4" aria-hidden="true" />
										Dashboard
									</a>
								) : (
									<>
										<a
											className={buttonVariants({
												variant: "outline",
												size: "lg",
												className: "relative flex gap-4",
											})}
											href={"/auth/register/"}
										>
											<UserPlus className="size-4" aria-hidden="true" />
											Register
										</a>
										<a
											className={buttonVariants({
												variant: "outline",
												size: "lg",
												className: "relative flex gap-4",
											})}
											href={"/auth/login/"}
										>
											<LogIn className="size-4" aria-hidden="true" />
											Login
										</a>
									</>
								)}
							</nav>
						</div>
					</SheetContent>
				</Sheet>
			</header>
		</>
	);
}
