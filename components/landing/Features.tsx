import {
	BoltIcon,
	GaugeIcon,
	ImportIcon,
	InfoIcon,
	LayersIcon,
	ShieldIcon,
} from "lucide-react";

export default function Features() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto space-y-12 px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							Powerful By Default
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							millions of rows need less than a minute
						</p>
					</div>
				</div>
				<div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<GaugeIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Blazing Fast</h3>
						</div>
						<p className="text-muted-foreground">
							generate 1 million rows in less than a minute
						</p>
					</div>
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<LayersIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Scalable Infrastructure</h3>
						</div>
						<p className="text-muted-foreground">
							its opensource scale it as you want
						</p>
					</div>
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<BoltIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Customizeable</h3>
						</div>
						<p className="text-muted-foreground">
							define your columns as you want no need to write any code
						</p>
					</div>
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<ShieldIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Secure</h3>
						</div>
						<p className="text-muted-foreground">
							data will be deleted complety after 24 hours of generation
						</p>
					</div>
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<InfoIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Advanced Analytics</h3>
						</div>
						<p className="text-muted-foreground">
							keep track of your current generation and you will be informed
							with any updates on your data
						</p>
					</div>
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-primary rounded-md p-3 flex items-center justify-center">
								<ImportIcon className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="text-lg font-bold">Import to your database</h3>
						</div>
						<p className="text-muted-foreground">
							after generating your data can be downloaded in multiple formats
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
