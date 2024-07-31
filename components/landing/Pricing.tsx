import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
	return (
		<section className="w-full">
			<div className="mx-auto container grid items-center justify-center gap-8 px-4 md:px-6">
				<div className="space-y-3 text-center">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
						Pricing 💸
					</h2>
					<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Its Free And OpenSource!
					</p>
				</div>
				<div className="grid w-full max-w-md grid-cols-1 gap-4">
					<Card className="flex flex-col justify-between">
						<CardHeader>
							<CardTitle>Free</CardTitle>
							<CardDescription>
								Its just free generate your data
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-baseline gap-2">
								<span className="text-4xl font-bold">$0</span>
								<span className="text-muted-foreground">/month</span>
							</div>
							<ul className="space-y-2 text-muted-foreground">
								<li>
									<CheckIcon className="mr-2 inline-block h-4 w-4 stroke-blue-500" />
									1,000 rows per generation
								</li>
								<li>
									<CheckIcon className="mr-2 inline-block h-4 w-4 stroke-blue-500" />
									10 columns per generation
								</li>
								<li>
									<CheckIcon className="mr-2 inline-block h-4 w-4 stroke-blue-500" />
									5 generations at once
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<a
								href="/auth/register"
								className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							>
								Create Your Account
							</a>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
