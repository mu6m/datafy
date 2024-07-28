import {
	CloudLightning,
	Fingerprint,
	Laptop,
	Search,
	Settings,
} from "lucide-react";

export default function Ability() {
	return (
		<div id="feature" className="py-16 sm:py-20">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
				<div className="lg:order-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
						Why Waiting For Real Users?
					</h2>
					<p className="mt-6 text-lg text-muted-foreground">
						With couple of clicks you can create your very own fully customized
						data with up to 1 million rows that you can import it into your
						database and simulate how your application would serve your users.
					</p>
					<dl className="mt-6 space-y-4 leading-7">
						<div className="relative pl-8">
							<dt className="font-semibold">
								<Laptop
									width="1em"
									height="1em"
									className="absolute left-0 top-1 size-5 stroke-blue-500"
								/>
								<span>Adaptable</span>
							</dt>
							<dd className="text-sm text-muted-foreground">
								data is exported into multiple formats download the one you like
								and import it into your database
							</dd>
						</div>
						<div className="relative pl-8">
							<dt className="font-semibold">
								<Settings
									width="1em"
									height="1em"
									className="absolute left-0 top-1 size-5 stroke-blue-500"
								/>
								<span>Cutomizeable</span>
							</dt>
							<dd className="text-sm text-muted-foreground">
								define columns data as you want
							</dd>
						</div>
						<div className="relative pl-8">
							<dt className="font-semibold">
								<Search
									width="1em"
									height="1em"
									className="absolute left-0 top-1 size-5 stroke-blue-500"
								/>
								<span>Scalable</span>
							</dt>
							<dd className="text-sm text-muted-foreground">
								Generate up to 1 million rows at once.
							</dd>
						</div>
					</dl>
				</div>
				<div className="rounded-xl overflow-hidden border lg:-m-4 order-1">
					<div className="relative aspect-video">
						<img
							src="/images/blog/placeholder-about.jpg"
							className="size-full object-cover object-center"
							alt="Empower your projects"
							loading="eager"
							width={1000}
							height={500}
							decoding="async"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
