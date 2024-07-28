import { Button } from "@/components/ui/button";
import { ArrowRight, AwardIcon, RocketIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
	return (
		<section className="bg-background text-foreground py-20">
			<div className="container mx-auto px-4 md:px-6 flex flex-col gap-4 items-center justify-center text-center space-y-8">
				<a
					href="https://twitter.com/miickasmt"
					className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-full px-4"
					target="_blank"
				>
					<span className="mr-3">🎉</span> Introducing on{" "}
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						className="ml-2 size-3.5"
						data-icon="twitter"
					>
						<symbol id="ai:local:twitter">
							<path
								fill="currentColor"
								d="M14.258 10.152 23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
							></path>
						</symbol>
						<use xlinkHref="#ai:local:twitter"></use>
					</svg>
				</a>
				<div className="space-y-4">
					<h1 className="text-4xl font-bold">Generate Users For Your App</h1>
					<p className="text-muted-foreground text-lg max-w-2xl">
						create data containing millions of rows on the fly to simulate real
						world cases of your next app going live.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<Button size="lg" className="rounded-full">
						<Link href="/auth/register">Get Started 👋</Link>
					</Button>
					<Button variant="secondary" size="lg" className="rounded-full">
						<Link href="#feature">Learn More</Link>
					</Button>
				</div>
				<div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
					<div className="flex flex-col items-center">
						<UsersIcon className="w-8 h-8 mb-2 stroke-blue-500" />
						<p>Create up to 1,000,000+ at once</p>
					</div>
					<div className="flex flex-col items-center">
						<RocketIcon className="w-8 h-8 mb-2 stroke-blue-500" />
						<p>Make your app production ready</p>
					</div>
					<div className="flex flex-col items-center">
						<AwardIcon className="w-8 h-8 mb-2 stroke-blue-500" />
						<p>It's Free and Open Source</p>
					</div>
				</div>
			</div>
		</section>
	);
}
