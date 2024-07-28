import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
			<p className="text-xs text-muted-foreground">
				&copy; 2024 Datafy. All rights reserved.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link
					href="https://github.com/mu6m/datafy"
					className="text-xs hover:underline underline-offset-4"
					prefetch={false}
				>
					Source Code
				</Link>
				{/* <Link
					href="#"
					className="text-xs hover:underline underline-offset-4"
					prefetch={false}
				>
					Terms of Service
				</Link>
				<Link
					href="#"
					className="text-xs hover:underline underline-offset-4"
					prefetch={false}
				>
					Privacy Policy
				</Link> */}
			</nav>
		</footer>
	);
}
